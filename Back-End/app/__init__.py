import os
from flask import Flask, jsonify
from flask_cors import CORS
from flask_migrate import Migrate  # Importación de la librería de migraciones
from app.config.settings import Config
from app.database.database import db, bcrypt, jwt

# ── Inicialización de la instancia global de Migrate ────────────────────────
migrate = Migrate()

def create_app():
    """
    Crea y configura la aplicación Flask de ParkLink.
    Devuelve la instancia lista para ser ejecutada por run.py o Gunicorn.
    """
    app = Flask(__name__)

    # ── 1. Configuración ──────────────────────────────────────────────────────
    app.config.from_object(Config)

    # ── 2. CORS (una sola vez) ────────────────────────────────────────────────
    # Permite solicitudes desde el frontend React en desarrollo.
    CORS(
        app,
        resources={r"/api/*": {"origins": "http://localhost:5173"}},
        supports_credentials=True,
    )

    # ── 3. Inicialización de extensiones ──────────────────────────────────────
    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    
    # 🛠️ CORREGIDO: Inicializa y vincula Flask-Migrate con la App y SQLAlchemy
    migrate.init_app(app, db)

    # ── 4. Manejadores de errores JWT ─────────────────────────────────────────
    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        return jsonify({
            "mensaje": "El token ha expirado. Inicia sesión nuevamente.",
            "error": "token_expired"
        }), 401

    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return jsonify({
            "mensaje": "Token inválido o corrupto.",
            "error": "invalid_token"
        }), 401

    @jwt.unauthorized_loader
    def missing_token_callback(error):
        return jsonify({
            "mensaje": "Se requiere autenticación. No se encontró un token de acceso.",
            "error": "authorization_required"
        }), 401

    # ── 5. Registro de Blueprints ─────────────────────────────────────────────
    # Se importan AQUÍ dentro para prevenir referencias circulares en Python.
    from app.routes.auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix="/api/auth")

    try:
        from app.routes.admin import admin_bp  # noqa: F401
        app.register_blueprint(admin_bp, url_prefix="/api/admin")
    except ImportError:
        app.logger.warning(
            "Blueprint 'admin' no encontrado — /api/admin no estará disponible."
        )

    # ── 6. Ruta de salud ──────────────────────────────────────────────────────
    @app.route("/health", methods=["GET"])
    def health_check():
        return jsonify({
            "status": "online",
            "servicio": "ParkLink API",
            "base_de_datos": "MySQL (XAMPP)"
        }), 200

    return app