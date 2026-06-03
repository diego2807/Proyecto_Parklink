import Nav from '../../components/Nav'

function Log (){
    return(
        <>
        <Nav/>
        <main className="main-content">
            
            <header className="content-header">
                <div className="header-title">
                    <span className="page-badge text-alert">Auditoría Avanzada</span>
                    <h1>4. Log de Eventos y Seguridad</h1>
                    <p className="page-description">Historial detallado de operaciones, ingresos al sistema y alertas críticas del control de acceso.</p>
                </div>
            </header>

            <section className="filter-box">
                <form id="form-filtros-log" className="filter-form">
                    <div className="input-field">
                        <label for="searchPlaca" className="field-label">Buscar por Placa o Usuario:</label>
                        <input type="text" id="searchPlaca" className="field-input" placeholder="Ej: ABC-123 o Carlos..."/>
                    </div>
                    
                    <div className="input-field">
                        <label for="selectCriticidad" className="field-label">Nivel de Criticidad:</label>
                        <select id="selectCriticidad" className="field-select">
                            <option value="todos">Todos los eventos</option>
                            <option value="info">Información (OK)</option>
                            <option value="advertencia">Advertencia</option>
                            <option value="critico">Crítico (Alerta)</option>
                        </select>
                    </div>
                </form>
            </section>

            <section className="log-section">
                <div className="table-container">
                    <table className="log-table">
                        <thead>
                            <tr>
                                <th>Marca de Tiempo (Fecha/Hora)</th>
                                <th>Nivel</th>
                                <th>Módulo</th>
                                <th>Descripción del Suceso</th>
                                <th>Usuario / Placa</th>
                            </tr>
                        </thead>
                        <tbody id="tabla-log-cuerpo">
                            <tr className="row-loading">
                                <td colspan="5">Sincronizando log con el servidor de auditoría...</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

        </main>
        </>
    )
}

export default Log