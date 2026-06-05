import Footer from "../../components/VigilanteNav/VigilanteFooter"
import Menu from "../../components/VigilanteNav/Menu";
import "../../css/VigilanteCSS/apertura.css"

function AperturaTurno () {
    return (
        <>
        <Menu />
        <main className="main-content">
        <section className="apertura">

                <div className="titulo-pagina">
                    <h2>🔓 Apertura de Turno</h2>

                    <p>
                        Realice la verificación inicial antes de comenzar la jornada.
                    </p>
                </div>

                <div className="panel-apertura">

                    <h3>👮 Información del Vigilante</h3>

                    <div className="dato">
                        <strong>Usuario</strong>
                        <span>Andrés Yate</span>
                    </div>

                    <div className="dato">
                        <strong>Fecha</strong>
                        <span>02/06/2026</span>
                    </div>

                    <div className="dato">
                        <strong>Hora</strong>
                        <span>06:00 AM</span>
                    </div>

                </div>

                <div className="panel-apertura">

                    <h3>✅ Verificaciones Iniciales</h3>

                    <div className="check">
                        <input type="checkbox" id="check1" />
                        <label for="check1">
                            Revisar novedades pendientes.
                        </label>
                    </div>

                    <div className="check">
                        <input type="checkbox" id="check2" />
                        <label for="check2">
                            Verificar estado del parqueadero.
                        </label>
                    </div>

                    <div className="check">
                        <input type="checkbox" id="check3" />
                        <label for="check3">
                            Confirmar entrega del turno anterior.
                        </label>
                    </div>

                </div>

                <div className="recordatorio">
                    <strong>📌 Importante:</strong>
                    Complete las verificaciones antes de iniciar el turno.
                </div>

                <div className="acciones">
                    <button className="btn-apertura">
                        🔓 Iniciar Turno
                    </button>
                </div>

            </section>

        </main>


        <Footer/>
        </>
    )
}

export default AperturaTurno