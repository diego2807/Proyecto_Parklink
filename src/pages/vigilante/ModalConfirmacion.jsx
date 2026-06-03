function ModalConfirmacion (){
    return(
        <main class="dash-content">
        <div class="dash-header">
          <h2>Gestión de Celdas Individuales</h2>
          <p>Asigna bahías vacías o procesa la salida de unidades calculando tiempos automáticos.</p>
        </div>
        <div class="form-split-grid">
          <article class="panel-card">
            <div class="panel-card-header" style="background: #F8FAFC;">
              <h3 style="color: #137333;">✅ Check-in de Vehículo</h3>
            </div>
            <div class="panel-card-body">
              <form onsubmit="event.preventDefault();">
                <div class="fg">
                  <label for="ci-placa">Placa del Vehículo</label>
                  <div class="input-wrapper">
                    <input type="text" id="ci-placa" placeholder="ABC-123" required style="text-transform:uppercase" oninput="this.value=this.value.toUpperCase()"/>
                  </div>
                </div>
                <div class="fg">

                  <label for="ci-celda">Celda Asignada</label>

                  <div class="input-wrapper">

                    <select id="ci-celda" required>

                      <option value="">Seleccionar celda libre...</option>

                      <option>A-01</option><option>A-03</option><option>A-04</option><option>A-05</option>

                      <option>B-02</option><option>B-03</option><option>C-01</option><option>C-03</option>

                    </select>

                  </div>

                </div>
                <div class="fg">

                  <label for="ci-tipo">Tipo de Usuario</label>

                  <div class="input-wrapper">

                    <select id="ci-tipo" required>

                      <option>Empleado Redeban</option>

                      <option>Visitante / Convenio</option>

                      <option>Contratista Externo</option>

                      <option>Directivo</option>

                      <option>Invitado VIP</option>

                    </select>

                  </div>

                </div>
                <div class="fg">

                  <label for="ci-obs">Observaciones (opcional)</label>

                  <div class="input-wrapper">

                    <input type="text" id="ci-obs" placeholder="Estado del vehículo, observaciones..."/>

                  </div>

                </div>
                <button type="button" class="btn-block" style="background: var(--green); margin-top: 10px;" onclick="processAction('check-in')">Registrar Ingreso</button>

              </form>

            </div>

          </article>
          <article class="panel-card">
            <div class="panel-card-header" style="background: #F8FAFC;">
              <h3 style="color: #C5221F;">⏏ Check-out de Vehículo</h3>
            </div>
            <div class="panel-card-body">
              <form onsubmit="event.preventDefault();">
                <div class="fg">

                  <label for="co-placa">Placa del Vehículo</label>

                  <div class="input-wrapper">

                    <input type="text" id="co-placa" placeholder="ABC-123" required style="text-transform:uppercase" oninput="this.value=this.value.toUpperCase()"/>

                  </div>

                </div>
                <div class="fg">

                  <label for="co-celda">Celda a Liberar</label>

                  <div class="input-wrapper">

                    <select id="co-celda" required>

                      <option value="">Seleccionar celda ocupada...</option>

                      <option>A-02 — HFX-432</option>

                      <option>D-01 — ZTM-98E</option>

                      <option>A-06 — KLO-115</option>

                      <option>B-04 — RWQ-007</option>

                    </select>

                  </div>

                </div>
                <div class="fg">

                  <label for="co-obs">Observaciones de Salida</label>

                  <div class="input-wrapper">

                    <input type="text" id="co-obs" placeholder="Estado del vehículo al retirar..."/>

                  </div>

                </div>
                <div class="info-box-time">

                  <strong>⏱ Tiempo de estadía:</strong> calculado automáticamente por el sistema al confirmar la salida.

                </div>
                <button type="button" class="btn-block" style="background: var(--red);" onclick="processAction('check-out')">Confirmar Salida</button>

              </form>

            </div>

          </article>
        </div>

      </main>
    )
}