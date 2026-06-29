import { useEffect, useState } from "react";
import "../../css/UserCSS/Styles.css";
import Nav from "../../components/UserNav/UserNav";
import { usuarioService } from "../../services/usuarioService";

function Semaforo() {

    const [datos, setDatos] = useState(null);

    useEffect(() => {

        cargarDatos();

    }, []);

    const cargarDatos = async () => {

        try {

            const data = await usuarioService.obtenerPanel();

            setDatos(data);

        } catch (error) {

            console.error(error);

        }

    };

    if (!datos) {

        return (
            <>
                <Nav />

                <div className="page">

                    <h2>Cargando información...</h2>

                </div>

            </>
        );

    }

    let color = "verde";

    if (datos.cuposDisponibles <= 10) {

        color = "rojo";

    }

    else if (datos.cuposDisponibles <= 20) {

        color = "amarillo";

    }

    return (

        <>

            <Nav />

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
                            className={`luz rojo ${color === "rojo" ? "activa" : ""}`}
                        ></div>

                        <div
                            className={`luz amarillo ${color === "amarillo" ? "activa" : ""}`}
                        ></div>

                        <div
                            className={`luz verde ${color === "verde" ? "activa" : ""}`}
                        ></div>

                    </div>

                    <div className="estado-cupos">

                        <strong>

                            {datos.estadoParqueadero}

                        </strong>

                        <br />

                        Cupos disponibles: {datos.cuposDisponibles}

                    </div>

                </div>

                <section className="cards">

                    <div className="card">

                        <div className="card-icon blue">

                            <i className="fas fa-square-parking"></i>

                        </div>

                        <div>

                            <h3>Cupos Totales</h3>

                            <span>

                                {

                                    datos.cuposDisponibles +

                                    datos.cuposOcupados

                                }

                            </span>

                        </div>

                    </div>

                    <div className="card">

                        <div className="card-icon orange">

                            <i className="fas fa-car-side"></i>

                        </div>

                        <div>

                            <h3>Vehículos Registrados</h3>

                            <span>

                                {datos.totalVehiculos}

                            </span>

                        </div>

                    </div>

                    <div className="card">

                        <div className="card-icon green">

                            <i className="fas fa-check-circle"></i>

                        </div>

                        <div>

                            <h3>Cupos Libres</h3>

                            <span>

                                {datos.cuposDisponibles}

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

                                <td>🟢 Verde</td>

                                <td>Disponible</td>

                                <td>

                                    Hay más de 20 cupos disponibles.

                                </td>

                            </tr>

                            <tr>

                                <td>🟡 Amarillo</td>

                                <td>Capacidad Media</td>

                                <td>

                                    Entre 10 y 20 cupos disponibles.

                                </td>

                            </tr>

                            <tr>

                                <td>🔴 Rojo</td>

                                <td>Completo</td>

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

                    <p>

                        {new Date().toLocaleString()}

                    </p>

                </div>

            </div>

        </>

    );

}

export default Semaforo;