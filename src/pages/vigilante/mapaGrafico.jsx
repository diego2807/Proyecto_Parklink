import Footer from "../../components/VigilanteNav/VigilanteFooter"
import Menu from "../../components/VigilanteNav/Menu";
import "../../css/VigilanteCSS/mapa.css";

function MapaGrafico() {
    return (
        <>
            <Menu />

            <main className="main-content">

                <section className="mapa">

                    <div className="titulo-pagina">
                        <h2>🅿️ Mapa Gráfico del Parqueadero</h2>

                        <p>
                            Visualización en tiempo real del estado de los espacios.
                        </p>
                    </div>

                    <section className="metrics-grid">

                        <div className="metric-card">

                            <div className="metric-icon">
                                🔲
                            </div>

                            <div className="metric-data">
                                <div className="num">50</div>
                                <div className="lbl">Celdas Totales</div>
                            </div>

                        </div>

                        <div className="metric-card">

                            <div className="metric-icon">
                                🟢
                            </div>

                            <div className="metric-data">
                                <div className="num">30</div>
                                <div className="lbl">Disponibles</div>
                            </div>

                        </div>

                        <div className="metric-card">

                            <div className="metric-icon">
                                🔴
                            </div>

                            <div className="metric-data">
                                <div className="num">20</div>
                                <div className="lbl">Ocupadas</div>
                            </div>

                        </div>

                    </section>

                    <section className="panel-card">

                        <div className="panel-card-header">

                            <div className="header-mapa">

                                <div>
                                    <h3>Control de Estacionamiento</h3>
                                    <small>Redeban Sede Principal</small>
                                </div>

                                <div className="btn-group">

                                    <button
                                        className="btn-level active"
                                    >
                                        SÓTANO 1
                                    </button>

                                    <button
                                        className="btn-level"
                                    >
                                        SÓTANO 2
                                    </button>

                                </div>

                            </div>

                        </div>

                        <div className="panel-card-body">

                            <div className="filter-bar">

                                <div className="filter-chip active">
                                    🔲 Todos
                                </div>

                                <div className="filter-chip">
                                    🟢 Libres
                                </div>

                                <div className="filter-chip">
                                    🔴 Ocupados
                                </div>

                                <div className="filter-chip">
                                    🟡 Reservados
                                </div>

                            </div>

                        </div>

                        <div className="contenedor-mapa">

                            <div className="mapa-plano">

                                <div className="zona-superior">

                                    <div className="fila-horizontal">

                                        {[...Array(12)].map((_, i) => (
                                            <div key={i} className="puesto">
                                                <span>A</span>
                                                {i + 1}
                                            </div>
                                        ))}

                                    </div>

                                    <div className="rampa">
                                        RAMPA ENTRADA
                                    </div>

                                    <div className="fila-horizontal">

                                        {[...Array(12)].map((_, i) => (
                                            <div key={i} className="puesto">
                                                <span>A</span>
                                                {i + 13}
                                            </div>
                                        ))}

                                    </div>

                                </div>

                                <div className="zona-central">

                                    <div className="fila-vertical">

                                        {[...Array(6)].map((_, i) => (
                                            <div key={i} className="puesto">
                                                <span>B</span>
                                                {i + 1}
                                            </div>
                                        ))}

                                    </div>

                                    <div className="bloque-central">

                                        <div className="fila-horizontal">

                                            {[...Array(12)].map((_, i) => (
                                                <div key={i} className="puesto">
                                                    <span>E</span>
                                                    {i + 1}
                                                </div>
                                            ))}

                                        </div>

                                        <div className="pasillo">
                                            D-01 ↔ D-12 (PASILLO)
                                        </div>

                                        <div className="fila-horizontal">

                                            {[...Array(12)].map((_, i) => (
                                                <div key={i} className="puesto">
                                                    <span>D</span>
                                                    {i + 1}
                                                </div>
                                            ))}

                                        </div>

                                    </div>

                                    <div className="fila-vertical">

                                        {[...Array(6)].map((_, i) => (
                                            <div key={i} className="puesto">
                                                <span>B</span>
                                                {i + 7}
                                            </div>
                                        ))}

                                    </div>

                                </div>

                                <div className="nucleo">
                                    NÚCLEO ESTRUCTURAL: ASCENSORES TORRE PRINCIPAL
                                </div>

                            </div>

                        </div>

                        <div className="footer-mapa">

                            <span>
                                SÓTANO 1: 50 CELDAS
                            </span>

                            <span>
                                RESISTENCIA: 500 kg/m²
                            </span>

                            <span>
                                ALTURA LIBRE: 3.50 m
                            </span>

                        </div>

                    </section>

                </section>

            </main>

            <Footer />
        </>
    );
}

export default MapaGrafico;