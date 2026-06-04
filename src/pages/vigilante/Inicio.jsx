import '../../css/VigilanteCSS/style.css';
import { Link } from "react-router-dom";

function Inicio () {
    // Funciones manejadoras para evitar evaluar strings en el HTML simulado
    const handleToggleSidebar = () => {
        if (typeof window.toggleSidebar === 'function') {
            window.toggleSidebar();
        }
    };

    const handleRegisterAction = (actionType) => {
        if (typeof window.registerAction === 'function') {
            window.registerAction(actionType);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div className="dash-layout">
            <aside className="sidebar" id="sidebar">
                <div className="sidebar-header">
                    <div className="brand">📂 <span>Parklink</span></div>
                    <button className="btn-close-sidebar" onClick={handleToggleSidebar}>✕</button>
                </div>
                
                <ul className="sidebar-menu" id="sidebarMenu">
                    <li className="sidebar-item active">
                        <Link to="/" className="sidebar-link">Inicio</Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/src/pages/vigilante/FiltroMapa.jsx" className="sidebar-link">Filtros Mapa</Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/src/pages/vigilante/ListaVehiculosActivo.jsx" className="sidebar-link">Lista Vehículos</Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/src/pages/vigilante/ModalConfirmacion.jsx" className="sidebar-link">Modales</Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/src/pages/vigilante/RegistroNovedades.jsx" className="sidebar-link">Registro Novedades</Link>
                    </li>
                </ul>

                <div className="sidebar-footer">
                    <Link to="/login" className="btn-logout" style={{ textDecoration: 'none', textAlign: 'center', display: 'block' }}>
                        Cerrar Sesión
                    </Link>
                </div>
            </aside>

            <div className="dash-main">
                <header className="topbar">
                    <button className="btn-toggle-sidebar" onClick={handleToggleSidebar}>☰</button>
                    <div className="user-profile">
                        <div className="avatar">SG</div>
                        <div className="user-info">
                            <div className="name">Sara Garzón</div>
                            <div className="role">Administrador Redeban</div>
                        </div>
                    </div>
                </header>

                <main className="dash-content">
                    <div className="dash-header">
                        <h2>Panel de Control Central</h2>
                        <p>Monitoreo en tiempo real de operaciones de la estación de aparcamientos.</p>
                    </div>

                    <section className="metrics-grid">
                        <div className="metric-card">
                            <div className="metric-icon blue">🚗</div>
                            <div className="metric-data">
                                <div className="num" id="count-total">0</div>
                                <div className="lbl">Registros Totales</div>
                            </div>
                        </div>
                        <div className="metric-card">
                            <div className="metric-icon green">✓</div>
                            <div className="metric-data">
                                <div className="num" id="count-in">0</div>
                                <div className="lbl">Vehículos Dentro</div>
                            </div>
                        </div>
                        <div className="metric-card">
                            <div className="metric-icon orange">✕</div>
                            <div className="metric-data">
                                <div className="num" id="count-out">0</div>
                                <div className="lbl">Vehículos Salidos</div>
                            </div>
                        </div>
                    </section>

                    <div className="dash-grid-two">
                        <article className="panel-card">
                            <div className="panel-card-header">
                                <h3>Registro Operativo de Turno</h3>
                            </div>
                            <div className="panel-card-body">
                                <form id="parking-form" onSubmit={handleSubmit}>
                                    <div className="fg">
                                        <label htmlFor="car-plate">Número de Placa Vehicular</label>
                                        <div className="input-wrapper">
                                            <input type="text" id="car-plate" required placeholder="ABC123"/>
                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                            </svg>
                                        </div>
                                        <span className="warning-txt" id="warn-car-plate">La placa debe ser un formato válido de 6 caracteres (ej. AAA123).</span>
                                    </div>
                                    <div className="fg">
                                        <label htmlFor="car-type">Tipo de Vehículo</label>
                                        <div className="input-wrapper">
                                            <select id="car-type" required>
                                                <option value="Automóvil">Automóvil Particular</option>
                                                <option value="Motocicleta">Motocicleta Cilindrada</option>
                                                <option value="Camioneta">Camioneta Carga Ligera</option>
                                            </select>
                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="btn-dual-wrap">
                                        <button type="button" className="btn-action-in" onClick={() => handleRegisterAction('Entrada')}>Registrar Entrada</button>
                                        <button type="button" className="btn-action-out" onClick={() => handleRegisterAction('Salida')}>Registrar Salida</button>
                                    </div>
                                </form>
                            </div>
                        </article>

                        <article className="panel-card">
                            <div className="panel-card-header">
                                <h3>Bitácora Reciente</h3>
                            </div>
                            <div className="panel-card-body" style={{ padding: '0' }}>
                                <div className="table-responsive">
                                    <table className="modern-table">
                                        <thead>
                                            <tr>
                                                <th>Placa</th>
                                                <th>Tipo</th>
                                                <th>Movimiento</th>
                                                <th>Estampa de Tiempo</th>
                                            </tr>
                                        </thead>
                                        <tbody id="log-table-body">
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </article>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Inicio;