// AperturaTurno.jsx
import { useState, useEffect } from "react";
import Nav from "../../components/VigilanteNav/VigilanteNav";
import { vigilanteService } from "../../services/vigilanteService";
import "../../css/VigilanteCSS/apertura.css";

function AperturaTurno() {
    // ── Estados ────────────────────────────────────────────────────────────
    const [nombreVigilante, setNombreVigilante] = useState("Cargando...");
    const [loading, setLoading] = useState(false);
    const [mostrarAdvertencia, setMostrarAdvertencia] = useState(false);
    
    // Campo profesional: Observaciones iniciales
    const [observaciones, setObservaciones] = useState("");
    
    // Checklist robusto y profesional (Operaciones reales de seguridad)
    const [verificaciones, setVerificaciones] = useState({
        inventario: false,  // Radio de comunicación, linternas, llaves
        novedades: false,   // Lectura de la bitácora del turno anterior
        perimetro: false,   // Cámaras operativas y portón funcional
        elementos: false    // Kit de primeros auxilios y extintor visible
    });

    const [fechaHora, setFechaHora] = useState({ fecha: "---", hora: "---" });

    // ── Cargar Datos Iniciales ─────────────────────────────────────────────
    useEffect(() => {
        const usuarioLocal = localStorage.getItem("username");
        if (usuarioLocal) {
            setNombreVigilante(usuarioLocal);
        } else {
            const token = localStorage.getItem("token");
            if (token) {
                fetch("http://localhost:5000/api/auth/perfil", {
                    headers: { "Authorization": `Bearer ${token}` }
                })
                .then(res => res.ok ? res.json() : null)
                .then(data => {
                    if (data?.usuario) {
                        const nombreReal = data.usuario.nombre || data.usuario.username || "Usuario ParkLink";
                        setNombreVigilante(nombreReal);
                        localStorage.setItem("username", nombreReal);
                    }
                })
                .catch(() => setNombreVigilante("Vigilante de Turno"));
            }
        }

        const ahora = new Date();
        setFechaHora({
            fecha: ahora.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }),
            hora: ahora.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true })
        });
    }, []);

    const manejarCheckbox = (e) => {
        const { id, checked } = e.target;
        setVerificaciones(prev => ({ ...prev, [id]: checked }));
    };

    // ── Lógica de Apertura con Envío de Datos de Control ───────────────────
    const manejarIniciarTurno = async () => {
        const { inventario, novedades, perimetro, elementos } = verificaciones;
        
        // El checklist estricto de seguridad corporativa
        if (!inventario || !novedades || !perimetro || !elementos) {
            setMostrarAdvertencia(true);
            return;
        }

        setMostrarAdvertencia(false);

        try {
            setLoading(true);
            
            // Enviamos los datos reales a la API (Checklist + Observaciones del estado del parqueadero)
            const payload = {
                verificaciones,
                observaciones: observaciones.trim()
            };
            
            const resultado = await vigilanteService.aperturaTurno(payload);
            alert(`✅ ${resultado.mensaje || "¡Turno e inspección registrados con éxito!"}`);
        } catch (error) {
            alert(`❌ Error al abrir turno: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (        
        <>
        <main className="main-content">
            <Nav />
            <section className="apertura">

                <div className="titulo-pagina">
                    <h2>🔓 Control de Apertura y Acta de Turno</h2>
                    <p>Decreto de seguridad interna: Inspeccione y valide los módulos del sistema antes de tomar control operativo.</p>
                </div>

                {mostrarAdvertencia && (
                    <div className="advertencia-banner" style={{
                        backgroundColor: '#fff3cd',
                        borderLeft: '6px solid #dc3545',
                        color: '#721c24',
                        padding: '16px',
                        marginBottom: '25px',
                        borderRadius: '6px',
                        fontWeight: '600',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                    }}>
                        🚨 <strong>Requisito del Sistema:</strong> Debe marcar todas las verificaciones operativas obligatorias para deslindar responsabilidades legales con el turno saliente.
                    </div>
                )}

                {/* 📊 KPI Rápido / Información del Puesto de Control */}
                <div className="panel-apertura" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                    <div className="tarjeta-kpi" style={{ borderLeft: '4px solid #007bff', padding: '10px', background: '#f8f9fa', borderRadius: '4px' }}>
                        <small style={{ color: '#6c757d', textTransform: 'uppercase', fontSize: '11px', fontWeight: 'bold' }}>Operador de Estación</small>
                        <h4 style={{ margin: '5px 0 0 0', fontSize: '16px' }}>{nombreVigilante}</h4>
                    </div>
                    <div className="tarjeta-kpi" style={{ borderLeft: '4px solid #28a745', padding: '10px', background: '#f8f9fa', borderRadius: '4px' }}>
                        <small style={{ color: '#6c757d', textTransform: 'uppercase', fontSize: '11px', fontWeight: 'bold' }}>Fecha Fiscal</small>
                        <h4 style={{ margin: '5px 0 0 0', fontSize: '16px' }}>{fechaHora.fecha}</h4>
                    </div>
                    <div className="tarjeta-kpi" style={{ borderLeft: '4px solid #ffc107', padding: '10px', background: '#f8f9fa', borderRadius: '4px' }}>
                        <small style={{ color: '#6c757d', textTransform: 'uppercase', fontSize: '11px', fontWeight: 'bold' }}>Timbre de Entrada</small>
                        <h4 style={{ margin: '5px 0 0 0', fontSize: '16px' }}>{fechaHora.hora}</h4>
                    </div>
                </div>

                {/* 🛠 Checklist Profesional de Seguridad */}
                <div className="panel-apertura">
                    <h3>✅ Protocolo de Inspección Física Obligatoria</h3>
                    <p style={{ fontSize: '13px', color: '#6c757d', marginTop: '-10px', marginBottom: '20px' }}>Al marcar estas opciones, certifica el estado del parqueadero bajo protocolo de seguridad empresarial.</p>

                    <div className="check" style={{ marginBottom: '12px' }}>
                        <input type="checkbox" id="inventario" checked={verificaciones.inventario} onChange={manejarCheckbox} />
                        <label htmlFor="inventario"><strong>Inventario de Equipos:</strong> Recibo radios, llaves maestras y equipo de cómputo en perfecto estado.</label>
                    </div>

                    <div className="check" style={{ marginBottom: '12px' }}>
                        <input type="checkbox" id="novedades" checked={verificaciones.novedades} onChange={manejarCheckbox} />
                        <label htmlFor="novedades"><strong>Lectura de Bitácora:</strong> He leído las novedades previas y consignas especiales del supervisor.</label>
                    </div>

                    <div className="check" style={{ marginBottom: '12px' }}>
                        <input type="checkbox" id="perimetro" checked={verificaciones.perimetro} onChange={manejarCheckbox} />
                        <label htmlFor="perimetro"><strong>Inspección Perimetral:</strong> Cámaras de seguridad de accesos y barreras automatizadas operando al 100%.</label>
                    </div>

                    <div className="check" style={{ marginBottom: '12px' }}>
                        <input type="checkbox" id="elementos" checked={verificaciones.elementos} onChange={manejarCheckbox} />
                        <label htmlFor="elementos"><strong>Seguridad Industrial:</strong> Extintores vigentes ubicados y rutas de evacuación libres de obstáculos.</label>
                    </div>
                </div>

                {/* 📝 Cuadro de novedades iniciales */}
                <div className="panel-apertura">
                    <h3>📝 Observaciones de Entrega / Estado Inicial</h3>
                    <div style={{ marginTop: '10px' }}>
                        <textarea 
                            value={observaciones}
                            onChange={(e) => setObservaciones(e.target.value)}
                            placeholder="Ej. Se recibe el turno con la talanquera izquierda en mantenimiento o novedades de iluminación en la zona B... (Opcional)"
                            style={{
                                width: '100%',
                                minHeight: '90px',
                                padding: '12px',
                                borderRadius: '6px',
                                border: '1px solid #ced4da',
                                fontFamily: 'inherit',
                                fontSize: '14px',
                                resize: 'vertical'
                            }}
                        />
                    </div>
                </div>

                <div className="acciones" style={{ marginTop: '20px' }}>
                    <button 
                        className="btn-apertura" 
                        onClick={manejarIniciarTurno}
                        disabled={loading}
                        style={{ width: '100%', padding: '14px', fontSize: '16px', fontWeight: 'bold' }}
                    >
                        {loading ? "🔄 Autenticando e Iniciando Jornada..." : "🔓 Certificar e Iniciar Turno"}
                    </button>
                </div>

            </section>
        </main>
        </>
    );
}

export default AperturaTurno;