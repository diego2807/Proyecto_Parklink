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

    // LLAMADO DIRECTO CON FETCH NATIVO PARA EVITAR COLOQUIOS CON AXIOS
    const cargarAuditoria = useCallback(async () => {
        setCargando(true);
        setErrorMsg('');
        try {
            const token = localStorage.getItem('token');
            
            // Consumimos el endpoint con el prefijo correcto de tu servidor Flask
            const respuesta = await fetch('http://localhost:5000/api/admin/logs', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Token JWT para pasar la protección
                }
            });

            if (!respuesta.ok) {
                if (respuesta.status === 404) {
                    throw new Error("Ruta /logs no encontrada en el servidor (Error 404). Verifica el Blueprint.");
                }
                if (respuesta.status === 401) {
                    throw new Error("Sesión no autorizada (Error 401). Intenta reingresar al sistema.");
                }
                throw new Error(`Error en el servidor: Código ${respuesta.status}`);
            }

            const data = await respuesta.json();
            
            // Evaluamos si los datos vienen directo como arreglo
            const listaLogs = Array.isArray(data) ? data : (data.data || []);
            setLogs(listaLogs);

        } catch (error) {
            console.error("❌ Error detectado en la sincronización de logs:", error);
            setErrorMsg(error.message || "No se pudo establecer conexión con la bitácora de auditoría.");
        } finally {
            setCargando(false);
        }
    }, []);

    useEffect(() => {
        cargarAuditoria();
    }, [cargarAuditoria]);

    // Filtro tolerante a nulos o minúsculas
    const logsFiltrados = logs.filter(log => {
        const placaTexto = log.placa ? String(log.placa).toLowerCase() : '';
        const moduloTexto = log.modulo ? String(log.modulo).toLowerCase() : '';
        const descTexto = log.descripcion ? String(log.descripcion).toLowerCase() : '';
        const query = busqueda.toLowerCase();

        const coincideTexto = placaTexto.includes(query) || 
                              moduloTexto.includes(query) || 
                              descTexto.includes(query) ||
                              String(log.usuario_id || '').includes(query);

        const nivelLog = log.nivel ? String(log.nivel).toLowerCase() : '';
        let coincideCrit = false;

        if (criticidad === 'todos') {
            coincideCrit = true;
        } else if (criticidad === 'info') {
            coincideCrit = nivelLog.includes('info');
        } else if (criticidad === 'critico') {
            coincideCrit = nivelLog.includes('crit') || nivelLog.includes('crít');
        } else {
            coincideCrit = nivelLog.includes(criticidad);
        }

        return coincideTexto && coincideCrit;
    });

    const obtenerClaseNivel = (nivel) => {
        const n = String(nivel).toLowerCase();
        if (n.includes('crit') || n.includes('alta')) return 'badge-danger';
        if (n.includes('advert') || n.includes('media')) return 'badge-warning';
        return 'badge-info';
    };

    return (
        <>
        <Nav />
        <main className="main-content" id="page-log-auditoria-main">
            <header className="content-header">
                <div className="header-title">
                    <span className="page-badge text-alert">Auditoría Avanzada</span>
                    <h1>4. Log de Eventos y Seguridad</h1>
                    <p className="page-description">Historial cronológico e inmutable de operaciones internas sobre el inventario y las celdas corporativas.</p>
                </div>
            </header>

            {errorMsg && (
                <div className="form-msg error" style={{ padding: '12px', marginBottom: '20px', borderRadius: '8px', background: '#fde8e8', color: '#9b1c1c', border: '1px solid #f8b4b4' }}>
                    ⚠️ {errorMsg}
                </div>
            )}

            <section className="filter-box">
                <form className="filter-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="input-field">
                        <label htmlFor="searchPlaca" className="field-label">Buscar término general:</label>
                        <input 
                            type="text" 
                            id="searchPlaca" 
                            className="field-input" 
                            value={busqueda} 
                            onChange={(e) => setBusqueda(e.target.value)} 
                            placeholder="Buscar por placa, descripción o módulo..."
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="selectCriticidad" className="field-label">Filtrar por Severidad:</label>
                        <select 
                            id="selectCriticidad" 
                            className="field-select" 
                            value={criticidad} 
                            onChange={(e) => setCriticidad(e.target.value)}
                        >
                            <option value="todos">Todos los eventos</option>
                            <option value="info">Información (Informativo)</option>
                            <option value="advertencia">Advertencia</option>
                            <option value="critico">Crítico (Alerta)</option>
                        </select>
                    </div>
                </form>
            </section>

            <section className="log-section">
                <div className="section-title-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h2>Bitácora del Sistema</h2>
                    <button 
                        className="btn-refresh" 
                        onClick={cargarAuditoria} 
                        disabled={cargando}
                        style={{ padding: '6px 14px', cursor: 'pointer', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px' }}
                    >
                        {cargando ? "Sincronizando..." : "🔄 Refrescar Logs"}
                    </button>
                </div>

                <div className="table-container">
                    <table className="log-table">
                        <thead>
                            <tr>
                                <th>Fecha / Hora (UTC)</th>
                                <th>Módulo</th>
                                <th>Severidad</th>
                                <th>Descripción de Acción</th>
                                <th>Asociado (ID / Placa)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cargando ? (
                                <tr className="row-loading">
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                                        Sincronizando log con el servidor de auditoría...
                                    </td>
                                </tr>
                            ) : logsFiltrados.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                                        No se encontraron registros que coincidan con los criterios.
                                    </td>
                                </tr>
                            ) : (
                                logsFiltrados.map((l) => (
                                    <tr key={l.id}>
                                        <td style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{l.fecha}</td>
                                        <td><strong>{l.modulo}</strong></td>
                                        <td>
                                            <span className={`log-badge ${obtenerClaseNivel(l.nivel)}`}>
                                                {String(l.nivel).toUpperCase()}
                                            </span>
                                        </td>
                                        <td style={{ maxWidth: '400px', wordBreak: 'break-word' }}>{l.descripcion}</td>
                                        <td>
                                            {l.placa && l.placa !== "N/A" ? (
                                                <strong className="placa-badge" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}>
                                                    {l.placa}
                                                </strong>
                                            ) : l.usuario_id ? (
                                                <span style={{ color: '#475569', fontSize: '0.85rem' }}>👤 User ID: {l.usuario_id}</span>
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