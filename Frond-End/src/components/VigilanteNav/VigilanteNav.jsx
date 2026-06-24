// src/components/vigilante/VigilanteNav.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { authService } from "../../services/api_auth";
import '../../css/VigilanteCSS/VigilanteCerrarSesion.css'

function Nav() {
    const navigate = useNavigate();

    // Función encargada de borrar el token/usuario e ir al Login
    const handleLogout = () => {
        authService.logout(); // Limpia el localStorage de raíz
        navigate("/");        // Redirige al inicio (pantalla de Login)
    };

    return (
        <aside className="sidebar pl-vig-sidebar-container">
            {/* Sección superior con el logo del proyecto */}
            <div className="pl-vig-sidebar-brand">
                📂 <span>ParkLink</span>
            </div>

            {/* Enlaces de navegación del menú */}
            <nav className="pl-vig-nav-menu">
                <NavLink to="/Inicio" className={({ isActive }) => isActive ? "pl-vig-link active" : "pl-vig-link"}>🏠 Inicio</NavLink>
                <NavLink to="/FormularioEntrada" className={({ isActive }) => isActive ? "pl-vig-link active" : "pl-vig-link"}>🚗 Entrada</NavLink>
                <NavLink to="/FormularioSalida" className={({ isActive }) => isActive ? "pl-vig-link active" : "pl-vig-link"}>🚙 Salida</NavLink>
                <NavLink to="/FormularioVisitantes" className={({ isActive }) => isActive ? "pl-vig-link active" : "pl-vig-link"}>👥 Visitantes</NavLink>
                <NavLink to="/MapaGrafico" className={({ isActive }) => isActive ? "pl-vig-link active" : "pl-vig-link"}>🅿️ Mapa</NavLink>
                <NavLink to="/ListaVehiculosActivo" className={({ isActive }) => isActive ? "pl-vig-link active" : "pl-vig-link"}>🚗 Lista Vehículos</NavLink>
                <NavLink to="/ModalConfirmacion" className={({ isActive }) => isActive ? "pl-vig-link active" : "pl-vig-link"}>🔘 Confirmación</NavLink>
                <NavLink to="/Control" className={({ isActive }) => isActive ? "pl-vig-link active" : "pl-vig-link"}>🎛️ Control</NavLink>
                <NavLink to="/RegistroNovedades" className={({ isActive }) => isActive ? "pl-vig-link active" : "pl-vig-link"}>📋 Novedades</NavLink>
                <NavLink to="/Historialturno" className={({ isActive }) => isActive ? "pl-vig-link active" : "pl-vig-link"}>📚 Historial</NavLink>
                <NavLink to="/AperturaTurno" className={({ isActive }) => isActive ? "pl-vig-link active" : "pl-vig-link"}>🔓 Apertura</NavLink>
                <NavLink to="/CierreTurno" className={({ isActive }) => isActive ? "pl-vig-link active" : "pl-vig-link"}>🔒 Cierre</NavLink>
            </nav>

            {/* 🚪 Sección inferior exclusiva para el botón de salir con clases únicas */}
            <div className="pl-vig-sidebar-footer">
                <button 
                    type="button" 
                    onClick={handleLogout} 
                    className="pl-vig-btn-logout"
                >
                    <span className="pl-vig-btn-icon">❌</span> Cerrar Sesión
                </button>
            </div>
        </aside>
    );
}

export default Nav;