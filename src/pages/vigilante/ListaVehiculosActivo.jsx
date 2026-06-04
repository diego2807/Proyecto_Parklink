import '../../css/VigilanteCSS/style.css'
import { Link } from "react-router-dom";

function ListaVehiculosActivo (){
    return(
         <div className="dash-layout">
    <aside className="sidebar" id="sidebar">
      <div className="sidebar-logo">
        <div className="logo-mark" style={{ padding: '24px', color: 'white', fontWeight: 700, fontSize: '1.25rem' }}>
          🅿️ Parklink<span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Redeban Cloud</span>
        </div>
      </div>
   
      <ul className="sidebar-menu" id="sidebarMenu">
        <li className="sidebar-item active"><a href="Inicio.html" className="sidebar-link">Inicio</a></li>
        <li className="sidebar-item"><Link to="/src/pages/vigilante/FiltroMapa.jsx" className="sidebar-link">Filtros Mapa</Link></li>
        <li className="sidebar-item"><Link to="/src/pages/vigilante/ListaVehiculosActivo.jsx" className="sidebar-link">Lista Vehículos</Link></li>
        <li className="sidebar-item"><Link to="/src/pages/vigilante/ModalConfirmacion.jsx" className="sidebar-link">Modales</Link></li>
        <li className="sidebar-item"><Link to="/src/pages/vigilante/RegistroNovedades.jsx" className="sidebar-link">Registro Novedades</Link></li>
      </ul>
      <div className="sidebar-footer" style={{ padding: '24px' }}>
        <a href="Login.html" className="btn-logout" style={{ textDecoration: 'none', textAlign: 'center', display: 'block' }}>Cerrar Sesión</a>
      </div>
    </aside>
    <div className="dash-main">
      <div className="topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '.8rem' }}>
          <button className="hamburger" onClick={() => document.getElementById('sidebar').classList.toggle('open')}>☰</button>
          <div className="topbar-left">
            <div className="topbar-title" style={{ fontWeight: 700, fontSize: '1.2rem' }}>Vehículos Estacionados</div>
            <div className="topbar-subtitle" style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Monitoreo de unidades activas en las bahías</div>
          </div>
        </div>
        <div className="topbar-right">
          <span className="topbar-badge">🟢 En turno</span>
        </div>
      </div>
   
      <main className="dash-content">
        <article className="panel-card">
          <div className="panel-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3>Inventario de Vehículos en Estacionamiento</h3>
              <span style={{ fontSize: '.78rem', color: 'var(--muted)' }}>Filtra de manera inmediata mediante coincidencia de caracteres.</span>
            </div>
            
            <div style={{ display: 'flex', gap: '.75rem', alignItems: 'center' }}>
              <input type="search" placeholder="Buscar placa..." id="search-placa" style={{ padding: '.55rem .85rem', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '.85rem', width: '190px', outline: 'none', background: 'var(--bg)' }} />
              <button className="btn-action-in" style={{ padding: '10px 16px', fontSize: '0.85rem' }} onClick={() => window.location.href='modalConfirmacion.html'}>+ Check-in rápido</button>
            </div>
          </div>

          <div className="panel-card-body" style={{ padding: 0 }}>
            <div className="table-responsive">
              <table className="modern-table" id="vehicles-table">
                <thead>
                  <tr>
                    <th>Celda</th>
                    <th>Placa</th>
                    <th>Ingreso</th>
                    <th>Tipo Usuario</th>
                    <th>Póliza</th>
                    <th>Tiempo</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody id="vehicles-body">
                  <tr>
                    <td style={{ fontWeight: 700 }}>A-04</td>
                    <td style={{ fontWeight: 700, color: 'var(--blue)' }}>KFX542</td>
                    <td>08:15 AM</td>
                    <td><span className="badge in">Directivo</span></td>
                    <td style={{ color: 'var(--green)', fontWeight: 600 }}>Vigente</td>
                    <td>01h 45m</td>
                    <td>
                      <button className="btn-action-out" style={{ padding: '4px 10px', fontSize: '0.75rem' }} onClick={() => alert('Procesando Check-out de la placa KFX542')}>Liberar</button>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 700 }}>B-12</td>
                    <td style={{ fontWeight: 700, color: 'var(--blue)' }}>MHQ910</td>
                    <td>09:02 AM</td>
                    <td><span className="badge" style={{ background: '#E2E8F0', color: '#475569' }}>Invitado</span></td>
                    <td style={{ color: 'var(--green)', fontWeight: 600 }}>Vigente</td>
                    <td>00h 58m</td>
                    <td>
                      <button className="btn-action-out" style={{ padding: '4px 10px', fontSize: '0.75rem' }} onClick={() => alert('Procesando Check-out de la placa MHQ910')}>Liberar</button>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 700 }}>M-02</td>
                    <td style={{ fontWeight: 700, color: 'var(--blue)' }}>ZZX88C</td>
                    <td>07:30 AM</td>
                    <td><span className="badge in">Moto analista</span></td>
                    <td style={{ color: 'var(--green)', fontWeight: 600 }}>Vigente</td>
                    <td>02h 30m</td>
                    <td>
                      <button className="btn-action-out" style={{ padding: '4px 10px', fontSize: '0.75rem' }} onClick={() => alert('Procesando Check-out de la placa ZZX88C')}>Liberar</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </article>
      </main>
    </div>
  </div>
    )
}

export default ListaVehiculosActivo