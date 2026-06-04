import { Link } from "react-router-dom";

function Nav (){
    return(
        <aside className="sidebar">
    <div className="logo">
        <i className="fa-solid fa-square-parking"></i>
        <h2>ParkLink</h2>
    </div>
    <nav>
        <Link to="../../pages/user/PanelControl.jsx">
            <i className="fas fa-chart-line"></i>
            Panel de control
        </Link>
        <Link to="/src/pages/user/Semaforo.jsx">
            <i className="fas fa-traffic-light"></i>
            Semáforo
        </Link>
        <Link to="/src/pages/user/VehiculosU.jsx">
            <i className="fas fa-car"></i>
            Vehículos
        </Link>
        <Link to="/src/pages/user/Historial.jsx" className="active">
            <i className="fas fa-clock-rotate-left"></i>
            Historial
        </Link>
        <Link to="/src/pages/user/Notificaciones.jsx">
            <i className="fas fa-bell"></i>
            Notificaciones
        </Link>
        <Link to="/src/pages/user/Ayuda.jsx">
            <i className="fas fa-circle-question"></i>
            Ayuda
        </Link>
    </nav>
</aside>
    )
}

export default Nav