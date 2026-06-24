// src/components/admin/Alertas.jsx
import { useState, useEffect } from 'react';
import Nav from '../../components/AdminNav/Nav';
import { apiService } from '../../services/api_admin'; 
import '../../css/AdminCSS/Alertas.css';

function Alertas() {
    // 1. Estados para el feed de alertas automatizadas
    const [alertas, setAlertas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [mensajeExito, setMensajeExito] = useState("");

    // 2. Estados para el formulario de redacción de novedades
    const [titulo, setTitulo] = useState("");
    const [severidad, setSeveridad] = useState("informativo");
    const [contenido, setContenido] = useState("");
    const [guardando, setGuardando] = useState(false);

    // 3. Cargador asíncrono blindado para la bitácora
    const cargarAlertasSistema = async () => {
        try {
            setCargando(true);
            setError("");
            const datos = await apiService.getAlertas();
            
            if (datos && Array.isArray(datos)) {
                setAlertas(datos);
            } else if (datos && datos.error) {
                setError(datos.error);
            } else {
                setAlertas([]);
            }
        } catch (err) {
            console.error("Error al sincronizar bitácora de alertas:", err);
            setError(err.message || "No se pudo sincronizar el servidor de eventos corporativos.");
        } finally {
            setCargando(false);
        }
    };

    // 4. Hook de ciclo de vida con bandera de protección (Sintaxis limpia para el linter)
    useEffect(() => {
        let activo = true;

        const sincronizarAlertas = async () => {
            if (activo) {
                await cargarAlertasSistema();
            }
        };

        sincronizarAlertas();

        return () => {
            activo = false;
        };
    }, []);

    // 5. Manejador para descartar/eliminar alertas de portería (DELETE)
    const handleDescartarAlerta = async (id) => {
        try {
            setError("");
            setMensajeExito("");
            const respuesta = await apiService.eliminarAlerta(id);
            setMensajeExito(respuesta.message || "Alerta removida con éxito.");
            await cargarAlertasSistema(); // Refrescar el feed
        } catch (err) {
            setError(err.message || "No se pudo descartar la alerta seleccionada.");
        }
    };

    // 6. Manejador para enviar el formulario y publicar un comunicado (POST)
    // Usaremos un endpoint dinámico aprovechando el modelo que ya creaste en el backend
    const handlePublicarComunicado = async (e) => {
        e.preventDefault();
        setError("");
        setMensajeExito("");

        if (!titulo.trim() || !contenido.trim()) {
            setError("El título y el contenido son campos obligatorios.");
            return;
        }

        const payload = {
            titulo: titulo.trim(),
            severidad: severidad,
            contenido: contenido.trim()
        };

        try {
            setGuardando(true);
            
            // Reutilizamos el fetch dinámico mapeado a la misma ruta POST /admin/alertas en Flask
            const respuesta = await fetch(`http://127.0.0.1:5000/api/admin/alertas`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(payload)
            });

            const resultado = await respuesta.json();

            if (!respuesta.ok) {
                throw new Error(resultado.error || "No se pudo publicar la novedad.");
            }

            setMensajeExito(resultado.message || "¡Comunicado emitido y publicado con éxito!");
            setTitulo("");
            setContenido("");
            setSeveridad("informativo");

            // Recargar el feed para ver la alerta publicada arriba de inmediato
            await cargarAlertasSistema();
        } catch (err) {
            setError(err.message || "Error interno al propagar el comunicado.");
        } finally {
            setGuardando(false);
        }
    };

    // Retorna el emoji correspondiente según la severidad del modelo alertas.py
    const obtenerIconoSeveridad = (sev) => {
        if (sev === "urgente") return "🚨";
        if (sev === "advertencia") return "⚠️";
        return "ℹ️";
    };

    return (
        <>
            <Nav />
            <main className="main-content">
                <header className="content-header">
                    <div className="header-title">
                        <span className="page-badge badge-alert">Centro de Control</span>
                        <h1>9. Centro de Alertas y Notificaciones</h1>
                        <p className="page-description">Monitoreo de excepciones de permanencia, bloqueos preventivos y difusión de avisos al personal corporativo.</p>
                    </div>
                </header>

                {/* Mensajes Flotantes de Feedback */}
                {error && <div className="alert-message error-box" style={{ padding: '12px', marginBottom: '15px', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '6px', fontWeight: '500' }}>⚠️ {error}</div>}
                {mensajeExito && <div className="alert-message success-box" style={{ padding: '12px', marginBottom: '15px', backgroundColor: '#dcfce7', color: '#166534', borderRadius: '6px', fontWeight: '500' }}>✅ {mensajeExito}</div>}

                <div className="alerts-grid">

                    {/* SECCIÓN IZQUIERDA: FEED EN TIEMPO REAL */}
                    <section className="alerts-card">
                        <h2>Alertas de Seguridad en Tiempo Real</h2>
                        <p className="section-desc">Excepciones críticas detectadas de forma automatizada en los puntos de acceso y celdas.</p>

                        <div className="alerts-feed" id="feed-alertas-automatizadas">
                            {cargando ? (
                                <div className="alert-loading-placeholder" style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>
                                    <p>🔄 Sincronizando con el servidor de eventos corporativos...</p>
                                </div>
                            ) : alertas.length === 0 ? (
                                <div style={{ padding: '30px', textAlign: 'center', color: '#64748b', fontSize: '0.9rem', backgroundColor: '#f8fafc', borderRadius: '6px' }}>
                                    No se registran alertas ni novedades pendientes en el sistema.
                                </div>
                            ) : (
                                alertas.map((item) => (
                                    <div 
                                        key={item.id} 
                                        className={`alert-item priority-${item.severidad}`}
                                        style={{
                                            display: 'flex',
                                            gap: '15px',
                                            padding: '15px',
                                            borderRadius: '8px',
                                            marginBottom: '12px',
                                            borderLeft: item.severidad === 'urgente' ? '5px solid #ef4444' : item.severidad === 'advertencia' ? '5px solid #f59e0b' : '5px solid #3b82f6',
                                            backgroundColor: item.severidad === 'urgente' ? '#fef2f2' : item.severidad === 'advertencia' ? '#fffbeb' : '#eff6ff'
                                        }}
                                    >
                                        <div className="alert-status-icon" style={{ fontSize: '1.5rem' }}>
                                            {obtenerIconoSeveridad(item.severidad)}
                                        </div>
                                        <div className="alert-details" style={{ flex: 1 }}>
                                            <div className="alert-meta" style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '4px' }}>
                                                <span className="alert-tag" style={{ fontWeight: 'bold', fontSize: '0.85rem', color: '#1e293b', textTransform: 'capitalize' }}>
                                                    {item.titulo}
                                                </span>
                                                <span className="alert-time" style={{ fontSize: '0.75rem', color: '#64748b', marginLeft: 'auto' }}>
                                                    ⏱️ {item.fecha_publicacion}
                                                </span>
                                            </div>
                                            <p className="alert-message" style={{ fontSize: '0.9rem', color: '#334155', margin: '0 0 10px 0', lineHeight: '1.4' }}>
                                                {item.contenido}
                                            </p>
                                            <button
                                                onClick={() => handleDescartarAlerta(item.id)}
                                                style={{
                                                    padding: '4px 10px',
                                                    fontSize: '0.75rem',
                                                    backgroundColor: '#fff',
                                                    border: '1px solid #cbd5e1',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                    color: '#475569',
                                                    fontWeight: '600'
                                                }}
                                            >
                                                ✓ Marcar como revisada
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>

                    {/* SECCIÓN DERECHA: FORMULARIO POST */}
                    <section className="alerts-card">
                        <h2>Redactar Novedad o Comunicado</h2>
                        <p className="section-desc">Publica avisos o restricciones temporales para que sean visibles en el módulo informativo de los funcionarios.</p>

                        <form id="form-publicar-novedad" className="alerts-form" onSubmit={handlePublicarComunicado}>
                            <div className="input-field">
                                <label htmlFor="inputTituloAviso" className="field-label">Título del Comunicado:</label>
                                <input 
                                    type="text" 
                                    id="inputTituloAviso" 
                                    className="field-input" 
                                    placeholder="Ej: Mantenimiento preventivo celdas del bloque B" 
                                    value={titulo}
                                    onChange={(e) => setTitulo(e.target.value)}
                                    required 
                                />
                            </div>

                            <div className="input-field">
                                <label htmlFor="selectSeveridadAviso" className="field-label">Nivel de Importancia:</label>
                                <select 
                                    id="selectSeveridadAviso" 
                                    className="field-select"
                                    value={severidad}
                                    onChange={(e) => setSeveridad(e.target.value)}
                                    style={{ backgroundColor: '#fff' }}
                                >
                                    <option value="informativo">Informativo (General)</option>
                                    <option value="advertencia">Advertencia (Restricción Temporal)</option>
                                    <option value="urgente">Urgente (Cierre de Áreas)</option>
                                </select>
                            </div>

                            <div className="input-field">
                                <label htmlFor="textareaCuerpoAviso" className="field-label">Contenido de la Notificación:</label>
                                <textarea 
                                    id="textareaCuerpoAviso" 
                                    className="field-textarea" 
                                    rows="5" 
                                    placeholder="Describe los detalles de la novedad claramente para el personal..." 
                                    value={contenido}
                                    onChange={(e) => setContenido(e.target.value)}
                                    required 
                                ></textarea>
                            </div>

                            <button type="submit" className="btn-alerts-submit" disabled={guardando}>
                                {guardando ? "Transmitiendo..." : "Emitir y Publicar Notificación"}
                            </button>
                        </form>
                    </section>

                </div>
            </main>
        </>
    );
}

export default Alertas;