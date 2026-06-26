// src/components/vigilante/VigilanteNav.jsx

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
                className="pl-vig-menu-btn"
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
                    📂 <span>ParkLink</span>
                </div>

                {/* Menú */}
                <nav className="pl-vig-nav-menu">

                    <NavLink
                        to="/Inicio"
                        onClick={cerrarMenu}
                        className={({ isActive }) =>
                            isActive ? "pl-vig-link active" : "pl-vig-link"
                        }
                    >
                        🏠 Inicio
                    </NavLink>

                    <NavLink
                        to="/FormularioEntrada"
                        onClick={cerrarMenu}
                        className={({ isActive }) =>
                            isActive ? "pl-vig-link active" : "pl-vig-link"
                        }
                    >
                        🚗 Entrada
                    </NavLink>

                    <NavLink
                        to="/FormularioSalida"
                        onClick={cerrarMenu}
                        className={({ isActive }) =>
                            isActive ? "pl-vig-link active" : "pl-vig-link"
                        }
                    >
                        🚙 Salida
                    </NavLink>

                    <NavLink
                        to="/FormularioVisitantes"
                        onClick={cerrarMenu}
                        className={({ isActive }) =>
                            isActive ? "pl-vig-link active" : "pl-vig-link"
                        }
                    >
                        👥 Visitantes
                    </NavLink>

                    <NavLink
                        to="/MapaGrafico"
                        onClick={cerrarMenu}
                        className={({ isActive }) =>
                            isActive ? "pl-vig-link active" : "pl-vig-link"
                        }
                    >
                        🅿️ Mapa
                    </NavLink>

                    <NavLink
                        to="/ListaVehiculosActivo"
                        onClick={cerrarMenu}
                        className={({ isActive }) =>
                            isActive ? "pl-vig-link active" : "pl-vig-link"
                        }
                    >
                        🚗 Lista Vehículos
                    </NavLink>

                    <NavLink
                        to="/Control"
                        onClick={cerrarMenu}
                        className={({ isActive }) =>
                            isActive ? "pl-vig-link active" : "pl-vig-link"
                        }
                    >
                        🎛️ Control
                    </NavLink>

                    <NavLink
                        to="/RegistroNovedades"
                        onClick={cerrarMenu}
                        className={({ isActive }) =>
                            isActive ? "pl-vig-link active" : "pl-vig-link"
                        }
                    >
                        📋 Novedades
                    </NavLink>

                    <NavLink
                        to="/Historialturno"
                        onClick={cerrarMenu}
                        className={({ isActive }) =>
                            isActive ? "pl-vig-link active" : "pl-vig-link"
                        }
                    >
                        📚 Historial
                    </NavLink>

                    <NavLink
                        to="/AperturaTurno"
                        onClick={cerrarMenu}
                        className={({ isActive }) =>
                            isActive ? "pl-vig-link active" : "pl-vig-link"
                        }
                    >
                        🔓 Apertura
                    </NavLink>

                    <NavLink
                        to="/CierreTurno"
                        onClick={cerrarMenu}
                        className={({ isActive }) =>
                            isActive ? "pl-vig-link active" : "pl-vig-link"
                        }
                    >
                        🔒 Cierre
                    </NavLink>

                </nav>

                {/* Botón cerrar sesión */}
                <div className="pl-vig-sidebar-footer">

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="pl-vig-btn-logout"
                    >
                        <span className="pl-vig-btn-icon">
                            ❌
                        </span>

                        Cerrar Sesión

                    </button>

                </div>

            </aside>

        </>
    );
}

export default Nav;