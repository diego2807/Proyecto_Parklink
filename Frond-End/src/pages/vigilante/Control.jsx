import { useEffect, useState } from "react";
import Nav from "../../components/VigilanteNav/VigilanteNav";

import { vigilanteService } from "../../services/vigilanteService";

import "../../css/VigilanteCSS/control.css";

function Control() {

    const [resumen, setResumen] = useState({
        entradas: 0,
        salidas: 0,
        vehiculos_activos: 0,
        celdas_ocupadas: 0,
        celdas_libres: 0,
        total_celdas: 0
    });

    const [historial, setHistorial] = useState([]);

    const [cargando, setCargando] = useState(true);

    const [horaActual, setHoraActual] = useState("");

    useEffect(() => {

        cargarDashboard();

        const reloj = setInterval(() => {

            const ahora = new Date();

            setHoraActual(
                ahora.toLocaleString("es-CO",{
                    dateStyle:"long",
                    timeStyle:"medium"
                })
            );

        },1000);

        return ()=>clearInterval(reloj);

    },[]);

    const cargarDashboard = async () => {

        try {

            const resumenData =
                await vigilanteService.obtenerResumenTurno();

            const historialData =
                await vigilanteService.obtenerHistorialTurno();

            setResumen(resumenData);

            setHistorial(historialData);

        } catch (error) {

            alert(error.message);

        } finally {

            setCargando(false);

        }

    };

    return (

        <>

            <main>

                <Nav />

                <section className="dash-content">

                    <div className="dash-page">
                        <div className="dash-header">

                            <div>

                                <h2>📊 Panel Operativo</h2>

                                <p className="dash-subtitle">

                                    Resumen en tiempo real del turno activo

                                </p>

                            </div>

                            <div className="dash-actions">

                                <span className="dash-time">

                                    🕒 {horaActual}

                                </span>

                                <button
                                    className="btn-action-in"
                                    onClick={cargarDashboard}
                                >

                                    🔄 Actualizar

                                </button>

                            </div>

                        </div>

                        {
                            cargando
                                ? <p>Cargando información...</p>
                                :
                                <>

                                    <section className="metrics-grid">

                                        <div className="panel-card resumen-turno">

                                            <div className="panel-card-header">
                                                <h3>📈 Estado General del Turno</h3>
                                            </div>

                                            <div className="estado-grid">

                                                <div>
                                                    <span>Vehículos activos</span>
                                                    <strong>{resumen.vehiculos_activos}</strong>
                                                </div>

                                                <div>
                                                    <span>Entradas</span>
                                                    <strong>{resumen.entradas}</strong>
                                                </div>

                                                <div>
                                                    <span>Salidas</span>
                                                    <strong>{resumen.salidas}</strong>
                                                </div>

                                                <div>
                                                    <span>Disponibilidad</span>
                                                    <strong>{resumen.celdas_libres}</strong>
                                                </div>

                                            </div>

                                        </div>

                                        <div className="metric-card">

                                            <div className="metric-icon blue">
                                                🚗
                                            </div>

                                            <div className="metric-data">
                                                <div className="num">{resumen.entradas}</div>
                                                <div className="lbl">Entradas</div>
                                            </div>

                                        </div>

                                        <div className="metric-card">

                                            <div className="metric-icon orange">
                                                🚙
                                            </div>

                                            <div className="metric-data">
                                                <div className="num">{resumen.salidas}</div>
                                                <div className="lbl">Salidas</div>
                                            </div>

                                        </div>

                                        <div className="metric-card">

                                            <div className="metric-icon green">
                                                🅿️
                                            </div>

                                            <div className="metric-data">
                                                <div className="num">{resumen.vehiculos_activos}</div>
                                                <div className="lbl">Vehículos Activos</div>
                                            </div>

                                        </div>

                                        <div className="metric-card">

                                            <div className="metric-icon blue">
                                                📍
                                            </div>

                                            <div className="metric-data">
                                                <div className="num">{resumen.celdas_ocupadas}</div>
                                                <div className="lbl">Celdas Ocupadas</div>
                                            </div>

                                        </div>

                                        <div className="metric-card">

                                            <div className="metric-icon green">
                                                ✅
                                            </div>

                                            <div className="metric-data">
                                                <div className="num">{resumen.celdas_libres}</div>
                                                <div className="lbl">Celdas Libres</div>
                                            </div>

                                        </div>

                                        <div className="metric-card">

                                            <div className="metric-icon orange">
                                                🏢
                                            </div>

                                            <div className="metric-data">
                                                <div className="num">{resumen.total_celdas}</div>
                                                <div className="lbl">Total Celdas</div>
                                            </div>

                                        </div>

                                        <div className="metric-card">

                                            <div className="metric-icon purple">
                                                👤
                                            </div>

                                            <div className="metric-data">
                                                <div className="num">{resumen.visitantes}</div>
                                                <div className="lbl">Visitantes</div>
                                            </div>

                                        </div>

                                        <div className="metric-card">

                                            <div className="metric-icon yellow">
                                                ⚠️
                                            </div>

                                            <div className="metric-data">
                                                <div className="num">{resumen.novedades}</div>
                                                <div className="lbl">Novedades</div>
                                            </div>

                                        </div>

                                    </section>
                                    <div className="dash-grid-two">

                        <article className="panel-card">

                            <div className="panel-card-header">

                                <h3>📋 Bitácora del Turno</h3>

                            </div>

                            <div
                                className="panel-card-body"
                                style={{ padding: 0 }}
                            >

                                <div className="table-responsive">

                                    <table className="modern-table">

                                        <thead>

                                            <tr>
                                                <th>Hora</th>
                                                <th>Movimiento</th>
                                                <th>Placa</th>
                                                <th>Celda</th>
                                            </tr>

                                        </thead>

                                        <tbody>

                                            {
                                                historial.length === 0 ?

                                                    (
                                                        <tr>

                                                            <td
                                                                colSpan="4"
                                                                style={{
                                                                    textAlign: "center",
                                                                    padding: "20px"
                                                                }}
                                                            >
                                                                No hay movimientos registrados.
                                                            </td>

                                                        </tr>
                                                    )

                                                    :

                                                    historial.map((item) => (

                                                        <tr key={item.id}>

                                                            <td>
                                                                {
                                                                    item.fecha_hora
                                                                }
                                                            </td>

                                                            <td>

                                                                {
                                                                    item.movimiento === "Entrada"

                                                                        ?

                                                                        <span
                                                                            className="badge directivo"
                                                                        >
                                                                            Entrada
                                                                        </span>

                                                                        :

                                                                        <span
                                                                            className="badge invitado"
                                                                        >
                                                                            Salida
                                                                        </span>
                                                                }

                                                            </td>

                                                            <td>
                                                                {item.placa}
                                                            </td>

                                                            <td>
                                                                {item.celda}
                                                            </td>

                                                        </tr>

                                                    ))

                                            }

                                        </tbody>

                                    </table>

                                </div>

                            </div>

                        </article>

                    </div>

                </>
            }

        </div>

    </section>

</main>

</>

);

}

export default Control;