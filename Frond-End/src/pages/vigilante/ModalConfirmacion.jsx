import Footer from "../../components/VigilanteNav/VigilanteFooter"
import Header from "../../components/VigilanteNav/VigilanteHeader";
import Nav from "../../components/VigilanteNav/VigilanteNav";
import "../../css/VigilanteCSS/modalConfirmacion.css"

function ModalConfirmacion() {
  return (
    <>
      <Header />

      <main className="main-content">
        <Nav />

        <section className="contenido">

          <div className="dash-header">
            <h2>Gestión de Celdas Individuales</h2>
            <p>
              Asigna bahías vacías o procesa la salida de unidades calculando
              tiempos automáticos.
            </p>
          </div>

          <div className="form-split-grid">

            {/* CHECK IN */}
            <article className="panel-card">

              <div
                className="panel-card-header"
                style={{ background: "#F8FAFC" }}
              >
                <h3 style={{ color: "#137333" }}>
                  ✅ Check-in de Vehículo
                </h3>
              </div>

              <div className="panel-card-body">

                <form onSubmit={(e) => e.preventDefault()}>

                  <div className="fg">
                    <label htmlFor="ci-placa">Placa del Vehículo</label>

                    <div className="input-wrapper">
                      <input
                        type="text"
                        id="ci-placa"
                        placeholder="ABC-123"
                        required
                        style={{ textTransform: "uppercase" }}
                        onInput={(e) =>
                          (e.target.value = e.target.value.toUpperCase())
                        }
                      />
                    </div>
                  </div>

                  <div className="fg">
                    <label htmlFor="ci-celda">Celda Asignada</label>

                    <div className="input-wrapper">
                      <select id="ci-celda" required>
                        <option value="">
                          Seleccionar celda libre...
                        </option>
                        <option>A-01</option>
                        <option>A-03</option>
                        <option>A-04</option>
                        <option>A-05</option>
                        <option>B-02</option>
                        <option>B-03</option>
                        <option>C-01</option>
                        <option>C-03</option>
                      </select>
                    </div>
                  </div>

                  <div className="fg">
                    <label htmlFor="ci-tipo">Tipo de Usuario</label>

                    <div className="input-wrapper">
                      <select id="ci-tipo" required>
                        <option>Empleado Redeban</option>
                        <option>Visitante / Convenio</option>
                        <option>Contratista Externo</option>
                        <option>Directivo</option>
                        <option>Invitado VIP</option>
                      </select>
                    </div>
                  </div>

                  <div className="fg">
                    <label htmlFor="ci-obs">
                      Observaciones (opcional)
                    </label>

                    <div className="input-wrapper">
                      <input
                        type="text"
                        id="ci-obs"
                        placeholder="Estado del vehículo, observaciones..."
                      />
                    </div>
                  </div>

                  <button type="button" className="btn-block">
                    Registrar Ingreso
                  </button>

                </form>

              </div>

            </article>

            {/* CHECK OUT */}
            <article className="panel-card">

              <div
                className="panel-card-header"
                style={{ background: "#F8FAFC" }}
              >
                <h3 style={{ color: "#C5221F" }}>
                  ⏏ Check-out de Vehículo
                </h3>
              </div>

              <div className="panel-card-body">

                <form onSubmit={(e) => e.preventDefault()}>

                  <div className="fg">
                    <label htmlFor="co-placa">
                      Placa del Vehículo
                    </label>

                    <div className="input-wrapper">
                      <input
                        type="text"
                        id="co-placa"
                        placeholder="ABC-123"
                      />
                    </div>
                  </div>

                  <div className="fg">
                    <label htmlFor="co-celda">
                      Celda a Liberar
                    </label>

                    <div className="input-wrapper">
                      <select id="co-celda" required>
                        <option value="">
                          Seleccionar celda ocupada...
                        </option>
                        <option>A-02 — HFX-432</option>
                        <option>D-01 — ZTM-98E</option>
                        <option>A-06 — KLO-115</option>
                        <option>B-04 — RWQ-007</option>
                      </select>
                    </div>
                  </div>

                  <div className="fg">
                    <label htmlFor="co-obs">
                      Observaciones de Salida
                    </label>

                    <div className="input-wrapper">
                      <input
                        type="text"
                        id="co-obs"
                        placeholder="Estado del vehículo al retirar..."
                      />
                    </div>
                  </div>

                  <div className="info-box-time">
                    <strong>⏱ Tiempo de estadía:</strong>{" "}
                    calculado automáticamente por el sistema al confirmar la salida.
                  </div>

                  <button type="button" className="btn-block">
                    Confirmar Salida
                  </button>

                </form>

              </div>

            </article>

          </div>

        </section>
      </main>

      <Footer />
    </>
  );
}

export default ModalConfirmacion;