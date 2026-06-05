import Footer from "../../components/VigilanteNav/VigilanteFooter"
import Menu from "../../components/VigilanteNav/Menu";
import "../../css/VigilanteCSS/salida.css"

function FormularioSalida() {
    return (
        <>
        <Menu />
        <main className="main-content">
        <section className="salida">

            <div className="titulo-pagina">
                <h2>🚙 Registro de Salida</h2>
                <p>
                    Consulte la información del vehículo y confirme la salida.
                </p>
            </div>

            <div className="busqueda">
                <label for="placaSalida">Placa del vehículo</label>

                <div className="busqueda-placa">
                    <input
                        type="text"
                        id="placaSalida"
                        placeholder="Ej: ABC123"
                    />

                    <button>Buscar</button>
                </div>
            </div>

            <div className="reserva">

                <h3>📄 Información del Vehículo</h3>

                <div className="dato">
                    <strong>👤 Propietario</strong>
                    <span>Andrés Yate</span>
                </div>

                <div className="dato">
                    <strong>🚗 Placa</strong>
                    <span>ABC123</span>
                </div>

                <div className="dato">
                    <strong>🅿️ Espacio</strong>
                    <span>A-15</span>
                </div>

                <div className="dato">
                    <strong>📅 Fecha</strong>
                    <span>01/06/2026</span>
                </div>

            </div>

            <div className="acciones">

                <button className="btn-confirmar">
                    ✅ Confirmar Salida
                </button>

            </div>

        </section>

    </main>
        <Footer/>
        </>
    )
}

export default FormularioSalida;