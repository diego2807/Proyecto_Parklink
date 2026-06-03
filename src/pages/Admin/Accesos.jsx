import Nav from '../../components/Nav'
import '../../css/Accesos'

function Accesos (){
    return(
        <>
        <Nav/>
        <main className="main-content">
            
            <header className="content-header">
                <div className="header-title">
                    <span className="page-badge badge-gate">Portería Principal</span>
                    <h1>8. Registro de Ingresos y Salidas</h1>
                    <p className="page-description">Validación de autorizaciones en tiempo real y asignación manual o automática de celdas.</p>
                </div>
            </header>

            <div className="gate-grid">
                
                <section classNameName="gate-card">
                    <h2>Registrar Movimiento Vehicular</h2>
                    <p className="section-desc">Ingresa los datos para registrar un evento de entrada o salida de la organización.</p>
                    
                    <form id="form-control-acceso" className="gate-form">
                        
                        <div className="movement-selection">
                            <label className="movement-label">
                                <input type="radio" name="radioMovimiento" value="ingreso" checked/>
                                <span className="movement-box box-in">
                                    <span className="mvt-icon">📥</span>
                                    <strong>Registrar INGRESO</strong>
                                </span>
                            </label>
                            <label className="movement-label">
                                <input type="radio" name="radioMovimiento" value="salida"/>
                                <span className="movement-box box-out">
                                    <span className="mvt-icon">📤</span>
                                    <strong>Registrar SALIDA</strong>
                                </span>
                            </label>
                        </div>

                        <div className="input-field">
                            <label for="inputPlacaAcceso" className="field-label">Placa del Vehículo:</label>
                            <input type="text" id="inputPlacaAcceso" className="field-input" placeholder="Ej: ABC123" required/>
                        </div>

                        <div id="panel-validacion-funcionario" className="validation-status status-pending">
                            <p className="status-title">Esperando validación de placa...</p>
                        </div>

                        <div className="input-field">
                            <label for="selectCeldaAsignada" className="field-label">Celda Sugerida / Asignada:</label>
                            <select id="selectCeldaAsignada" className="field-select">
                                <option value="">-- Seleccionar Celda Disponible --</option>
                                </select>
                        </div>

                        <button type="submit" id="btnProcesarAcceso" className="btn-gate-submit">
                            Procesar y Guardar Registro
                        </button>
                    </form>
                </section>

                <section className="gate-card sidebar-activity">
                    <h2>Últimos Movimientos</h2>
                    <p className="section-desc">Historial inmediato de los vehículos que acaban de cruzar los accesos de la empresa.</p>
                    
                    <div className="activity-timeline" id="timeline-accesos">
                        <div className="timeline-item loading">
                            <p>Esperando lecturas de portería...</p>
                        </div>
                    </div>
                </section>

            </div>

        </main>
        </>
    )
}

export default Accesos