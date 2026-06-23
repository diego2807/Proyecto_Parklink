import Footer from "../../components/VigilanteNav/VigilanteFooter"
import Header from "../../components/VigilanteNav/VigilanteHeader";
import Nav from "../../components/VigilanteNav/VigilanteNav";
import "../../css/VigilanteCSS/control.css"

function Control() {
  const handleRegisterAction = (tipo) => {
    alert(`Registro de ${tipo} realizado`);
  };

  return (
    <>
      <Header />

      <main>
        <Nav />

        <section className="dash-content">
          <div className="dash-page">

            <div className="dash-header">
              <h2>Panel de Control Central</h2>
            </div>

            <section className="metrics-grid">
              <div className="metric-card">
                <div className="metric-icon blue">🚗</div>
                <div className="metric-data">
                  <div className="num">0</div>
                  <div className="lbl">Registros Totales</div>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-icon green">✓</div>
                <div className="metric-data">
                  <div className="num">0</div>
                  <div className="lbl">Vehículos Dentro</div>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-icon orange">✕</div>
                <div className="metric-data">
                  <div className="num">0</div>
                  <div className="lbl">Vehículos Salidos</div>
                </div>
              </div>
            </section>

            {/* CONTENIDO */}
            <div className="dash-grid-two">

              {/* FORMULARIO */}
              <article className="panel-card">
                <div className="panel-card-header">
                  <h3>Registro Operativo de Turno</h3>
                </div>

                <div className="panel-card-body">
                  <form onSubmit={(e) => e.preventDefault()}>

                    <div className="fg">
                      <label htmlFor="car-plate">
                        Número de Placa Vehicular
                      </label>

                      <div className="input-wrapper">
                        <input
                          type="text"
                          id="car-plate"
                          required
                          placeholder="ABC123"
                        />
                      </div>

                      <span className="warning-txt">
                        La placa debe ser un formato válido de 6 caracteres (ej. AAA123).
                      </span>
                    </div>

                    <div className="fg">
                      <label htmlFor="car-type">
                        Tipo de Vehículo
                      </label>

                      <div className="input-wrapper">
                        <select id="car-type" required>
                          <option value="Automóvil">Automóvil Particular</option>
                          <option value="Motocicleta">Motocicleta</option>
                          <option value="Camioneta">Camioneta</option>
                        </select>
                      </div>
                    </div>

                    <div className="btn-dual-wrap">
                      <button
                        type="button"
                        className="btn-action-in"
                        onClick={() => handleRegisterAction("Entrada")}
                      >
                        Registrar Entrada
                      </button>

                      <button
                        type="button"
                        className="btn-action-out"
                        onClick={() => handleRegisterAction("Salida")}
                      >
                        Registrar Salida
                      </button>
                    </div>

                  </form>
                </div>
              </article>

              {/* BITÁCORA */}
              <article className="panel-card">
                <div className="panel-card-header">
                  <h3>Bitácora Reciente</h3>
                </div>

                <div className="panel-card-body" style={{ padding: 0 }}>
                  <div className="table-responsive">
                    <table className="modern-table">
                      <thead>
                        <tr>
                          <th>Placa</th>
                          <th>Tipo</th>
                          <th>Movimiento</th>
                          <th>Fecha y Hora</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td>ABC123</td>
                          <td>Automóvil</td>
                          <td>Entrada</td>
                          <td>11/06/2026 14:30</td>
                        </tr>

                        <tr>
                          <td>XYZ456</td>
                          <td>Motocicleta</td>
                          <td>Salida</td>
                          <td>11/06/2026 15:10</td>
                        </tr>

                        <tr>
                          <td>KFX542</td>
                          <td>Camioneta</td>
                          <td>Entrada</td>
                          <td>11/06/2026 16:00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </article>

            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Control;