import Footer from "../../components/VigilanteNav/VigilanteFooter"
import Header from "../../components/VigilanteNav/VigilanteHeader";
import Nav from "../../components/VigilanteNav/VigilanteNav";
import "../../css/VigilanteCSS/transferencia.css"

function ConsolaTransferencia() {
    return (
        <>
        <Header />
        <main className="main-content">
            <Nav />
        <section className="transferencia">

            <div className="titulo-pagina">
                <h2>🔄 Consola de Transferencia</h2>

                <p>
                    Revise el estado actual del turno antes de realizar la entrega.
                </p>
            </div>

            <div className="panel-resumen">

                <h3>📌 Información del Turno</h3>

                <div className="dato">
                    <strong>👮 Vigilante Actual</strong>
                    <span>Andrés Yate</span>
                </div>

                <div className="dato">
                    <strong>🕒 Hora Actual</strong>
                    <span>18:00</span>
                </div>

                <div className="dato">
                    <strong>📅 Fecha</strong>
                    <span>01/06/2026</span>
                </div>

            </div>

            <div className="panel-resumen">

                <h3>📊 Resumen Operativo</h3>

                <div className="estadisticas">

                    <div className="stat-card">
                        <span className="numero">18</span>
                        <p>🚗 Entradas</p>
                    </div>

                    <div className="stat-card">
                        <span className="numero">15</span>
                        <p>🚙 Salidas</p>
                    </div>

                    <div className="stat-card">
                        <span className="numero">2</span>
                        <p>👥 Visitantes</p>
                    </div>

                    <div className="stat-card">
                        <span className="numero">1</span>
                        <p>📋 Novedades</p>
                    </div>

                </div>

            </div>

            <div className="panel-resumen">

                <h3>📝 Observaciones para el Siguiente Turno</h3>

                <textarea
                    placeholder="Escriba información importante para el siguiente vigilante..."
                    rows="6">
                </textarea>

            </div>

            <div className="acciones">
                <button className="btn-transferir">
                    🔄 Entregar Turno
                </button>
            </div>

        </section>

        </main>

    <Footer/>
        </>
    )
}

export default ConsolaTransferencia
        