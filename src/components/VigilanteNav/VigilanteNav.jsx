function Nav({ menuActivo }) {
    return (
        <aside className={`sidebar ${menuActivo ? "activo" : ""}`}>

            <a href="/">🏠 Inicio</a>
            <a href="/formulario-entrada">🚗 Entrada</a>
            <a href="/formulario-salida">🚙 Salida</a>
            <a href="/formulario-visitantes">👥 Visitantes</a>
            <a href="/mapa-grafico">🅿️ Mapa</a>
            <a href="/registro-novedades">📋 Novedades</a>
            <a href="/historialturno">📚 Historial</a>
            <a href="/apertura-turno">🔓 Apertura</a>
            <a href="/cierre-turno">🔒 Cierre</a>

        </aside>
    );
}

export default Nav;