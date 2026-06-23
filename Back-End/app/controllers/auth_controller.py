from flask import request, jsonify
from flask_jwt_extended import create_access_token
from datetime import timedelta
from app.services.auth_service import AuthService


class AuthController:

    # ==========================================
    # REGISTRO
    # ==========================================
    @staticmethod
    def registro():
        data = request.get_json(silent=True)
        if not data:
            return jsonify({"mensaje": "No se proporcionaron datos de registro."}), 400

        nombre_completo = data.get("nombre_completo") or data.get("nombre")
        correo = data.get("correo") or data.get("email")
        password = data.get("password")

        usuario, error = AuthService.registrar_usuario(nombre_completo, correo, password)

        if error:
            # Si el correo ya existe, es un conflicto (409); el resto son datos inválidos (400)
            codigo = 409 if "ya se encuentra registrado" in error else 400
            return jsonify({"mensaje": error}), codigo

        return jsonify({
            "mensaje": "Usuario registrado exitosamente.",
            "usuario": usuario.to_dict()
        }), 201

    # ==========================================
    # LOGIN
    # ==========================================
    @staticmethod
    def login():
        data = request.get_json(silent=True)
        if not data:
            return jsonify({"mensaje": "No se proporcionaron credenciales."}), 400

        # Captura tanto 'correo' como 'email' para prevenir fallos en el formulario
        correo = data.get("correo") or data.get("email")
        password = data.get("password")

        if not correo or not password:
            return jsonify({"mensaje": "Correo y contraseña requeridos."}), 400

        usuario, error = AuthService.login(correo, password)

        if error:
            codigo = 403 if "inactiva" in error else 401
            return jsonify({"mensaje": error}), codigo

        rol_valor = usuario.rol.value if hasattr(usuario.rol, "value") else usuario.rol

        # Flask-JWT-Extended / PyJWT exige que "sub" (identity) sea un string.
        # El resto de los datos (correo, rol) van como additional_claims dentro del token.
        token = create_access_token(
            identity=str(usuario.id),
            additional_claims={"correo": usuario.correo, "rol": rol_valor},
            expires_delta=timedelta(hours=8)
        )

        return jsonify({
            "mensaje": "Autenticación exitosa.",
            "token": token,
            "usuario": usuario.to_dict()
        }), 200
