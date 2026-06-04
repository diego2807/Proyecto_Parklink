import '../../css/VigilanteCSS/style.css'

function RecuperacionToken (){
    return(
        <div className="auth-wrapper">
    <aside className="auth-aside">
      <div className="brand">📂 <span>Parklink</span></div>
      <div className="auth-hero-text">
        <h1>Protección y Recuperación de Datos</h1>
        <p>Garantizamos canales seguros cifrados de restablecimiento bajo políticas institucionales rigurosas.</p>
      </div>
      <div className="auth-footer-text">© 2026 Parklink Inc. Todos los derechos reservados.</div>
    </aside>

    <main className="auth-main">
      <div className="auth-box">
        <h2>Restablecer Credenciales</h2>
        <p className="subtitle">Escribe tu correo institucional verificado para enviarte un token temporal.</p>
        
        <form id="recoveryForm">
          <div className="fg">
            <label htmlFor="rec-email">Correo Institucional Registrado</label>
            <div className="input-wrapper">
              <input type="email" id="rec-email" required placeholder="correo@redeban.com" />
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <button type="submit" className="btn-block">Despachar Token Seguro</button>
        </form>

        <div className="auth-bottom">
          ¿Recordaste tus datos? <a href="Login.html">Regresar al Login</a>
        </div>
      </div>
    </main>
  </div>
    )
}

export default RecuperacionToken