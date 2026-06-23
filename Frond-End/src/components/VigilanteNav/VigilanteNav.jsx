import { NavLink } from "react-router-dom";

function Nav() {
    return (
        <aside className="sidebar">
            <NavLink to="/Inicio">🏠 Inicio</NavLink>
            <NavLink to="/FormularioEntrada">🚗 Entrada</NavLink>
            <NavLink to="/FormularioSalida">🚙 Salida</NavLink>
            <NavLink to="/FormularioVisitantes">👥 Visitantes</NavLink>
            <NavLink to="/MapaGrafico">🅿️ Mapa</NavLink>
            <NavLink to="/ListaVehiculosActivo">🚗 Lista Vehículos</NavLink>
            <NavLink to="/ModalConfirmacion">🔘 Confirmación</NavLink>
            <NavLink to="/Control">🎛️ Control</NavLink>
            <NavLink to="/RegistroNovedades">📋 Novedades</NavLink>
            <NavLink to="/Historialturno">📚 Historial</NavLink>
            <NavLink to="/AperturaTurno">🔓 Apertura</NavLink>
            <NavLink to="/CierreTurno">🔒 Cierre</NavLink>
        </aside>
    );
}
export default Nav;