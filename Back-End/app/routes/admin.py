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
from app.models.usuario import Usuario, RolEnum  # Asegúrate de importar tu RolEnum

admin_bp = Blueprint("admin", __name__)

# ── Registrar Personal con Contraseña Temporal ───────────────────────────────
@admin_bp.route("/registrar-usuario", methods=["POST"])
@jwt_required()  # Requiere token JWT válido
def registrar_usuario_por_admin():
    """
    Endpoint para que el administrador dé de alta a un empleado (usuario o vigilante).
    Genera automáticamente una contraseña temporal en texto plano para el Front-End.
    """
    # 1. Protección estricta de Rol
    identity = get_jwt_identity()
    # Ajusta según cómo almacenes la identidad en tu controlador de Login.
    # Si identity es un diccionario: identity.get('rol'), si es solo el ID, deberás buscar el usuario en BD.
    rol_actual = identity.get('rol') if isinstance(identity, dict) else None
    
    # Si no guardaste el rol directamente en el JWT, lo buscamos en la BD:
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

    # 2. Validar que el rol exista en tu Enum
    try:
        rol_enum = RolEnum(rol_solicitado)
    except ValueError:
        return jsonify({"error": f"El rol '{rol_solicitado}' no es válido en ParkLink."}), 400

    # 3. Validar duplicados
    if Usuario.query.filter_by(correo=correo.strip()).first():
        return jsonify({"error": "Este correo electrónico ya está registrado."}), 400

    # 4. Generación segura de la clave temporal
    password_temporal = secrets.token_urlsafe(8)

    try:
        nuevo_usuario = Usuario(
            nombre_completo=nombre_completo.strip(),
            correo=correo.strip(),
            rol=rol_enum,
            activo=True
        )
        # Tu propiedad @password.setter en usuario.py se encarga de encriptarlo con Bcrypt automáticamente
        nuevo_usuario.password = password_temporal 

        db.session.add(nuevo_usuario)
        db.session.commit()

        # Retornamos la contraseña temporal en texto plano UNA SOLA VEZ para tu Registro.jsx
        return jsonify({
            "message": "Usuario creado con éxito.",
            "password_temporal_creada": password_temporal,
            "usuario": nuevo_usuario.to_dict()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error interno en el servidor: {str(e)}"}), 500