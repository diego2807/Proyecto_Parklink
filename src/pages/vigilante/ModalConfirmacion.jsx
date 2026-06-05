import '../../css/VigilanteCSS/style.css'
import { Link } from "react-router-dom";

function ModalConfirmacion (){
    return(
      
  <div className="dash-layout">

   

    <aside className="sidebar" id="sidebar">

      <div className="sidebar-logo">

        <div className="logo-mark" style={{ padding: '24px', color: 'white', fontWeight: '700', fontSize: '1.25rem' }}>

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

            <div className="topbar-title" style={{ fontWeight: 700, fontSize: '1.2rem' }}>Asignación Operativa</div>

            <div className="topbar-subtitle" style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Bienvenida, Sara — Control de ingresos y liberaciones</div>
          </div>

        </div>

        <div className="topbar-right">

          <span className="topbar-badge">🟢 En turno</span>

        </div>

      </div>

   

      <main className="dash-content">

        <div className="dash-header">

          <h2>Gestión de Celdas Individuales</h2>

          <p>Asigna bahías vacías o procesa la salida de unidades calculando tiempos automáticos.</p>

        </div>



        <div className="form-split-grid">

         

          <article className="panel-card">

            <div className="panel-card-header" style={{ background: '#F8FAFC' }}>

              <h3 style={{color: '#137333'}}>✅ Check-in de Vehículo</h3>

            </div>

            <div className="panel-card-body">

              <form onsubmit="event.preventDefault();">

               

                <div className="fg">

                  <label htmlFor="ci-placa">Placa del Vehículo</label>

                  <div className="input-wrapper">

                   <input type="text" id="ci-placa" placeholder="ABC-123" required style={{ textTransform: 'uppercase' }} onInput={(e) => { e.target.value = e.target.value.toUpperCase(); }}/>

                  </div>

                </div>



                <div className="fg">

                  <label htmlFor="ci-celda">Celda Asignada</label>

                  <div className="input-wrapper">

                    <select id="ci-celda" required>

                      <option value="">Seleccionar celda libre...</option>

                      <option>A-01</option><option>A-03</option><option>A-04</option><option>A-05</option>

                      <option>B-02</option><option>B-03</option><option>C-01</option><option>C-03</option>

                    </select>

                  </div>

                </div>



                <div className="fg">

                  <label htmlFor="ci-tipo">Tipo de Usuario</label>

                  <div className="input-wrapper">

                    <select id="ci-tipo" required>

                      <option>Empleado Redeban</option>

                      <option>Visitante / Convenio</option>

                      <option>Contratista Externo</option>

                      <option>Directivo</option>

                      <option>Invitado VIP</option>

                    </select>

                  </div>

                </div>



                <div className="fg">

                  <label htmlFor="ci-obs">Observaciones (opcional)</label>

                  <div className="input-wrapper">

                    <input type="text" id="ci-obs" placeholder="Estado del vehículo, observaciones..."/>

                  </div>

                </div>



                <button type="button" className="btn-block">Registrar Ingreso</button>

              </form>

            </div>

          </article>



          <article className="panel-card">

            <div className="panel-card-header" style={{ background: '#F8FAFC' }}>

              <h3 style={{ color: '#C5221F' }}>⏏ Check-out de Vehículo</h3>

            </div>

            <div className="panel-card-body">

              <form onsubmit="event.preventDefault();">

               

                <div className="fg">

                  <label for="co-placa">Placa del Vehículo</label>

                  <div className="input-wrapper">

                    <input type="text" id="co-placa" placeholder="ABC-123"/>

                  </div>

                </div>



                <div className="fg">

                  <label htmlFor="co-celda">Celda a Liberar</label>

                  <div className="input-wrapper">

                    <select id="co-celda" required>

                      <option value="">Seleccionar celda ocupada...</option>

                      <option>A-02 — HFX-432</option>

                      <option>D-01 — ZTM-98E</option>

                      <option>A-06 — KLO-115</option>

                      <option>B-04 — RWQ-007</option>

                    </select>

                  </div>

                </div>



                <div className="fg">

                  <label htmlFor="co-obs">Observaciones de Salida</label>

                  <div className="input-wrapper">

                    <input type="text" id="co-obs" placeholder="Estado del vehículo al retirar..."/>

                  </div>

                </div>



                <div className="info-box-time">

                  <strong>⏱ Tiempo de estadía:</strong> calculado automáticamente por el sistema al confirmar la salida.

                </div>



                <button type="button" className="btn-block">Confirmar Salida</button>

              </form>

            </div>

          </article>



        </div>

      </main>

    </div>

  </div>
    )
}

export default ModalConfirmacion