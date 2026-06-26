import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/VigilanteNav/VigilanteNav";

import { vigilanteService } from "../../services/vigilanteService";

import "../../css/VigilanteCSS/vehiculosActivos.css";

function ListaVehiculosActivo() {

    const navigate = useNavigate();

    const [vehiculos, setVehiculos] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        cargarVehiculos();
    }, []);

    const cargarVehiculos = async () => {

        try {

            setCargando(true);

            const data = await vigilanteService.obtenerVehiculosActivos();

            setVehiculos(data);

        } catch (error) {

            console.error(error);
            alert(error.message);

        } finally {

            setCargando(false);

        }

    };

    const handleLiberar = (placa) => {

    navigate(`/FormularioSalida?placa=${placa}`);

    };

    const vehiculosFiltrados = vehiculos.filter((vehiculo) =>
        vehiculo.placa.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <>

            <main>

                <Nav />

                <section className="dash-content">

                    <div className="dash-page">

                        <div className="page-title">

                            <h2>🚗 Vehículos en Estacionamiento</h2>

                            <p>
                                Administra en tiempo real los vehículos activos dentro del sistema.
                            </p>

                        </div>

                        <article className="panel-card">

                            <div className="panel-card-header vehiculos-header">

                                <div>

                                    <h3>Inventario Activo</h3>

                                    <span className="subtext">
                                        Vehículos actualmente dentro del parqueadero.
                                    </span>

                                </div>

                                <div className="header-actions">

                                    <div className="search-box">

                                        <span className="search-icon">
                                            🔎
                                        </span>

                                        <input
                                            type="search"
                                            className="search-input"
                                            placeholder="Buscar placa..."
                                            value={busqueda}
                                            onChange={(e) =>
                                                setBusqueda(e.target.value)
                                            }
                                        />

                                    </div>

                                </div>

                            </div>

                            <div className="mini-stats">

                                <div className="stat-card">

                                    <span>🟢 Vehículos Activos</span>

                                    <strong>{vehiculos.length}</strong>

                                </div>

                            </div>

                            <div className="panel-card-body no-padding">

                                <div className="table-responsive">

                                    <table className="modern-table vehiculos-table">

                                        <thead>

                                            <tr>

                                                <th>Celda</th>
                                                <th>Placa</th>
                                                <th>Fecha de Entrada</th>
                                                <th>Tipo Vehículo</th>
                                                <th>Estado</th>
                                                <th>Acción</th>

                                            </tr>

                                        </thead>

                                        <tbody>

                                            {
                                                cargando ? (

                                                    <tr>

                                                        <td colSpan="6">
                                                            Cargando vehículos...
                                                        </td>

                                                    </tr>

                                                ) :

                                                    vehiculosFiltrados.length === 0 ? (

                                                        <tr>

                                                            <td colSpan="6">
                                                                No hay vehículos activos.
                                                            </td>

                                                        </tr>

                                                    ) :

                                                        (

                                                            vehiculosFiltrados.map((vehiculo) => (

                                                                <tr key={vehiculo.placa}>

                                                                    <td className="strong">
                                                                        {vehiculo.celda}
                                                                    </td>

                                                                    <td className="plate">
                                                                        {vehiculo.placa}
                                                                    </td>

                                                                    <td>
                                                                        {vehiculo.fecha_entrada}
                                                                    </td>

                                                                    <td>
                                                                        {vehiculo.tipo_vehiculo}
                                                                    </td>

                                                                    <td>

                                                                        <span className="badge directivo">
                                                                            Activo
                                                                        </span>

                                                                    </td>

                                                                    <td>

                                                                        <button
                                                                            className="btn-danger small"
                                                                            onClick={() =>
                                                                                handleLiberar(
                                                                                    vehiculo.placa
                                                                                )
                                                                            }
                                                                        >

                                                                            Registrar Salida

                                                                        </button>

                                                                    </td>

                                                                </tr>

                                                            ))

                                                        )

                                            }

                                        </tbody>

                                    </table>

                                </div>

                            </div>

                        </article>

                    </div>

                </section>

            </main>


        </>
    );

}

export default ListaVehiculosActivo;