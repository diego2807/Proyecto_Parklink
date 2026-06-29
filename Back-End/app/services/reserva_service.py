from datetime import datetime, timedelta

from app.database.database import db
from app.models.reserva import Reserva
from app.models.vehiculo import Vehiculo


def crear_reserva(usuario_id, data):

    vehiculo_id = data.get("vehiculo_id")
    fecha = data.get("fecha")
    hora = data.get("hora")

    if not vehiculo_id or not fecha or not hora:
        return {
            "error": "Todos los campos son obligatorios."
        }

    # ==========================
    # Validar vehículo
    # ==========================

    vehiculo = Vehiculo.query.filter_by(
        id=vehiculo_id,
        usuario_id=int(usuario_id)
    ).first()

    if not vehiculo:
        return {
            "error": "Vehículo no encontrado."
        }

    # ==========================
    # Validar fecha
    # ==========================

    fecha_reserva = datetime.strptime(
        fecha,
        "%Y-%m-%d"
    ).date()

    hoy = datetime.now().date()

    if fecha_reserva < hoy:
        return {
            "error": "No puedes reservar fechas pasadas."
        }

    if fecha_reserva > hoy + timedelta(days=7):
        return {
            "error": "Solo puedes reservar con máximo 7 días de anticipación."
        }

    # ==========================
    # Validar hora
    # ==========================

    hora_reserva = datetime.strptime(
        hora,
        "%H:%M"
    ).time()

    if hora_reserva.hour < 6 or hora_reserva.hour > 20:
        return {
            "error": "Las reservas solo están disponibles entre las 06:00 y las 20:00."
        }

    # ==========================
    # Validar reserva pendiente del usuario
    # ==========================

    reserva_existente = Reserva.query.filter_by(
        usuario_id=int(usuario_id),
        estado="Pendiente"
    ).first()

    if reserva_existente:
        return {
            "error": "Ya tienes una reserva pendiente."
        }

    # ==========================
    # Validar reserva pendiente del vehículo
    # ==========================

    vehiculo_reservado = Reserva.query.filter_by(
        vehiculo_id=vehiculo.id,
        estado="Pendiente"
    ).first()

    if vehiculo_reservado:
        return {
            "error": "Ese vehículo ya tiene una reserva pendiente."
        }

    # ==========================
    # Crear reserva
    # ==========================

    reserva = Reserva(
        usuario_id=int(usuario_id),
        vehiculo_id=vehiculo.id,
        fecha=fecha_reserva,
        hora=hora_reserva
    )

    db.session.add(reserva)
    db.session.commit()

    return {
        "mensaje": "Reserva creada correctamente."
    }


def obtener_mis_reservas(usuario_id):

    reservas = Reserva.query.filter_by(
        usuario_id=int(usuario_id)
    ).order_by(
        Reserva.fecha.desc(),
        Reserva.hora.desc()
    ).all()

    resultado = []

    for r in reservas:

        vehiculo = Vehiculo.query.get(r.vehiculo_id)

        resultado.append({
            "id": r.id,
            "placa": vehiculo.placa,
            "fecha": r.fecha.strftime("%Y-%m-%d"),
            "hora": r.hora.strftime("%H:%M"),
            "estado": r.estado
        })

    return resultado