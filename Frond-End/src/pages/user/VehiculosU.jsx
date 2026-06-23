import '../../css/UserCSS/Styles.css'
import Nav from '../../components/UserNav/UserNav'

function VehiculosU (){
    return(
        <>
        <Nav/>
        <div className="page">

    <div className="topbar">

        <div>

            <h1>Gestión de Vehículos</h1>

            <p>
                Registre y administre sus vehículos autorizados
            </p>

        </div>

    </div>


    <div className="form">

        <h2 style={{marginBottom:'20px'}}>

            Registrar Vehículo

        </h2>

        <input
        id="placa"
        type="text"
        placeholder="Placa del vehículo"/>

        <input
        id="propietario"
        type="text"
        placeholder="Nombre del propietario"/>

        <select id="tipo">

            <option value="Automóvil">
                Automóvil
            </option>

            <option value="Moto">
                Moto
            </option>

            <option value="Camioneta">
                Camioneta
            </option>

        </select>

        <input
        id="marca"
        type="text"
        placeholder="Marca"/>

        <input
        id="color"
        type="text"
        placeholder="Color"/>

        <button onClick="guardarVehiculo()">

            <i className="fas fa-plus"></i>

            Registrar Vehículo

        </button>

    </div>


    <div className="panel">

        <div className="panel-header">

            <h2>

                Vehículos Registrados

            </h2>

        </div>

        <table>

            <thead>

                <tr>

                    <th>Placa</th>

                    <th>Propietario</th>

                    <th>Tipo</th>

                    <th>Marca</th>

                    <th>Color</th>

                    <th>Acciones</th>

                </tr>

            </thead>

            <tbody id="tablaVehiculos">

            </tbody>

        </table>

    </div>

</div>
</>
    )
}

export default VehiculosU