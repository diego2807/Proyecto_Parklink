# app/routes/admin.py
"""
ParkLink - Rutas de control exclusivo del Administrador.
Blueprint: admin_bp
Prefijo registrado: /api/admin
"""

import secrets
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.database.database import db
from app.models.usuario import Usuario, RolEnum  
from app.models.vehiculo import Vehiculo        

admin_bp = Blueprint("admin", __name__)


# ── 1. REGISTRAR PERSONAL ───────────────────────────────────────────────────
@admin_bp.route("/registrar-usuario", methods=["POST"])
@jwt_required()
def registrar_usuario_por_admin():
    """
    Endpoint para que el administrador dé de alta a un empleado (usuario o vigilante).
    """
    identity = get_jwt_identity()
    rol_actual = identity.get('rol') if isinstance(identity, dict) else None
    
    if not rol_actual:
        user_jwt_id = identity.get('id') if isinstance(identity, dict) else identity
        current_user = Usuario.query.get(int(user_jwt_id))
        if current_user:
            rol_actual = current_user.rol.value

    if rol_actual != 'administrador':
        return jsonify({"error": "Acceso denegado. Se requieren privilegios de administrador."}), 403

    data = request.get_json(silent=True) or {}
    nombre_completo = data.get('nombre') or data.get('nombre_completo')
    correo = data.get('correo') or data.get('email')
    rol_solicitado = data.get('rol', 'usuario')

    if not nombre_completo or not correo:
        return jsonify({"error": "Nombre completo y correo son campos obligatorios."}), 400

    try:
        if isinstance(rol_solicitado, str):
            try:
                rol_enum = RolEnum(rol_solicitado.strip())
            except ValueError:
                rol_enum = RolEnum[rol_solicitado.strip().upper()]
        else:
            rol_enum = RolEnum(rol_solicitado)
    except (keyError, ValueError):
        return jsonify({"error": f"El rol '{rol_solicitado}' no es válido en ParkLink."}), 400

    if Usuario.query.filter_by(correo=correo.strip()).first():
        return jsonify({"error": "Este correo electrónico ya está registrado."}), 400

    password_temporal = secrets.token_urlsafe(8)

    try:
        nuevo_usuario = Usuario(
            nombre_completo=nombre_completo.strip(),
            correo=correo.strip(),
            rol=rol_enum,
            activo=True
        )
        nuevo_usuario.password = password_temporal 

        db.session.add(nuevo_usuario)
        db.session.commit()

        usuario_dict = nuevo_usuario.to_dict()
        if 'rol' in usuario_dict and hasattr(nuevo_usuario.rol, 'value'):
            usuario_dict['rol'] = nuevo_usuario.rol.value

        return jsonify({
            "message": "Usuario creado con éxito.",
            "password_temporal_creada": password_temporal,
            "usuario": usuario_dict
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error interno en el servidor: {str(e)}"}), 500


# ── 2. VINCULAR VEHÍCULOS (CORREGIDO Y BLINDADO DE RAÍZ) ──────────────────────
@admin_bp.route("/vehiculos", methods=["POST"])
@jwt_required()
def vincular_vehiculo():
    """
    Endpoint para asociar un vehículo a un funcionario corporativo.
    Soporta múltiples estructuras de payloads y resuelve dinámicamente el RolEnum.
    """
    identity = get_jwt_identity()
    rol_actual = identity.get('rol') if isinstance(identity, dict) else None
    
    if not rol_actual:
        user_jwt_id = identity.get('id') if isinstance(identity, dict) else identity
        current_user = Usuario.query.get(int(user_jwt_id))
        if current_user:
            rol_actual = current_user.rol.value

    if rol_actual != 'administrador':
        return jsonify({"error": "Acceso denegado. Se requieren privilegios de administrador."}), 403

    data = request.get_json(silent=True) or {}
    
    # 🛠️ FLEXIBILIDAD: Captura variaciones de nombres de propiedades del Front-End
    nombre_funcionario = data.get('nombre_funcionario') or data.get('nombre')
    placa_recibida = data.get('placa')
    tipo_vehiculo = data.get('tipo_vehiculo', 'Automóvil')
    area = data.get('area', 'Tecnología')

    if not nombre_funcionario or not placa_recibida:
        return jsonify({"error": "El nombre del funcionario y la placa son campos requeridos del sistema."}), 400

    placa_limpia = placa_recibida.strip().upper()

    try:
        # Verificar duplicados de la placa en el modelo Vehiculo
        vehiculo_existente = Vehiculo.query.filter_by(placa=placa_limpia).first()
        if vehiculo_existente:
            return jsonify({"error": f"La placa '{placa_limpia}' ya se encuentra registrada."}), 400

        # Buscar si el usuario ya existe por su nombre exacto
        usuario = Usuario.query.filter_by(nombre_completo=nombre_funcionario.strip()).first()

        # Si el usuario no existe en el sistema, lo creamos dinámicamente de forma segura
        if not usuario:
            username_limpio = nombre_funcionario.lower().replace(" ", "")
            correo_automatico = f"{username_limpio}@parklink.local"
            
            if Usuario.query.filter_by(correo=correo_automatico).first():
                correo_automatico = f"{username_limpio}_{secrets.token_hex(2)}@parklink.local"

            # 🛠️ RESOLUCIÓN ROBUSTA DE ENUM: Busca el rol 'usuario' dinámicamente sin importar mayúsculas/minúsculas
            rol_defecto = None
            for miembro in RolEnum:
                if miembro.value == "usuario" or miembro.name.lower() == "usuario":
                    rol_defecto = miembro
                    break
            
            # Si el bucle falla por diferencias de configuración, usamos el constructor como fallback
            if not rol_defecto:
                try:
                    rol_defecto = RolEnum("usuario")
                except ValueError:
                    rol_defecto = RolEnum["USUARIO"]

            usuario = Usuario(
                nombre_completo=nombre_funcionario.strip(),
                correo=correo_automatico,
                rol=rol_defecto,  # <--- Asignación dinámica libre de fallas de atributo
                activo=True
            )
            usuario.password = "ParkLinkTemp2026*"
            
            db.session.add(usuario)
            db.session.flush()  # Sincroniza para obtener el ID asignado por la BD sin cerrar la sesión

        # Crear y persistir el vehículo usando las columnas mapeadas de vehiculo.py
        nuevo_vehiculo = Vehiculo(
            placa=placa_limpia,
            usuario_id=usuario.id,
            tipo_vehiculo=tipo_vehiculo,
            area=area
        )

        db.session.add(nuevo_vehiculo)
        db.session.commit()

        return jsonify({
            "message": "Vehículo vinculado y autorizado con éxito.",
            "vehiculo": {
                "id": nuevo_vehiculo.id,
                "placa": nuevo_vehiculo.placa,
                "nombre_funcionario": usuario.nombre_completo,
                "area": nuevo_vehiculo.area
            }
        }), 201

    except Exception as e:
        db.session.rollback()
        print(f"❌ Error en POST /vehiculos: {str(e)}")
        return jsonify({"error": f"Error interno en el servidor al vincular: {str(e)}"}), 500


# ── 3. LISTAR VEHÍCULOS REGISTRADOS ──────────────────────────────────────────
@admin_bp.route("/vehiculos", methods=["GET"])
@jwt_required()
def listar_vehiculos():
    """
    Retorna la lista global de vehículos autorizados mapeando los datos de forma limpia.
    """
    try:
        datos_token = get_jwt_identity()
        if not datos_token:
            return jsonify({"error": "No se pudo validar la identidad corporativa."}), 401

        rol_actual = datos_token.get('rol') if isinstance(datos_token, dict) else None
        if not rol_actual:
            user_jwt_id = datos_token.get('id') if isinstance(datos_token, dict) else datos_token
            current_user = Usuario.query.get(int(user_jwt_id))
            if current_user:
                rol_actual = current_user.rol.value

        if rol_actual != 'administrador':
            return jsonify({"error": "Acceso denegado. Se requieren privilegios de administrador."}), 403

        vehiculos = Vehiculo.query.all()
        resultado = []
        
        for v in vehiculos:
            usuario_asociado = db.session.get(Usuario, v.usuario_id)
            nombre = usuario_asociado.nombre_completo if usuario_asociado else "Funcionario Desconocido"
            
            resultado.append({
                "id": v.id,
                "placa": v.placa,
                "nombre_funcionario": nombre,
                "area": v.area,
                "tipo_vehiculo": v.tipo_vehiculo
            })
            
        return jsonify(resultado), 200
        
    except Exception as e:
        print(f"❌ Error en GET /vehiculos: {str(e)}")
        return jsonify({"error": f"No se pudo conocer la lista: {str(e)}"}), 500
    
    # Al final de app/routes/admin.py

# ── 4. DAR DE BAJA / ELIMINAR VEHÍCULO ──────────────────────────────────────
@admin_bp.route("/vehiculos/<int:vehiculo_id>", methods=["DELETE"])
@jwt_required()
def eliminar_vehiculo(vehiculo_id):
    """
    Endpoint para que el administrador dé de baja (elimine) un vehículo autorizado.
    """
    try:
        datos_token = get_jwt_identity()
        rol_actual = datos_token.get('rol') if isinstance(datos_token, dict) else None
        
        if not rol_actual:
            user_jwt_id = datos_token.get('id') if isinstance(datos_token, dict) else datos_token
            current_user = Usuario.query.get(int(user_jwt_id))
            if current_user:
                rol_actual = current_user.rol.value

        if rol_actual != 'administrador':
            return jsonify({"error": "Acceso denegado. Solo los administradores pueden dar de baja vehículos."}), 403

        # Buscar el vehículo en la base de datos corporativa
        vehiculo = Vehiculo.query.get(vehiculo_id)
        if not vehiculo:
            return jsonify({"error": "El vehículo que intenta eliminar no existe en el sistema."}), 404

        placa_eliminada = vehiculo.placa

        # Eliminar de la sesión y confirmar en la BD
        db.session.delete(vehiculo)
        db.session.commit()

        return jsonify({
            "message": f"El vehículo con placas '{placa_eliminada}' ha sido dado de baja correctamente."
        }), 200

    except Exception as e:
        db.session.rollback()
        print(f"❌ Error en DELETE /vehiculos/: {str(e)}")
        return jsonify({"error": f"Error interno en el servidor al eliminar: {str(e)}"}), 500