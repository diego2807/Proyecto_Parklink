function Login (){
    return(
        <main class="auth-main">
      <div class="auth-box">
        <h2>¡Bienvenido de nuevo!</h2>
        <p class="subtitle">Ingresa tus credenciales para acceder al panel administrativo.</p>
        
        <form id="loginForm">
          <div class="fg">
            <label for="username">Usuario corporativo</label>
            <div class="input-wrapper">
              <input type="text" id="username" required placeholder="ejemplo@redeban.com" autocomplete="username"/>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
          </div>

          <div class="fg">
            <label for="password">Contraseña</label>
            <div class="input-wrapper">
              <input type="password" id="password" required placeholder="••••••••" autocomplete="current-password"/>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
              <button type="button" class="btn-eye" onclick="togglePass('password')">👁️</button>
            </div>
          </div>

          <a href="recuperacionToken.html" class="forgot-link">¿Olvidaste tu contraseña?</a>
          <button type="submit" class="btn-block">Iniciar Sesión Módulo</button>
        </form>

        <div class="auth-bottom">
          ¿No tienes cuenta administrativa? <a href="registroSeguro.html">Regístrate aquí</a>
        </div>
      </div>
    </main>
    )
}

export default Login