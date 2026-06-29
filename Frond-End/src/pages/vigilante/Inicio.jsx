// Inicio.jsx
import { useState, useEffect } from "react";
import Nav from "../../components/VigilanteNav/VigilanteNav";
import { vigilanteService } from "../../services/vigilanteService";
import "../../css/VigilanteCSS/principal.css";

function Inicio() {

    const [nombreVigilante, setNombreVigilante] = useState("Cargando...");
    const [horaActual, setHoraActual] = useState("");
    const [fechaActual, setFechaActual] = useState("");
    const [jornada, setJornada] = useState("Mañana");

    const [estadoTurno, setEstadoTurno] = useState({
        activo: false,
        cargando: true
    });

    const [resumen, setResumen] = useState({
        entradas: 0,
        salidas: 0,
        vehiculos_activos: 0,
        celdas_ocupadas: 0,
        celdas_libres: 0,
        total_celdas: 0,
        visitantes: 0,
        novedades: 0,
        actividad: []
    });

    useEffect(() => {

        const usuarioLocal =
            localStorage.getItem("username") ||
            "Vigilante de Turno";

        setNombreVigilante(usuarioLocal);

        actualizarFechaHora();

        const intervalo = setInterval(() => {
            actualizarFechaHora();
        }, 1000);

        cargarDashboard();

        return () => clearInterval(intervalo);

    }, []);

    function actualizarFechaHora() {

        const ahora = new Date();

        setHoraActual(

            ahora.toLocaleTimeString("es-CO", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true
            })

        );

        setFechaActual(

            ahora.toLocaleDateString("es-CO", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            })

        );

        const hora = ahora.getHours();

        if (hora >= 6 && hora < 14)
            setJornada("Mañana");
        else if (hora >= 14 && hora < 22)
            setJornada("Tarde");
        else
            setJornada("Noche");

    }

    async function cargarDashboard() {

        try {

            const token = localStorage.getItem("token");

            setEstadoTurno({
                activo: !!token,
                cargando: false
            });

            const datos = await vigilanteService.obtenerResumenTurno();

            setResumen(datos);

        }

        catch {

            setEstadoTurno({
                activo: false,
                cargando: false
            });

        }

    }

    return (
        <>
            <main className="inicio-main-content">

                <Nav />

                <section className="inicio-contenido">

                    <div className="inicio-bienvenida">

                        <h2>
                            Bienvenido, {nombreVigilante.split(" ")[0]} 👋
                        </h2>

                        <p>
                            {fechaActual}
                        </p>

                    </div>

                    {/* ================= KPIs ================= */}

                    <div className="dashboard-kpis">

                        <div className="kpi-card">

                            <h4>🚗 Vehículos Activos</h4>

                            <h2>{resumen.vehiculos_activos}</h2>

                        </div>

                        <div className="kpi-card">

                            <h4>🟢 Cupos Libres</h4>

                            <h2>{resumen.celdas_libres}</h2>

                        </div>

                        <div className="kpi-card">

                            <h4>⬆ Entradas</h4>

                            <h2>{resumen.entradas}</h2>

                        </div>

                        <div className="kpi-card">

                            <h4>⬇ Salidas</h4>

                            <h2>{resumen.salidas}</h2>

                        </div>

                    </div>

                    <div className="inicio-bloques-container">

                        {/* ========================================= */}

                        <div className="inicio-turno">

                            <div className="inicio-turno-header">

                                <h3>

                                    Estado del Turno

                                </h3>

                                {

                                    estadoTurno.cargando ?

                                        <span className="badge badge-loading">

                                            Verificando...

                                        </span>

                                        :

                                        estadoTurno.activo ?

                                            <span className="badge badge-active">

                                                <span className="pulse-dot"></span>

                                                Activo

                                            </span>

                                            :

                                            <span className="badge badge-inactive">

                                                Inactivo

                                            </span>

                                }

                            </div>

                            <div className="inicio-turno-grid">

                                <div className="turno-grupo">

                                    <span className="turno-label">

                                        Vigilante

                                    </span>

                                    <p className="turno-valor-principal">

                                        👤 {nombreVigilante}

                                    </p>

                                </div>

                                <div className="turno-meta-container">

                                    <div className="turno-meta-item">

                                        <span className="turno-label">

                                            Hora

                                        </span>

                                        <p className="turno-badge-info time-highlight">

                                            🕒 {horaActual}

                                        </p>

                                    </div>

                                    <div className="turno-meta-item">

                                        <span className="turno-label">

                                            Jornada

                                        </span>

                                        <p className="turno-badge-info jor-highlight">

                                            🌤 {jornada}

                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* ========================================= */}

                        <div className="inicio-guia">

                            <h3>

                                📊 Resumen del Turno

                            </h3>

                            <div className="inicio-item-guia">

                                <h4>

                                    🚗 Vehículos Activos

                                </h4>

                                <p>

                                    {resumen.vehiculos_activos} dentro del parqueadero.

                                </p>

                            </div>

                            <div className="inicio-item-guia">

                                <h4>

                                    👥 Visitantes

                                </h4>

                                <p>

                                    {resumen.visitantes} registrados.

                                </p>

                            </div>

                            <div className="inicio-item-guia">

                                <h4>

                                    📋 Novedades

                                </h4>

                                <p>

                                    {resumen.novedades} registradas.

                                </p>

                            </div>

                            <div className="inicio-recordatorio">

                                <strong>

                                    🅿 Ocupación

                                </strong>

                                <br />

                                {resumen.celdas_ocupadas}

                                {" / "}

                                {resumen.total_celdas}

                                {" "}cupos ocupados.

                            </div>

                        </div>

                        <div className="panel-actividad">

                            <h3>

                                🕒 Actividad Reciente

                            </h3>

                            {

                                resumen.actividad.length===0 ?

                                (

                                    <p>

                                        No hay movimientos registrados.

                                    </p>

                                )

                                :

                                resumen.actividad.map((item,index)=>(

                                    <div
                                        key={index}
                                        className="actividad-item"
                                    >

                                        <div>

                                            <strong>

                                                {item.placa}

                                            </strong>

                                            <p>

                                                {item.celda}

                                            </p>

                                        </div>

                                        <div>

                                            <span
                                                className={
                                                    item.movimiento==="Entrada"
                                                    ? "badge badge-active"
                                                    : "badge badge-inactive"
                                                }
                                            >

                                                {

                                                    item.movimiento==="Entrada"

                                                    ?

                                                    "⬆ Entrada"

                                                    :

                                                    "⬇ Salida"

                                                }

                                            </span>

                                            <small>

                                                {item.hora}

                                            </small>

                                        </div>

                                    </div>

                                ))

                            }

                        </div>

                    </div>

                </section>

            </main>

        </>
    );
    }

export default Inicio;