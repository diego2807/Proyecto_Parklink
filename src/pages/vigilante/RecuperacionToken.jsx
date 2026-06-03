function RecuperacionToken (){
    return(
        <main class="auth-main">
      <div class="auth-box">
        <h2>Restablecer Credenciales</h2>
        <p class="subtitle">Escribe tu correo institucional verificado para enviarte un token temporal.</p>
        
        <form id="recoveryForm">
          <div class="fg">
            <label for="rec-email">Correo Institucional Registrado</label>
            <div class="input-wrapper">
              <input type="email" id="rec-email" required placeholder="correo@redeban.com"/>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
          </div>
          <button type="submit" class="btn-block">Despachar Token Seguro</button>
        </form>

        <div class="auth-bottom">
          ¿Recordaste tus datos? <a href="Login.html">Regresar al Login</a>
        </div>
      </div>
    </main>
    )
}

export default RecuperacionToken