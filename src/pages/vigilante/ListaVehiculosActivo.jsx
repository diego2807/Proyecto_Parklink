function ListaVehiculosActivo (){
    return(
        <main class="dash-content">
        
        <article class="panel-card">
          <div class="panel-card-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
            <div>
              <h3>Inventario de Vehículos en Estacionamiento</h3>
              <span style="font-size:.78rem; color:var(--muted);">Filtra de manera inmediata mediante coincidencia de caracteres.</span>
            </div>
            
            <div style="display:flex; gap:.75rem; align-items:center;">
              <input type="search" placeholder="Buscar placa..." id="search-placa" oninput="typeof filterVehicles === 'function' && filterVehicles(this.value)" style="padding:.55rem .85rem; border:1px solid var(--border); border-radius:8px; font-size:.85rem; width:190px; outline: none; background:var(--bg);"/>
              <button class="btn-action-in" style="padding: 10px 16px; font-size: 0.85rem;" onclick="window.location.href='modalConfirmacion.html'">+ Check-in rápido</button>
            </div>
          </div>

          <div class="panel-card-body" style="padding:0">
            <div class="table-responsive">
              <table class="modern-table" id="vehicles-table">
                <thead>
                  <tr>
                    <th>Celda</th>
                    <th>Placa</th>
                    <th>Ingreso</th>
                    <th>Tipo Usuario</th>
                    <th>Póliza</th>
                    <th>Tiempo</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody id="vehicles-body">
                  <tr>
                    <td style="font-weight: 700;">A-04</td>
                    <td style="font-weight: 700; color: var(--blue);">KFX542</td>
                    <td>08:15 AM</td>
                    <td><span class="badge in">Directivo</span></td>
                    <td style="color: var(--green); font-weight: 600;">Vigente</td>
                    <td>01h 45m</td>
                    <td>
                      <button class="btn-action-out" style="padding: 4px 10px; font-size: 0.75rem;" onclick="alert('Procesando Check-out de la placa KFX542')">Liberar</button>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-weight: 700;">B-12</td>
                    <td style="font-weight: 700; color: var(--blue);">MHQ910</td>
                    <td>09:02 AM</td>
                    <td><span class="badge" style="background: #E2E8F0; color: #475569;">Invitado</span></td>
                    <td style="color: var(--green); font-weight: 600;">Vigente</td>
                    <td>00h 58m</td>
                    <td>
                      <button class="btn-action-out" style="padding: 4px 10px; font-size: 0.75rem;" onclick="alert('Procesando Check-out de la placa MHQ910')">Liberar</button>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-weight: 700;">M-02</td>
                    <td style="font-weight: 700; color: var(--blue);">ZZX88C</td>
                    <td>07:30 AM</td>
                    <td><span class="badge in">Moto analista</span></td>
                    <td style="color: var(--green); font-weight: 600;">Vigente</td>
                    <td>02h 30m</td>
                    <td>
                      <button class="btn-action-out" style="padding: 4px 10px; font-size: 0.75rem;" onclick="alert('Procesando Check-out de la placa ZZX88C')">Liberar</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </article>

      </main>
    )
}


export default ListaVehiculosActivo