import { useEffect, useState } from "react";
import "../../css/UserCSS/Styles.css";
import Nav from "../../components/UserNav/UserNav";
import { usuarioService } from "../../services/usuarioService";

function PanelControl() {

    const [panel, setPanel] = useState(null);

    useEffect(() => {

        cargarPanel();

    }, []);

    const cargarPanel = async () => {

        try {

            const data = await usuarioService.obtenerPanel();

            setPanel(data);

        } catch (error) {

            console.error(error);

        }

    };

    if (!panel) {

        return <h2 style={{ padding: "30px" }}>Cargando información...</h2>;

    }

    return (

        <>
            <Nav />

            <main className="main">

                <header className="topbar">

                <div>

                    <span className="saludo">

                        👋 Bienvenido nuevamente

                    </span>

                    <h1>

                        Panel de Control

                    </h1>

                    <p>

                        Consulta el estado del parqueadero en tiempo real.

                    </p>

                </div>

                <div className="user-profile">

                    <div className="avatar">

                        <i className="fas fa-user"></i>

                    </div>

                    <div>

                        <h4>

                            Usuario ParkLink

                        </h4>

                        <small>

                            Funcionario

                        </small>

                    </div>

                </div>

            </header>

                <section className="cards">

                    <div className="card">

                        <div className="card-icon blue">

                            <i className="fas fa-car"></i>

                        </div>

                        <div className="card-info">

                            <h3>

                                Vehículos Registrados

                            </h3>

                            <span>

                                {panel.totalVehiculos}

                            </span>

                            <small>

                                Autorizados en el sistema

                            </small>

                        </div>

                    </div>

                    <div className="card">

                        <div className="card-icon green">

                            <i className="fas fa-square-parking"></i>

                        </div>

                        <div className="card-info">

                            <h3>

                                Cupos Disponibles

                            </h3>

                            <span>

                                {panel.cuposDisponibles}

                            </span>

                            <small>

                                Libres actualmente

                            </small>

                        </div>

                    </div>

                    <div className="card">

                        <div className="card-icon orange">

                            <i className="fas fa-car-side"></i>

                        </div>

                        <div className="card-info">

                            <h3>

                                Cupos Ocupados

                            </h3>

                            <span>

                                {panel.cuposOcupados}

                            </span>

                            <small>

                                En uso

                            </small>

                        </div>

                    </div>

                    <div className="card">

                        <div className="card-icon red">

                            <i className="fas fa-circle-check"></i>

                        </div>

                        <div className="card-info">

                            <h3>

                                Estado General

                            </h3>

                            <span>

                                {panel.estadoParqueadero}

                            </span>

                            <small>

                                Sistema funcionando

                            </small>

                        </div>

                    </div>

                </section>

                <section className="dashboard-grid">

                    <div className="panel">

                        <div className="panel-header">

                            <h2>

                                Estado General

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

                        <div className="barra-container">

                            <div className="barra">

                                <div
                                    className="barra-fill"
                                    style={{ width: `${panel.ocupacion}%` }}
                                ></div>

                            </div>

                            <span>

                                Ocupación actual {panel.ocupacion}%

                            </span>

                        </div>

                    </div>

                    <div className="panel">

                        <div className="panel-header">

                            <h2>

                                Nivel de Ocupación

                            </h2>

                        </div>

                        <div className="ocupacion">

                            <div className="circle" style={{ "--valor": panel.ocupacion}}>
                                <h2>

                                    {panel.ocupacion}%

                                </h2>

                                <small>

                                    Capacidad

                                </small>

                            </div>

                            <p>

                                El sistema actualiza esta información en tiempo real.

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

                        {
                            panel.actividad.map((item, index) => (

                                <tr key={index}>

                                    <td>

                                        <strong>{item.hora}</strong>

                                    </td>

                                    <td>

                                        <div className="evento-info">

                                            <div className="evento-icono">

                                                <i className="fas fa-car"></i>

                                            </div>

                                            <div>

                                                <strong>{item.evento}</strong>

                                                <small>

                                                    Movimiento registrado correctamente

                                                </small>

                                            </div>

                                        </div>

                                    </td>

                                    <td>

                                        <span

                                            className={`badge ${
                                                item.estado === "Entrada"
                                                    ? "success"
                                                    : item.estado === "Salida"
                                                    ? "danger"
                                                    : "warning"
                                            }`}

                                        >

                                            {item.estado}

                                        </span>

                                    </td>

                                </tr>

                            ))
                        }

                        </tbody>

                    </table>

                </section>

                <section className="info-box">

        

                    <section className="panel">

                        <div className="panel-header">

                            <h2>
                                Accesos rápidos
                            </h2>

                        </div>

                        <div className="info-box">

                            <div className="info-card">

                                <i className="fas fa-car"></i>

                                <h3>Mis Vehículos</h3>

                                <p>
                                    Administra los vehículos registrados en tu cuenta.
                                </p>

                            </div>

                            <div className="info-card">

                                <i className="fas fa-calendar-check"></i>

                                <h3>Reservas</h3>

                                <p>
                                    Programa una reserva antes de llegar al parqueadero.
                                </p>

                            </div>

                            <div className="info-card">

                                <i className="fas fa-clock-rotate-left"></i>

                                <h3>Historial</h3>

                                <p>
                                    Consulta todos tus ingresos y salidas registrados.
                                </p>

                            </div>

                        </div>

                    </section>
                </section>

            </main>

        </>

    );

}

export default PanelControl;