import Footer from "../../components/VigilanteNav/VigilanteFooter"
import Menu from "../../components/VigilanteNav/Menu";
import "../../css/VigilanteCSS/visitantes.css"

function FormularioVisitantes() {
    return (
        <>
        <Menu />
        <main className="main-content">
            <section className="visitantes">

            <div className="titulo-pagina">
                <h2>👥 Registro de Visitantes</h2>

                <p>
                    Registre los datos del visitante para autorizar el ingreso.
                </p>
            </div>

            <form className="formulario-visitante">

                <div className="campo">
                    <label>Nombre Completo</label>
                    <input type="text" />
                </div>

                <div className="campo">
                    <label>Documento</label>
                    <input type="text" />
                </div>

                <div className="campo">
                    <label>Placa del Vehículo</label>
                    <input type="text" />
                </div>

                <div className="campo">
                    <label>Persona o Área Visitada</label>
                    <input type="text" />
                </div>

                <div className="campo">
                    <label>Motivo de la Visita</label>
                    <textarea rows="4"></textarea>
                </div>

            <div className="recordatorio">
            <strong>💡 Importante:</strong>
            Verifique la identidad del visitante antes de autorizar el ingreso.
        </div>

                <button type="submit" className="btn-registrar">
                    ✅ Registrar Visitante
                </button>

            </form>

        </section>
        </main>
        <Footer/>
        </>
    )
}

export default FormularioVisitantes;
