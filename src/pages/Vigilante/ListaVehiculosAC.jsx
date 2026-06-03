function ListaVehiculosAC (){
    return(
        <main class="container-vista">
        <div class="card-modulo">
            <h1>Lista de Vehículos Activos</h1>
            <p class="desc-modulo">Monitoreo en tiempo real de vehículos estacionados en el complejo Redeban.</p>
           
            <div class="campo-grupo" style="max-width: 350px; margin-bottom: 20px;">
                <label for="inputBuscarPlaca">🔍 Filtrar / Buscar por Placa:</label>
                <input type="text" id="inputBuscarPlaca" class="campo-input" placeholder="Ej: ABC-123" oninput="buscarVehiculoRealTime()"/>
            </div>

            <div class="tabla-contenedor">
                <table>
                    <thead>
                        <tr>
                            <th>Placa</th>
                            <th>Funcionario / Propietario</th>
                            <th>Celda Asignada</th>
                            <th>Tipo Vehículo</th>
                            <th>Hora de Ingreso</th>
                            <th>Categoría</th>
                        </tr>
                    </thead>
                    <tbody id="tbodyVehiculos">
                        <tr><td>MHK-452</td><td>Carlos Restrepo</td><td>A-2</td><td>🚗 Carro</td><td>07:15 AM</td><td>Planta</td></tr>
                        <tr><td>QWE-890</td><td>Andrea Gómez</td><td>A-4</td><td>🚗 Carro</td><td>08:02 AM</td><td>Visitante</td></tr>
                        <tr><td>ZXC-112</td><td>Marcos Silva</td><td>B-2</td><td>🚗 Carro</td><td>08:45 AM</td><td>VIP</td></tr>
                        <tr><td>JKL-741</td><td>Felipe Novoa</td><td>C-2</td><td>⚡ Eléctrico</td><td>09:12 AM</td><td>Planta</td></tr>
                        <tr><td>RTY-556</td><td>Lucía Méndez</td><td>B-4</td><td>🏍️ Moto</td><td>10:00 AM</td><td>Visitante</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </main>
    )
}

export default ListaVehiculosAC