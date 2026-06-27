// Inicio.jsx
import { useState, useEffect } from "react";
import Nav from "../../components/VigilanteNav/VigilanteNav";
import { vigilanteService } from "../../services/vigilanteService"; 
import "../../css/VigilanteCSS/principal.css";

function Inicio() {
    // ── Estados Dinámicos ─────────────────────────────────────────────────────
    const [nombreVigilante, setNombreVigilante] = useState("Cargando...");
    const [horaActual, setHoraActual] = useState("");
    const [jornada, setJornada] = useState("Mañana");
    const [estadoTurno, setEstadoTurno] = useState({ activo: false, cargando: true });

    useEffect(() => {
        // 1. Obtener el nombre del vigilante desde el localStorage
        const usuarioLocal = localStorage.getItem("username") || "Vigilante de Turno";
        setNombreVigilante(usuarioLocal);

        // 2. Reloj en tiempo real + cálculo automático de la Jornada (Turno)
        const actualizarRelojYJornada = () => {
            const ahora = new Date();
            // Formato de hora amigable (ej: 01:15 PM)
            setHoraActual(ahora.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));

            // Determinar jornada según la hora actual de la máquina
            const hora = ahora.getHours();
            if (hora >= 6 && hora < 14) {
                setJornada("Mañana");
            } else if (hora >= 14 && hora < 22) {
                setJornada("Tarde");
            } else {
                setJornada("Noche");
            }
        };

        actualizarRelojYJornada();
        const intervaloReloj = setInterval(actualizarRelojYJornada, 1000); // Actualiza cada segundo

        // 3. Consultar a Flask si el turno está verdaderamente activo
        const verificarTurnoEnBackend = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    setEstadoTurno({ activo: true, cargando: false });
                } else {
                    setEstadoTurno({ activo: false, cargando: false });
                }
            } catch (error) {
                setEstadoTurno({ activo: false, cargando: false });
            }
        };

        verificarTurnoEnBackend();

        // Limpieza del intervalo al desmontar el componente
        return () => clearInterval(intervaloReloj);
    }, []);

    return (
        <>
            <main className="inicio-main-content">
                <Nav />

                <section className="inicio-contenido">
                    <div className="inicio-bienvenida">
                        <h2>Bienvenido a Parklink, {nombreVigilante.split(" ")[0]} 👋</h2>
                        <p>Sistema de gestión y control de parqueaderos empresariales.</p>
                    </div>

                    {/* 🛠️ CONTENEDOR AGREGADO PARA EL RESPONSIVE EN ESCRITORIO */}
                    <div className="inicio-bloques-container">

                        
                        <div className="inicio-turno">
                        <div className="inicio-turno-header">
                            <h3>📌 Estado del Turno</h3>
                            {estadoTurno.cargando ? (
                                <span className="badge badge-loading">Verificando...</span>
                            ) : estadoTurno.activo ? (
                                <span className="badge badge-active"><span className="pulse-dot"></span> Activo</span>
                            ) : (
                                <span className="badge badge-inactive">🔴 Inactivo</span>
                            )}
                        </div>

                        {/* Contenedor interno para organizar los datos */}
                        <div className="inicio-turno-grid">
                            <div className="turno-grupo">
                                <span className="turno-label">Vigilante asignado</span>
                                <p className="turno-valor-principal">👤 {nombreVigilante}</p>
                            </div>

                            <div className="turno-meta-container">
                                <div className="turno-meta-item">
                                    <span className="turno-label">Hora de la máquina</span>
                                    <p className="turno-badge-info time-highlight">🕒 {horaActual}</p>
                                </div>
                                
                                <div className="turno-meta-item">
                                    <span className="turno-label">Jornada estimada</span>
                                    <p className="turno-badge-info jor-highlight">⛅ Turno {jornada}</p>
                                </div>
                            </div>
                        </div>

                        {!estadoTurno.cargando && !estadoTurno.activo && (
                            <div className="inicio-alerta-turno">
                                ⚠️ No has iniciado jornada laboral en el sistema. Ve a <strong>Apertura de Turno</strong> para comenzar.
                            </div>
                        )}
                    </div>

                        <div className="inicio-guia">
                            <h3>📖 Guía rápida del sistema</h3>

                            <div className="inicio-item-guia">
                                <h4>🚗 Entrada</h4>
                                <p>Registra vehículos que ingresan al parqueadero.</p>
                            </div>

                            <div className="inicio-item-guia">
                                <h4>🚙 Salida</h4>
                                <p>Registra vehículos que abandonan el parqueadero.</p>
                            </div>

                            <div className="inicio-item-guia">
                                <h4>📋 Novedades</h4>
                                <p>Registra incidentes o situaciones especiales.</p>
                            </div>

                            <div className="inicio-recordatorio">
                                <strong>💡 Recuerda:</strong> Verificar placas y registrar novedades antes de cerrar el turno.
                            </div>
                        </div>

                    </div> {/* /inicio-bloques-container */}
                </section>
            </main>
        </>
    );
}

export default Inicio;