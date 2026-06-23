import { NavLink } from "react-router-dom";

function Nav (){
    return(
        <aside className="sidebar">
    <div className="logo">
        <i className="fa-solid fa-square-parking"></i>
        <h2>ParkLink</h2>
    </div>
    <nav>
        <NavLink to="/PanelControl">
            <i className="fas fa-chart-line"></i>
            Panel de control
        </NavLink>
        <NavLink to="/Semaforo">
            <i className="fas fa-traffic-light"></i>
            Semáforo
        </NavLink>
        <NavLink to="/VehiculosU">
            <i className="fas fa-car"></i>
            Vehículos
        </NavLink>
        <NavLink to="/Historial" className="active">
            <i className="fas fa-clock-rotate-left"></i>
            Historial
        </NavLink>
        <NavLink to="/Notificaciones">
            <i className="fas fa-bell"></i>
            Notificaciones
        </NavLink>
        <NavLink to="/Ayuda">
            <i className="fas fa-circle-question"></i>
            Ayuda
        </NavLink>
    </nav>
</aside>
    )
}

export default Nav