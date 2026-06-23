import Footer from "../../components/VigilanteNav/VigilanteFooter"
import Header from "../../components/VigilanteNav/VigilanteHeader";
import Nav from "../../components/VigilanteNav/VigilanteNav";
import "../../css/VigilanteCSS/historial.css"

function HistorialTurno() {
    return (
        <>
        <Header />
        <main className="main-content">
        <Nav />
            <section className="historial">

            <div className="titulo-pagina">
                <h2>📚 Historial de Turno</h2>

                <p>
                    Consulte los registros realizados durante el turno actual.
                </p>
            </div>

            <div className="filtros">

                <label>Fecha</label>

                <div className="busqueda-fecha">
                    <input type="date" />
                    <button>Buscar</button>
                </div>

            </div>

            <div className="tabla-historial">

                <h3>📋 Registros</h3>

                <table>

                    <thead>
                        <tr>
                            <th>Hora</th>
                            <th>Movimiento</th>
                            <th>Placa</th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr>
                            <td>08:10</td>
                            <td>Entrada</td>
                            <td>ABC123</td>
                        </tr>

                        <tr>
                            <td>08:25</td>
                            <td>Visitante</td>
                            <td>XYZ789</td>
                        </tr>

                        <tr>
                            <td>08:40</td>
                            <td>Salida</td>
                            <td>ABC123</td>
                        </tr>

                    </tbody>

                </table>

            </div>

            <div className="recordatorio">
                <strong>📌 Resumen:</strong>
                Total de registros realizados durante el turno: 3.
            </div>

        </section>

        </main>



        <Footer/>
        </>
    )
}

export default HistorialTurno;
