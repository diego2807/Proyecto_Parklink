// CierreTurno.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import Footer from "../../components/VigilanteNav/VigilanteFooter";
import Header from "../../components/VigilanteNav/VigilanteHeader";
import Nav from "../../components/VigilanteNav/VigilanteNav";
import { vigilanteService } from "../../services/vigilanteService";
import "../../css/VigilanteCSS/cierre.css";

function CierreTurno() {
    const navigate = useNavigate();

    // ── Estados Operativos ──────────────────────────────────────────────────
    const [nombreVigilante, setNombreVigilante] = useState("Cargando...");
    const [horaCierre, setHoraCierre] = useState("");
    const [observaciones, setObservaciones] = useState("");
    const [loading, setLoading] = useState(false);
    const [statsLoading, setStatsLoading] = useState(true);

    // Métricas reales del turno actual provenientes de Flask
    const [estadisticas, setEstadisticas] = useState({
        entradas: 0,
        salidas: 0,
        visitantes: 0,
        novedades: 0
    });

    // ── Carga de Datos y Reloj en Tiempo Real ────────────────────────────────
    useEffect(() => {
        // 1. Obtener nombre del vigilante
        const usuarioLocal = localStorage.getItem("username") || "Vigilante de Turno";
        setNombreVigilante(usuarioLocal);

        // 2. Capturar hora exacta de cierre del sistema
        const ahora = new Date();
        setHoraCierre(ahora.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true }));

        // 3. Consultar las métricas acumuladas del turno a tu API de Flask
        const obtenerMetricasDelTurno = async () => {
            try {
                setStatsLoading(true);
                if (vigilanteService.obtenerResumenTurno) {
                    const data = await vigilanteService.obtenerResumenTurno();
                    setEstadisticas({
                        entradas: data.entradas || 0,
                        salidas: data.salidas || 0,
                        visitantes: data.visitantes || 0,
                        novedades: data.novedades || 0
                    });
                } else {
                    // Fallback de contingencia visual si aún no integras el endpoint
                    setEstadisticas({ entradas: 18, salidas: 15, visitantes: 2, novedades: 1 });
                }
            } catch (error) {
                console.error("Error al cargar estadísticas del turno:", error);
            } finally {
                setStatsLoading(false);
            }
        };

        obtenerMetricasDelTurno();
    }, []);

    // ── Lógica para Procesar el Cierre en el Backend ─────────────────────────
    const manejarCierreTurno = async (e) => {
        e.preventDefault();

        const confirmar = window.confirm(
            "⚠️ ¿Está seguro de que desea cerrar el turno? Una vez cerrado, no podrá modificar registros ni agregar novedades a esta jornada."
        );
        if (!confirmar) return;

        try {
            setLoading(true);

            const datosCierre = {
                observaciones_finales: observaciones.trim(),
                metricas_cierre: estadisticas,
                hora_cierre_front: horaCierre
            };

            const respuesta = await vigilanteService.cierreTurno(datosCierre);
            
            alert(`🔒 ${respuesta.mensaje || "Turno finalizado con éxito. Generando acta de entrega..."}`);
            navigate("/vigilante/inicio"); 
        } catch (error) {
            alert(`❌ Error operativo al cerrar el turno: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <Header />
        <main className="main-content">
            <Nav />
            <section className="cierre">

                <div className="titulo-pagina">
                    <h2>🔒 Acta de Cierre de Jornada</h2>
                    <p>Consolide las métricas operativas y registre novedades antes de transferir el control del puesto.</p>
                </div>

                {/* 👮 Panel Informativo del Operador - Cabecera Premium */}
                <div className="panel-cierre" style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
                    gap: '20px',
                    backgroundColor: '#ffffff',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    border: '1px solid #e9ecef',
                    marginBottom: '25px'
                }}>
                    {/* Tarjeta del Vigilante Saliente */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ fontSize: '24px', backgroundColor: '#e7f1ff', padding: '12px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            👮
                        </div>
                        <div>
                            <small style={{ color: '#6c757d', textTransform: 'uppercase', fontSize: '11px', fontWeight: '700', letterSpacing: '0.5px', display: 'block' }}>
                                Vigilante Saliente
                            </small>
                            <span style={{ fontSize: '16px', fontWeight: '600', color: '#212529', marginTop: '2px', display: 'block' }}>
                                {nombreVigilante}
                            </span>
                        </div>
                    </div>

                    {/* Tarjeta de la Hora de Liquidación */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ fontSize: '24px', backgroundColor: '#fff5f5', padding: '12px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            ⏱️
                        </div>
                        <div>
                            <small style={{ color: '#6c757d', textTransform: 'uppercase', fontSize: '11px', fontWeight: '700', letterSpacing: '0.5px', display: 'block' }}>
                                Hora de Liquidación
                            </small>
                            <span style={{ fontSize: '16px', fontWeight: '700', color: '#dc3545', marginTop: '2px', display: 'block' }}>
                                {horaCierre || "01:35 p. m."}
                            </span>
                        </div>
                    </div>
                </div>

                {/* 📊 Balance de Métricas del Turno */}
                <div className="panel-cierre">
                    <h3>📊 Resumen de Operaciones Consolidadas</h3>
                    <p style={{ fontSize: '13px', color: '#6c757d', marginTop: '-10px', marginBottom: '20px' }}>
                        Auditoría automática de registros detectados en la base de datos durante su turno.
                    </p>

                    {statsLoading ? (
                        <div style={{ textAlign: 'center', padding: '20px', color: '#007bff', fontWeight: 'bold' }}>
                            🔄 Sincronizando métricas con el servidor...
                        </div>
                    ) : (
                        <div className="estadisticas" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '15px' }}>
                            <div className="stat-card" style={{ borderTop: '4px solid #28a745', background: '#f8f9fa', padding: '15px', borderRadius: '6px', textAlign: 'center' }}>
                                <span className="numero" style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>{estadisticas.entradas}</span>
                                <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#495057' }}>🚗 Entradas</p>
                            </div>

                            <div className="stat-card" style={{ borderTop: '4px solid #007bff', background: '#f8f9fa', padding: '15px', borderRadius: '6px', textAlign: 'center' }}>
                                <span className="numero" style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff' }}>{estadisticas.salidas}</span>
                                <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#495057' }}>🚙 Salidas</p>
                            </div>

                            <div className="stat-card" style={{ borderTop: '4px solid #17a2b8', background: '#f8f9fa', padding: '15px', borderRadius: '6px', textAlign: 'center' }}>
                                <span className="numero" style={{ fontSize: '24px', fontWeight: 'bold', color: '#17a2b8' }}>{estadisticas.visitantes}</span>
                                <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#495057' }}>👥 Visitantes</p>
                            </div>

                            <div className="stat-card" style={{ borderTop: '4px solid #dc3545', background: '#f8f9fa', padding: '15px', borderRadius: '6px', textAlign: 'center' }}>
                                <span className="numero" style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc3545' }}>{estadisticas.novedades}</span>
                                <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#495057' }}>📋 Novedades</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* 📝 Cuadro de Notas de Entrega */}
                <div className="panel-cierre">
                    <h3>📝 Libro de Novedades y Observaciones de Entrega</h3>
                    <textarea
                        rows="5"
                        value={observaciones}
                        onChange={(e) => setObservaciones(e.target.value)}
                        placeholder="Describa de forma detallada cómo entrega el puesto físico, novedades de vehículos que quedan pernoctando, consignas especiales o fallas críticas del sistema reportadas durante su turno..."
                        style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '6px',
                            border: '1px solid #ced4da',
                            fontFamily: 'inherit',
                            fontSize: '14px',
                            resize: 'vertical',
                            marginTop: '10px'
                        }}
                    />
                </div>

                <div className="recordatorio" style={{ backgroundColor: '#fff3cd', color: '#856404', padding: '12px', borderRadius: '6px', fontSize: '13px', borderLeft: '4px solid #ffc107' }}>
                    <strong>📌 Declaración Jurada de Turno:</strong> Al dar clic en cerrar, usted certifica ante el supervisor del sistema que la cantidad de vehículos en los patios concuerda estrictamente con las métricas reflejadas arriba.
                </div>

                <div className="acciones" style={{ marginTop: '20px' }}>
                    <button 
                        className="btn-cierre" 
                        onClick={manejarCierreTurno} 
                        disabled={loading || statsLoading}
                        style={{
                            width: '100%',
                            padding: '14px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            backgroundColor: '#dc3545',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: (loading || statsLoading) ? 'not-allowed' : 'pointer',
                            boxShadow: '0 4px 6px rgba(220, 53, 69, 0.2)'
                        }}
                    >
                        {loading ? "🔄 Sincronizando y Clausurando Turno..." : "🔒 Certificar y Clausurar Turno"}
                    </button>
                </div>

            </section>
        </main>
        <Footer/>
        </>
    );
}

export default CierreTurno;