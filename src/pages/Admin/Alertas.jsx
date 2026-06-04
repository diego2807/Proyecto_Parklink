import Nav from '../../components/AdminNav/Nav'
import '../../css/AdminCSS/Alertas.css'

function Alertas (){
    return(
        <>
        <Nav/>
         <main className="main-content">
            <header className="content-header">
                <div className="header-title">
                    <span className="page-badge badge-alert">Centro de Control</span>
                    <h1>9. Centro de Alertas y Notificaciones</h1>
                    <p className="page-description">Monitoreo de excepciones de permanencia, bloqueos preventivos y difusión de avisos al personal corporativo.</p>
                </div>
            </header>

            <div className="alerts-grid">
                
                <section className="alerts-card">
                    <h2>Alertas de Seguridad en Tiempo Real</h2>
                    <p className="section-desc">Excepciones críticas detectadas de forma automatizada en los puntos de acceso y celdas.</p>
                    
                    <div className="alerts-feed" id="feed-alertas-automatizadas">
                        <div className="alert-item priority-high">
                            <div className="alert-status-icon">🚨</div>
                            <div className="alert-details">
                                <div className="alert-meta">
                                    <span className="alert-tag">Tiempo Excedido</span>
                                    <span className="alert-time">Hace 5 min</span>
                                </div>
                                <p className="alert-message">El vehículo de placas <strong>ABC123</strong> ha superado el límite máximo de permanencia continua en el bloque operativo.</p>
                            </div>
                        </div>

                        <div className="alert-item priority-medium">
                            <div className="alert-status-icon">⚠️</div>
                            <div className="alert-details">
                                <div className="alert-meta">
                                    <span className="alert-tag">Celda Especial</span>
                                    <span className="alert-time">Hace 20 min</span>
                                </div>
                                <p className="alert-message">Intento de ocupación reportado en la Celda de Movilidad Reducida número 4 sin credencial activa asociada.</p>
                            </div>
                        </div>

                        <div className="alert-loading-placeholder" style="display: none;">
                            <p>Sincronizando con el servidor de eventos corporativos...</p>
                        </div>
                    </div>
                </section>

                <section className="alerts-card">
                    <h2>Redactar Novedad o Comunicado</h2>
                    <p className="section-desc">Publica avisos o restricciones temporales para que sean visibles en el módulo informativo de los funcionarios.</p>
                    
                    <form id="form-publicar-novedad" className="alerts-form">
                        <div className="input-field">
                            <label for="inputTituloAviso" className="field-label">Título del Comunicado:</label>
                            <input type="text" id="inputTituloAviso" className="field-input" placeholder="Ej: Mantenimiento preventivo celdas del bloque B" required/>
                        </div>

                        <div className="input-field">
                            <label for="selectSeveridadAviso" className="field-label">Nivel de Importancia:</label>
                            <select id="selectSeveridadAviso" className="field-select">
                                <option value="informativo">Informativo (General)</option>
                                <option value="advertencia">Advertencia (Restricción Temporal)</option>
                                <option value="urgente">Urgente (Cierre de Áreas)</option>
                            </select>
                        </div>

                        <div className="input-field">
                            <label for="textareaCuerpoAviso" className="field-label">Contenido de la Notificación:</label>
                            <textarea id="textareaCuerpoAviso" className="field-textarea" rows="5" placeholder="Describe los detalles de la novedad claramente para el personal..." required></textarea>
                        </div>

                        <button type="submit" className="btn-alerts-submit">
                            Emitir y Publicar Notificación
                        </button>
                    </form>
                </section>

            </div>
        </main>
        </>
    )
}

export default Alertas