import { useEffect, useState } from "react";
import { usuarioService } from "../../services/usuarioService";
import "../../css/UserCSS/Styles.css";
import Nav from "../../components/UserNav/UserNav";

function Notificaciones() {

    const [notificaciones, setNotificaciones] = useState([]);

    useEffect(() => {

        cargarNotificaciones();

    }, []);

    async function cargarNotificaciones(){

        try{

            const data = await usuarioService.obtenerNotificaciones();

            setNotificaciones(data);

        }

        catch(error){

            console.error(error);

        }

    }

    return (

        <>
            <Nav />

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

                            <span>

                                {notificaciones.length}

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

                            <span>

                                {
                                    notificaciones.length > 0
                                        ? notificaciones[0].fecha
                                        : "--"
                                }

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

                    {

                        notificaciones.length === 0 ?

                            (

                                <p>

                                    No hay notificaciones disponibles.

                                </p>

                            )

                            :

                            notificaciones.map((n, index) => (


                    <div
                    key={n.id}
                    className="notificacion-card"
                    >

                    <div className="notificacion-icon">

                    {

                    n.descripcion.toLowerCase().includes("vehículo")

                    ?

                    "🚗"

                    :

                    n.descripcion.toLowerCase().includes("reserva")

                    ?

                    "📅"

                    :

                    n.descripcion.toLowerCase().includes("alert")

                    ?

                    "⚠️"

                    :

                    "🔔"

                    }

                    </div>

                    <div className="notificacion-info">

                    <div className="notificacion-top">

                    <h3>

                    {n.descripcion}

                    </h3>

                    {

                    index === 0 &&

                    <span className="badge success">

                    NUEVA

                    </span>

                    }

                    </div>

                    <p>

                    {n.fecha}

                    </p>

                    </div>

                    </div>

                    ))

                    }

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

                                <td>Registro o eliminación de vehículos.</td>

                            </tr>

                            <tr>

                                <td>⚠️ Alerta</td>

                                <td>Advertencias relacionadas con cupos.</td>

                            </tr>

                            <tr>

                                <td>✅ Sistema</td>

                                <td>Eventos importantes del sistema.</td>

                            </tr>

                            <tr>

                                <td>🔔 General</td>

                                <td>Información para el usuario.</td>

                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>

        </>

    );

}

export default Notificaciones;