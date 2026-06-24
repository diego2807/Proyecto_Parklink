# app/routes/accesos.py
"""
ParkLink - Controlador independiente para el historial y registro de Accesos.
Blueprint: accesos_bp
"""

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.database.database import db
from app.models.acceso import Acceso
from app.models.usuario import Usuario
from datetime import datetime, timezone

accesos_bp = Blueprint("accesos", __name__)

# ── 1. OBTENER HISTORIAL (Para la barra lateral de Accesos.jsx) ──────────────
@accesos_bp.route("/historial", methods=["GET"])
@jwt_required()
def obtener_historial():
    """
    Retorna el listado cronológico de entradas y salidas de ParkLink.
    """
    try:
        datos_token = get_jwt_identity()
        if not datos_token:
            return jsonify({"error": "No se pudo validar la identidad corporativa."}), 401

        # Validar el rol de manera elástica
        rol_actual = datos_token.get('rol') if isinstance(datos_token, dict) else None
        if not rol_actual:
            user_jwt_id = datos_token.get('id') if isinstance(datos_token, dict) else datos_token
            current_user = Usuario.query.get(int(user_jwt_id))
            if current_user:
                rol_actual = current_user.rol.value

        # Permitir tanto a administradores como a vigilantes auditar la portería
        if rol_actual not in ['administrador', 'vigilante']:
            return jsonify({"error": "Acceso denegado. Permisos insuficientes."}), 403

        # Traer los registros ordenados por el más reciente
        registros = Acceso.query.order_by(Acceso.fecha_hora.desc()).all()
        
        resultado = []
        for reg in registros:
            # Formatear la fecha a un string limpio para React
            fecha_str = reg.fecha_hora.strftime("%Y-%m-%d %H:%M:%S") if reg.fecha_hora else "Sin fecha"
            
            resultado.append({
                "id": reg.id,
                "placa": reg.placa,
                "tipo_movimiento": reg.tipo_movimiento,
                "tipo_vehiculo": reg.tipo_vehiculo,
                "tipo_usuario": reg.tipo_usuario,
                "celda_asignada": reg.celda_asignada or "N/A",
                "fecha_hora": fecha_str
            })

        return jsonify(resultado), 200

    except Exception as e:
        print(f"❌ Error en GET /historial: {str(e)}")
        return jsonify({"error": f"Error interno en el servidor: {str(e)}"}), 500


# ── 2. REGISTRAR ENTRADA/SALIDA (Para el Formulario de Accesos.jsx) ─────────
@accesos_bp.route("/registrar-acceso", methods=["POST"])
@jwt_required()
def registrar_acceso():
    """
    Guarda un nuevo registro de portería en la base de datos.
    """
    try:
        data = request.get_json(silent=True) or {}
        placa = data.get('placa')
        tipo_movimiento = data.get('tipo_movimiento') # "Entrada" o "Salida"
        tipo_vehiculo = data.get('tipo_vehiculo', 'Automóvil')
        tipo_usuario = data.get('tipo_usuario', 'Funcionario')
        celda_asignada = data.get('celda_assigned') or data.get('celda_asignada')

        if not placa or not tipo_movimiento:
            return jsonify({"error": "Placa y tipo de movimiento son campos obligatorios."}), 400

        # Crear la instancia del modelo Acceso que ya tienes definido
        nuevo_acceso = Acceso(
            placa=placa.strip().upper(),
            tipo_movimiento=tipo_movimiento,
            tipo_vehiculo=tipo_vehiculo,
            tipo_usuario=tipo_usuario,
            celda_asignada=celda_asignada if celda_asignada else "N/A",
            fecha_hora=datetime.now(timezone.utc) # Evita desfases de hora
        )

        db.session.add(nuevo_acceso)
        db.session.commit()

        return jsonify({
            "message": f"Registro de {tipo_movimiento} completado con éxito para la placa {placa.upper()}.",
            "acceso_id": nuevo_acceso.id
        }), 201

    except Exception as e:
        db.session.rollback()
        print(f"❌ Error en POST /registrar-acceso: {str(e)}")
        return jsonify({"error": f"Error interno al guardar: {str(e)}"}), 500