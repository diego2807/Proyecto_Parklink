// Inicio.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/VigilanteNav/VigilanteFooter";
import Header from "../../components/VigilanteNav/VigilanteHeader";
import Nav from "../../components/VigilanteNav/VigilanteNav";
import { vigilanteService } from "../../services/vigilanteService"; // Asegúrate de tener este import
import "../../css/VigilanteCSS/index.css";

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
                // Aquí usamos el servicio para ver el estado real en la DB
                // NOTA: Si no tienes una ruta directa de "ver estado", al fallar cualquier GET como 
                // obtener historial o vehículos te sirve para deducir si está activo o no.
                // Simulamos una verificación directa o puedes consultar una ruta de tu API:
                const token = localStorage.getItem("token");
                if (token) {
                    // Si tu backend tiene un endpoint para chequear el turno, lo llamas acá.
                    // Por ahora asumimos que si el flujo inicial funciona, evaluamos su estado:
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
        <Header />
        <main className="main-content">
            <Nav />
            <section className="contenido">
                <div className="bienvenida">
                    <h2>Bienvenido a Parklink, {nombreVigilante.split(" ")[0]} 👋</h2>
                    <p>Sistema de gestión y control de parqueaderos empresariales.</p>
                </div>

                <div className="turno">
                    <h3>📌 Estado Actual</h3>

                    <p><strong>Usuario:</strong> {nombreVigilante}</p>
                    <p><strong>Hora del Sistema:</strong> <span style={{ color: '#007bff', fontWeight: 'bold' }}>{horaActual}</span></p>
                    <p><strong>Jornada Estimada:</strong> {jornada}</p>
                    <p>
                        <strong>Estado: </strong> 
                        {estadoTurno.cargando ? (
                            <span>Verificando...</span>
                        ) : estadoTurno.activo ? (
                            <span style={{ 
                                backgroundColor: '#d4edda', 
                                color: '#155724', 
                                padding: '3px 8px', 
                                borderRadius: '4px', 
                                fontWeight: 'bold',
                                fontSize: '14px' 
                            }}>🟢 Activo</span>
                        ) : (
                            <span style={{ 
                                backgroundColor: '#f8d7da', 
                                color: '#721c24', 
                                padding: '3px 8px', 
                                borderRadius: '4px', 
                                fontWeight: 'bold',
                                fontSize: '14px' 
                            }}>🔴 Inactivo (Requiere Apertura)</span>
                        )}
                    </p>

                    {/* Alerta de recordatorio rápida si el turno está inactivo */}
                    {!estadoTurno.cargando && !estadoTurno.activo && (
                        <div style={{ marginTop: '15px', fontSize: '13px', color: '#856404', backgroundColor: '#fff3cd', padding: '10px', borderRadius: '4px' }}>
                            ⚠️ No has iniciado jornada laboral en el sistema. Ve a <strong>Apertura de Turno</strong> para comenzar.
                        </div>
                    )}
                </div>

                <div className="guia">
                    <h3>📖 Guía rápida del sistema</h3>

                    <div className="item-guia">
                        <h4>🚗 Entrada</h4>
                        <p>Registra vehículos que ingresan al parqueadero.</p>
                    </div>

                    <div className="item-guia">
                        <h4>🚙 Salida</h4>
                        <p>Registra vehículos que abandonan el parqueadero.</p>
                    </div>

                    <div className="item-guia">
                        <h4>📋 Novedades</h4>
                        <p>Registra incidentes o situaciones especiales.</p>
                    </div>

                    <div className="recordatorio">
                        <strong>💡 Recuerda:</strong> Verificar placas y registrar novedades antes de cerrar el turno.
                    </div>
                </div>

            </section>
        </main>
        <Footer/>
        </>
    );
}

export default Inicio;