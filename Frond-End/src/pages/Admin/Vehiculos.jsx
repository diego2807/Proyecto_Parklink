// src/components/admin/Vehiculos.jsx
import { useState, useEffect } from 'react';
import Nav from '../../components/AdminNav/Nav';
import { apiService } from '../../services/api_admin'; 
import '../../css/AdminCSS/Vehiculos.css';

// COMPONENTE MAYÚSCULA: Soluciona el error del Hook useEffect
function Vehiculos() {
    // 1. Estados nativos del formulario para capturar los datos
    const [nombreFuncionario, setNombreFuncionario] = useState("");
    const [documento, setDocumento] = useState("");
    const [placa, setPlaca] = useState("");
    const [tipoVehiculo, setTipoVehiculo] = useState("Automóvil"); 
    const [area, setArea] = useState("Tecnología");                

    // 2. Estados de control para la tabla, loaders y feedback visual
    const [listaVehiculos, setListaVehiculos] = useState([]); 
    const [cargandoTabla, setCargandoTabla] = useState(true);
    const [cargandoForm, setCargandoForm] = useState(false);
    const [mensajeError, setMensajeError] = useState("");
    const [mensajeExito, setMensajeExito] = useState("");

    // 3. Cargar y sincronizar la lista de vehículos desde el backend (Flask)
    const cargarVehiculosRegistrados = async () => {
        try {
            setMensajeError("");
            const data = await apiService.getVehiculos();
            
            console.log("Datos recibidos de Flask en la tabla:", data);

            if (data && Array.isArray(data)) {
                setListaVehiculos(data);
            } else if (data && data.vehiculos && Array.isArray(data.vehiculos)) {
                setListaVehiculos(data.vehiculos);
            } else if (data && data.data && Array.isArray(data.data)) {
                setListaVehiculos(data.data);
            } else {
                console.warn("La estructura devuelta no es un array válido:", data);
                setListaVehiculos([]); 
            }
        } catch (err) {
            console.error("Error al recuperar vehículos:", err);
            setMensajeError(err.message || "No se pudo sincronizar la lista con el servidor corporativo.");
            setListaVehiculos([]); 
        } finally {
            setCargandoTabla(false);
        }
    };

    const handleEliminarVehiculo = async (id, placa) => {
        const confirmar = window.confirm(`¿Está seguro de que desea dar de baja de ParkLink el vehículo con placas [ ${placa} ]?`);
        if (!confirmar) return;

        try {
            setMensajeError("");
            setMensajeExito("");
            
            // Llamar al servicio real del backend
            const respuesta = await apiService.eliminarVehiculo(id);
            
            setMensajeExito(respuesta.message || "Vehículo eliminado con éxito.");
            
            // Refrescar la tabla automáticamente consultando los datos limpios de la BD
            await cargarVehiculosRegistrados();
        } catch (error) {
            setMensajeError(error.message || "No se pudo completar la eliminación del vehículo.");
        }
    };

    // 4. Hook de montaje corregido y alineado al ciclo de vida del componente
    useEffect(() => {
        let activo = true;
        
        const ejecutarCarga = async () => {
            if (activo) {
                await cargarVehiculosRegistrados();
            }
        };

        ejecutarCarga();

        return () => {
            activo = false;
        };
    }, []);

    // 5. Manejador del envío del formulario (POST) con validaciones corporativas
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensajeError("");
        setMensajeExito("");

        // Validación inicial de campos vacíos
        if (!nombreFuncionario.trim() || !documento.trim() || !placa.trim()) {
            setMensajeError("Por favor, diligencia todos los campos requeridos.");
            return;
        }

        // ── 🌟 VALIDACIÓN ACTUALIZADA: PLACA (3 letras, un guion, 3 números) ──
        const placaFormateada = placa.trim().toUpperCase();
        const regexPlaca = /^[A-Z]{3}-[0-9]{3}$/;
        if (!regexPlaca.test(placaFormateada)) {
            setMensajeError("La placa debe cumplir con el formato de 3 letras, un guion y 3 números (Ej: ABC-123).");
            return;
        }

        // ── VALIDACIÓN 2: NOMBRE FUNCIONARIO (Solo texto y espacios, sin números) ──
        const nombreFormateado = nombreFuncionario.trim();
        const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/;
        if (!regexNombre.test(nombreFormateado)) {
            setMensajeError("El nombre completo solo puede contener letras y espacios operacionales.");
            return;
        }

        // ── VALIDACIÓN 3: DOCUMENTO (Debe empezar con 1019 y máximo/exactamente 10 dígitos) ──
        const documentoFormateado = documento.trim();
        const regexDocumento = /^1019[0-9]{6}$/; // 1019 + 6 dígitos = 10 dígitos en total
        if (!regexDocumento.test(documentoFormateado)) {
            setMensajeError("El documento de identidad debe iniciar obligatoriamente con '1019' y contener exactamente 10 dígitos numéricos.");
            return;
        }

        setCargandoForm(true);

        const payload = {
            nombre_funcionario: nombreFormateado,
            documento_identidad: documentoFormateado,
            placa: placaFormateada, 
            tipo_vehiculo: tipoVehiculo,
            area: area
        };

        try {
            await apiService.vincularVehiculo(payload);
            setMensajeExito(`¡Vehículo con placa ${payload.placa} vinculado exitosamente!`);
            
            setNombreFuncionario("");
            setDocumento("");
            setPlaca("");
            setTipoVehiculo("Automóvil");
            setArea("Tecnología");

            setCargandoTabla(true);
            await cargarVehiculosRegistrados();

        } catch (err) {
            console.error("Error en vinculación vehicular:", err);
            setMensajeError(err.message || "Error al procesar la vinculación del vehículo.");
        } finally {
            setCargandoForm(false);
        }
    };

    return (
        <>
        <Nav/>
        <main className="main-content">
            
            <header className="content-header">
                <div className="header-title">
                    <span className="page-badge">Funcionarios</span>
                    <h1>7. Gestión de Personal y Vehículos</h1>
                    <p className="page-description">Vinculación de placas, asignación de áreas operativas y control de excepciones del personal autorizado.</p>
                </div>
            </header>

            {mensajeError && (
                <div className="form-msg error" style={{ padding: '12px', marginBottom: '15px', background: '#fde8e8', color: '#9b1c1c', borderRadius: '6px', border: '1px solid #f8b4b4', fontSize: '0.9rem', fontWeight: '500' }}>
                    ⚠️ {mensajeError}
                </div>
            )}
            {mensajeExito && (
                <div className="form-msg success" style={{ padding: '12px', marginBottom: '15px', background: '#def7ec', color: '#03543f', borderRadius: '6px', border: '1px solid #bcf0da', fontSize: '0.9rem', fontWeight: '500' }}>
                    ✅ {mensajeExito}
                </div>
            )}

            <div className="vehicles-grid">
                
                <section className="vehicles-card">
                    <h2>Vincular Nuevo Vehículo</h2>
                    <p className="section-desc">Asocia la información de un empleado para permitir la lectura automatizada en portería.</p>
                    
                    <form id="form-registro-vehiculo" className="vehicles-form" onSubmit={handleSubmit}>
                        <div className="input-field">
                            <label htmlFor="inputNombreFuncionario" className="field-label">Nombre Completo:</label>
                            <input 
                                type="text" 
                                id="inputNombreFuncionario" 
                                className="field-input" 
                                placeholder="Ej: Karen Rodríguez" 
                                required
                                value={nombreFuncionario}
                                onChange={(e) => setNombreFuncionario(e.target.value.replace(/[0-9]/g, ""))}
                            />
                        </div>

                        <div className="input-field">
                            <label htmlFor="inputDocumento" className="field-label">Documento de Identidad:</label>
                            <input 
                                type="text" 
                                id="inputDocumento" 
                                className="field-input" 
                                placeholder="Ej: 1019XXXXXX" 
                                required
                                maxLength={10} 
                                value={documento}
                                onChange={(e) => setDocumento(e.target.value.replace(/\D/g, ""))}
                            />
                        </div>

                        <div className="form-row">
                            <div className="input-field">
                                <label htmlFor="inputPlaca" className="field-label">Placa del Vehículo:</label>
                                <input 
                                    type="text" 
                                    id="inputPlaca" 
                                    className="field-input" 
                                    placeholder="Ej: ABC-123" 
                                    maxLength={7} 
                                    required
                                    value={placa}
                                    // 🌟 MÁSCARA EN LÍNEA: Convierte a mayúsculas y fuerza el formato sin romper nada
                                    onChange={(e) => {
                                        let val = e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
                                        if (val.length > 3) {
                                            val = val.slice(0, 3) + '-' + val.slice(3, 6);
                                        }
                                        setPlaca(val);
                                    }}
                                />
                            </div>
                            
                            <div className="input-field">
                                <label htmlFor="selectTipoVehiculo" className="field-label">Tipo:</label>
                                <select 
                                    id="selectTipoVehiculo" 
                                    className="field-select"
                                    value={tipoVehiculo}
                                    onChange={(e) => setTipoVehiculo(e.target.value)}
                                >
                                    <option value="Automóvil">Automóvil</option>
                                    <option value="Motocicleta">Motocicleta</option>
                                </select>
                            </div>
                        </div>

                        <div className="input-field">
                            <label htmlFor="selectArea" className="field-label">Área / Dependencia:</label>
                            <select 
                                id="selectArea" 
                                className="field-select"
                                value={area}
                                onChange={(e) => setArea(e.target.value)}
                            >
                                <option value="Tecnología">Tecnología e Innovación</option>
                                <option value="Operaciones">Operaciones y Logística</option>
                                <option value="Administración">Administración y Finanzas</option>
                                <option value="Talento Humano">Talento Humano</option>
                            </select>
                        </div>

                        <button type="submit" className="btn-submit" disabled={cargandoForm}>
                            {cargandoForm ? "Procesando..." : "Registrar y Autorizar"}
                        </button>
                    </form>
                </section>

                <section className="vehicles-card">
                    <h2>Vehículos Registrados</h2>
                    <p className="section-desc">Personal interno con permisos de acceso vigentes en el sistema.</p>
                    
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Funcionario</th>
                                    <th>Placa</th>
                                    <th>Área</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="tabla-vehiculos-cuerpo">
                                {cargandoTabla ? (
                                    <tr className="row-loading">
                                        <td colSpan="4" style={{ textAlign: 'center', padding: '15px', color: '#64748b' }}>
                                            Consultando base de datos de funcionarios...
                                        </td>
                                    </tr>
                                ) : (!listaVehiculos || listaVehiculos.length === 0) ? (
                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center', padding: '15px', color: '#64748b' }}>
                                            No se encontraron vehículos vínculos en el sistema.
                                        </td>
                                    </tr>
                                ) : (
                                    listaVehiculos.map((item, index) => (
                                        <tr key={item.id || index}>
                                            <td>{item.nombre_funcionario || item.funcionario || "No asignado"}</td>
                                            <td>
                                                <span className="plate-badge" style={{ background: '#f1f5f9', padding: '4px 8px', borderRadius: '4px', fontFamily: 'monospace', fontWeight: 'bold', border: '1px solid #cbd5e1', color: '#0f172a' }}>
                                                    {item.placa}
                                                </span>
                                            </td>
                                            <td>{item.area || "General"}</td>
                                            <td>
                                                <button 
                                                    className="btn-action-delete" 
                                                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem' }}
                                                    onClick={() => handleEliminarVehiculo(item.id, item.placa)}
                                                >
                                                🗑️ Dar de Baja
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>    
                    </div>
                </section>

            </div>

        </main>
        </>
    );
}

export default Vehiculos;