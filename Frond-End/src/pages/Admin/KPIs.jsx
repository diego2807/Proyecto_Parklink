import Nav from '../../components/AdminNav/Nav'
import '../../css/AdminCSS/KPIs.css'

function KPIs (){
    return(
        <>
        <Nav/>
         <main className="main-content">
            
            <header className="content-header">
                <div className="header-title">
                    <span className="page-badge">Vista General</span>
                    <h1>1. Tablero de Indicadores Clave (KPIs)</h1>
                    <p className="page-description">Estado operativo y de ocupación en tiempo real del estacionamiento corporativo.</p>
                </div>

                <button id="btnRefrescarKPIs" className="btn-refresh">Actualizar Datos</button>
            </header>


            <section className="kpi-grid">
                

                <article className="kpi-card text-primary">
                    <div className="kpi-header">
                        <h3>Ocupación Total</h3>
                        <span className="kpi-icon">🚗</span>
                    </div>
                    <div className="kpi-body">
                        <span id="kpi-ocupacion-total" className="kpi-value">0</span>
                        <span id="kpi-porcentaje-ocupacion" className="kpi-subtext">0% de capacidad</span>
                    </div>
                </article>

                <article className="kpi-card">
                    <div className="kpi-header">
                        <h3>Automóviles</h3>
                        <span className="kpi-icon">🏢</span>
                    </div>
                    <div className="kpi-body">
                        <span id="kpi-autos-conteo" className="kpi-value">0</span>
                        <span id="kpi-autos-limite" className="kpi-subtext">Cupos disponibles: --</span>
                    </div>
                </article>

                <article className="kpi-card">
                    <div className="kpi-header">
                        <h3>Motocicletas</h3>
                        <span className="kpi-icon">🏍️</span>
                    </div>
                    <div className="kpi-body">
                        <span id="kpi-motos-conteo" className="kpi-value">0</span>
                        <span id="kpi-motos-limite" className="kpi-subtext">Cupos disponibles: --</span>
                    </div>
                </article>

                <article className="kpi-card alert">
                    <div className="kpi-header">
                        <h3>Zonas Especiales</h3>
                        <span className="kpi-icon">⚡</span>
                    </div>
                    <div className="kpi-body">
                        <span id="kpi-especiales-conteo" className="kpi-value">0</span>
                        <span className="kpi-subtext">Celdas de uso prioritario ocupadas</span>
                    </div>
                </article>

            </section>
            <section className="table-section">
                <div className="table-header">
                    <h2>Monitoreo de Vehículos Activos</h2>
                    <p>Muestra los vehículos que se encuentran actualmente estacionados dentro de la empresa.</p>
                </div>

                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Placa</th>
                                <th>Tipo</th>
                                <th>Funcionario / Área</th>
                                <th>Hora Ingreso</th>
                                <th>Celda</th>
                            </tr>
                        </thead>
                        <tbody id="tabla-kpi-activos">
                            <tr className="row-loading">
                                <td colSpan="5">Esperando datos del servidor...</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

        </main>
        </>
    )
}

export default KPIs