// src/components/admin/KPIs.jsx
import { useState, useEffect, useCallback } from 'react';
import Nav from '../../components/AdminNav/Nav';
import '../../css/AdminCSS/KPIs.css';

function KPIs() {
    // 1. Estado estructurado para recibir las métricas dinámicas basadas en la configuración global
    const [metricas, setMetricas] = useState({ 
        ocupacion_total: 0, 
        porcentaje_ocupacion: 0, 
        total_carros: 0, 
        total_motos: 0, 
        celdas_especiales: 0,
        // Capacidades máximas traídas de Config para el desglose
        limite_admin: 40,
        limite_operativas: 60,
        limite_movilidad: 10
    });
    
    const [activos, setActivos] = useState([]);
    const [cargando, setCargando] = useState(true);

    // 2. Función de carga optimizada con useCallback para evitar bucles de renderizado
    const cargarDatos = useCallback(async () => {
        setCargando(true);
        try {
            const token = localStorage.getItem('token'); 
            const urlEndpoint = 'http://localhost:5000/api/admin/kpis';

            console.log("🔄 Sincronizando KPIs de ParkLink con el backend:", urlEndpoint);

            const respuesta = await fetch(urlEndpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (respuesta.ok) {
                const resultado = await respuesta.json();
                
                // Mapeamos la respuesta del backend asegurando consistencia matemática
                setMetricas({
                    ocupacion_total: resultado.ocupacion_total || 0,
                    porcentaje_ocupacion: resultado.porcentaje_ocupacion || 0,
                    total_carros: resultado.total_carros || 0,
                    total_motos: resultado.total_motos || 0,
                    celdas_especiales: resultado.celdas_especiales || 0,
                    limite_admin: resultado.limite_admin || 40,
                    limite_operativas: resultado.limite_operativas || 60,
                    limite_movilidad: resultado.limite_movilidad || 10
                });

                setActivos(resultado.vehiculos_activos || []);
            } else {
                console.error("❌ Error en la respuesta del servidor al solicitar métricas");
            }
        } catch (error) {
            console.error("❌ Error de red en el canal asíncrono de KPIs:", error);
        } finally {
            setCargando(false);
        }
    }, []);

    // 3. Hook de ciclo de vida corregido sin llamadas de estado síncronas concurrentes
    // 3. Hook de ciclo de vida corregido sin bucles de renderizado ni condiciones de carrera
    useEffect(() => {
        let activo = true;

        const ejecutarCargaSegura = async () => {
            try {
                // Ejecutamos la carga asíncrona de datos desde el backend
                await cargarDatos();
            } catch (error) {
                console.error("❌ Error en la ejecución del efecto de KPIs:", error);
            }
        };

        if (activo) {
            ejecutarCargaSegura();
        }

        // Función de limpieza (Cleanup)
        return () => {
            activo = false; // Cancela cualquier actualización si el usuario cambia de vista en el Nav
        };
    }, []); // 🌟 Dejamos los corchetes vacíos para que solo se ejecute una vez al montar la vista

    return (
        <>
        <Nav />
        {/* Usamos el contenedor maestro que respeta el espacio del Nav lateral de 260px */}
        <main className="config-main-container">
            
            {/* ENCABEZADO PRINCIPAL DE CONTROL */}
            <header className="config-header-section">
                <div id="kpis-title-group">
                    <h1>📈 Panel de Control y KPIs</h1>
                    <p>Indicadores clave de rendimiento y monitoreo de celdas según los parámetros del sistema.</p>
                </div>
            </header>

            {cargando ? (
                <div className="config-loading">
                    <span>🔄 Calculando métricas de ocupación en tiempo real...</span>
                </div>
            ) : (
                <form id="kpis-dashboard-form-wrapper" onSubmit={(e) => e.preventDefault()}>
                    
                    {/* SECCIÓN 1: KPI MAESTRO DE PORCENTAJE (CUPO GLOBAL) */}
                    <div className="config-card" id="card-kpi-ocupacion" style={{ borderLeft: '6px solid #3b82f6' }}>
                        <h2>📊 Ocupación General de la Infraestructura</h2>
                        <p className="card-subtitle">Porcentaje consolidado de celdas utilizadas actualmente sobre el total permitido.</p>
                        
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', margin: '1rem 0' }}>
                            <span style={{ fontSize: '3.5rem', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.05em' }}>
                                {metricas.porcentaje_ocupacion}%
                            </span>
                            <span style={{ fontSize: '1.1rem', color: '#64748b', fontWeight: '500' }}>
                                ({metricas.ocupacion_total} vehículos estacionados dentro del plantel)
                            </span>
                        </div>

                        {/* Barra de Progreso Fluida Avanzada */}
                        <div style={{ background: '#e2e8f0', borderRadius: '100px', height: '16px', overflow: 'hidden', marginTop: '1.25rem' }}>
                            <div style={{ 
                                width: `${Math.min(metricas.porcentaje_ocupacion, 100)}%`, 
                                background: 'linear-gradient(90deg, #3b82f6 0%, #10b981 100%)', 
                                height: '100%', 
                                transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)' 
                            }}></div>
                        </div>
                    </div>

                    {/* SECCIÓN 2: TARJETAS COMPLEMENTARIAS DE CONTEO */}
                    <div className="config-grid-inputs" id="kpi-counters-grid">
                        
                        <div className="config-card" id="card-count-carros">
                            <h3>🚗 Autos Ingresados</h3>
                            <div className="kpi-counter-value" style={{ fontSize: '2.2rem', fontWeight: '700', margin: '0.5rem 0', color: '#1e293b' }}>
                                {metricas.total_carros}
                            </div>
                            <small className="card-subtitle">Sedanes, camionetas y vehículos corporativos.</small>
                        </div>

                        <div className="config-card" id="card-count-motos">
                            <h3>🏍️ Motocicletas</h3>
                            <div className="kpi-counter-value" style={{ fontSize: '2.2rem', fontWeight: '700', margin: '0.5rem 0', color: '#1e293b' }}>
                                {metricas.total_motos}
                            </div>
                            <small className="card-subtitle">Vehículos de dos ruedas autorizados en bahía.</small>
                        </div>

                        <div className="config-card" id="card-count-especiales">
                            <h3>♿ Zonas Especiales</h3>
                            <div className="kpi-counter-value" style={{ fontSize: '2.2rem', fontWeight: '700', margin: '0.5rem 0', color: '#f59e0b' }}>
                                {metricas.celdas_especiales} <span style={{ fontSize: '1.1rem', color: '#94a3b8' }}>/ {metricas.limite_movilidad}</span>
                            </div>
                            <small className="card-subtitle">Movilidad reducida y estaciones de carga eléctrica.</small>
                        </div>

                    </div>

                    {/* SECCIÓN 3: LISTADO COMPLETO DE VEHÍCULOS ACTIVOS */}
                    <section className="config-card" id="kpis-table-container" style={{ marginTop: '1rem' }}>
                        <div id="table-header-kpis" style={{ marginBottom: '1.5rem' }}>
                            <h2>📋 Registro de Ocupación en Tiempo Real</h2>
                            <p className="card-subtitle">Historial de vehículos que se encuentran físicamente dentro de las celdas asignadas.</p>
                        </div>

                        <div className="table-responsive" style={{ overflowX: 'auto' }}>
                            <table className="kpi-table-control" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr id="header-row-kpis" style={{ borderBottom: '2px solid #edf2f7', color: '#475569', fontSize: '0.9rem' }}>
                                        <th style={{ padding: '12px 8px' }}>Placa</th>
                                        <th style={{ padding: '12px 8px' }}>Tipo</th>
                                        <th style={{ padding: '12px 8px' }}>Funcionario / Responsable</th>
                                        <th style={{ padding: '12px 8px' }}>Hora Ingreso</th>
                                        <th style={{ padding: '12px 8px' }}>Celda Asignada</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!activos || activos.length === 0 ? (
                                        <tr id="row-kpis-empty-state">
                                            <td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8', fontSize: '0.95rem' }}>
                                                📭 No hay vehículos registrados dentro de la empresa en este momento.
                                            </td>
                                        </tr>
                                    ) : (
                                        activos.map((v, index) => (
                                            <tr key={index} className="kpi-table-data-row" style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                <td style={{ padding: '14px 8px' }}><strong className="placa-badge" style={{ background: '#f1f5f9', padding: '4px 8px', borderRadius: '6px', fontFamily: 'monospace' }}>{v?.placa}</strong></td>
                                                <td style={{ padding: '14px 8px', textTransform: 'capitalize' }}>{v?.tipo_vehiculo}</td>
                                                <td style={{ padding: '14px 8px' }}>
                                                    <div><strong>{v?.funcionario}</strong></div>
                                                    <small style={{ color: '#94a3b8' }}>{v?.area}</small>
                                                </td>
                                                {/* ── 🌟 VALIDACIÓN DE HORA EXACTA DINÁMICA ── */}
                                                <td style={{ padding: '14px 8px', color: '#475569' }}>
                                                {v?.fecha_hora ? (v.fecha_hora.includes(" ") ? v.fecha_hora.split(" ")[1] : v.fecha_hora): (v?.hora_ingreso || "00:00:00")}
                                                </td>
                                                <td style={{ padding: '14px 8px' }}><span style={{ color: '#10b981', fontWeight: '600' }}>{v?.celda || 'General'}</span></td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </form>
            )}
        </main>
        </>
    );
}

export default KPIs;