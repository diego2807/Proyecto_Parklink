# app/routes/logs.py
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.log_auditoria import LogAuditoria  # Revisa el nombre exacto de la importación
from app.database.database import db

logs_bp = Blueprint("logs", __name__)

@logs_bp.route("/logs", methods=["GET"])
@jwt_required()
def obtener_historial_logs():
    try:
        # Validar token de sesión
        usuario_actual = get_jwt_identity()
        if not usuario_actual:
            return jsonify({"error": "Sesión no autorizada"}), 401
            
        # Consultar los logs ordenados por fecha descendente (más recientes primero)
        historial = LogAuditoria.query.order_by(LogAuditoria.fecha.desc()).all()
        
        lista_logs = []
        for log in historial:
            lista_logs.append({
                "id": log.id,
                "fecha": log.fecha.strftime("%Y-%m-%d %H:%M:%S"),
                "nivel": log.nivel,
                "modulo": log.modulo,
                "descripcion": log.descripcion,
                "usuario_id": log.usuario_id,
                "placa": log.placa if log.placa else "N/A"
            })
            
        return jsonify(lista_logs), 200
    except Exception as e:
        print(f"❌ Error en GET /api/admin/logs: {str(e)}")
        return jsonify({"error": f"Error al recuperar auditoría: {str(e)}"}), 500