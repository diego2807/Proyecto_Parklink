// src/components/admin/Celdas.jsx
import { useState, useEffect } from 'react';
import Nav from '../../components/AdminNav/Nav';
import { apiService } from '../../services/api_admin'; 
import '../../css/AdminCSS/Celdas.css';

function Celdas() {
    // Estados para el mapa visual de celdas
    const [celdas, setCeldas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [mensajeExito, setMensajeExito] = useState("");

    // Estados nuevos para el formulario de registro de celdas
    const [nuevoCodigo, setNuevoCodigo] = useState("");
    const [nuevoTipo, setNuevoTipo] = useState("eléctricos"); // Valor por defecto alineado al backend
    const [guardando, setGuardando] = useState(false);

    // Cargar mapa físico
    const cargarCeldasSistema = async () => {
        try {
            setCargando(true);
            setError("");
            const datos = await apiService.getCeldas();
            if (datos && Array.isArray(datos)) {
                setCeldas(datos);
            } else if (datos && datos.error) {
                setError(datos.error);
            } else {
                setCeldas([]);
            }
        } catch (err) {
            console.error("Error al sincronizar mapa de celdas:", err);
            setError(err.message || "No se pudo sincronizar el estado físico del parqueadero.");
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
    let activo = true;

    // Englobamos la petición asíncrona para que no se ejecute síncronamente en el hilo principal del efecto
    const sincronizarCeldas = async () => {
        if (activo) {
            await cargarCeldasSistema();
        }
    };

    sincronizarCeldas();

    // Función de limpieza para desmontaje seguro
    return () => {
        activo = false;
    };
}, []);

    // Conmutar estado de ocupación (True / False)
    const handleToggleEstado = async (id, estadoActual, codigo) => {
        try {
            setError("");
            setMensajeExito("");
            const nuevoEstado = !estadoActual;
            const respuesta = await apiService.actualizarEstadoCelda(id, nuevoEstado);
            setMensajeExito(respuesta.message || `Celda ${codigo} actualizada.`);
            await cargarCeldasSistema();
        } catch (err) {
            setError(err.message || "Error al intentar cambiar el estado de la celda.");
        }
    };

    // 🔥 NUEVO: Manejador para guardar una nueva celda en el sistema
    const handleRegistrarCelda = async (e) => {
        e.preventDefault();
        setError("");
        setMensajeExito("");

        if (!nuevoCodigo.trim()) {
            setError("Por favor, digite un código para la celda.");
            return;
        }

        const payload = {
            codigo_celda: nuevoCodigo.trim().toUpperCase(),
            tipo_celda: nuevoTipo // Envía de forma exacta "eléctricos" o "movilidad"
        };

        try {
            setGuardando(true);
            const respuesta = await apiService.registrarCelda(payload);
            
            setMensajeExito(respuesta.message || "¡Celda registrada con éxito!");
            setNuevoCodigo(""); // Limpiar campo de texto
            
            // Recargar el mapa para que aparezca instantáneamente en su sección correspondiente
            await cargarCeldasSistema();
        } catch (err) {
            setError(err.message || "Error al registrar la celda.");
        } finally {
            setGuardando(false);
        }
    };

    // Clasificación dinámica idéntica
    const celdasElectricas = celdas.filter(c => c.tipo_celda === "eléctricos");
    const celdasMovilidad = celdas.filter(c => c.tipo_celda === "movilidad");

    return (
        <>
        <Nav/>
        <main className="main-content">
            <header className="content-header">
                <div className="header-title">
                    <span className="page-badge">Uso Prioritario</span>
                    <h1>3. Estado de Celdas Especiales</h1>
                    <p className="page-description">Monitoreo visual y en tiempo real de los espacios reservados para carga eléctrica y movilidad reducida.</p>
                </div>
            </header>

            {/* Renderizado de Alertas */}
            {error && <div className="alert-message error-box" style={{ padding: '12px', marginBottom: '15px', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '6px', fontWeight: '500' }}>⚠️ {error}</div>}
            {mensajeExito && <div className="alert-message success-box" style={{ padding: '12px', marginBottom: '15px', backgroundColor: '#dcfce7', color: '#166534', borderRadius: '6px', fontWeight: '500' }}>✅ {mensajeExito}</div>}

            {/* 🔥 SECCIÓN NUEVA: FORMULARIO DE REGISTRO PARA EL ADMINISTRADOR */}
            <section className="celdas-section" style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '25px' }}>
                <h2 style={{ fontSize: '1.2rem', color: '#1e293b', marginBottom: '5px' }}>🛠️ Registrar Nueva Celda de Infraestructura</h2>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '15px' }}>Añade nuevos espacios físicos de estacionamiento prioritario al mapa del sistema.</p>
                
                <form onSubmit={handleRegistrarCelda} style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#475569' }}>Código Alfanumérico:</label>
                        <input 
                            type="text" 
                            placeholder="Ej: EL-05 o MR-03" 
                            value={nuevoCodigo}
                            onChange={(e) => setNuevoCodigo(e.target.value)}
                            style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', textTransform: 'uppercase', minWidth: '180px' }}
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#475569' }}>Asignación de Zona:</label>
                        <select 
                            value={nuevoTipo} 
                            onChange={(e) => setNuevoTipo(e.target.value)}
                            style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', minWidth: '220px', backgroundColor: '#fff' }}
                        >
                            <option value="eléctricos">⚡ Zonas de Carga Eléctrica</option>
                            <option value="movilidad">♿ Celda de Movilidad Reducida</option>
                        </select>
                    </div>

                    <button 
                        type="submit" 
                        disabled={guardando}
                        style={{ padding: '9px 20px', backgroundColor: '#1e293b', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
                    >
                        {guardando ? "Guardando..." : "Habilitar Celda"}
                    </button>
                </form>
            </section>

            {/* SECCIÓN 1: ZONAS DE CARGA ELÉCTRICA */}
            <section className="celdas-section">
                <div className="section-title-area">
                    <span className="zone-icon electrica">⚡</span>
                    <div>
                        <h2>Zonas de Carga Eléctrica</h2>
                        <p>Espacios equipados con infraestructura de carga para la flota de vehículos eléctricos corporativos.</p>
                    </div>
                </div>

                <div className="slots-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px', marginTop: '15px' }}>
                    {cargando ? (
                        <div className="slot-loading">Cargando celdas...</div>
                    ) : celdasElectricas.length === 0 ? (
                        <div className="slot-empty" style={{ color: '#64748b', fontSize: '0.9rem' }}>No hay celdas eléctricas activas.</div>
                    ) : (
                        celdasElectricas.map((celda) => (
                            <div key={celda.id} className="slot-card" style={{ border: celda.ocupada ? '2px solid #ef4444' : '2px solid #22c55e', backgroundColor: celda.ocupada ? '#fef2f2' : '#f0fdf4', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
                                <h3 style={{ margin: '0 0 8px 0', fontSize: '1.25rem', color: '#1e293b' }}>{celda.codigo_celda}</h3>
                                <span style={{ display: 'inline-block', padding: '3px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold', backgroundColor: celda.ocupada ? '#ef4444' : '#22c55e', color: '#ffffff', marginBottom: '10px' }}>
                                    {celda.ocupada ? "Ocupada" : "Disponible"}
                                </span>
                                <button onClick={() => handleToggleEstado(celda.id, celda.ocupada, celda.codigo_celda)} style={{ display: 'block', width: '100%', padding: '5px', fontSize: '0.8rem', backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer' }}>
                                    {celda.ocupada ? "🔓 Liberar" : "🔒 Ocupar"}
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* SECCIÓN 2: CELDAS DE MOVILIDAD REDUCIDA */}
            <section className="celdas-section" style={{ marginTop: '30px' }}>
                <div className="section-title-area">
                    <span className="zone-icon movilidad">♿</span>
                    <div>
                        <h2>Celdas de Movilidad Reducida</h2>
                        <p>Zonas de estacionamiento con acceso prioritario reglamentario para el personal habilitado.</p>
                    </div>
                </div>

                <div className="slots-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px', marginTop: '15px' }}>
                    {cargando ? (
                        <div className="slot-loading">Cargando celdas...</div>
                    ) : celdasMovilidad.length === 0 ? (
                        <div className="slot-empty" style={{ color: '#64748b', fontSize: '0.9rem' }}>No hay celdas de movilidad reducida activas.</div>
                    ) : (
                        celdasMovilidad.map((celda) => (
                            <div key={celda.id} className="slot-card" style={{ border: celda.ocupada ? '2px solid #ef4444' : '2px solid #22c55e', backgroundColor: celda.ocupada ? '#fef2f2' : '#f0fdf4', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
                                <h3 style={{ margin: '0 0 8px 0', fontSize: '1.25rem', color: '#1e293b' }}>{celda.codigo_celda}</h3>
                                <span style={{ display: 'inline-block', padding: '3px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold', backgroundColor: celda.ocupada ? '#ef4444' : '#22c55e', color: '#ffffff', marginBottom: '10px' }}>
                                    {celda.ocupada ? "Ocupada" : "Disponible"}
                                </span>
                                <button onClick={() => handleToggleEstado(celda.id, celda.ocupada, celda.codigo_celda)} style={{ display: 'block', width: '100%', padding: '5px', fontSize: '0.8rem', backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer' }}>
                                    {celda.ocupada ? "🔓 Liberar" : "🔒 Ocupar"}
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </main>
        </>
    );
}

export default Celdas;