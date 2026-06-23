"""
ParkLink - Rutas de autenticación.

Blueprint: auth_bp
Prefijo registrado en create_app(): /api/auth

Endpoints:
    POST /api/auth/register  → Registro de nuevo usuario
    POST /api/auth/login     → Inicio de sesión (devuelve JWT)
    GET  /api/auth/perfil    → Perfil del usuario autenticado (requiere JWT)

La lógica de negocio vive en AuthController → AuthService.
Estas rutas son solo el punto de entrada HTTP.
"""

from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.controllers.auth_controller import AuthController
from app.models.usuario import Usuario

auth_bp = Blueprint("auth", __name__)


# ── Registro ──────────────────────────────────────────────────────────────────
@auth_bp.route("/register", methods=["POST"])
def registrar_usuario():
    """
    Registra un nuevo usuario en el sistema.

    Body JSON esperado:
        {
            "nombre_completo": "Juan Pérez",
            "correo": "juan@empresa.com",
            "password": "MiPassword123"
        }

    Respuestas:
        201 - Usuario creado exitosamente (incluye objeto usuario sin contraseña)
        400 - Datos inválidos o incompletos
        409 - El correo ya está registrado
    """
    return AuthController.registro()


# ── Login ─────────────────────────────────────────────────────────────────────
@auth_bp.route("/login", methods=["POST"])
def login():
    """
    Autentica al usuario y devuelve un token JWT.

    Body JSON esperado:
        {
            "correo": "juan@empresa.com",
            "password": "MiPassword123"
        }

    También acepta "email" como alias de "correo" para compatibilidad
    con formularios React que usen ese campo.

    Respuestas:
        200 - Autenticación exitosa (incluye token JWT y objeto usuario)
        400 - Faltan campos requeridos
        401 - Credenciales incorrectas
        403 - Cuenta inactiva
    """
    return AuthController.login()


# ── Perfil (ruta protegida) ───────────────────────────────────────────────────
@auth_bp.route("/perfil", methods=["GET"])
@jwt_required()
def obtener_perfil():
    """
    Devuelve los datos del usuario autenticado.

    Requiere el header:
        Authorization: Bearer <token>

    Respuestas:
        200 - Datos del usuario
        404 - Usuario no encontrado o cuenta inactiva
    """
    # get_jwt_identity() devuelve el "sub" del token, que guardamos como str(usuario.id)
    usuario_id = get_jwt_identity()
    usuario = Usuario.query.get(int(usuario_id))

    if not usuario or not usuario.activo:
        return jsonify({
            "mensaje": "Usuario no encontrado o sesión inválida."
        }), 404

    return jsonify({"usuario": usuario.to_dict()}), 200
