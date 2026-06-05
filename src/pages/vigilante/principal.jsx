import Footer from "../../components/VigilanteNav/VigilanteFooter"
import Menu from "../../components/VigilanteNav/Menu";
import "../../css/VigilanteCSS/index.css"

function Principal() {
    return (
        <>
        <Menu />
        <main className="main-content">
            <section className="contenido">
                <div className="bienvenida">
                    <h2>Bienvenido a Parklink</h2>
                    <p>Sistema de gestión y control de parqueaderos empresariales.</p>
                </div>


            <div className="turno">
                <h3>📌 Estado Actual</h3>

                <p><strong>Usuario:</strong> Andrés Yate</p>
                <p><strong>Turno:</strong> Mañana</p>
                <p><strong>Estado:</strong> Activo</p>
            </div>

            <div className="guia">
                <h3>📖 Guía rápida del sistema</h3>

                <div className="item-guia">
                    <h4>🚗 Entrada</h4>
                    <p>Registra vehículos que ingresan al parqueadero.</p>
                </div>

                <div className="item-guia">
                    <h4>🚙 Salida</h4>
                    <p>Registra vehículos que abandonan el parqueadero.</p>
                </div>

                <div className="item-guia">
                    <h4>📋 Novedades</h4>
                    <p>Registra incidentes o situaciones especiales.</p>
                </div>

                <div className="recordatorio">
                    <strong>💡 Recuerda:</strong>
                    Verificar placas y registrar novedades antes de cerrar el turno.
                </div>
            </div>

        </section>

        </main>



        <Footer/>
        </>
    )
}

export default Principal;