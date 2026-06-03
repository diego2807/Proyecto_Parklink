function RegistroNovedades (){
    return(
        <main class="dash-content">
        <div class="dash-header">
          <h2>Bitácora y Reporte de Eventualidades</h2>
          <p>Registra eventos excepcionales detectados en los patios y supervisa el estado de resolución inmediato.</p>
        </div>

        <div class="novedades-layout-grid">
          
          <article class="panel-card">
            <div class="panel-card-header">
              <h3>📋 Registrar Nueva Novedad</h3>
            </div>
            <div class="panel-card-body">
              <form onsubmit="event.preventDefault();">
                
                <div class="form-row-dynamic">
                  <div class="fg">
                    <label for="nov-placa">Placa del Vehículo</label>
                    <div class="input-wrapper">
                      <input type="text" id="nov-placa" placeholder="ABC-123" style="text-transform:uppercase" oninput="this.value=this.value.toUpperCase()"/>
                    </div>
                  </div>
                  <div class="fg">
                    <label for="nov-celda">Celda Relacionada</label>
                    <div class="input-wrapper">
                      <select id="nov-celda">
                        <option value="">Sin celda específica</option>
                        <option>A-01</option><option>A-02</option><option>A-03</option>
                        <option>B-01</option><option>B-02</option><option>C-01</option>
                        <option>D-01 (Discapacidad)</option><option>E-01 (Eléctrico)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="form-row-dynamic">
                  <div class="fg">
                    <label for="nov-tipo">Tipo de Novedad</label>
                    <div class="input-wrapper">
                      <select id="nov-tipo" required>
                        <option value="">Seleccione el tipo...</option>
                        <option value="vehiculo">🚗 Vehículo mal parqueado</option>
                        <option value="infraestructura">🔧 Fallo de infraestructura</option>
                        <option value="seguridad">🚨 Incidente de seguridad</option>
                        <option value="daño">⚠ Daño material / colisión</option>
                        <option value="otro">📌 Otro caso</option>
                      </select>
                    </div>
                  </div>
                  <div class="fg">
                    <label for="nov-prioridad">Nivel de Prioridad</label>
                    <div class="input-wrapper">
                      <select id="nov-prioridad">
                        <option value="baja">🟢 Baja — Reporte rutinario</option>
                        <option value="media">🟡 Media — Atención en turno</option>
                        <option value="alta">🔴 Alta — Emergencia inmediata</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="fg" style="margin-bottom: 16px;">
                  <label for="nov-desc">Descripción Detallada</label>
                  <textarea id="nov-desc" placeholder="Describe con detalle lo observado: ubicación exacta, hora del incidente, vehículos involucrados..." required></textarea>
                </div>

                <div class="fg" style="margin-bottom: 24px;">
                  <label>¿Requiere acción inmediata?</label>
                  <div style="display:flex; gap:20px; margin-top:6px;">
                    <label style="display:flex; align-items:center; gap:6px; cursor:pointer; font-weight:500; font-size:.9rem;">
                      <input type="radio" name="accion" value="si"/> Sí, notificar supervisor
                    </label>
                    <label style="display:flex; align-items:center; gap:6px; cursor:pointer; font-weight:500; font-size:.9rem;">
                      <input type="radio" name="accion" value="no" checked/> No, solo registrar
                    </label>
                  </div>
                </div>

                <div style="display:flex; gap:12px; justify-content:flex-end;">
                  <button type="button" class="btn-action-out" style="flex: initial; padding: 10px 24px;" onclick="document.getElementById('nov-placa').value=''; document.getElementById('nov-desc').value='';">Limpiar</button>
                  <button type="button" class="btn-block" style="width: auto; padding: 10px 24px; background: var(--blue);" onclick="submitNovedad()">Generar Reporte ✓</button>
                </div>
              </form>
            </div>
          </article>

          <aside class="panel-card">
            <div class="panel-card-header" style="display: flex; justify-content: space-between; align-items: center;">
              <h3>Novedades del Turno</h3>
              <span class="badge badge-amber" id="pending-count">3 pendientes</span>
            </div>
            <div class="panel-card-body" style="padding-top: 16px;">
              <div class="nov-list">
                
                <div class="nov-item">
                  <div class="nov-icon alta">🚨</div>
                  <div class="nov-info">
                    <h4>Incidente de seguridad</h4>
                    <p>Placa KLO-115 — Zona B</p>
                  </div>
                  <div class="nov-meta">
                    <span class="badge badge-red">Alta</span>
                    <div class="time" style="margin-top:6px; font-size: 0.75rem; color: var(--muted);">09:05</div>
                  </div>
                </div>

                <div class="nov-item">
                  <div class="nov-icon media">⚠</div>
                  <div class="nov-info">
                    <h4>Fallo cámara Sector C</h4>
                    <p>Sin placa registrada</p>
                  </div>
                  <div class="nov-meta">
                    <span class="badge badge-amber">Media</span>
                    <div class="time" style="margin-top:6px; font-size: 0.75rem; color: var(--muted);">13:40</div>
                  </div>
                </div>

                <div class="nov-item">
                  <div class="nov-icon baja">🚗</div>
                  <div class="nov-info">
                    <h4>Vehículo mal parqueado</h4>
                    <p>Placa RTA-222 — Zona E</p>
                  </div>
                  <div class="nov-meta">
                    <span class="badge badge-green">Baja</span>
                    <div class="time" style="margin-top:6px; font-size: 0.75rem; color: var(--muted);">14:22</div>
                  </div>
                </div>

              </div>
            </div>
          </aside>

        </div>
      </main>
    )
}