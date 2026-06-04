import '../../css/VigilanteCSS/style.css'
import { Link } from "react-router-dom";

function RegistroNovedades (){
    return(
      
        <div className="dash-layout">
    
    <aside className="sidebar" id="sidebar">
      <div className="sidebar-logo">
        <div className="logo-mark" style={{ padding: '24px', color: 'white', fontWeight: 700, fontSize: '1.25rem' }}>
          🅿️ Parklink <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Redeban Cloud</span>
        </div>
      </div>
   
      <ul className="sidebar-menu" id="sidebarMenu">
        <li className="sidebar-item active"><Link to="Inicio.html" className="sidebar-link">Inicio</Link></li>
        <li className="sidebar-item"><Link to="/src/pages/vigilante/FiltroMapa.jsx" className="sidebar-link">Filtros Mapa</Link></li>
        <li className="sidebar-item"><Link to="/src/pages/vigilante/ListaVehiculosActivo.jsx" className="sidebar-link">Lista Vehículos</Link></li>
        <li className="sidebar-item"><Link to="/src/pages/vigilante/ModalConfirmacion.jsx" className="sidebar-link">Modales</Link></li>
        <li className="sidebar-item"><Link to="/src/pages/vigilante/RegistroNovedades.jsx" className="sidebar-link">Registro Novedades</Link></li>
      </ul>

      <div className="sidebar-footer" style={{ padding: '24px' }}>
        <a href="Login.html" className="btn-logout" style={{ textDecoration: 'none', textAlign: 'center', display: 'block' }}>Cerrar Sesion</a>
      </div>
    </aside>
 
    <div className="dash-main">
      
      <div className="topbar">
        <div style="display:flex; align-items:center; gap:.8rem;">
          <button className="hamburger" onClick="document.getElementById('sidebar').classNameList.toggle('open')">☰</button>
          <div className="topbar-left">
            <div className="topbar-title" style={{ fontWeight: 700, fontSize: '1.2rem' }}>Libro de Novedades</div>
            <div className="topbar-subtitle" style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Bienvenida, Sara — Reporte de incidencias y estado de planta</div>
          </div>
        </div>
        <div className="topbar-right">
          <span className="topbar-badge">🟢 En turno</span>
        </div>
      </div>
   
      <main className="dash-content">
        <div className="dash-header">
          <h2>Bitácora y Reporte de Eventualidades</h2>
          <p>Registra eventos excepcionales detectados en los patios y supervisa el estado de resolución inmediato.</p>
        </div>

        <div className="novedades-layout-grid">
          
          <article className="panel-card">
            <div className="panel-card-header">
              <h3>📋 Registrar Nueva Novedad</h3>
            </div>
            <div className="panel-card-body">
              <form onsubmit="event.preventDefault();">
                
                <div className="form-row-dynamic">
                  <div className="fg">
                    <label htmlFor="nov-placa">Placa del Vehículo</label>
                    <div className="input-wrapper">
                      <input type="text" id="nov-placa" placeholder="ABC-123"/>
                    </div>
                  </div>
                  <div className="fg">
                    <label htmlFor="nov-celda">Celda Relacionada</label>
                    <div className="input-wrapper">
                      <select id="nov-celda">
                        <option value="">Sin celda específica</option>
                        <option>A-01</option><option>A-02</option><option>A-03</option>
                        <option>B-01</option><option>B-02</option><option>C-01</option>
                        <option>D-01 (Discapacidad)</option><option>E-01 (Eléctrico)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-row-dynamic">
                  <div className="fg">
                    <label htmlFor="nov-tipo">Tipo de Novedad</label>
                    <div className="input-wrapper">
                      <select id="nov-tipo" required>
                        <option value="">Seleccione el tipo...</option>
                        <option value="vehiculo">🚗 Vehículo mal parqueado</option>
                        <option value="infraestructura">🔧 Fallo de infraestructura</option>
                        <option value="seguridad">🚨 Incidente de seguridad</option>
                        <option value="daño">⚠ Daño material / colisión</option>
                        <option value="otro">📌 Otro caso</option>
                      </select>
                    </div>
                  </div>
                  <div className="fg">
                    <label htmlFor="nov-prioridad">Nivel de Prioridad</label>
                    <div className="input-wrapper">
                      <select id="nov-prioridad">
                        <option value="baja">🟢 Baja — Reporte rutinario</option>
                        <option value="media">🟡 Media — Atención en turno</option>
                        <option value="alta">🔴 Alta — Emergencia inmediata</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="fg" style={{ marginBottom: '16px' }}>
                  <label htmlFor="nov-desc">Descripción Detallada</label>
                  <textarea id="nov-desc" placeholder="Describe con detalle lo observado: ubicación exacta, hora del incidente, vehículos involucrados..." required></textarea>
                </div>

                <div className="fg" style={{ marginBottom: '24px' }}>
                  <label>¿Requiere acción inmediata?</label>
                  <div style={{ display: 'flex', gap: '20px', marginTop: '6px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontWeight: 500, fontSize: '.9rem' }}>
                      <input type="radio" name="accion" value="si"/> Sí, notificar supervisor
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontWeight: 500, fontSize: '.9rem' }}>
                      <input type="radio" name="accion" value="no" checked/> No, solo registrar
                    </label>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  <button type="button" className="btn-action-out" style={{ flex: 'initial', padding: '10px 24px' }} onClick={() => {document.getElementById('nov-placa').value = '';document.getElementById('nov-desc').value = '';}}>Limpiar</button>
                  <button type="button" className="btn-block">Generar Reporte ✓</button>
                </div>
              </form>
            </div>
          </article>

          <aside className="panel-card">
            <div className="panel-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>Novedades del Turno</h3>
              <span className="badge badge-amber" id="pending-count">3 pendientes</span>
            </div>
            <div className="panel-card-body" style={{ paddingTop: '16px' }}>
              <div className="nov-list">
                
                <div className="nov-item">
                  <div className="nov-icon alta">🚨</div>
                  <div className="nov-info">
                    <h4>Incidente de seguridad</h4>
                    <p>Placa KLO-115 — Zona B</p>
                  </div>
                  <div className="nov-meta">
                    <span className="badge badge-red">Alta</span>
                    <div className="time" style={{ marginTop: '6px', fontSize: '0.75rem', color: 'var(--muted)' }}>09:05</div>
                  </div>
                </div>

                <div className="nov-item">
                  <div className="nov-icon media">⚠</div>
                  <div className="nov-info">
                    <h4>Fallo cámara Sector C</h4>
                    <p>Sin placa registrada</p>
                  </div>
                  <div className="nov-meta">
                    <span className="badge badge-amber">Media</span>
                    <div className="time" style={{ marginTop: '6px', fontSize: '0.75rem', color: 'var(--muted)' }}>13:40</div>
                  </div>
                </div>

                <div className="nov-item">
                  <div className="nov-icon baja">🚗</div>
                  <div className="nov-info">
                    <h4>Vehículo mal parqueado</h4>
                    <p>Placa RTA-222 — Zona E</p>
                  </div>
                  <div className="nov-meta">
                    <span className="badge badge-green">Baja</span>
                    <div className="time" style={{ marginTop: '6px', fontSize: '0.75rem', color: 'var(--muted)' }}>14:22</div>
                  </div>
                </div>

              </div>
            </div>
          </aside>

        </div>
      </main>
    </div>
  </div>
    )
}

export default RegistroNovedades