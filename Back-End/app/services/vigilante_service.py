from datetime import datetime


from app.database.database import db
from app.models.turno import Turno
from app.models.vehiculo import Vehiculo
from app.models.celda import Celda
from app.models.acceso import Acceso
from app.models.visitante import Visitante
from app.models.novedad import Novedad

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


def historial_turno(usuario_id):

    turno = Turno.query.filter_by(
        usuario_id=int(usuario_id),
        estado="Activo"
    ).first()

    if not turno:
        return {"error": "No existe un turno activo"}

    accesos = Acceso.query.filter_by(
        turno_id=turno.id
    ).order_by(
        Acceso.fecha_hora.desc()
    ).all()

    return [
        {
            "id": acceso.id,
            "placa": acceso.placa,
            "movimiento": acceso.tipo_movimiento,
            "celda": acceso.celda_asignada,
            "fecha_hora": acceso.fecha_hora.strftime("%Y-%m-%d %H:%M:%S")
        }
        for acceso in accesos
    ]

def vehiculos_activos(usuario_id):

    turno = Turno.query.filter_by(
        usuario_id=int(usuario_id),
        estado="Activo"
    ).first()

    if not turno:
        return {"error": "No existe un turno activo"}

    accesos = Acceso.query.filter_by(
        turno_id=turno.id
    ).order_by(
        Acceso.fecha_hora.desc()
    ).all()

    ultimos_por_placa = {}

    for acceso in accesos:
        placa = acceso.placa

        if placa not in ultimos_por_placa:
            ultimos_por_placa[placa] = acceso

    activos = []

    for placa, acceso in ultimos_por_placa.items():

        if acceso.tipo_movimiento == "Entrada":
            activos.append({
                "placa": placa,
                "celda": acceso.celda_asignada,
                "fecha_entrada": acceso.fecha_hora.strftime("%Y-%m-%d %H:%M:%S"),
                "tipo_vehiculo": acceso.tipo_vehiculo
            })

    return activos


def resumen_turno(usuario_id):

    turno = Turno.query.filter_by(
        usuario_id=int(usuario_id),
        estado="Activo"
    ).first()

    if not turno:
        return {"error": "No existe un turno activo"}

    # 🚗 Entradas y salidas del turno
    entradas = Acceso.query.filter_by(
        turno_id=turno.id,
        tipo_movimiento="Entrada"
    ).count()

    salidas = Acceso.query.filter_by(
        turno_id=turno.id,
        tipo_movimiento="Salida"
    ).count()

    # 🅿️ Celdas
    total_celdas = Celda.query.count()
    celdas_ocupadas = Celda.query.filter_by(ocupada=True).count()
    celdas_libres = total_celdas - celdas_ocupadas

    # 🚗 Vehículos activos (reutilizamos tu función)
    activos = vehiculos_activos(usuario_id)

    return {
        "entradas": entradas,
        "salidas": salidas,
        "vehiculos_activos": len(activos),
        "celdas_ocupadas": celdas_ocupadas,
        "celdas_libres": celdas_libres,
        "total_celdas": total_celdas
    }

def registrar_visitante(data):

    nuevo_visitante = Visitante(
        nombre_completo=data.get("nombre_completo"),
        documento=data.get("documento"),
        placa_vehiculo=data.get("placa_vehiculo"),
        area_visitada=data.get("area_visitada"),
        motivo_visita=data.get("motivo_visita")
    )

    db.session.add(nuevo_visitante)
    db.session.commit()

    return {
        "mensaje": "Visitante registrado correctamente"
    }


def listar_visitantes():

    visitantes = Visitante.query.order_by(
        Visitante.fecha_registro.desc()
    ).all()

    return [
        {
            "id": visitante.id,
            "nombre_completo": visitante.nombre_completo,
            "documento": visitante.documento,
            "placa_vehiculo": visitante.placa_vehiculo,
            "area_visitada": visitante.area_visitada,
            "motivo_visita": visitante.motivo_visita,
            "fecha_registro": visitante.fecha_registro.strftime("%Y-%m-%d %H:%M:%S")
        }
        for visitante in visitantes
    ]


def crear_novedad(usuario_id, descripcion):

    nueva_novedad = Novedad(
        descripcion=descripcion,
        usuario_id=int(usuario_id)
    )

    db.session.add(nueva_novedad)
    db.session.commit()

    return {
        "mensaje": "Novedad registrada correctamente"
    }

def listar_novedades():

    novedades = Novedad.query.order_by(
        Novedad.fecha.desc()
    ).all()

    return [
        {
            "id": novedad.id,
            "descripcion": novedad.descripcion,
            "fecha": novedad.fecha.strftime("%Y-%m-%d %H:%M:%S")
        }
        for novedad in novedades
    ]