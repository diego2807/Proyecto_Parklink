import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../css/VigilanteCSS/style.css";
import { authService } from "../../services/api_auth";

function Login() {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!correo.trim() || !password) {
      setError("Por favor completa el correo y la contraseña.");
      return;
    }

    setCargando(true);
    try {
      const usuario = await authService.login({ correo: correo.trim(), password });
      navigate(authService.rutaSegunRol(usuario.rol));
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    /* Usamos un ID único global para delimitar el alcance del CSS antiguo */
    <div id="pl-auth-unique-root" className="auth-wrapper">
      <aside className="auth-aside">
        <div className="brand">📂 <span>Parklink</span></div>
        <div className="auth-hero-text">
          <h1>Monitoreo Inteligente de Parqueaderos</h1>
          <p>Optimiza la gestión vehicular de tu organización de forma automatizada.</p>
        </div>
        <div className="auth-footer-text">
          <p>© 2026 Parklink. Todos los derechos reservados.</p>
        </div>
      </aside>

      <section className="auth-main">
        <div className="auth-box">
          <h2>Iniciar Sesión</h2>
          <p className="auth-subtitle">Ingresa tus credenciales corporativas para acceder al sistema.</p>

          {error && (
            <div className="auth-error-alert">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="fg">
              <label htmlFor="correo">Correo Electrónico</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  id="correo"
                  required
                  placeholder="ejemplo@empresa.com"
                  autoComplete="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
                </svg>
              </div>
            </div>

            <div className="fg">
              <label htmlFor="password">Contraseña</label>
              <div className="input-wrapper">
                <input
                  type={mostrarPassword ? "text" : "password"}
                  id="password"
                  required
                  placeholder="••••••••"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <button
                  type="button"
                  className="btn-eye"
                  onClick={() => setMostrarPassword((v) => !v)}
                >
                </button>
              </div>
            </div>

            <button type="submit" className="btn-block" disabled={cargando}>
              {cargando ? "Ingresando..." : "Iniciar Sesión"}
            </button>
          </form>

          <div className="auth-bottom">
            ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;