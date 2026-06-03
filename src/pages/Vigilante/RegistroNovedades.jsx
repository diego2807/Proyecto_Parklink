function RegistroNovedades (){
    return(
        <main class="container-vista">
        <div class="card-modulo">
            <h1>Registro de Novedades del Parqueadero</h1>
            <p class="desc-modulo">Reporte inmediato de anomalías (golpes previos, vehículos mal estacionados o sin autorización).</p>
           
            <form class="form-layout" onsubmit="event.preventDefault(); alert('Novedad reportada de forma segura.'); this.reset();">
                <div class="campo-grupo">
                    <label for="novPlaca">Placa Relacionada:</label>
                    <input type="text" id="novPlaca" class="campo-input" placeholder="Ej: ABC-123" required/>
                </div>
                <div class="campo-grupo">
                    <label for="novTipo">Clasificación del Incidente:</label>
                    <select id="novTipo" class="campo-input" required>
                        <option value="">-- Seleccione anomalía --</option>
                        <option value="1">Vehículo Ocupando Dos Celdas</option>
                        <option value="2">Daño o Rayón Previo Detectado</option>
                        <option value="3">Estacionado en Celda Especial (Sin Permiso)</option>
                    </select>
                </div>
                <div class="campo-grupo">
                    <label for="novObs">Detalles Ampliados:</label>
                    <input type="text" id="novObs" class="campo-input" placeholder="Describa brevemente lo observado..." required/>
                </div>
                <button type="submit" class="btn-accion btn-danger">Emitir Reporte Oficial</button>
            </form>
        </div>
    </main>
    )

}
export default RegistroNovedades