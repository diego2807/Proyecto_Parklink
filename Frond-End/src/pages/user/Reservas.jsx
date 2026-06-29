import { useEffect, useState } from "react";
import "../../css/UserCSS/Styles.css";
import Nav from "../../components/UserNav/UserNav";

import { vehiculoService } from "../../services/vehiculoService";
import { reservaService } from "../../services/reservaService";

function Reservas() {

    const [vehiculos, setVehiculos] = useState([]);
    const [reservas, setReservas] = useState([]);

    const [vehiculoId, setVehiculoId] = useState("");
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");

    useEffect(() => {

        cargarVehiculos();
        cargarReservas();

    }, []);

    async function cargarVehiculos() {

        try {

            const data = await vehiculoService.obtenerVehiculos();

            setVehiculos(data);

        } catch (error) {

            console.log(error);

        }

    }

    async function cargarReservas() {

        try {

            const data = await reservaService.obtenerReservas();

            setReservas(data);

        } catch (error) {

            console.log(error);

        }

    }

    async function guardarReserva() {

        if (!vehiculoId || !fecha || !hora) {

            alert("Complete todos los campos.");

            return;

        }

        try {

            await reservaService.crearReserva({

                vehiculo_id: vehiculoId,
                fecha,
                hora

            });

            alert("Reserva creada correctamente.");

            setVehiculoId("");
            setFecha("");
            setHora("");

            cargarReservas();

        }

        catch (error) {

            alert(error.message);

        }

    }

    return (

        <>
            <Nav />

            <div className="page">

                <div className="topbar">

                    <div>

                        <h1>Reservas</h1>

                        <p>

                            Reserve su cupo antes de llegar.

                        </p>

                    </div>

                </div>

                <div className="panel">

                    <div className="panel-header">

                        <h2>Nueva Reserva</h2>

                    </div>

                    <div className="form">

                        <select
                            value={vehiculoId}
                            onChange={(e) => setVehiculoId(e.target.value)}
                        >

                            <option value="">

                                Seleccione un vehículo

                            </option>

                            {

                                vehiculos.map((vehiculo) => (

                                    <option
                                        key={vehiculo.id}
                                        value={vehiculo.id}
                                    >

                                        {vehiculo.placa}

                                    </option>

                                ))

                            }

                        </select>

                        <input
                            type="date"
                            value={fecha}
                            onChange={(e) => setFecha(e.target.value)}
                        />

                        <input
                            type="time"
                            value={hora}
                            onChange={(e) => setHora(e.target.value)}
                        />

                        <button onClick={guardarReserva}>

                            Reservar

                        </button>

                    </div>

                </div>

                <div className="panel">

                    <div className="panel-header">

                        <h2>Mis Reservas</h2>

                    </div>

                    <table>

                        <thead>

                            <tr>

                                <th>Vehículo</th>

                                <th>Fecha</th>

                                <th>Hora</th>

                                <th>Estado</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                reservas.map((reserva) => (

                                    <tr key={reserva.id}>

                                        <td>{reserva.placa}</td>

                                        <td>{reserva.fecha}</td>

                                        <td>{reserva.hora}</td>

                                        <td>{reserva.estado}</td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </>

    );

}

export default Reservas;