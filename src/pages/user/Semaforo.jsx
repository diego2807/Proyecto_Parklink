import '../../css/UserCSS/Styles.css'
import Nav from '../../components/UserNav/UserNav'

function Semaforo (){
    return(
        <>
        <Nav/>
        <div className="page">

    <div className="topbar">

        <div>

            <h1>Semáforo de Disponibilidad</h1>

            <p>
                Consulta el estado actual del parqueadero
                antes de llegar a la empresa.
            </p>

        </div>

    </div>


    <div className="panel">

        <div className="panel-header">

            <h2>

                Estado Actual

            </h2>

        </div>


        <div className="semaforo">

            <div
            id="rojo"
            className="luz rojo"></div>

            <div
            id="amarillo"
            className="luz amarillo"></div>

            <div
            id="verde"
            className="luz verde"></div>

        </div>


        <div
        id="cuposActuales"
        className="estado-cupos">

            Cargando información...

        </div>

    </div>


    <section className="cards">

        <div className="card">

            <div className="card-icon blue">

                <i className="fas fa-square-parking"></i>

            </div>

            <div>

                <h3>Cupos Totales</h3>

                <span>50</span>

            </div>

        </div>

        <div className="card">

            <div className="card-icon orange">

                <i className="fas fa-car-side"></i>

            </div>

            <div>

                <h3>Vehículos Registrados</h3>

                <span id="totalVehiculos">

                    0

                </span>

            </div>

        </div>

        <div className="card">

            <div className="card-icon green">

                <i className="fas fa-check-circle"></i>

            </div>

            <div>

                <h3>Cupos Libres</h3>

                <span id="cuposDisponibles">

                    50

                </span>

            </div>

        </div>

    </section>


    <div className="panel">

        <div className="panel-header">

            <h2>

                Interpretación del Semáforo

            </h2>

        </div>

        <table>

            <thead>

                <tr>

                    <th>Color</th>

                    <th>Estado</th>

                    <th>Descripción</th>

                </tr>

            </thead>

            <tbody>

                <tr>

                    <td>
                        🟢 Verde
                    </td>

                    <td>
                        Disponible
                    </td>

                    <td>
                        Hay más de 20 cupos disponibles.
                    </td>

                </tr>

                <tr>

                    <td>
                        🟡 Amarillo
                    </td>

                    <td>
                        Capacidad Media
                    </td>

                    <td>
                        Entre 10 y 20 cupos disponibles.
                    </td>

                </tr>

                <tr>

                    <td>
                        🔴 Rojo
                    </td>

                    <td>
                        Completo
                    </td>

                    <td>
                        Menos de 10 cupos disponibles.
                    </td>

                </tr>

            </tbody>

        </table>

    </div>


    <div className="panel">

        <div className="panel-header">

            <h2>

                Última Actualización

            </h2>

        </div>

        <p id="fechaActual">

            Cargando fecha...

        </p>

    </div>

</div>
</>
    )
}

export default Semaforo