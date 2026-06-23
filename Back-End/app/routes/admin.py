from datetime import datetime, timezone
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt
from app import db

# Importación unificada y exacta según la estructura real de tus carpetas
from app.models import Celda, Acceso, Vehiculo, Configuracion, Alerta, LogAuditoria

# Definición del Blueprint para la administración central
admin_bp = Blueprint('admin', __name__)

def admin_required():
    """
    Función auxiliar para validar que el usuario en sesión sea Administrador.
    El rol viaja como "additional_claim" del JWT (ver auth_controller.py),
    no dentro del identity, por eso se lee con get_jwt() y no get_jwt_identity().
    """
    claims = get_jwt()
    rol = claims.get('rol', '')
    # Comparación en minúsculas: el JWT guarda el rol como 'administrador' (RolEnum)
    if not claims or str(rol).lower() != 'administrador':
        return False
    return True


# ==========================================
# 1. MÉTRICAS E HISTORIAL (KPIs.jsx)
# ==========================================
@admin_bp.route('/kpis', methods=['GET'])
@jwt_required()
def obtener_kpis():
    if not admin_required():
        return jsonify({"mensaje": "Acceso denegado. Se requieren permisos de Administrador."}), 403

    # Mapear celdas ocupadas
    total_celdas = Celda.query.count() or 1
    celdas_ocupadas = Celda.query.filter_by(ocupada=True).count()
    porcentaje = round((celdas_ocupadas / total_celdas) * 100, 2)

    # Conteos por tipo de vehículo (Entradas activas)
    total_carros = Acceso.query.filter_by(tipo_movimiento='Entrada', tipo_vehiculo='Automóvil').count()
    total_motos = Acceso.query.filter_by(tipo_movimiento='Entrada', tipo_vehiculo='Motocicleta').count()
    celdas_especiales = Celda.query.filter(Celda.tipo_celda.in_(['movilidad', 'eléctricos']), Celda.ocupada == True).count()

    # Recuperar accesos activos en tiempo real para la tabla de monitoreo
    accesos_activos = Acceso.query.filter_by(tipo_movimiento='Entrada').order_by(Acceso.fecha_hora.desc()).all()
    
    activos_payload = []
    for acc in accesos_activos:
        vehiculo_info = Vehiculo.query.filter_by(placa=acc.placa).first()
        activos_payload.append({
            "placa": acc.placa,
            "tipo_vehiculo": acc.tipo_vehiculo,
            "funcionario": vehiculo_info.funcionario if vehiculo_info else "Invitado / Externo",
            "area": vehiculo_info.area if vehiculo_info else acc.tipo_usuario,
            "hora_ingreso": acc.fecha_hora.strftime('%I:%M %p'),
            "celda": acc.celda_asignada or 'General'
        })

    return jsonify({
        "metricas": {
            "ocupacion_total": celdas_ocupadas,
            "porcentaje_ocupacion": porcentaje,
            "total_carros": total_carros,
            "total_motos": total_motos,
            "celdas_especiales": celdas_especiales
        },
        "activos": activos_payload
    }), 200


# ==========================================
# 2. GESTIÓN DE VEHÍCULOS (Vehiculos.jsx)
# ==========================================
@admin_bp.route('/vehiculos', methods=['GET', 'POST'])
@jwt_required()
def gestionar_vehiculos():
    if not admin_required():
        return jsonify({"mensaje": "Acceso denegado."}), 403

    if request.method == 'GET':
        vehiculos = Vehiculo.query.order_by(Vehiculo.created_at.desc()).all()
        return jsonify([{
            "id": v.id,
            "placa": v.placa,
            "funcionario": v.funcionario,
            "area": v.area,
            "tipo_vehiculo": v.tipo_vehiculo
        } for v in vehiculos]), 200

    if request.method == 'POST':
        data = request.get_json()
        placa = data.get('placa', '').strip().upper()
        funcionario = data.get('funcionario', '').strip()
        area = data.get('area', 'Tecnología')
        tipo_vehiculo = data.get('tipo_vehiculo', 'Automóvil')

        if not placa or not funcionario:
            return jsonify({"mensaje": "La placa y el nombre del funcionario son obligatorios."}), 400

        if Vehiculo.query.filter_by(placa=placa).first():
            return jsonify({"mensaje": f"El vehículo con placas {placa} ya se encuentra registrado."}), 409

        nuevo_vehiculo = Vehiculo(
            placa=placa,
            funcionario=funcionario,
            area=area,
            tipo_vehiculo=tipo_vehiculo
        )
        
        try:
            db.session.add(nuevo_vehiculo)
            db.session.commit()
            return jsonify({"mensaje": "Vehículo registrado exitosamente.", "id": nuevo_vehiculo.id}), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({"mensaje": "Error al registrar el vehículo en el sistema.", "error": str(e)}), 500


