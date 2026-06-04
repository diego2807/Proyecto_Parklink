import Nav from '../../components/AdminNav/Nav'
import '../../css/AdminCSS/Exportador.css'

function Exportador (){
    return(
        <>
        <Nav/>
        <main className="main-content">
            <header className="content-header">
                <div className="header-title">
                    <span className="page-badge">Documentación</span>
                    <h1>5. Centro de Exportación de Reportes</h1>
                    <p className="page-description">Generación de archivos históricos y resúmenes de uso de celdas para procesos de auditoría interna corporativa.</p>
                </div>
            </header>
            <div className="exporter-grid">
                <section className="exporter-card">
                    <h2>Configurar Parámetros del Reporte</h2>
                    <p className="section-desc">Selecciona los límites de tiempo y criterios requeridos antes de procesar la descarga.</p>
                    
                    <form id="form-exportador" className="exporter-form">
                        <div className="date-range">
                            <div className="input-field">
                                <label for="dateDesde" className="field-label">Fecha Inicial:</label>
                                <input type="date" id="dateDesde" className="field-input" required/>
                            </div>
                            <div className="input-field">
                                <label for="dateHasta" className="field-label">Fecha Final:</label>
                                <input type="date" id="dateHasta" className="field-input" required/>
                            </div>
                        </div>

                        <div className="input-field">
                            <label for="selectTipoDatos" className="field-label">Tipo de Información:</label>
                            <select id="selectTipoDatos" className="field-select">
                                <option value="todos">Historial completo de ingresos</option>
                                <option value="especiales">Solo uso de celdas especiales</option>
                                <option value="auditoria">Logs de eventos de seguridad</option>
                            </select>
                        </div>

                        <div className="format-selection">
                            <span className="field-label">Formato de Salida:</span>
                            <div className="radio-group">
                                <label className="radio-label">
                                    <input type="radio" name="radioFormato" value="pdf" checked/>
                                    <span className="format-box">
                                        <span className="format-icon">📄</span>
                                        <strong>Documento PDF</strong>
                                    </span>
                                </label>
                                <label className="radio-label">
                                    <input type="radio" name="radioFormato" value="excel"/>
                                    <span className="format-box">
                                        <span className="format-icon">📊</span>
                                        <strong>Hoja de Excel (XLSX)</strong>
                                    </span>
                                </label>
                            </div>
                        </div>

                        <button type="submit" id="btnGenerarReporte" className="btn-export">
                            Generar y Descargar Reporte
                        </button>
                    </form>
                </section>
                <section className="exporter-card side-info">
                    <h2>Indicaciones Importantes</h2>
                    <ul className="info-list">
                        <li>Los reportes generados respetan las directivas operativas internas del sistema.</li>
                        <li>Las marcas de tiempo se consolidan automáticamente con base en el huso horario local de la organización.</li>
                        <li>Para auditorías de alta densidad, se recomienda el uso del formato Excel (XLSX) para facilitar el filtrado de celdas.</li>
                    </ul>
                </section>

            </div>

        </main>
        </>
    )
}

export default Exportador