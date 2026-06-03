function FiltroMapa (){
    return(
        <main class="container-vista">
        <div class="card-modulo">
            <h1>Filtro Temático del Mapa</h1>
            <p class="desc-modulo">Filtre interactivamente la visualización de celdas por su tipo o estado específico.</p>
           
            <div style="display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap;">
                <button class="btn-nav" onclick="filtrarMapaTematico('todos')">Ver Todo</button>
                <button class="btn-nav" onclick="filtrarMapaTematico('libre')">Solo Libres</button>
                <button class="btn-nav" onclick="filtrarMapaTematico('ocupado')">Solo Ocupadas</button>
                <button class="btn-nav" onclick="filtrarMapaTematico('discapacidad')">Solo Discapacidad</button>
                <button class="btn-nav" onclick="filtrarMapaTematico('electrico')">Solo Eléctricos</button>
                <button class="btn-nav" onclick="filtrarMapaTematico('vip')">Solo VIP</button>
            </div>

            <div class="grid-mapa" id="gridMapaFiltro"></div>
        </div>
    </main>
    )
}

export default FiltroMapa