// src/components/admin/KPIs.jsx
import { useState, useEffect, useCallback } from 'react';
import Nav from '../../components/AdminNav/Nav';
import '../../css/AdminCSS/KPIs.css';

function KPIs() {
    // 1. Estado inicializado con la estructura exacta que responde tu Flask
    const [metricas, setMetricas] = useState({ 
        ocupacion_total: 0, 
        porcentaje_ocupacion: 0, 
        total_carros: 0, 
        total_motos: 0, 
        celdas_especiales: 0 
    });
    const [activos, setActivos] = useState([]);
    const [cargando, setCargando] = useState(true);

    // 2. Función de carga con Fetch Nativo para evitar problemas con el apiService
    const cargarDatos = useCallback(async () => {
        setCargando(true);
        try {
            // Obtenemos el token de almacenamiento local de ParkLink
            const token = localStorage.getItem('token'); 
            
            const urlEndpoint = 'http://localhost:5000/api/admin/kpis';

            console.log("🔄 Conectando con el backend en:", urlEndpoint);

            const respuesta = await fetch(urlEndpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Inyección del token JWT requerido por Flask
                }
            });

            if (!respuesta.ok) {
                throw new Error(`Error en el servidor: ${respuesta.status}`);
            }

            const data = await respuesta.json();
            console.log("🚀 Datos recibidos de Flask con éxito:", data);
            
            // Verificación y formateo seguro del payload del backend
            if (data && data.metricas) {
                setMetricas({
                    ocupacion_total: data.metricas.ocupacion_total || 0,
                    porcentaje_ocupacion: data.metricas.porcentaje_ocupacion || 0,
                    total_carros: data.metricas.total_carros || 0,
                    total_motos: data.metricas.total_motos || 0,
                    celdas_especiales: data.metricas.celdas_especiales || 0
                });
                setActivos(data.activos || []);
            }
        } catch (error) {
            console.error("❌ Error de sincronización en ParkLink:", error);
            // Fallback preventivo para que no se congele la pantalla
            setMetricas({ ocupacion_total: 0, porcentaje_ocupacion: 0, total_carros: 0, total_motos: 0, celdas_especiales: 0 });
            setActivos([]);
        } finally {
            setCargando(false);
        }
    }, []);

    // 3. Ciclo de vida defensivo con bandera de control
    useEffect(() => {
        let activo = true;

        const ejecutarCarga = async () => {
            if (activo) {
                await cargarDatos();
            }
        };

        ejecutarCarga();

        return () => {
            activo = false;
        };
    }, [cargarDatos]);

    return (
        <>
        <Nav />
        {/* El CSS se mantiene intacto y acoplado gracias al ID único */}
        <main className="main-content" id="page-kpis-analytics-main">
            <header className="content-header" id="kpis-header-section">
                <div className="header-title" id="kpis-header-title-group">
                    <span className="page-badge" id="badge-kpis-bi">Business Intelligence</span>
                    <h1 id="kpis-main-heading">8. Monitoreo y Métricas en Tiempo Real</h1>
                    <p className="page-description" id="kpis-main-description">
                        Indicadores estratégicos de ocupación, flujos de acceso y analítica de personal corporativo.
                    </p>
                </div>
            </header>

            {/* Tarjetas de Métricas - KPIs Principales */}
            <section className="kpis-grid" id="kpis-display-grid">
                <div className="kpi-card card-blue" id="card-kpi-ocupacion">
                    <h3>Celdas Ocupadas</h3>
                    <p className="kpi-value">{metricas.ocupacion_total}</p>
                    <span className="kpi-sub">Total en plataforma</span>
                </div>
                
                <div className="kpi-card card-green" id="card-kpi-porcentaje">
                    <h3>Porcentaje Ocupación</h3>
                    <p className="kpi-value">{metricas.porcentaje_ocupacion}%</p>
                    <div className="progress-bar-container" id="kpi-progress-wrapper">
                        <div 
                            className="progress-bar" 
                            id="kpi-progress-fill"
                            style={{ width: `${metricas.porcentaje_ocupacion}%` }}
                        ></div>
                    </div>
                </div>

                <div className="kpi-card" id="card-kpi-carros">
                    <h3>Automóviles Activos</h3>
                    <p className="kpi-value">{metricas.total_carros}</p>
                    <span className="kpi-sub">Áreas operativas/admin</span>
                </div>

                <div className="kpi-card" id="card-kpi-motos">
                    <h3>Motocicletas Activas</h3>
                    <p className="kpi-value">{metricas.total_motos}</p>
                    <span className="kpi-sub">Zonas de parqueo asignadas</span>
                </div>

                <div className="kpi-card card-purple" id="card-kpi-especiales">
                    <h3>Celdas Especiales</h3>
                    <p className="kpi-value">{metricas.celdas_especiales}</p>
                    <span className="kpi-sub">Movilidad / Eléctricos</span>
                </div>
            </section>

            {/* Tabla de Vehículos Activos (Monitoreo en Vivo) */}
            <section className="live-traffic-section" id="kpis-traffic-table-section">
                <div className="section-title-container" id="kpis-table-header-flex">
                    <h2>Vehículos Dentro de la Infraestructura</h2>
                    <button 
                        className="btn-refresh" 
                        id="btn-kpis-sync" 
                        onClick={cargarDatos} 
                        disabled={cargando}
                    >
                        {cargando ? "Sincronizando..." : "🔄 Actualizar Panel"}
                    </button>
                </div>

                <div className="table-container" id="kpis-table-scroll-container">
                    <table className="data-table" id="kpis-table-data">
                        <thead>
                            <tr>
                                <th>Placa</th>
                                <th>Tipo de Vehículo</th>
                                <th>Funcionario / Área</th>
                                <th>Hora Ingreso</th>
                                <th>Celda Asignada</th>
                            </tr>
                        </thead>
                        <tbody id="kpis-table-rows-body">
                            {cargando ? (
                                <tr className="row-loading" id="row-kpis-loading-state">
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>
                                        Sincronizando con el servidor Flask de ParkLink...
                                    </td>
                                </tr>
                            ) : !activos || activos.length === 0 ? (
                                <tr id="row-kpis-empty-state">
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>
                                        No hay vehículos registrados dentro de la empresa en este momento.
                                    </td>
                                </tr>
                            ) : (
                                activos.map((v, index) => (
                                    <tr key={index} className="kpi-table-data-row">
                                        <td><strong className="placa-badge">{v?.placa}</strong></td>
                                        <td>{v?.tipo_vehiculo}</td>
                                        <td>
                                            <div><strong>{v?.funcionario}</strong></div>
                                            <small className="text-muted">{v?.area}</small>
                                        </td>
                                        <td>{v?.hora_ingreso}</td>
                                        <td>{v?.celda || 'General'}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
        </>
    );
}

export default KPIs;