import '../../css/VigilanteCSS/style.css'

function Registro (){
    return(
       <div className="auth-wrapper">
    <aside className="auth-aside">
      <div className="brand">📂 <span>Parklink</span></div>
      <div className="auth-hero-text">
        <h1>Únete a la Red de Control Eficiente</h1>
        <p>Crea tu cuenta de analista en pocos pasos y toma el control de los accesos vehiculares de tu sede corporativa.</p>
      </div>
      <div className="auth-footer-text">© 2026 Parklink Inc. Todos los derechos reservados.</div>
    </aside>

    <main className="auth-main">
      <div className="auth-box">
        <h2>Registro de Analista</h2>
        <p className="subtitle">Completa el formulario de validación institucional.</p>
        
        <form id="registerForm">
          <div className="fg">
            <label for="reg-name">Nombre completo</label>
            <div className="input-wrapper">
              <input type="text" id="reg-name" required placeholder="Nombre y Apellidos" oninput="typeof valInput === 'function' && valInput(this, /^[a-zA-ZÀ-ÿ\s]{3,40}$/)"/>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            </div>
            <span className="warning-txt" id="warn-reg-name">El nombre debe contener entre 3 y 40 caracteres alfabéticos.</span>
          </div>

          <div className="fg">
            <label for="reg-user">Correo electrónico corporativo</label>
            <div className="input-wrapper">
              <input type="email" id="reg-user" required placeholder="usuario@redeban.com" oninput="typeof valInput === 'function' && valInput(this, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)"/>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </div>
            <span className="warning-txt" id="warn-reg-user">Ingresa un formato de correo institucional válido.</span>
          </div>

          <div className="fg">
            <label for="reg-pass">Contraseña del Sistema</label>
            <div className="input-wrapper">
              <input type="password" id="reg-pass" required placeholder="Mínimo 8 caracteres" oninput="typeof checkStrength === 'function' && checkStrength(this)"/>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
              <button type="button" className="btn-eye" onClick="typeof togglePass === 'function' && togglePass('reg-pass')">👁️</button>
            </div>
            <div className="strength-meter">
              <div id="rs1" className="strength-seg"></div>
              <div id="rs2" className="strength-seg"></div>
              <div id="rs3" className="strength-seg"></div>
              <div id="rs4" className="strength-seg"></div>
            </div>
          </div>

          <button type="submit" className="btn-block">Crear Cuenta Principal</button>
        </form>

        <div className="auth-bottom">
          ¿Ya posees una cuenta vinculada? <a href="Login.html">Inicia sesión</a>
        </div>
      </div>
    </main>
  </div>
    )
}

export default Registro