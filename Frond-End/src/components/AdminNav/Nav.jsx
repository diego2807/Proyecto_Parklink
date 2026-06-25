// src/components/admin/Nav.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { authService } from "../../services/api_auth"; // Asegura la ruta correcta de tu servicio
import '../../css/AdminCSS/CerrarSesionAdmin.css'

function NavAdmin() {
    const navigate = useNavigate();

    // Función encargada de destruir los tokens y redirigir al Login limpio
    const handleLogout = () => {
        authService.logout(); // Limpia localStorage
        navigate("/");        // Redirección inmediata a la raíz
    };

    return (
        <aside id="pl-admin-sidebar-root" className="pl-admin-sidebar">
            {/* Cabecera del panel de administración */}
            <div id="pl-admin-sidebar-header" className="pl-admin-header">
                👑 <span className="pl-admin-brand-text">ParkLink Admin</span>
            </div>

            {/* Bloque central de navegación con enlaces del rol administrador */}
            <nav id="pl-admin-nav-links-group" className="pl-admin-nav-list">
                <NavLink to="/KPIs" className={({ isActive }) => isActive ? "pl-admin-menu-item active" : "pl-admin-menu-item"}>📈 Dashboard</NavLink>
                <NavLink to="/Vehiculos" className={({ isActive }) => isActive ? "pl-admin-menu-item active" : "pl-admin-menu-item"}>🚗 Control Vehicular</NavLink>
                <NavLink to="/Celdas" className={({ isActive }) => isActive ? "pl-admin-menu-item active" : "pl-admin-menu-item"}>📦 Gestión de Celdas</NavLink>
                <NavLink to="/Registro" className={({ isActive }) => isActive ? "pl-admin-menu-item active" : "pl-admin-menu-item"}>➕ Registrar Personal</NavLink>
                <NavLink to="/Accesos" className={({ isActive }) => isActive ? "pl-admin-menu-item active" : "pl-admin-menu-item"}>🔑 Accesos</NavLink>
                <NavLink to="/Alertas" className={({ isActive }) => isActive ? "pl-admin-menu-item active" : "pl-admin-menu-item"}>🚨 Alertas Sistema</NavLink>
                <NavLink to="/Config" className={({ isActive }) => isActive ? "pl-admin-menu-item active" : "pl-admin-menu-item"}>⚙️ Configuración</NavLink>
                <NavLink to="/Log" className={({ isActive }) => isActive ? "pl-admin-menu-item active" : "pl-admin-menu-item"}>📋 Auditoría Log</NavLink>
                <NavLink to="/Tendencias" className={({ isActive }) => isActive ? "pl-admin-menu-item active" : "pl-admin-menu-item"}>📊 Tendencias</NavLink>
            </nav>

            {/* 🚪 Sección inferior exclusiva para el botón de salida del Administrador */}
            <div id="pl-admin-sidebar-footer-block" className="pl-admin-footer">
                <button 
                    type="button" 
                    id="pl-admin-btn-logout-action" 
                    className="pl-admin-logout-trigger"
                    onClick={handleLogout}
                >
                    <span className="pl-admin-logout-icon">🚪</span> Cerrar Sesion
                </button>
            </div>
        </aside>
    );
}

export default NavAdmin;