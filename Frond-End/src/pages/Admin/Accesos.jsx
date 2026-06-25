// src/components/admin/Accesos.jsx
import { useState, useEffect } from 'react';
import Nav from '../../components/AdminNav/Nav';
import { apiService } from '../../services/api_admin'; 
import '../../css/AdminCSS/Accesos.css';

function Accesos() {
    // 1. Estados para capturar los datos del formulario de portería
    const [placa, setPlaca] = useState("");
    const [tipoMovimiento, setTipoMovimiento] = useState("Entrada"); // "Entrada" o "Salida"
    const [tipoVehiculo, setTipoVehiculo] = useState("Automóvil");
    const [tipoUsuario, setTipoUsuario] = useState("Funcionario"); // "Funcionario" o "Invitado"
    const [celdaAsignada, setCeldaAsignada] = useState("");

    // 2. Estados de control para el historial, loaders y feedback de usuario
    const [historial, setHistorial] = useState([]);
    const [cargandoHistorial, setCargandoHistorial] = useState(true);
    const [procesandoAcceso, setProcesandoAcceso] = useState(false);
    const [mensajeError, setMensajeError] = useState("");
    const [mensajeExito, setMensajeExito] = useState("");

    // 🌟 NUEVA FUNCIÓN: Formateador dinámico y restricción estricta (AAA-123)
    const handlePlacaChange = (e) => {
        // Limpiar el valor eliminando guiones previos y pasando a mayúsculas
        let valor = e.target.value.replace(/-/g, '').toUpperCase();
        
        // Validar y restringir según la posición de los caracteres
        if (valor.length <= 3) {
            // Los primeros 3 caracteres solo pueden ser letras
            valor = valor.replace(/[^A-Z]/g, '');
        } else {
            // Separa las primeras 3 letras y obliga a que los siguientes 3 caracteres sean solo números
            const letras = valor.slice(0, 3).replace(/[^A-Z]/g, '');
            const numeros = valor.slice(3, 6).replace(/[^0-9]/g, '');
            valor = letras + numeros;
        }

        // Inyectar el guion automático si ya se digitaron las 3 letras
        if (valor.length > 3) {
            valor = `${valor.slice(0, 3)}-${valor.slice(3)}`;
        }

        setPlaca(valor);
    };

    // 3. Función para cargar el historial de accesos desde el backend
    const cargarHistorialDeAccesos = async () => {
        try {
            setCargandoHistorial(true);
            setMensajeError("");
            
            const datos = await apiService.getHistorial();
            
            if (datos && Array.isArray(datos)) {
                setHistorial(datos);
            } else if (datos && datos.error) {
                setMensajeError(datos.error);
            } else {
                setHistorial([]); 
            }
        } catch (error) {
            console.error("Error al recuperar el historial corporativo:", error);
            setMensajeError(error.message || "No se pudo sincronizar el historial de movimientos o el token expiró.");
        } finally {
            setCargandoHistorial(false);
        }
    };

    // Hook de ciclo de vida corregido y limpio
    useEffect(() => {
        let activo = true;

        const ejecutarCarga = async () => {
            if (activo) {
                await cargarHistorialDeAccesos();
            }
        };

        ejecutarCarga();

        return () => {
            activo = false;
        };
    }, []);

    // 4. Manejador del envío del formulario (POST)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensajeError("");
        setMensajeExito("");

        // Validación estricta antes de enviar al backend de Flask
        const regexPlaca = /^[A-Z]{3}-[0-9]{3}$/;
        if (!regexPlaca.test(placa)) {
            setMensajeError("El formato de la placa no es válido. Debe ser 3 letras, un guion y 3 números (Ej: ABC-123).");
            return;
        }

        const payload = {
            placa: placa.trim().toUpperCase(),
            tipo_movimiento: tipoMovimiento,
            tipo_vehiculo: tipoVehiculo,
            tipo_usuario: tipoUsuario,
            celda_asignada: celdaAsignada || "N/A"
        };

        try {
            setProcesandoAcceso(true);
            
            const respuesta = await apiService.registrarAcceso(payload);
            
            setMensajeExito(respuesta.message || `¡Registro de ${tipoMovimiento} guardado con éxito!`);
            
            // Limpiar formulario básico para el siguiente vehículo
            setPlaca("");
            setCeldaAsignada("");
            
            await cargarHistorialDeAccesos();

        } catch (error) {
            setMensajeError(error.message || "Error interno al procesar el evento en portería.");
        } finally {
            setProcesandoAcceso(false);
        }
    };

    // Determinar si la placa cumple con el largo exacto de la máscara (7 caracteres: AAA-123)
    const placaEsValida = placa.length === 7;

    return (
        <>
        <Nav/>
        <main className="main-content">
            
            <header className="content-header">
                <div className="header-title">
                    <span className="page-badge badge-gate">Portería Principal</span>
                    <h1>8. Registro de Ingresos y Salidas</h1>
                    <p className="page-description">Validación de autorizaciones en tiempo real y asignación manual o automática de celdas.</p>
                </div>
            </header>

            {/* Renderizado de Mensajes del Sistema */}
            {mensajeError && <div className="alert-message error-box" style={{ padding: '12px', marginBottom: '15px', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '6px', fontWeight: '500' }}>⚠️ {mensajeError}</div>}
            {mensajeExito && <div className="alert-message success-box" style={{ padding: '12px', marginBottom: '15px', backgroundColor: '#dcfce7', color: '#166534', borderRadius: '6px', fontWeight: '500' }}>✅ {mensajeExito}</div>}

            <div className="gate-grid">
                
                {/* SECCIÓN DEL FORMULARIO OPERATIVO */}
                <section className="gate-card">
                    <h2>Registrar Movimiento Vehicular</h2>
                    <p className="section-desc">Ingresa los datos para registrar un evento de entrada o salida de la organización.</p>
                    
                    <form id="form-control-acceso" className="gate-form" onSubmit={handleSubmit}>
                        
                        {/* Selección de Tipo de Movimiento */}
                        <div className="movement-selection">
                            <label className="movement-label">
                                <input 
                                    type="radio" 
                                    name="radioMovimiento" 
                                    value="Entrada" 
                                    checked={tipoMovimiento === "Entrada"}
                                    onChange={(e) => setTipoMovimiento(e.target.value)}
                                />
                                <span className="movement-box box-in">
                                    <span className="mvt-icon">📥</span>
                                    <strong>Ingreso</strong>
                                </span>
                            </label>
                            
                            <label className="movement-label">
                                <input 
                                    type="radio" 
                                    name="radioMovimiento" 
                                    value="Salida" 
                                    checked={tipoMovimiento === "Salida"}
                                    onChange={(e) => setTipoMovimiento(e.target.value)}
                                />
                                <span className="movement-box box-out">
                                    <span className="mvt-icon">📤</span>
                                    <strong>Salida</strong>
                                </span>
                            </label>
                        </div>

                        {/* Input Controlado de Placa con Máscara Automática */}
                        <div className="input-field">
                            <label htmlFor="inputPlaca" className="field-label">Placa del Vehículo:</label>
                            <input 
                                type="text" 
                                id="inputPlaca" 
                                className="field-input text-uppercase" 
                                placeholder="Ej: ABC-123" 
                                maxLength="7" // 🌟 Reducido a 7 para encajar perfectamente con 'AAA-123'
                                value={placa}
                                onChange={handlePlacaChange} // 🌟 Enlazado a la nueva validación
                                required
                            />
                        </div>

                        {/* Clasificación de Vehículo */}
                        <div className="input-field">
                            <label htmlFor="selectTipoVehiculo" className="field-label">Tipo de Vehículo:</label>
                            <select 
                                id="selectTipoVehiculo" 
                                className="field-select"
                                value={tipoVehiculo}
                                onChange={(e) => setTipoVehiculo(e.target.value)}
                            >
                                <option value="Automóvil">Automóvil</option>
                                <option value="Motocicleta">Motocicleta</option>
                                <option value="Camioneta">Camioneta</option>
                                <option value="Bicicleta">Bicicleta</option>
                            </select>
                        </div>

                        {/* Clasificación del Conductor */}
                        <div className="input-field">
                            <label htmlFor="selectTipoUsuario" className="field-label">Tipo de Usuario:</label>
                            <select 
                                id="selectTipoUsuario" 
                                className="field-select"
                                value={tipoUsuario}
                                onChange={(e) => setTipoUsuario(e.target.value)}
                            >
                                <option value="Funcionario">Funcionario Corporativo</option>
                                <option value="Invitado">Invitado / Externo</option>
                            </select>
                        </div>

                        {/* Estado Dinámico de Validación Ajustado */}
                        <div className={`gate-status ${placaEsValida ? 'status-success' : 'status-pending'}`}>
                            <p className="status-title">
                                {placaEsValida ? `Placa lista para autorizar: ${placa}` : "Esperando formato completo (Ej: ABC-123)..."}
                            </p>
                        </div>

                        {/* Celda Sugerida */}
                        <div className="input-field">
                            <label htmlFor="selectCeldaAsignada" className="field-label">Celda Sugerida / Asignada:</label>
                            <select 
                                id="selectCeldaAsignada" 
                                className="field-select"
                                value={celdaAsignada}
                                onChange={(e) => setCeldaAsignada(e.target.value)}
                            >
                                <option value="">-- Seleccionar Celda Disponible --</option>
                                <option value="A-01">Zona A - Celda 01</option>
                                <option value="A-02">Zona A - Celda 02</option>
                                <option value="B-01">Zona B - Celda 01 (Motos)</option>
                                <option value="C-05">Zona C - Celda 05 (Especial)</option>
                            </select>
                        </div>

                        <button 
                            type="submit" 
                            id="btnProcesarAcceso" 
                            className="btn-gate-submit"
                            disabled={procesandoAcceso}
                        >
                            {procesandoAcceso ? "Guardando Registro..." : "Procesar y Guardar Registro"}
                        </button>
                    </form>
                </section>

                {/* BARRA LATERAL: ÚLTIMOS MOVIMIENTOS DINÁMICOS */}
                <section className="gate-card sidebar-activity">
                    <h2>Últimos Movimientos</h2>
                    <p className="section-desc">Historial inmediato de los vehículos que acaban de cruzar los accesos de la empresa.</p>
                    
                    <div className="activity-timeline" id="timeline-accesos">
                        {cargandoHistorial ? (
                            <div className="timeline-item loading">
                                <p>Sincronizando con portería...</p>
                            </div>
                        ) : historial.length === 0 ? (
                            <div className="timeline-item empty" style={{ color: '#64748b', textAlign: 'center', padding: '10px' }}>
                                <p>No se registran movimientos el día de hoy.</p>
                            </div>
                        ) : (
                            historial.map((item) => (
                                <div className="timeline-item" key={item.id} style={{ borderLeft: item.tipo_movimiento === 'Entrada' ? '4px solid #22c55e' : '4px solid #ef4444', paddingLeft: '12px', marginBottom: '12px' }}>
                                    <div className="timeline-meta" style={{ display: 'flex', justifyContent: 'between', alignItems: 'center' }}>
                                        <span className="plate-badge" style={{ backgroundColor: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace', fontWeight: 'bold' }}>
                                            {item.placa}
                                        </span>
                                        <small style={{ color: '#64748b', marginLeft: 'auto', fontSize: '0.75rem' }}>{item.fecha_hora.split(" ")[1] || item.fecha_hora}</small>
                                    </div>
                                    <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#334155' }}>
                                        <strong>{item.tipo_movimiento}:</strong> {item.tipo_vehiculo} ({item.tipo_usuario})
                                    </p>
                                    {item.celda_asignada && item.celda_asignada !== "N/A" && (
                                        <small style={{ color: '#0284c7', fontWeight: '500' }}>📍 Celda: {item.celda_asignada}</small>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </section>

            </div>

        </main>
        </>
    );
}

export default Accesos;