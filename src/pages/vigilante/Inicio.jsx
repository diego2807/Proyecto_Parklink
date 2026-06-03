function Inicio (){
    return(
        <main class="dash-content">
        <div class="dash-header">
          <h2>Panel de Control Central</h2>
          <p>Monitoreo en tiempo real de operaciones de la estación de aparcamientos.</p>
        </div>

        <section class="metrics-grid">
          <div class="metric-card">
            <div class="metric-icon blue">🚗</div>
            <div class="metric-data">
              <div class="num" id="count-total">0</div>
              <div class="lbl">Registros Totales</div>
            </div>
          </div>
          <div class="metric-card">
            <div class="metric-icon green">✓</div>
            <div class="metric-data">
              <div class="num" id="count-in">0</div>
              <div class="lbl">Vehículos Dentro</div>
            </div>
          </div>
          <div class="metric-card">
            <div class="metric-icon orange">✕</div>
            <div class="metric-data">
              <div class="num" id="count-out">0</div>
              <div class="lbl">Vehículos Salidos</div>
            </div>
          </div>
        </section>

        <div class="dash-grid-two">
          <article class="panel-card">
            <div class="panel-card-header">
              <h3>Registro Operativo de Turno</h3>
            </div>
            <div class="panel-card-body">
              <form id="parking-form" onsubmit="event.preventDefault();">
                <div class="fg">
                  <label for="car-plate">Número de Placa Vehicular</label>
                  <div class="input-wrapper">
                    <input type="text" id="car-plate" required placeholder="ABC123" style="text-transform:uppercase" oninput="typeof valInput === 'function' && valInput(this, /^[A-Z]{3}[0-9]{3}$|^[A-Z]{3}[0-9]{2}[A-Z]{1}$/)"/>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                  </div>
                  <span class="warning-txt" id="warn-car-plate">La placa debe ser un formato válido de 6 caracteres (ej. AAA123).</span>
                </div>
                <div class="fg">
                  <label for="car-type">Tipo de Vehículo</label>
                  <div class="input-wrapper">
                    <select id="car-type" required>
                      <option value="Automóvil">Automóvil Particular</option>
                      <option value="Motocicleta">Motocicleta Cilindrada</option>
                      <option value="Camioneta">Camioneta Carga Ligera</option>
                    </select>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                  </div>
                </div>
                <div class="btn-dual-wrap">
                  <button type="button" class="btn-action-in" onclick="typeof registerAction === 'function' && registerAction('Entrada')">Registrar Entrada</button>
                  <button type="button" class="btn-action-out" onclick="typeof registerAction === 'function' && registerAction('Salida')">Registrar Salida</button>
                </div>
              </form>
            </div>
          </article>

          <article class="panel-card">
            <div class="panel-card-header">
              <h3>Bitácora Reciente</h3>
            </div>
            <div class="panel-card-body" style="padding:0">
              <div class="table-responsive">
                <table class="modern-table">
                  <thead>
                    <tr>
                      <th>Placa</th>
                      <th>Tipo</th>
                      <th>Movimiento</th>
                      <th>Estampa de Tiempo</th>
                    </tr>
                  </thead>
                  <tbody id="log-table-body">
                    </tbody>
                </table>
              </div>
            </div>
          </article>
        </div>
      </main>
    )
}

export default Inicio