import '../../css/VigilanteCSS/style.css'
import { Link } from "react-router-dom";

function Login (){
    return(
        <div className="auth-wrapper">
    <aside className="auth-aside">
      <div className="brand">📂 <span>Parklink</span></div>
      <div className="auth-hero-text">
        <h1>Monitoreo Inteligente de Parqueaderos</h1>
        <p>Optimiza la gestión vehicular de tu organización de forma automatizada, fluida y en tiempo real.</p>
      </div>
      <div className="auth-footer-text">© 2026 Parklink Inc. Todos los derechos reservados.</div>
    </aside>

    <main className="auth-main">
      <div className="auth-box">
        <h2>¡Bienvenido de nuevo!</h2>
        <p className="subtitle">Ingresa tus credenciales para acceder al panel administrativo.</p>
        
        <form id="loginForm">
          <div className="fg">
            <label for="username">Usuario corporativo</label>
            <div className="input-wrapper">
              <input type="text" id="username" required placeholder="ejemplo@redeban.com" autocomplete="username"/>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
          </div>

          <div className="fg">
            <label for="password">Contraseña</label>
            <div className="input-wrapper">
              <input type="password" id="password" required placeholder="••••••••" autocomplete="current-password"/>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
              <button type="button" className="btn-eye" onClick="togglePass('password')">👁️</button>
            </div>
          </div>

          <Link to="/src/pages/vigilante/RecuperacionToken.jsx" className="forgot-link">¿Olvidaste tu contraseña?</Link>
          <button type="submit" className="btn-block">Iniciar Sesión Módulo</button>
        </form>

        <div className="auth-bottom">
          ¿No tienes cuenta administrativa? <Link to="/src/pages/global_sistema/Registro.jsx">Regístrate aquí</Link>
        </div>
      </div>
    </main>
  </div>
    )
}

export default Login