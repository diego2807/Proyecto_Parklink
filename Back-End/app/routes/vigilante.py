from flask import Blueprint, jsonify
from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.services.vigilante_service import (
    abrir_turno,
    listar_turnos,
    cerrar_turno,
    registrar_entrada,
    registrar_salida
)

vigilante_bp = Blueprint(
    "vigilante",
    __name__
)


@vigilante_bp.route("/apertura-turno", methods=["POST"])
@jwt_required()
def apertura_turno():

    usuario_id = get_jwt_identity()

    resultado = abrir_turno(usuario_id)

    return jsonify({
        "mensaje": resultado
    }), 201


@vigilante_bp.route("/turnos", methods=["GET"])
@jwt_required()
def obtener_turnos():

    return jsonify(listar_turnos())


@vigilante_bp.route("/cierre-turno", methods=["POST"])
@jwt_required()
def cierre_turno():

    usuario_id = get_jwt_identity()

    resultado = cerrar_turno(usuario_id)

    if resultado is None:
        return jsonify({
            "error": "No existe un turno activo"
        }), 404

    return jsonify({
        "mensaje": resultado
    }), 200


@vigilante_bp.route("/entrada", methods=["POST"])
@jwt_required()
def entrada():

    usuario_id = get_jwt_identity()

    data = request.get_json()

    placa = data.get("placa")

    resultado = registrar_entrada(
        usuario_id,
        placa
    )

    if "error" in resultado:
        return jsonify(resultado), 400

    return jsonify(resultado), 201


@vigilante_bp.route("/salida", methods=["POST"])
@jwt_required()
def salida():

    usuario_id = get_jwt_identity()

    data = request.get_json()

    placa = data.get("placa")

    resultado = registrar_salida(
        usuario_id,
        placa
    )

    if "error" in resultado:
        return jsonify(resultado), 400

    return jsonify(resultado), 201