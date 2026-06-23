import { Link } from "react-router-dom";

function Nav() {
    return(
        <aside className="sidebar">
            <div className="sidebar-header">
                <span className="logo-icon">P</span>
                <span className="logo-text">ParkLink</span>
            </div>
            
            <nav className="sidebar-nav">
                <div className="nav-group">
                    <span className="nav-heading">Módulo Dashboard</span>
                    <Link to="/KPIs" className="nav-link">1. Tablero KPIs</Link>
                    <Link to="/Tendencias" className="nav-link">2. Gráficos Tendencias</Link>
                    <Link to="/Celdas" className="nav-link">3. Celdas Especiales</Link>
                </div>
                
                <div className="nav-group">
                    <span className="nav-heading">Operaciones e Historial</span>
                    <Link to="/Log" className="nav-link">4. Log de Eventos</Link>
                    <Link to="/Exportador" className="nav-link">5. Exportador</Link>
                    <Link to="/Vehiculos" className="nav-link active">6. Registro Vehículos</Link>
                </div>

                <div className="nav-group">
                    <span className="nav-heading">Configuración</span>
                    <Link to="/Accesos" className="nav-link">7. Accesos</Link>
                    <Link to="/Config" className="nav-link">8. Parametrización</Link>
                    <Link to="/Alertas" className="nav-link">9. Alertas</Link>
                    <Link to="/Registro" className="nav-link">10. Registro</Link>
                </div>
            </nav>

            <div className="sidebar-footer">
                <div className="user-avatar">DP</div>
                <div className="user-info">
                    <p className="user-name">Diego Plazas</p>
                    <span className="user-role">Administrador</span>
                </div>
            </div>
        </aside>
    )
}

export default Nav