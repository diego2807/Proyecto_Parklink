// src/components/admin/Tendencias.jsx
import { useState, useEffect, useCallback } from 'react';
import Nav from '../../components/AdminNav/Nav';
import '../../css/AdminCSS/Tendencias.css';

function Tendencias() {
    // 1. Estados para almacenar la analítica del backend y el rango de tiempo seleccionado
    const [analitica, setAnalitica] = useState(null);
    const [periodo, setPeriodo] = useState('semana');
    const [cargando, setCargando] = useState(true);

    // 2. Función de carga segura memorizada con useCallback
    const cargarTendencias = useCallback(async () => {
        setCargando(true);
        try {
            const token = localStorage.getItem('token');
            // Consumo directo al nuevo endpoint del Blueprint independiente
            const urlEndpoint = `http://localhost:5000/api/admin/tendencias?rango=${periodo}`;
            
            console.log(`🔄 Analizando tendencias históricas en rango [${periodo}]`);

            const respuesta = await fetch(urlEndpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!respuesta.ok) {
                throw new Error(`Error en el servidor de analítica: ${respuesta.status}`);
            }

            const data = await respuesta.json();
            console.log("🚀 Datos analíticos cargados con éxito:", data);
            setAnalitica(data);
        } catch (error) {
            console.error("❌ Error de sincronización en el canal de BI:", error);
            setAnalitica(null);
        } finally {
            setCargando(false);
        }
    }, [periodo]);

    // 3. Ciclo de vida corregido y blindado sin bucles de renderizado
    useEffect(() => {
        let activo = true;

        const ejecutarCargaSegura = async () => {
            try {
                if (activo) {
                    await cargarTendencias();
                }
            } catch (error) {
                console.error("❌ Error en la ejecución del efecto de Tendencias:", error);
            }
        };

        ejecutarCargaSegura();

        // Función de limpieza (Cleanup) al desmontar la vista o cambiar de ruta
        return () => {
            activo = false;
        };
    }, [periodo]);

    return (
        <>
        <Nav />
        {/* Contenedor unificado para respetar el sidebar lateral de administración */}
        <main className="config-main-container" id="page-tendencias-analytics-main">
            
            <header className="config-header-section" id="tendencias-header">
                <div className="header-title">
                    <span className="page-badge">Análisis de Datos (BI)</span>
                    <h1>2. Análisis de Tendencias y Flujos</h1>
                    <p className="page-description">
                        Visualización de horas pico, días de mayor afluencia y comportamiento histórico de ingresos de ParkLink.
                    </p>
                </div>
            </header>

            {/* Barra de Filtros Interactiva */}
            <section className="filter-bar" style={{ marginBottom: '1.5rem', background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div className="filter-group" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <label htmlFor="selectPeriodo" className="filter-label" style={{ fontWeight: '600', color: '#334155' }}>Rango de Análisis:</label>
                    <select 
                        id="selectPeriodo" 
                        className="filter-select"
                        value={periodo}
                        onChange={(e) => setPeriodo(e.target.value)}
                        style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff' }}
                    >
                        <option value="hoy">Hoy</option>
                        <option value="semana">Últimos 7 días</option>
                        <option value="mes">Último mes</option>
                    </select>
                </div>
            </section>

            {cargando ? (
                <div className="config-loading" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                    <span>🔄 Procesando bloques de datos y patrones históricos...</span>
                </div>
            ) : (
                <>
                    {/* Sección de Gráficos de Alto Rendimiento */}
                    <section className="charts-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                        
                        {/* 🌟 TARJETA IZQUIERDA ACTUALIZADA: Segmentación Profesional de Franjas de 24 Horas */}
                        <article className="config-card chart-card">
                            <div className="chart-header">
                                <div className="chart-title-area">
                                    <h2>Distribución de Flujo por Franjas Horarias</h2>
                                    <p className="card-subtitle">Monitoreo de carga e ingresos vehiculares segmentados por jornadas operativas.</p>
                                </div>
                            </div>
                            <div className="chart-body" style={{ marginTop: '1.5rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1rem' }}>
                                    {analitica?.horas_pico?.map((h, i) => {
                                        const esEstable = h.flujo === "Flujo Estable";
                                        const badgeColor = esEstable ? '#10b981' : '#f97316'; // Verde si está calmado, Naranja si tiene carros
                                        const fondoFila = esEstable ? '#f8fafc' : '#fff7ed'; // Fondo cálido si hay actividad

                                        return (
                                            <div key={i} style={{ 
                                                display: 'flex', 
                                                justifyContent: 'space-between', 
                                                alignItems: 'center',
                                                padding: '10px 14px', 
                                                background: fondoFila, 
                                                borderRadius: '6px', 
                                                fontSize: '0.85rem',
                                                border: `1px solid ${esEstable ? '#e2e8f0' : '#ffedd5'}`
                                            }}>
                                                <span style={{ color: '#334155', fontWeight: '500' }}>{h.hora}</span>
                                                <span style={{ 
                                                    color: '#fff', 
                                                    background: badgeColor, 
                                                    padding: '3px 10px', 
                                                    borderRadius: '20px', 
                                                    fontWeight: '600',
                                                    fontSize: '0.8rem' 
                                                }}>
                                                    {h.flujo}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="canvas-container" style={{ position: 'relative', height: '40px', width: '100%' }}>
                                    <canvas id="chartHorasPico"></canvas>
                                </div>
                            </div>
                        </article>

                        {/* TARJETA DERECHA: Gráfico Dinámico de Barras Fluidas por Días de la Semana */}
                        <article className="config-card chart-card">
                            <div className="chart-header">
                                <div className="chart-title-area">
                                    <h2>Ingresos por Días Laborales</h2>
                                    <p className="card-subtitle">Comparativa del flujo vehicular consolidado en la semana de operaciones.</p>
                                </div>
                            </div>
                            <div className="chart-body" style={{ marginTop: '1.5rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1rem' }}>
                                    {analitica?.dias_pico?.map((d, i) => {
                                        // Cálculo dinámico para que la barra más alta sirva de base de escala 100%
                                        const maxIngresos = Math.max(...(analitica?.dias_pico?.map(o => o.ingresos) || [1]), 1);
                                        const porcentajeBarra = (d.ingresos / maxIngresos) * 100;

                                        return (
                                            <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 30px', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                                                <span style={{ color: '#475569', fontWeight: '500' }}>{d.dia}</span>
                                                <div style={{ background: '#e2e8f0', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                                                    <div style={{ 
                                                        width: `${d.ingresos > 0 ? porcentajeBarra : 0}%`, 
                                                        background: d.ingresos === maxIngresos && d.ingresos > 0 ? '#ef4444' : '#3b82f6', 
                                                        height: '100%',
                                                        transition: 'width 0.4s ease'
                                                    }}></div>
                                                </div>
                                                <strong style={{ textAlign: 'right' }}>{d.ingresos}</strong>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="canvas-container" style={{ position: 'relative', height: '40px', width: '100%' }}>
                                    <canvas id="chartDiasSemana"></canvas>
                                </div>
                            </div>
                        </article>

                    </section>

                    {/* SECCIÓN DE CONCLUSIONES (BI INSIGHTS) */}
                    <section className="config-card summary-section">
                        <h2>Conclusiones del Comportamiento Reciente</h2>
                        <p className="card-subtitle" style={{ marginBottom: '1.5rem' }}>Insights calculados automáticamente por el sistema de analítica.</p>
                        
                        <div className="insights-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                            <div className="insight-item" style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                                <span className="insight-icon" style={{ fontSize: '2rem' }}>📈</span>
                                <div className="insight-text">
                                    <h3 style={{ fontSize: '0.95rem', margin: 0, color: '#64748b' }}>Ventana Crítica Estimada</h3>
                                    <p id="txtHoraPico" style={{ margin: '4px 0 0 0', fontWeight: '700', color: '#0f172a' }}>
                                        {analitica?.horas_pico?.find(h => !h.flujo.includes('Estable'))?.hora || "Sin congestión reportada"}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="insight-item" style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                                <span className="insight-icon" style={{ fontSize: '2rem' }}>🗓️</span>
                                <div className="insight-text">
                                    <h3 style={{ fontSize: '0.95rem', margin: 0, color: '#64748b' }}>Permanencia Promedio</h3>
                                    <p id="txtDiaPico" style={{ margin: '4px 0 0 0', fontWeight: '700', color: '#0f172a' }}>
                                        {analitica?.metricas_prediccion?.tiempo_promedio || "Cargando..."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </main>
        </>
    );
}

export default Tendencias;