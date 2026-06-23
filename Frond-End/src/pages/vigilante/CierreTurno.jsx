import Footer from "../../components/VigilanteNav/VigilanteFooter"
import Header from "../../components/VigilanteNav/VigilanteHeader";
import Nav from "../../components/VigilanteNav/VigilanteNav";
import "../../css/VigilanteCSS/cierre.css"

function CierreTurno () {
    return (
        <>
        <Header />
        <main className="main-content">
        <Nav />
        <section className="cierre">

                    <div className="titulo-pagina">
                        <h2>🔒 Cierre de Turno</h2>

                        <p>
                            Finalice la jornada registrando las observaciones correspondientes.
                        </p>
                    </div>

                    <div className="panel-cierre">

                        <h3>👮 Información del Vigilante</h3>

                        <div className="dato">
                            <strong>Usuario</strong>
                            <span>Andrés Yate</span>
                        </div>

                        <div className="dato">
                            <strong>Hora</strong>
                            <span>18:00 PM</span>
                        </div>

                    </div>

                    <div className="panel-cierre">

                        <h3>📊 Resumen del Turno</h3>

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

                    <div className="panel-cierre">

                        <h3>📝 Observaciones Finales</h3>

                        <textarea
                            rows="5"
                            placeholder="Ingrese observaciones importantes del turno...">
                        </textarea>

                    </div>

                    <div className="recordatorio">
                        <strong>📌 Importante:</strong>
                        Verifique que todas las novedades hayan sido registradas antes de cerrar el turno.
                    </div>

                    <div className="acciones">

                        <button className="btn-cierre">
                            🔒 Cerrar Turno
                        </button>

                    </div>

                </section>

            </main>
        

        <Footer/>
        </>
    )
}

export default CierreTurno       