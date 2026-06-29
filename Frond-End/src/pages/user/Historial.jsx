import { useEffect, useState } from "react";
import Nav from "../../components/UserNav/UserNav";
import "../../css/UserCSS/Styles.css";
import { usuarioService } from "../../services/usuarioService";

function Historial() {

    const [historial, setHistorial] = useState([]);
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
        cargarHistorial();
    }, []);

    async function cargarHistorial() {
        try {

            const datos = await usuarioService.obtenerHistorial();

            setHistorial(datos);

        } catch (error) {

            console.error(error);

        }
    }

    const historialFiltrado = historial.filter((registro) => {

        const texto = busqueda.toLowerCase();

        return (
            registro.placa.toLowerCase().includes(texto) ||
            registro.fecha.includes(texto)
        );

    });

    return (
        <>
            <Nav />

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
                            <i className="fas fa-arrow-right-to-bracket"></i>
                        </div>

                        <div>
                            <h3>Total movimientos</h3>
                            <span>{historial.length}</span>
                        </div>

                    </div>

                    <div className="card">

                        <div className="card-icon green">
                            <i className="fas fa-car"></i>
                        </div>

                        <div>

                            <h3>Vehículos utilizados</h3>

                            <span>
                                {
                                    [...new Set(historial.map(h=>h.placa))].length
                                }
                            </span>

                        </div>

                    </div>

                    <div className="card">

                        <div className="card-icon orange">
                            <i className="fas fa-clock"></i>
                        </div>

                        <div>

                            <h3>Último movimiento</h3>

                            <span>

                                {
                                    historial.length
                                    ? historial[0].hora
                                    : "--"
                                }

                            </span>

                        </div>

                    </div>

                </section>

                <div className="panel">

                    <div className="panel-header">

                        <h2>Buscar Registro</h2>

                    </div>

                    <div className="search-box">

                    <i className="fas fa-magnifying-glass"></i>

                    <input

                    type="text"

                    placeholder="Buscar por placa o fecha..."

                    value={busqueda}

                    onChange={(e)=>setBusqueda(e.target.value)}

                    />

                    </div>

                </div>

                <div className="panel">

                    <div className="panel-header">

                        <h2>Historial de Uso</h2>

                    </div>

                    <table>

                       <thead>

                        <tr>

                        <th>Fecha</th>

                        <th>Hora</th>

                        <th>Vehículo</th>

                        <th>Movimiento</th>

                        <th>Estado</th>

                        </tr>

                        </thead>

                        <tbody>

                            {
                                historialFiltrado.length === 0 ?

                                    (
                                        <tr>

                                            <td colSpan="4">

                                                No hay registros.

                                            </td>

                                        </tr>

                                    )

                                    :

                                    historialFiltrado.map((registro, index) => (

                                        <tr key={index}>

                                            <td>{registro.fecha}</td>

                                            <td>{registro.hora}</td>

                                            <td>{registro.placa}</td>

                                            <td>

                                            <span
                                            className={
                                            registro.movimiento === "Entrada"
                                            ? "badge success"
                                            : "badge danger"
                                            }
                                            >

                                            {
                                            registro.movimiento === "Entrada"
                                            ?
                                            "🟢 Entrada"
                                            :
                                            "🔴 Salida"
                                            }

                                            </span>

                                            </td>

                                            <td>

                                            <span
                                            className={
                                            registro.movimiento==="Entrada"
                                            ?
                                            "badge warning"
                                            :
                                            "badge success"
                                            }
                                            >

                                            {
                                            registro.movimiento==="Entrada"
                                            ?
                                            "🅿️ En parqueadero"
                                            :
                                            "✅ Finalizado"
                                            }

                                            </span>

                                            </td>

                                        </tr>

                                    ))

                            }

                        </tbody>

                    </table>

                </div>

                <div className="panel">

                <div className="panel-header">

                <h2>

                Resumen

                </h2>

                </div>

                <div className="info-box">

                <div className="info-card">

                <i className="fas fa-clock"></i>

                <h3>

                Historial Automático

                </h3>

                <p>

                Cada ingreso y salida queda registrado automáticamente.

                </p>

                </div>

                <div className="info-card">

                <i className="fas fa-shield-halved"></i>

                <h3>

                Información Segura

                </h3>

                <p>

                Tus registros únicamente pueden ser consultados por personal autorizado.

                </p>

                </div>

                <div className="info-card">

                <i className="fas fa-chart-column"></i>

                <h3>

                Estadísticas

                </h3>

                <p>

                Consulta el comportamiento de uso de tu parqueadero.

                </p>

                </div>

                </div>

                </div>

            </div>

        </>
    );

}

export default Historial;