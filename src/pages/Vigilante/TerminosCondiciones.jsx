function TerminosCondiciones (){
    return(
        <main class="container-vista">
        <div class="card-modulo">
            <h1>Registro Seguro de Usuarios</h1>
            <p class="desc-modulo">Validación en tiempo real de correos organizacionales y robustez de claves.</p>
           
            <form class="form-layout" onsubmit="event.preventDefault(); alert('Registro Exitoso.');">
                <div class="campo-grupo">
                    <label for="regUser">Nombre Completo:</label>
                    <input type="text" id="regUser" class="campo-input" placeholder="Ej: Sara Garzón" required/>
                </div>
                <div class="campo-grupo">
                    <label for="regCorreo">Correo Corporativo:</label>
                    <input type="email" id="regCorreo" class="campo-input" placeholder="usuario@empresa.com" oninput="validarRegistroSeguro()" required/>
                    <span id="feedbackCorreo" style="font-size: 12px; font-weight: 600; margin-top: 4px;"></span>
                </div>
                <div class="campo-grupo">
                    <label for="regPass">Contraseña:</label>
                    <input type="password" id="regPass" class="campo-input" placeholder="Mínimo 8 caracteres" oninput="evaluarFuerzaContrasena()" required/>
                    <div style="font-size: 12px; margin-top: 5px; color: var(--text-muted)">Fuerza: <span id="textoFuerza">-</span></div>
                    <div class="medidor-barra-bg"><div class="medidor-barra-fg" id="barraFuerza"></div></div>
                </div>
                <button type="submit" class="btn-accion">Crear Cuenta</button>
            </form>
        </div>
    </main>
    )
}

export default TerminosCondiciones