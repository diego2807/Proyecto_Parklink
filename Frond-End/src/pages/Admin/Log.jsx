// src/components/admin/Log.jsx
import { useState, useEffect, useCallback } from 'react';
import Nav from '../../components/AdminNav/Nav';
import '../../css/AdminCSS/Log.css';

function Log() {
    const [logs, setLogs] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [criticidad, setCriticidad] = useState('todos');
    const [cargando, setCargando] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');

    // Función memorizada para consultar la API de Flask
    const cargarAuditoria = useCallback(async () => {
        setCargando(true);
        setErrorMsg('');
        try {
            const token = localStorage.getItem('token');
            const urlEndpoint = `http://localhost:5000/api/admin/logs?termino=${busqueda}&severidad=${criticidad}`;

            const respuesta = await fetch(urlEndpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!respuesta.ok) {
                throw new Error(`Error en el servidor: ${respuesta.status}`);
            }

            const datos = await respuesta.json();
            setLogs(datos);
        } catch (error) {
            console.error(`❌ Error en el canal analítico de Auditoría: ${error}`);
            setErrorMsg("No se pudo conectar con el servidor de auditoría.");
        } finally {
            setCargando(false);
        }
    }, [busqueda, criticidad]); // 💡 Escucha cambios en los inputs para reconstruir la URL correctamente

    // Ciclo de vida reactivo con micro-debounce de 150ms
    useEffect(() => {
        const handler = setTimeout(() => {
            cargarAuditoria();
        }, 150);

        return () => clearTimeout(handler);
    }, [busqueda, criticidad]); // 🌟 REMOVEMOS 'cargarAuditoria' para eliminar el error del renderizado continuo

    const obtenerClaseNivel = (nivel) => {
        const n = String(nivel).toLowerCase();
        if (n.includes('crit') || n.includes('crít')) return 'badge-danger';
        if (n.includes('adv') || n.includes('advertencia')) return 'badge-warning';
        return 'badge-info';
    };

    return (
        <>
        <Nav />
        <main className="config-main-container" id="page-logs-auditoria-main">
            <header className="config-header-section" id="logs-header">
                <div className="header-title">
                    <span className="page-badge">Seguridad e Historial</span>
                    <h1>Bitácora de Auditoría del Sistema</h1>
                    <p className="page-description">
                        Registro cronológico inmutable de acciones operativas, ingresos vehiculares y eventos de seguridad de ParkLink.
                    </p>
                </div>
            </header>

            <section className="filter-bar" style={{ marginBottom: '1.5rem', background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '250px' }}>
                    <input 
                        type="text" 
                        placeholder="Buscar por placa, módulo o descripción..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff' }}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <label style={{ fontWeight: '600', color: '#334155', fontSize: '0.9rem' }}>Severidad:</label>
                    <select 
                        value={criticidad} 
                        onChange={(e) => setCriticidad(e.target.value)}
                        style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff' }}
                    >
                        <option value="todos">Todos los eventos</option>
                        <option value="informativo">Informativo</option>
                        <option value="advertencia">Advertencia</option>
                        <option value="crítico">Crítico</option>
                    </select>
                </div>
            </section>

            <section className="config-card table-card" style={{ padding: '0px', overflow: 'hidden' }}>
                {errorMsg && (
                    <div style={{ margin: '1rem', padding: '12px', background: '#fee2e2', color: '#991b1b', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '500' }}>
                        ⚠️ {errorMsg}
                    </div>
                )}

                <div className="table-responsive" style={{ overflowX: 'auto' }}>
                    <table className="config-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                                <th style={{ padding: '12px 16px', color: '#475569', fontWeight: '600', fontSize: '0.85rem' }}>FECHA / HORA</th>
                                <th style={{ padding: '12px 16px', color: '#475569', fontWeight: '600', fontSize: '0.85rem' }}>MÓDULO</th>
                                <th style={{ padding: '12px 16px', color: '#475569', fontWeight: '600', fontSize: '0.85rem' }}>SEVERIDAD</th>
                                <th style={{ padding: '12px 16px', color: '#475569', fontWeight: '600', fontSize: '0.85rem' }}>DESCRIPCIÓN DE ACCIÓN</th>
                                <th style={{ padding: '12px 16px', color: '#475569', fontWeight: '600', fontSize: '0.85rem' }}>ASOCIADO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cargando && logs.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ padding: '24px', textAlign: 'center', color: '#64748b', fontSize: '0.9rem' }}>
                                        🔄 Buscando registros coincidentes...
                                    </td>
                                </tr>
                            ) : logs.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ padding: '24px', textAlign: 'center', color: '#94a3b8', fontSize: '0.9rem' }}>
                                        No se encontraron registros de auditoría que coincidan con los criterios.
                                    </td>
                                </tr>
                            ) : (
                                logs.map((l) => (
                                    <tr key={l.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '14px 16px', color: '#334155', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                                            {l.fecha_hora}
                                        </td>
                                        <td style={{ padding: '14px 16px', color: '#475569', fontWeight: '600', fontSize: '0.85rem' }}>
                                            {l.modulo}
                                        </td>
                                        <td style={{ padding: '14px 16px' }}>
                                            <span className={`log-badge ${obtenerClaseNivel(l.nivel)}`}>
                                                {String(l.nivel).toUpperCase()}
                                            </span>
                                        </td>
                                        <td style={{ padding: '14px 16px', color: '#334155', fontSize: '0.85rem', maxWidth: '400px', wordBreak: 'break-word' }}>
                                            {l.descripcion}
                                        </td>
                                        <td style={{ padding: '14px 16px' }}>
                                            {l.placa && l.placa !== "N/A" ? (
                                                <strong className="placa-badge" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}>
                                                    {l.placa}
                                                </strong>
                                            ) : (
                                                <span style={{ color: '#94a3b8' }}>—</span>
                                            )}
                                        </td>
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

export default Log;