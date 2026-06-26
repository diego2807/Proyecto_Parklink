import { useEffect, useState } from "react";

import Nav from "../../components/VigilanteNav/VigilanteNav";

import { vigilanteService } from "../../services/vigilanteService";

import "../../css/VigilanteCSS/historial.css";

function HistorialTurno() {

    const [historial, setHistorial] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        cargarHistorial();
    }, []);

    const cargarHistorial = async () => {

        try {

            const data = await vigilanteService.obtenerHistorialTurno();

            setHistorial(data);

        } catch (error) {

            alert(error.message);

        } finally {

            setCargando(false);

        }

    };

    return (
        <>
            <main className="main-content">

                <Nav />

                <section className="historial">

                    <div className="titulo-pagina">
                        <h2>📚 Historial del Turno</h2>

                        <p>
                            Consulte todos los movimientos registrados durante el turno activo.
                        </p>
                    </div>

                    <div className="tabla-historial">

                        <h3>📋 Registros del turno</h3>

                        {
                            cargando ? (

                                <p>Cargando historial...</p>

                            ) : historial.length === 0 ? (

                                <p>No existen registros durante este turno.</p>

                            ) : (

                                <table>

                                    <thead>
                                        <tr>
                                            <th>Fecha y Hora</th>
                                            <th>Movimiento</th>
                                            <th>Placa</th>
                                            <th>Celda</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {
                                            historial.map((registro) => (

                                                <tr key={registro.id}>

                                                    <td>{registro.fecha_hora}</td>

                                                    <td>{registro.movimiento}</td>

                                                    <td>{registro.placa}</td>

                                                    <td>{registro.celda}</td>

                                                </tr>

                                            ))
                                        }

                                    </tbody>

                                </table>

                            )
                        }

                    </div>

                    <div className="recordatorio">

                        <strong>📌 Total de registros:</strong>{" "}
                        {historial.length}

                    </div>

                </section>

            </main>
        </>
    );
}

export default HistorialTurno;