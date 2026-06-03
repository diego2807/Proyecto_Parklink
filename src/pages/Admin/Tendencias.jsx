import Nav from '../../components/Nav'

function Tendencias (){
    return(
        <>
        <Nav/>
        <main className="main-content">
            
            <header className="content-header">
                <div className="header-title">
                    <span className="page-badge">Análisis de Datos</span>
                    <h1>2. Análisis de Tendencias y Flujos</h1>
                    <p className="page-description">Visualización de horas pico, días de mayor afluencia y comportamiento histórico de ingresos.</p>
                </div>
            </header>

            <section className="filter-bar">
                <div className="filter-group">
                    <label for="selectPeriodo" className="filter-label">Rango de Análisis:</label>
                    <select id="selectPeriodo" className="filter-select">
                        <option value="hoy">Hoy</option>
                        <option value="semana" selected>Últimos 7 días</option>
                        <option value="mes">Último mes</option>
                    </select>
                </div>
            </section>

            <section className="charts-grid">
                
                <article className="chart-card">
                    <div className="chart-header">
                        <div className="chart-title-area">
                            <h2>Ocupación por Horas (Picos de Tráfico)</h2>
                            <p className="chart-subtitle">Detecta los lapsos de tiempo con mayor congestión en los accesos.</p>
                        </div>
                    </div>
                    <div className="chart-body">
                        <div className="canvas-container">
                            <canvas id="chartHorasPico"></canvas>
                        </div>
                    </div>
                </article>

                <article className="chart-card">
                    <div className="chart-header">
                        <div className="chart-title-area">
                            <h2>Ingresos por Días Laborales</h2>
                            <p className="chart-subtitle">Comparativa de flujo vehicular entre lunes y viernes.</p>
                        </div>
                    </div>
                    <div className="chart-body">
                        <div className="canvas-container">
                            <canvas id="chartDiasSemana"></canvas>
                        </div>
                    </div>
                </article>

            </section>

            <section className="summary-section">
                <h2>Conclusiones del Comportamiento Reciente</h2>
                <div className="insights-container">
                    <div className="insight-item">
                        <span className="insight-icon">📈</span>
                        <div className="insight-text">
                            <h3>Hora de Máxima Demanda</h3>
                            <p id="txtHoraPico">Detectando patrón...</p>
                        </div>
                    </div>
                    <div className="insight-item">
                        <span className="insight-icon">🗓️</span>
                        <div className="insight-text">
                            <h3>Día de Mayor Afluencia</h3>
                            <p id="txtDiaPico">Analizando registros...</p>
                        </div>
                    </div>
                </div>
            </section>

        </main>
        </>
    )
}

export default Tendencias