import { useEffect, useState } from "react";
import Nav from "../../components/UserNav/UserNav";
import { usuarioService } from "../../services/usuarioService";
import "../../css/UserCSS/Styles.css";

function VehiculosU() {

    const [vehiculos, setVehiculos] = useState([]);

    const [formulario, setFormulario] = useState({
        placa: "",
        tipo_vehiculo: "Automóvil",
        marca: "",
        color: ""
    });

    const [cargando, setCargando] = useState(false);

    useEffect(() => {

        cargarVehiculos();

    }, []);

    const cargarVehiculos = async () => {

        try {

            const data = await usuarioService.obtenerVehiculos();

            setVehiculos(data);

        } catch (error) {

            console.error(error);

        }

    };

    const handleChange = (e) => {

        setFormulario({

            ...formulario,

            [e.target.name]: e.target.value

        });

    };

    const registrarVehiculo = async () => {

        if (
            !formulario.placa ||
            !formulario.marca ||
            !formulario.color
        ) {

            alert("Complete todos los campos.");

            return;

        }

        try {

            setCargando(true);

            await usuarioService.registrarVehiculo(formulario);

            alert("Vehículo registrado correctamente.");

            setFormulario({

                placa: "",

                tipo_vehiculo: "Automóvil",

                marca: "",

                color: ""

            });

            cargarVehiculos();

        } catch (error) {

            alert(error.message);

        } finally {

            setCargando(false);

        }

    };

    return (

        <>

            <Nav />

            <div className="page">

                <div className="topbar">

                    <div>

                        <h1>Gestión de Vehículos</h1>

                        <p>

                            Administre los vehículos asociados a su cuenta.

                        </p>

                    </div>

                </div>

                <div className="form">

                    <h2>

                        Registrar Vehículo

                    </h2>

                    <input

                        type="text"

                        name="placa"

                        placeholder="Placa"

                        value={formulario.placa}

                        onChange={handleChange}

                    />

                    <select

                        name="tipo_vehiculo"

                        value={formulario.tipo_vehiculo}

                        onChange={handleChange}

                    >

                        <option>Automóvil</option>

                        <option>Moto</option>

                        <option>Camioneta</option>

                    </select>

                    <input

                        type="text"

                        name="marca"

                        placeholder="Marca"

                        value={formulario.marca}

                        onChange={handleChange}

                    />

                    <input

                        type="text"

                        name="color"

                        placeholder="Color"

                        value={formulario.color}

                        onChange={handleChange}

                    />

                    <button

                        onClick={registrarVehiculo}

                        disabled={cargando}

                    >

                        {

                            cargando

                                ? "Registrando..."

                                : "Registrar Vehículo"

                        }

                    </button>

                </div>

                <div className="panel">

                    <div className="panel-header">

                        <h2>

                            Mis Vehículos

                        </h2>

                    </div>

                    <table>

                        <thead>

                            <tr>

                                <th>Placa</th>

                                <th>Tipo</th>

                                <th>Marca</th>

                                <th>Color</th>

                                <th>Área</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                vehiculos.length === 0
                                ? (

    <tr>

        <td colSpan="5">

            No tienes vehículos registrados.

        </td>

    </tr>

) : (

    vehiculos.map((vehiculo) => (

        <tr key={vehiculo.id}>

            <td>

                <strong>

                    {vehiculo.placa}

                </strong>

            </td>

            <td>

                {vehiculo.tipo_vehiculo}

            </td>

            <td>

                {vehiculo.marca || "-"}

            </td>

            <td>

                {vehiculo.color || "-"}

            </td>

            <td>

                {vehiculo.area}

            </td>

        </tr>

    ))

)

}

                        </tbody>

                    </table>

                </div>

            </div>

        </>

    );

}

export default VehiculosU;