# ==========================================
# 3. HISTORIAL GENERAL DE ACCESOS (Accesos.jsx)
# ==========================================
@admin_bp.route('/accesos', methods=['GET'])
@jwt_required()
def obtener_historial_accesos():
    if not admin_required():
        return jsonify({"mensaje": "Acceso denegado."}), 403

    # Retorna las últimas 100 transacciones para mitigar sobrecarga de red
    accesos = Acceso.query.order_by(Acceso.fecha_hora.desc()).limit(100).all()
    return jsonify([{
        "id": a.id,
        "placa": a.placa,
        "tipo_movimiento": a.tipo_movimiento,
        "celda_asignada": a.celda_asignada,
        "created_at": a.fecha_hora.isoformat()
    } for a in accesos]), 200


# ==========================================
# 4. TENDENCIAS Y ESTADÍSTICAS (Tendencias.jsx)
# ==========================================
@admin_bp.route('/tendencias', methods=['GET'])
@jwt_required()
def obtener_tendencias():
    if not admin_required():
        return jsonify({"mensaje": "Acceso denegado."}), 403

    periodo = request.args.get('periodo', 'semana')
    
    # Simulación consolidada del flujo de analítica
    return jsonify({
        "hora_pico": "07:30 AM - 08:45 AM",
        "dia_pico": "Martes y Jueves (Días Operacionales)",
        "periodo_evaluado": periodo
    }), 200


# ==========================================
# 5. PARÁMETROS DEL SISTEMA (Config.jsx)
# ==========================================
@admin_bp.route('/configuracion', methods=['GET', 'POST'])
@jwt_required()
def parametrizar_sistema():
    if not admin_required():
        return jsonify({"mensaje": "Acceso denegado."}), 403

    config = Configuracion.query.first()
    
    if not config and request.method == 'GET':
        return jsonify({
            "hora_apertura": "06:00", "hora_cierre": "22:00", "permitir_festivos": True,
            "tiempo_maximo": 14, "accion_exceso": "notificar",
            "celdas_admin": 40, "celdas_operativas": 60, "celdas_movilidad": 10
        }), 200

    if request.method == 'POST':
        data = request.get_json()
        if not config:
            config = Configuracion()

        config.hora_apertura = data.get('hora_apertura', config.hora_apertura)
        config.hora_cierre = data.get('hora_cierre', config.hora_cierre)
        config.permitir_festivos = bool(data.get('permitir_festivos', config.permitir_festivos))
        config.tiempo_maximo = int(data.get('tiempo_maximo', config.tiempo_maximo))
        config.accion_exceso = data.get('accion_exceso', config.accion_exceso)
        config.celdas_admin = int(data.get('celdas_admin', config.celdas_admin))
        config.celdas_operativas = int(data.get('celdas_operativas', config.celdas_operativas))
        config.celdas_movilidad = int(data.get('celdas_movilidad', config.celdas_movilidad))

        try:
            db.session.add(config)
            db.session.commit()
            return jsonify({"mensaje": "Configuración global actualizada correctamente."}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({"mensaje": "Error al guardar configuraciones.", "error": str(e)}), 500


# ==========================================
# 6. PANEL DE ALERTAS (Alertas.jsx)
# ==========================================
@admin_bp.route('/alertas', methods=['GET', 'POST'])
@jwt_required()
def gestionar_alertas():
    if not admin_required():
        return jsonify({"mensaje": "Acceso denegado."}), 403

    if request.method == 'GET':
        alertas = Alerta.query.order_by(Alerta.fecha_publicacion.desc()).all()
        return jsonify([{
            "id": al.id,
            "titulo": al.titulo,
            "severidad": al.severidad,
            "contenido": al.contenido,
            "fecha_publicacion": al.fecha_publicacion.strftime('%Y-%m-%d %H:%M')
        } for al in alertas]), 200

    if request.method == 'POST':
        data = request.get_json()
        titulo = data.get('titulo', '').strip()
        severidad = data.get('severidad', 'informativo')
        contenido = data.get('contenido', '').strip()

        if len(titulo) < 4 or len(contenido) < 10:
            return jsonify({"mensaje": "Campos con longitud insuficiente."}), 400

        nueva_alerta = Alerta(
            titulo=titulo,
            severidad=severidad,
            contenido=contenido,
            fecha_publicacion=datetime.now(timezone.utc)
        )

        try:
            db.session.add(nueva_alerta)
            db.session.commit()
            return jsonify({"mensaje": "Alerta corporativa emitida exitosamente."}), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({"mensaje": "Error al publicar alerta.", "error": str(e)}), 500


# ==========================================
# 7. LOGS DE AUDITORÍA (Log.jsx)
# ==========================================
@admin_bp.route('/logs', methods=['GET'])
@jwt_required()
def obtener_logs_auditoria():
    if not admin_required():
        return jsonify({"mensaje": "Acceso denegado."}), 403

    # Retorna la lista de eventos del sistema estructurada para el frontend
    logs = LogAuditoria.query.order_by(LogAuditoria.fecha.desc()).limit(150).all()
    return jsonify({
        "data": [{
            "fecha": l.fecha.strftime('%Y-%m-%d %H:%M:%S'),
            "nivel": l.nivel,
            "modulo": l.modulo,
            "descripcion": l.descripcion,
            "usuario": l.usuario,
            "placa": l.placa
        } for l in logs]
    }), 200