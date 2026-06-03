function Nav() {
    return(
        <aside class="sidebar">
            <div class="sidebar-header">
                <span class="logo-icon">P</span>
                <span class="logo-text">ParkLink</span>
            </div>
            
            <nav class="sidebar-nav">
                <div class="nav-group">
                    <span class="nav-heading">Módulo Dashboard</span>
                    <a href="../vistas/kpis.html" class="nav-link">1. Tablero KPIs</a>
                    <a href="../vistas/tendencias.html" class="nav-link">2. Gráficos Tendencias</a>
                    <a href="../vistas/celdas.html" class="nav-link">3. Celdas Especiales</a>
                </div>
                
                <div class="nav-group">
                    <span class="nav-heading">Operaciones e Historial</span>
                    <a href="../vistas/log.html" class="nav-link">4. Log de Eventos</a>
                    <a href="../vistas/exportador.html" class="nav-link">5. Exportador</a>
                    <a href="../vistas/vehiculos.html" class="nav-link active">7. Registro Vehículos</a>
                </div>

                <div class="nav-group">
                    <span class="nav-heading">Configuración</span>
                    <a href="../vistas/config.html" class="nav-link">10. Parametrización</a>
                </div>
            </nav>

            <div class="sidebar-footer">
                <div class="user-avatar">DP</div>
                <div class="user-info">
                    <p class="user-name">Diego Plazas</p>
                    <span class="user-role">Administrador</span>
                </div>
            </div>
        </aside>
    )
}

export default Nav