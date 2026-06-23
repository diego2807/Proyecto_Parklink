import Footer from "../../components/VigilanteNav/VigilanteFooter"
import Header from "../../components/VigilanteNav/VigilanteHeader"
import Nav from "../../components/VigilanteNav/VigilanteNav"
import "../../css/VigilanteCSS/mapa.css"

function MapaGrafico() {
    return (
        <>
            <Header />
            {/* Contenedor maestro con ID único para aislar por completo el CSS */}
            <div id="modulo-mapa-vigilante">
                <main className="main-content">
                    <Nav />
                    <section className="mapa">
                        <div className="titulo-pagina">
                            <h2>🅿️ Mapa Gráfico del Parqueadero</h2>
                            <p>Visualización en tiempo real del estado de los espacios.</p>
                        </div>

                        <section className="metrics-grid">
                            <div className="metric-card">
                                <div className="metric-icon">🔲</div>
                                <div className="metric-data">
                                    <div className="num">50</div>
                                    <div className="lbl">Celdas Totales</div>
                                </div>
                            </div>

                            <div className="metric-card">
                                <div className="metric-icon">🟢</div>
                                <div className="metric-data">
                                    <div className="num">32</div>
                                    <div className="lbl">Disponibles</div>
                                </div>
                            </div>

                            <div className="metric-card">
                                <div className="metric-icon">🔴</div>
                                <div className="metric-data">
                                    <div className="num">18</div>
                                    <div className="lbl">Ocupadas</div>
                                </div>
                            </div>
                        </section>

                        {/* CONTENEDOR DEL MAPA ARQUITECTÓNICO */}
                        <div className="plano-container">
                            <div className="esquema-sotano">
                                <div className="zona-parqueo">
                                    <div className="fila-vertical">
                                        {[...Array(6)].map((_, i) => (
                                            <div key={i} className="puesto disponible">
                                                <span>A</span>
                                                {i + 1}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="calle-rodamiento">
                                        <div className="flecha-direccion">⬆ VIA DE CIRCULACIÓN ⬆</div>
                                    </div>

                                    <div className="fila-vertical">
                                        {[...Array(6)].map((_, i) => (
                                            <div key={i} className="puesto ocupado">
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
                            <span>SÓTANO 1: 50 CELDAS</span>
                            <span>RESISTENCIA: 500 kg/m²</span>
                            <span>ALTURA LIBRE: 3.50 m</span>
                        </div>
                    </section>
                </main>
            </div>
            <Footer />
        </>
    );
}

export default MapaGrafico;