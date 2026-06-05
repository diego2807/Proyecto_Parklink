import Footer from "../../components/VigilanteNav/VigilanteFooter"
import Menu from "../../components/VigilanteNav/Menu";
import "../../css/VigilanteCSS/entrada.css"

function FormularioEntrada() {
    return (
        <>
        <Menu />
        <main className="main-content">
        <section className="entrada">

            <div className="titulo-pagina">
                <h2>🚗 Registro de Entrada</h2>
                <p>Ingrese la placa del vehículo para consultar la reserva.</p>
            </div>

            <div className="contenido-entrada">

                <div className="busqueda">

                    <label htmlFor="placa">Placa del vehículo</label>

                    <div className="busqueda-placa">
                        <input
                            type="text"
                            id="placa"
                            placeholder="Ej: ABC123" />

                        <button>Buscar</button>
                    </div>

                </div>

                <div className="reserva">

                    <h3>📄 Información de la Reserva</h3>

                    <div className="info-grid">

                        <div className="info-card">
                            <h4>👤 Propietario</h4>
                            <p>Andrés Yate</p>
                        </div>

                        <div className="info-card">
                            <h4>🚗 Placa</h4>
                            <p>ABC123</p>
                        </div>

                        <div className="info-card">
                            <h4>🅿️ Espacio</h4>
                            <p>A-15</p>
                        </div>

                        <div className="info-card">
                            <h4>🕒 Hora</h4>
                            <p>08:00 AM</p>
                        </div>

                    </div>

                    <div className="acciones">
                        <button className="btn-confirmar">
                            ✅ Confirmar Entrada
                        </button>

                        <button className="btn-visitante">
                            👥 Registrar Visitante
                        </button>
                    </div>

                </div>

            </div>

        </section>

    </main>


        <Footer/>
        </>
    )
}

export default FormularioEntrada
        