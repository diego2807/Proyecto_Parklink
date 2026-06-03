import Nav from '../../components/Nav'

function Vehiculos (){
    return(
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

            <div className="vehicles-grid">
                
                <section className="vehicles-card">
                    <h2>Vincular Nuevo Vehículo</h2>
                    <p className="section-desc">Asocia la información de un empleado para permitir la lectura automatizada en portería.</p>
                    
                    <form id="form-registro-vehiculo" className="vehicles-form">
                        <div className="input-field">
                            <label for="inputNombreFuncionario" className="field-label">Nombre Completo:</label>
                            <input type="text" id="inputNombreFuncionario" className="field-input" placeholder="Ej: Karen Rodríguez" required/>
                        </div>

                        <div className="input-field">
                            <label for="inputDocumento" className="field-label">Documento de Identidad:</label>
                            <input type="text" id="inputDocumento" className="field-input" placeholder="C.C. o NIT" required/>
                        </div>

                        <div className="form-row">
                            <div className="input-field">
                                <label for="inputPlaca" className="field-label">Placa del Vehículo:</label>
                                <input type="text" id="inputPlaca" className="field-input" placeholder="Ej: ABC123" max-length="6" required/>
                            </div>
                            
                            <div className="input-field">
                                <label for="selectTipoVehiculo" className="field-label">Tipo:</label>
                                <select id="selectTipoVehiculo" className="field-select">
                                    <option value="Automóvil">Automóvil</option>
                                    <option value="Motocicleta">Motocicleta</option>
                                </select>
                            </div>
                        </div>

                        <div className="input-field">
                            <label for="selectArea" className="field-label">Área / Dependencia:</label>
                            <select id="selectArea" className="field-select">
                                <option value="Tecnología">Tecnología e Innovación</option>
                                <option value="Operaciones">Operaciones y Logística</option>
                                <option value="Administración">Administración y Finanzas</option>
                                <option value="Talento Humano">Talento Humano</option>
                            </select>
                        </div>

                        <button type="submit" className="btn-submit">
                            Registrar y Autorizar
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
                                <tr className="row-loading">
                                    <td colspan="4">Consultando base de datos de funcionarios...</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

            </div>

        </main>
        </>
    )
}

export default Vehiculos