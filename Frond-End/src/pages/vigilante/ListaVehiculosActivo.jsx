import Footer from "../../components/VigilanteNav/VigilanteFooter"
import Header from "../../components/VigilanteNav/VigilanteHeader";
import Nav from "../../components/VigilanteNav/VigilanteNav";
import "../../css/VigilanteCSS/vehiculosActivos.css"

function ListaVehiculosActivo() {

  const handleLiberar = (placa) => {
    alert(`Procesando Check-out de la placa ${placa}`);
  };

  return (
    <>
      <Header />

      <main>
        <Nav />

        <section className="dash-content">
          <div className="dash-page">

            {/* TITULO PRINCIPAL */}
            <div className="page-title">
              <h2>🚗 Vehículos en Estacionamiento</h2>
              <p>Administra en tiempo real los vehículos activos dentro del sistema</p>
            </div>

            <article className="panel-card">

              {/* HEADER */}
              <div className="panel-card-header vehiculos-header">

                <div>
                  <h3>Inventario activo</h3>
                  <span className="subtext">
                    Filtra vehículos por placa o tipo de usuario
                  </span>
                </div>

                <div className="header-actions">

                  <div className="search-box">
                    <span className="search-icon">🔎</span>

                    <input
                      type="search"
                      placeholder="Buscar placa..."
                      className="search-input"
                    />
                  </div>

                  <div className="action-divider" />

                  <button
                    className="btn-action-in small"
                    onClick={() => alert("Abrir check-in rápido")}
                  >
                    + Nuevo ingreso
                  </button>

                </div>

              </div>

              {/* MINI ESTADÍSTICAS */}
              <div className="mini-stats">

                <div className="stat-card">
                  <span>🟢 Activos</span>
                  <strong>3</strong>
                </div>

                <div className="stat-card">
                  <span>🔵 Directivos</span>
                  <strong>1</strong>
                </div>

                <div className="stat-card">
                  <span>🟡 Invitados</span>
                  <strong>1</strong>
                </div>

              </div>

              {/* TABLA */}
              <div className="panel-card-body no-padding">

                <div className="table-responsive">

                  <table className="modern-table vehiculos-table">

                    <thead>
                      <tr>
                        <th>Celda</th>
                        <th>Placa</th>
                        <th>Ingreso</th>
                        <th>Usuario</th>
                        <th>Póliza</th>
                        <th>Tiempo</th>
                        <th>Acción</th>
                      </tr>
                    </thead>

                    <tbody>

                      <tr>
                        <td className="strong">A-04</td>
                        <td className="plate">KFX542</td>
                        <td>08:15 AM</td>
                        <td><span className="badge directivo">Directivo</span></td>
                        <td className="ok">Vigente</td>
                        <td>01h 45m</td>
                        <td>
                          <button
                            className="btn-danger small"
                            onClick={() => handleLiberar("KFX542")}
                          >
                            Liberar
                          </button>
                        </td>
                      </tr>

                      <tr>
                        <td className="strong">B-12</td>
                        <td className="plate">MHQ910</td>
                        <td>09:02 AM</td>
                        <td><span className="badge invitado">Invitado</span></td>
                        <td className="ok">Vigente</td>
                        <td>00h 58m</td>
                        <td>
                          <button
                            className="btn-danger small"
                            onClick={() => handleLiberar("MHQ910")}
                          >
                            Liberar
                          </button>
                        </td>
                      </tr>

                      <tr>
                        <td className="strong">M-02</td>
                        <td className="plate">ZZX88C</td>
                        <td>07:30 AM</td>
                        <td><span className="badge moto">Moto</span></td>
                        <td className="ok">Vigente</td>
                        <td>02h 30m</td>
                        <td>
                          <button
                            className="btn-danger small"
                            onClick={() => handleLiberar("ZZX88C")}
                          >
                            Liberar
                          </button>
                        </td>
                      </tr>

                    </tbody>

                  </table>

                </div>

              </div>

            </article>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}

export default ListaVehiculosActivo;