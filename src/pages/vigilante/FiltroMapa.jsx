
function FiltroMapa (){
    return(
        <main class="dash-content">
        
        <section class="metrics-grid">
          <div class="metric-card">
            <div class="metric-icon blue">🔲</div>
            <div class="metric-data">
              <div class="num" id="total-celdas-lbl">0</div>
              <div class="lbl">Celdas en Nivel</div>
            </div>
          </div>
          <div class="metric-card">
            <div class="metric-icon green">🟢</div>
            <div class="metric-data">
              <div class="num" id="map-free">0</div>
              <div class="lbl">Libres</div>
            </div>
          </div>
          <div class="metric-card">
            <div class="metric-icon orange">🔴</div>
            <div class="metric-data">
              <div class="num" id="map-occ">0</div>
              <div class="lbl">Ocupadas / Reserva</div>
            </div>
          </div>
        </section>

        <article class="panel-card" style="padding: 0; overflow: hidden; background: none; border: none; box-shadow: none;">
          
          <div class="bg-white p-3 rounded-top border d-flex justify-content-between align-items-center border-bottom">
            <div>
              <h5 class="fw-bold mb-0" style="font-size: 1.1rem; color: #1e293b;">Control de Estacionamiento Estructural</h5>
              <small class="text-muted">Redeban Sede Principal | Área Total: 5.200m²</small>
            </div>
            <div class="btn-group">
              <button onclick="cambiarNivel(1)" id="btn-n1" class="btn-level active">SÓTANO 1</button>
              <button onclick="cambiarNivel(2)" id="btn-n2" class="btn-level">SÓTANO 2</button>
            </div>
          </div>

          <div class="bg-white px-3 py-2 border-bottom">
            <div class="filter-bar" id="map-filters" style="margin-bottom: 0;">
              <div class="filter-chip active" onclick="filterMap('all', this)">🔲 Todos</div>
              <div class="filter-chip" onclick="filterMap('Libre', this)">🟢 Libres</div>
              <div class="filter-chip" onclick="filterMap('En parqueo', this)">🔴 Ocupados</div>
              <div class="filter-chip" onclick="filterMap('En reserva', this)">🟡 En Reserva</div>
            </div>
          </div>
          
          <div class="bg-dark p-3 shadow-lg" style="min-height: 600px; position: relative; overflow-x: auto;" id="contenedor-mapa">
            </div>

          <div class="bg-light p-2 rounded-bottom border d-flex justify-content-around small fw-bold text-secondary" style="background: #f8fafc;" id="footer-tecnico">
            <span id="lbl-resumen-puestos">SÓTANO 1: 50 CELDAS</span>
            <span>RESISTENCIA DE PLACA: 500 kg/m²</span>
            <span id="lbl-altura">ALTURA LIBRE: 3.50m</span>
          </div>

        </article>

      </main>
    )
}

export default FiltroMapa