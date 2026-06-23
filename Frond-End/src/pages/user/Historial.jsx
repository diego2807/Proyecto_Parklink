import '../../css/UserCSS/Styles.css'
import Nav from '../../components/UserNav/UserNav'

function Historial (){
    return (
        <>
        <Nav/>
        <div className="page">


    <div className="topbar">

        <div>

            <h1>Historial Personal</h1>

            <p>
                Consulte todas las entradas y salidas registradas.
            </p>

        </div>

    </div>


    <section className="cards">

        <div className="card">

            <div className="card-icon blue">

                <i className="fas fa-clock"></i>

            </div>

            <div>

                <h3>Registros Totales</h3>

                <span id="totalRegistros">

                    0

                </span>

            </div>

        </div>

        <div className="card">

            <div className="card-icon green">

                <i className="fas fa-car"></i>

            </div>

            <div>

                <h3>Vehículos Utilizados</h3>

                <span id="vehiculosUtilizados">

                    0

                </span>

            </div>

        </div>

        <div className="card">

            <div className="card-icon orange">

                <i className="fas fa-calendar-days"></i>

            </div>

            <div>

                <h3>Fecha Actual</h3>

                <span id="fechaActual">

                    --

                </span>

            </div>

        </div>

    </section>


    <div className="panel">

        <div className="panel-header">

            <h2>

                Buscar Registro

            </h2>

        </div>

        <div className="search-box">

            <input
            type="text"
            id="buscarHistorial"
            placeholder="Buscar por placa o fecha..."
            onkeyup="filtrarHistorial()"/>

        </div>

    </div>


    <div className="panel">

        <div className="panel-header">

            <h2>

                Historial de Uso

            </h2>

        </div>

        <table>

            <thead>

                <tr>

                    <th>Fecha</th>

                    <th>Hora Entrada</th>

                    <th>Hora Salida</th>

                    <th>Vehículo</th>

                </tr>

            </thead>

            <tbody id="tablaHistorial">

              

            </tbody>

        </table>

    </div>


    <div className="panel">

        <div className="panel-header">

            <h2>

                Información

            </h2>

        </div>

        <p>

            Este historial registra automáticamente
            los vehículos almacenados en el sistema.

        </p>


        <p>

            Puede consultar fechas, horas de ingreso,
            salida y la placa asociada al registro.

        </p>

    </div>

</div>
</>
    )
}

export default Historial