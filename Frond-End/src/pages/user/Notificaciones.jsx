import '../../css/UserCSS/Styles.css'
import Nav from '../../components/UserNav/UserNav'

function Notificaciones (){
    return(
        <>
        <Nav/>
        <div className="page">


    <div className="topbar">

        <div>

            <h1>Centro de Notificaciones</h1>

            <p>
                Consulte alertas, avisos y eventos del sistema.
            </p>

        </div>

    </div>


    <section className="cards">

        <div className="card">

            <div className="card-icon blue">

                <i className="fas fa-bell"></i>

            </div>

            <div>

                <h3>Total Notificaciones</h3>

                <span id="totalNotificaciones">

                    0

                </span>

            </div>

        </div>

        <div className="card">

            <div className="card-icon green">

                <i className="fas fa-check-circle"></i>

            </div>

            <div>

                <h3>Sistema Activo</h3>

                <span>

                    OK

                </span>

            </div>

        </div>

        <div className="card">

            <div className="card-icon orange">

                <i className="fas fa-calendar-days"></i>

            </div>

            <div>

                <h3>Última Actualización</h3>

                <span id="fechaActual">

                    --

                </span>

            </div>

        </div>

    </section>


    <div className="panel">

        <div className="panel-header">

            <h2>

                Notificaciones Recientes

            </h2>

        </div>

        <div id="contenedorNotificaciones">


        </div>

    </div>


    <div className="panel">

        <div className="panel-header">

            <h2>

                Tipos de Notificaciones

            </h2>

        </div>

        <table>

            <thead>

                <tr>

                    <th>Tipo</th>

                    <th>Descripción</th>

                </tr>

            </thead>

            <tbody>

                <tr>

                    <td>🚗 Vehículo</td>

                    <td>
                        Registro o eliminación de vehículos.
                    </td>

                </tr>

                <tr>

                    <td>⚠️ Alerta</td>

                    <td>
                        Advertencias relacionadas con cupos.
                    </td>

                </tr>

                <tr>

                    <td>✅ Sistema</td>

                    <td>
                        Eventos importantes del sistema.
                    </td>

                </tr>

                <tr>

                    <td>🔔 General</td>

                    <td>
                        Información para el usuario.
                    </td>

                </tr>

            </tbody>

        </table>

    </div>

</div>
</>
    )
}

export default Notificaciones