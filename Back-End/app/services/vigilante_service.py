from datetime import datetime


from app.database.database import db
from app.models.turno import Turno
from app.models.vehiculo import Vehiculo
from app.models.celda import Celda
from app.models.acceso import Acceso


def abrir_turno(usuario_id):

    turno_activo = Turno.query.filter_by(
        usuario_id=int(usuario_id),
        estado="Activo"
    ).first()

    if turno_activo:
        return "Ya existe un turno activo"

    nuevo_turno = Turno(
        usuario_id=int(usuario_id),
        jornada="Mañana"
    )

    db.session.add(nuevo_turno)
    db.session.commit()

    return "Turno abierto correctamente"


def listar_turnos():

    turnos = Turno.query.all()

    return [
        {
            "id": turno.id,
            "usuario_id": turno.usuario_id,
            "jornada": turno.jornada,
            "estado": turno.estado
        }
        for turno in turnos
    ]


def cerrar_turno(usuario_id):

    turno = Turno.query.filter_by(
        usuario_id=int(usuario_id),
        estado="Activo"
    ).first()

    if not turno:
        return None

    turno.estado = "Cerrado"
    turno.fecha_cierre = datetime.utcnow()

    db.session.commit()

    return "Turno cerrado correctamente"


def registrar_entrada(usuario_id, placa):

    vehiculo = Vehiculo.query.filter_by(
        placa=placa
    ).first()

    if not vehiculo:
        return {"error": "Vehículo no encontrado"}

    turno = Turno.query.filter_by(
        usuario_id=int(usuario_id),
        estado="Activo"
    ).first()

    if not turno:
        return {"error": "No existe un turno activo"}

    celda = Celda.query.filter_by(
        ocupada=False
    ).first()

    if not celda:
        return {"error": "No hay celdas disponibles"}

    nuevo_acceso = Acceso(
        placa=vehiculo.placa,
        vehiculo_id=vehiculo.id,
        tipo_movimiento="Entrada",
        tipo_vehiculo=vehiculo.tipo_vehiculo,
        tipo_usuario="Funcionario",
        celda_id=celda.id,
        celda_asignada=celda.codigo_celda,
        turno_id=turno.id
    )

    celda.ocupada = True

    turno.total_entradas += 1

    db.session.add(nuevo_acceso)
    db.session.commit()

    return {
        "mensaje": "Entrada registrada correctamente",
        "celda": celda.codigo_celda
    }

def registrar_salida(usuario_id, placa):

    vehiculo = Vehiculo.query.filter_by(
        placa=placa
    ).first()

    if not vehiculo:
        return {"error": "Vehículo no encontrado"}

    turno = Turno.query.filter_by(
        usuario_id=int(usuario_id),
        estado="Activo"
    ).first()

    if not turno:
        return {"error": "No existe un turno activo"}

    ultimo_ingreso = Acceso.query.filter_by(
        vehiculo_id=vehiculo.id,
        tipo_movimiento="Entrada"
    ).order_by(
        Acceso.fecha_hora.desc()
    ).first()

    if not ultimo_ingreso:
        return {"error": "No existe un ingreso registrado"}

    celda = Celda.query.get(ultimo_ingreso.celda_id)

    if celda:
        celda.ocupada = False

    nueva_salida = Acceso(
        placa=vehiculo.placa,
        vehiculo_id=vehiculo.id,
        tipo_movimiento="Salida",
        tipo_vehiculo=vehiculo.tipo_vehiculo,
        tipo_usuario="Funcionario",
        celda_id=ultimo_ingreso.celda_id,
        celda_asignada=ultimo_ingreso.celda_asignada,
        turno_id=turno.id
    )

    turno.total_salidas += 1

    db.session.add(nueva_salida)
    db.session.commit()

    return {
        "mensaje": "Salida registrada correctamente",
        "celda_liberada": ultimo_ingreso.celda_asignada
    }