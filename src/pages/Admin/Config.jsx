import Nav from '../../components/Nav'

function Config (){
    return(
        <>
        <Nav/>
         <main className="main-content">
            <header className="content-header">
                <div className="header-title">
                    <span className="page-badge badge-config">Sistema</span>
                    <h1>10. Parametrización General</h1>
                    <p className="page-description">Ajuste de las reglas operativas corporativas, límites de tiempo de permanencia y cuotas de espacio del complejo.</p>
                </div>
            </header>
            <form id="form-parametrizacion-global" className="config-form">
                
                <div className="config-grid">
                    <section className="config-card">
                        <h2>Horario Operativo Corporativo</h2>
                        <p className="section-desc">Establece la franja horaria en la que las porterías automatizadas permiten el ingreso de funcionarios.</p>
                        
                        <div className="form-row">
                            <div className="input-field">
                                <label for="inputHoraApertura" className="field-label">Hora de Apertura:</label>
                                <input type="time" id="inputHoraApertura" className="field-input" value="06:00" required/>
                            </div>
                            
                            <div className="input-field">
                                <label for="inputHoraCierre" className="field-label">Hora de Cierre:</label>
                                <input type="time" id="inputHoraCierre" className="field-input" value="22:00" required/>
                            </div>
                        </div>

                        <div className="input-field">
                            <label className="checkbox-container">
                                <input type="checkbox" id="checkPermitirFestivos" checked/>
                                <span className="checkbox-checkmark"></span>
                                <span className="checkbox-label">Habilitar accesos fines de semana y días festivos</span>
                            </label>
                        </div>
                    </section>
                    <section className="config-card">
                        <h2>Control de Excepciones y Tiempos</h2>
                        <p className="section-desc">Configuración de los disparadores del módulo de alertas automáticas ante sobrepermanencias.</p>
                        
                        <div className="input-field">
                            <label for="inputMaxHoras" className="field-label">Tiempo máximo de estancia continua (Horas):</label>
                            <input type="number" id="inputMaxHoras" className="field-input" min="1" max="24" value="14" required/>
                        </div>

                        <div className="input-field">
                            <label for="selectAccionExceso" className="field-label">Acción por sobrepermanencia crítica:</label>
                            <select id="selectAccionExceso" className="field-select">
                                <option value="notificar">Disparar alerta en panel de seguridad</option>
                                <option value="bloquear">Generar bloqueo preventivo en portería</option>
                                <option value="auditar">Elevar log a auditoría de talento humano</option>
                            </select>
                        </div>
                    </section>

                    <section className="config-card full-width-card">
                        <h2>Topes de Capacidad y Reserva de Celdas</h2>
                        <p className="section-desc">Define el número máximo de estacionamientos reservados para el control operativo interno.</p>
                        
                        <div className="form-row row-three-columns">
                            <div className="input-field">
                                <label for="inputCeldasAdministrativos" className="field-label">Celdas Administrativas:</label>
                                <input type="number" id="inputCeldasAdministrativos" className="field-input" min="0" value="40" required/>
                            </div>

                            <div className="input-field">
                                <label for="inputCeldasOperativos" className="field-label">Celdas Operativas / Técnicas:</label>
                                <input type="number" id="inputCeldasOperativos" className="field-input" min="0" value="60" required/>
                            </div>

                            <div className="input-field">
                                <label for="inputCeldasMovilidad" className="field-label">Movilidad Reducida (Mantenidas):</label>
                                <input type="number" id="inputCeldasMovilidad" className="field-input" min="0" value="10" required/>
                            </div>
                        </div>
                    </section>

                </div>
                <div className="form-actions-bar">
                    <button type="submit" className="btn-config-save">
                        Guardar Configuración del Sistema
                    </button>
                </div>

            </form>

        </main>
        </>
    )
}

export default Config