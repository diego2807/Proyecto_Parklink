import '../../css/VigilanteCSS/style.css'

function FiltroMapa (){
    return(
      
      
        <main className="dash-content">
        
        <section className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon blue">🔲</div>
            <div className="metric-data">
              <div className="num" id="total-celdas-lbl">0</div>
              <div className="lbl">Celdas en Nivel</div>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-icon green">🟢</div>
            <div className="metric-data">
              <div className="num" id="map-free">0</div>
              <div className="lbl">Libres</div>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-icon orange">🔴</div>
            <div className="metric-data">
              <div className="num" id="map-occ">0</div>
              <div className="lbl">Ocupadas / Reserva</div>
            </div>
          </div>
        </section>

        <article className="panel-card" style={{ padding: '0', overflow: 'hidden', background: 'none', border: 'none', boxShadow: 'none' 
  }}
>
          
          <div className="bg-white p-3 rounded-top border d-flex justify-content-between align-items-center border-bottom">
            <div>
              <h5 className="fw-bold mb-0" style={{ fontSize: '1.1rem', color: '#1e293b' }}> Control de Estacionamiento Estructural</h5>
              <small className="text-muted">Redeban Sede Principal | Área Total: 5.200m²</small>
            </div>
            <div className="btn-group">
              <button onClick="cambiarNivel(1)" id="btn-n1" className="btn-level active">SÓTANO 1</button>
              <button onClick="cambiarNivel(2)" id="btn-n2" className="btn-level">SÓTANO 2</button>
            </div>
          </div>

          <div className="bg-white px-3 py-2 border-bottom">
            <div className="filter-bar" id="map-filters" style={{ marginBottom: '0' }}>
              <div className="filter-chip active" onClick="filterMap('all', this)">🔲 Todos</div>
              <div className="filter-chip" onClick="filterMap('Libre', this)">🟢 Libres</div>
              <div className="filter-chip" onClick="filterMap('En parqueo', this)">🔴 Ocupados</div>
              <div className="filter-chip" onClick="filterMap('En reserva', this)">🟡 En Reserva</div>
            </div>
          </div>
          
          <div className="bg-dark p-3 shadow-lg" style={{ minHeight: '600px', position: 'relative', overflowX: 'auto' }} id="contenedor-mapa">
            </div>

          <div className="bg-light p-2 rounded-bottom border d-flex justify-content-around small fw-bold text-secondary" style="background: #f8fafc;" id="footer-tecnico">
            <span id="lbl-resumen-puestos">SÓTANO 1: 50 CELDAS</span>
            <span>RESISTENCIA DE PLACA: 500 kg/m²</span>
            <span id="lbl-altura">ALTURA LIBRE: 3.50m</span>
          </div>

        </article>

      </main>
    )
}

export default FiltroMapa