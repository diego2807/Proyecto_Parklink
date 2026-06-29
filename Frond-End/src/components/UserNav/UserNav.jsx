// src/components/user/UserNav.jsx

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { authService } from "../../services/api_auth"; 
import "../../css/VigilanteCSS/VigilanteCerrarSesion.css"; 

function Nav() {
    const navigate = useNavigate();
    const [menuAbierto, setMenuAbierto] = useState(false);

    const handleLogout = () => {
        authService.logout();
        navigate("/");
    };

    const cerrarMenu = () => {
        setMenuAbierto(false);
    };

    return (
        <>
            {/* Botón hamburguesa (solo aparece en celular) */}
            <button
                className="pl-menu-btn pl-vig-menu-btn"
                onClick={() => setMenuAbierto(!menuAbierto)}
            >
                ☰
            </button>

            {/* Fondo oscuro */}
            {menuAbierto && (
                <div
                    className="pl-vig-overlay"
                    onClick={cerrarMenu}
                />
            )}

            <aside
                className={`sidebar pl-vig-sidebar-container ${
                    menuAbierto ? "open" : ""
                }`}
            >
                {/* Logo */}
                <div className="pl-vig-sidebar-brand">
                    <i className="fa-solid fa-square-parking"></i>
                    <span>ParkLink</span>
                </div>

                {/* Menú de Usuario */}
                <nav className="pl-vig-nav-menu">
                    <NavLink
                        to="/PanelControl"
                        onClick={cerrarMenu}
                        className={({ isActive }) =>
                            isActive ? "pl-vig-link active" : "pl-vig-link"
                        }
                    >
                        <i className="fas fa-chart-line"></i> Panel de control
                    </NavLink>

                    <NavLink
                        to="/Reservas"
                        onClick={cerrarMenu}
                        className={({ isActive }) =>
                            isActive ? "pl-vig-link active" : "pl-vig-link"
                        }
                    >
                        <i className="fas fa-calendar-check"></i> Reservas
                    </NavLink>

                    <NavLink
                        to="/Semaforo"
                        onClick={cerrarMenu}
                        className={({ isActive }) =>
                            isActive ? "pl-vig-link active" : "pl-vig-link"
                        }
                    >
                        <i className="fas fa-traffic-light"></i> Semáforo
                    </NavLink>

                    <NavLink
                        to="/VehiculosU"
                        onClick={cerrarMenu}
                        className={({ isActive }) =>
                            isActive ? "pl-vig-link active" : "pl-vig-link"
                        }
                    >
                        <i className="fas fa-car"></i> Vehículos
                    </NavLink>

                    <NavLink
                        to="/Historial"
                        onClick={cerrarMenu}
                        className={({ isActive }) =>
                            isActive ? "pl-vig-link active" : "pl-vig-link"
                        }
                    >
                        <i className="fas fa-clock-rotate-left"></i> Historial
                    </NavLink>

                    <NavLink
                        to="/Notificaciones"
                        onClick={cerrarMenu}
                        className={({ isActive }) =>
                            isActive ? "pl-vig-link active" : "pl-vig-link"
                        }
                    >
                        <i className="fas fa-bell"></i> Notificaciones
                    </NavLink>

                    {/* SECCIÓN CORREGIDA: Mi Perfil independiente */}
                    <NavLink
                        to="/Perfil"
                        onClick={cerrarMenu}
                        className={({ isActive }) =>
                            isActive ? "pl-vig-link active" : "pl-vig-link"
                        }
                    >
                        <i className="fas fa-user"></i> Mi Perfil
                    </NavLink>

                    {/* SECCIÓN CORREGIDA: Ayuda independiente */}
                    <NavLink
                        to="/Ayuda"
                        onClick={cerrarMenu}
                        className={({ isActive }) =>
                            isActive ? "pl-vig-link active" : "pl-vig-link"
                        }
                    >
                        <i className="fas fa-circle-question"></i> Ayuda
                    </NavLink>
                </nav>

                {/* Botón cerrar sesión */}
                <div className="pl-vig-sidebar-footer">
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="pl-vig-btn-logout"
                    >
                        <span className="pl-vig-btn-icon">❌</span>
                        Cerrar Sesión
                    </button>
                </div>
            </aside>
        </>
    );
}

export default Nav;