import '../../css/UserCSS/Styles.css'
import Nav from '../../components/UserNav/UserNav'

function PanelControl (){
    return(

        <>
        <Nav/>
        <main className="main">


    <header className="topbar">

        <div>

            <h1>Panel de control</h1>

            <p>
                Sistema de Gestión de Parqueaderos
            </p>

        </div>

        <div className="user-profile">

            <i className="fas fa-user-circle"></i>

            <div>

                <h4>Administrador</h4>

                <small id="fechaActual"></small>

            </div>

        </div>

    </header>


    <section className="cards">

        <div className="card">

            <div className="card-icon blue">

                <i className="fas fa-car"></i>

            </div>

            <div>

                <h3>Total Vehículos</h3>

                <span id="totalVehiculos">0</span>

            </div>

        </div>

        <div className="card">

            <div className="card-icon green">

                <i className="fas fa-square-parking"></i>

            </div>

            <div>

                <h3>Cupos Disponibles</h3>

                <span id="cuposDisponibles">50</span>

            </div>

        </div>

        <div className="card">

            <div className="card-icon orange">

                <i className="fas fa-car-side"></i>

            </div>

            <div>

                <h3>Cupos Ocupados</h3>

                <span id="cuposOcupados">0</span>

            </div>

        </div>

        <div className="card">

            <div className="card-icon red">

                <i className="fas fa-circle-exclamation"></i>

            </div>

            <div>

                <h3>Estado</h3>

                <span id="estadoParqueadero">

                    Disponible

                </span>

            </div>

        </div>

    </section>


    <section className="dashboard-grid">



        <div className="panel">

            <div className="panel-header">

                <h2>
                    Estado General del Parqueadero
                </h2>

            </div>

            <div className="estado-container">

                <div className="estado-item">

                    <span className="status-dot green"></span>

                    Sistema Operativo

                </div>

                <div className="estado-item">

                    <span className="status-dot blue"></span>

                    Cámaras Activas

                </div>

                <div className="estado-item">

                    <span className="status-dot orange"></span>

                    Monitoreo en Tiempo Real

                </div>

            </div>

        </div>


        <div className="panel">

            <div className="panel-header">

                <h2>Ocupación</h2>

            </div>

            <div className="ocupacion">

                <div className="circle">

                    <h2>50%</h2>

                </div>

                <p>

                    Nivel actual de ocupación

                </p>

            </div>

        </div>

    </section>


    <section className="panel">

        <div className="panel-header">

            <h2>

                Actividad Reciente

            </h2>

        </div>

        <table>

            <thead>

                <tr>

                    <th>Hora</th>

                    <th>Evento</th>

                    <th>Estado</th>

                </tr>

            </thead>

            <tbody>

                <tr>

                    <td>07:15 AM</td>

                    <td>
                        Ingreso de vehículo
                        ABC123
                    </td>

                    <td>

                        <span className="badge success">

                            Correcto

                        </span>

                    </td>

                </tr>

                <tr>

                    <td>08:30 AM</td>

                    <td>

                        Salida de vehículo
                        XYZ987

                    </td>

                    <td>

                        <span className="badge info">

                            Procesado

                        </span>

                    </td>

                </tr>

                <tr>

                    <td>09:40 AM</td>

                    <td>

                        Capacidad cercana
                        al límite

                    </td>

                    <td>

                        <span className="badge warning">

                            Atención

                        </span>

                    </td>

                </tr>

            </tbody>

        </table>

    </section>


    <section className="info-box">

        <div className="info-card">

            <i className="fas fa-shield-halved"></i>

            <h3>Seguridad</h3>

            <p>

                Control de acceso y monitoreo
                permanente de vehículos.

            </p>

        </div>

        <div className="info-card">

            <i className="fas fa-clock"></i>

            <h3>Disponibilidad</h3>

            <p>

                Consulta en tiempo real
                los cupos disponibles.

            </p>

        </div>

        <div className="info-card">

            <i className="fas fa-chart-column"></i>

            <h3>Estadísticas</h3>

            <p>

                Reportes y métricas
                actualizadas automáticamente.

            </p>

        </div>

    </section>

</main>
</>
    )
}

export default PanelControl