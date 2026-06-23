import Footer from "../../components/VigilanteNav/VigilanteFooter"
import Header from "../../components/VigilanteNav/VigilanteHeader";
import Nav from "../../components/VigilanteNav/VigilanteNav";
import "../../css/VigilanteCSS/novedades.css"

function RegistroNovedades() {
    return (
        <>
        <Header />
        <main className="main-content">
        <Nav />
        <section className="novedades">

            <div className="titulo-pagina">
                <h2>📋 Registro de Novedades</h2>

                <p>
                    Registre cualquier situación o incidente ocurrido durante el turno.
                </p>
            </div>

            <form className="formulario-novedad">

                <div className="campo">
                    <label>Fecha</label>
                    <input type="date" />
                </div>

                <div className="campo">
                    <label>Tipo de Novedad</label>

                    <select>
                        <option>Seleccione una opción</option>
                        <option>Acceso Denegado</option>
                        <option>Daño en Infraestructura</option>
                        <option>Vehículo con Observación</option>
                        <option>Problema de Reserva</option>
                        <option>Otro</option>
                    </select>
                </div>

                <div className="campo">
                    <label>Placa Relacionada (Opcional)</label>
                    <input type="text" />
                </div>

                <div className="campo">
                    <label>Descripción</label>
                    <textarea rows="5"></textarea>
                </div>

                <button type="submit" className="btn-registrar">
                    ✅ Registrar Novedad
                </button>

            </form>

            <div className="recordatorio">
                <strong>💡 Importante:</strong>
                Registre la novedad con la mayor claridad posible para facilitar el seguimiento.
            </div>

        </section>

        </main>

        <Footer/>
        </>
    )
}

export default RegistroNovedades;
        