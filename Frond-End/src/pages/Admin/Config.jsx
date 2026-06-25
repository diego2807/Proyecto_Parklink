// src/components/admin/Config.jsx
import { useState, useEffect, useCallback } from 'react';
import Nav from '../../components/AdminNav/Nav';
import '../../css/AdminCSS/Config.css';

function Config() {
    // Valores por defecto seguros para evitar que los inputs queden descontrolados
    const [formData, setFormData] = useState({
        hora_apertura: '06:00',
        hora_cierre: '22:00',
        permitir_festivos: true,
        tiempo_maximo: 14,
        accion_exceso: 'notificar',
        celdas_admin: 40,
        celdas_operativas: 60,
        celdas_movilidad: 10
    });

    const [cargando, setCargando] = useState(true);
    const [guardando, setGuardando] = useState(false);
    const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

    // Cargar parámetros de manera tolerante
    const cargarConfiguracion = useCallback(async () => {
        setCargando(true);
        setMensaje({ texto: '', tipo: '' });
        try {
            const token = localStorage.getItem('token');
            const respuesta = await fetch('http://localhost:5000/api/admin/config', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!respuesta.ok) throw new Error(`Error en servidor: Código ${respuesta.status}`);

            const resultado = await respuesta.json();
            
            // Validamos la envoltura .data de Flask de forma segura
            if (resultado && resultado.data) {
                setFormData({
                    hora_apertura: resultado.data.hora_apertura || '06:00',
                    hora_cierre: resultado.data.hora_cierre || '22:00',
                    permitir_festivos: resultado.data.permitir_festivos !== undefined ? resultado.data.permitir_festivos : true,
                    tiempo_maximo: Number(resultado.data.tiempo_maximo) || 14,
                    accion_exceso: resultado.data.accion_exceso || 'notificar',
                    celdas_admin: Number(resultado.data.celdas_admin) || 0,
                    celdas_operativas: Number(resultado.data.celdas_operativas) || 0,
                    celdas_movilidad: Number(resultado.data.celdas_movilidad) || 0
                });
            }
        } catch (error) {
            console.error("❌ Error al mapear payload de configuración:", error);
            setMensaje({ texto: 'No se pudo sincronizar los parámetros globales con el servidor.', tipo: 'error' });
        } finally {
            setCargando(false);
        }
    }, []);

    // Reemplaza tu useEffect actual por este:
    useEffect(() => {
        let activo = true;

        const sincronizarReglas = async () => {
            if (activo) {
                await cargarConfiguracion();
            }
        };
        
        sincronizarReglas();

        // Función de limpieza para evitar fugas de memoria y llamadas concurrentes indeseadas
        return () => {
            activo = false;
        };
    }, [cargarConfiguracion]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setGuardando(true);
        setMensaje({ texto: '', tipo: '' });

        try {
            const token = localStorage.getItem('token');
            const respuesta = await fetch('http://localhost:5000/api/admin/config', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const resultado = await respuesta.json();

            if (respuesta.ok) {
                setMensaje({ texto: '¡Parámetros del sistema actualizados correctamente!', tipo: 'success' });
                // Volvemos a sincronizar para asegurar consistencia con BD
                if (resultado.data) {
                    setFormData(resultado.data);
                }
            } else {
                throw new Error(resultado.message || 'Error al intentar guardar.');
            }
        } catch (error) {
            console.error("❌ Error al guardar configuración:", error);
            setMensaje({ texto: error.message || 'Falló la conexión con el servidor de base de datos.', tipo: 'error' });
        } finally {
            setGuardando(false);
            setTimeout(() => setMensaje({ texto: '', tipo: '' }), 4000);
        }
    };

    return (
        <>
        <Nav />
        <main className="config-main-container">
            <header className="config-header-section">
                <div>
                    <h1>Parámetros Globales y Capacidad</h1>
                    <p>Configuración maestra de las reglas de negocio, horarios de operación y distribución de celdas corporativas.</p>
                </div>
            </header>

            {mensaje.texto && (
                <div className={`config-alert ${mensaje.tipo === 'success' ? 'alert-success' : 'alert-danger'}`}>
                    {mensaje.tipo === 'success' ? '✅' : '⚠️'} {mensaje.texto}
                </div>
            )}

            {cargando ? (
                <div className="config-loading">Sincronizando reglas con el servidor de ParkLink...</div>
            ) : (
                <form onSubmit={handleSubmit} className="config-form">
                    
                    {/* BLOQUE 1: REGLAS HORARIAS Y OPERACIÓN */}
                    <div className="config-card">
                        <h2>🕒 Horario de Infraestructura y Control</h2>
                        <div className="config-grid-inputs">
                            <div className="config-field">
                                <label>Hora de Apertura</label>
                                <input type="time" name="hora_apertura" value={formData.hora_apertura} onChange={handleChange} required />
                            </div>
                            <div className="config-field">
                                <label>Hora de Cierre</label>
                                <input type="time" name="hora_cierre" value={formData.hora_cierre} onChange={handleChange} required />
                            </div>
                            <div className="config-field">
                                <label>Tiempo Máximo Permitido (Horas)</label>
                                <input type="number" name="tiempo_maximo" min="1" max="24" value={formData.tiempo_maximo} onChange={handleChange} required />
                            </div>
                            <div className="config-field">
                                <label>Acción por Exceso de Tiempo</label>
                                <select name="accion_exceso" value={formData.accion_exceso} onChange={handleChange}>
                                    <option value="notificar">Solo enviar alerta al Admin</option>
                                    <option value="bloquear">Bloquear reingreso de placa</option>
                                </select>
                            </div>
                        </div>
                        <div className="config-checkbox-field">
                            <label className="switch-label">
                                <input type="checkbox" name="permitir_festivos" checked={formData.permitir_festivos} onChange={handleChange} />
                                <span className="custom-checkbox"></span>
                                Permitir ingreso de vehículos operacionales los días domingos y festivos
                            </label>
                        </div>
                    </div>

                    {/* BLOQUE 2: PARAMETRIZACIÓN DE CAPACIDADES */}
                    <div className="config-card">
                        <h2>📊 Cupos y Distribución de Celdas</h2>
                        <p className="card-subtitle">Define el número total de espacios físicos asignados por perfiles dentro del plantel corporativo.</p>
                        <div className="config-grid-inputs">
                            <div className="config-field">
                                <label>Celdas Administrativas</label>
                                <input type="number" name="celdas_admin" min="0" value={formData.celdas_admin} onChange={handleChange} required />
                            </div>
                            <div className="config-field">
                                <label>Celdas Operativas / Técnicos</label>
                                <input type="number" name="celdas_operativas" min="0" value={formData.celdas_operativas} onChange={handleChange} required />
                            </div>
                            <div className="config-field">
                                <label>Celdas Movilidad Reducida / Eléctricos</label>
                                <input type="number" name="celdas_movilidad" min="0" value={formData.celdas_movilidad} onChange={handleChange} required />
                            </div>
                        </div>
                    </div>

                    {/* SECCIÓN DE ACCIONES */}
                    <div className="config-actions">
                        <button type="button" onClick={cargarConfiguracion} className="btn-cancel" disabled={guardando}>
                            🔄 Cancelar y Revertir
                        </button>
                        <button type="submit" className="btn-submit" disabled={guardando}>
                            {guardando ? 'Guardando...' : '💾 Guardar Parámetros'}
                        </button>
                    </div>

                </form>
            )}
        </main>
        </>
    );
}

export default Config;