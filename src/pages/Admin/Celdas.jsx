import Nav from '../../components/Nav'

function Celdas (){
    return(
        <>
        <Nav/>
         <main className="main-content">
            <header className="content-header">
                <div className="header-title">
                    <span className="page-badge">Uso Prioritario</span>
                    <h1>3. Estado de Celdas Especiales</h1>
                    <p className="page-description">Monitoreo visual y en tiempo real de los espacios reservados para carga eléctrica y movilidad reducida.</p>
                </div>
            </header>
            <section className="celdas-section">
                <div className="section-title-area">
                    <span className="zone-icon electrica">⚡</span>
                    <div>
                        <h2>Zonas de Carga Eléctrica</h2>
                        <p>Espacios equipados con infraestructura de carga para la flota de vehículos eléctricos corporativos.</p>
                    </div>
                </div>

                <div id="grid-celdas-electricas" className="slots-grid">
                    <div className="slot-loading">Cargando celdas eléctricas...</div>
                </div>
            </section>

            <section className="celdas-section">
                <div className="section-title-area">
                    <span className="zone-icon movilidad">♿</span>
                    <div>
                        <h2>Celdas de Movilidad Reducida</h2>
                        <p>Zonas de estacionamiento con acceso prioritario reglamentario para el personal habilitado.</p>
                    </div>
                </div>
                <div id="grid-celdas-movilidad" className="slots-grid">
                    <div className="slot-loading">Cargando celdas de movilidad reducida...</div>
                </div>
            </section>

        </main>
        </>
    )
}

export default Celdas