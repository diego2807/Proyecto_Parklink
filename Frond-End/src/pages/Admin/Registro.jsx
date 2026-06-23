// src/components/Registro.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/AdminCSS/Vehiculos.css";
import { apiService } from "../../services/api_admin"; // Consume tu api_admin con el token

function Registro() {
  const navigate = useNavigate();

  // Estados para el formulario
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [rol, setRol] = useState("usuario"); // Valor por defecto del Enum en tu BD

  // Estados para el control de flujo y mensajes
  const [errorGeneral, setErrorGeneral] = useState("");
  const [exito, setExito] = useState("");
  const [passwordCreada, setPasswordCreada] = useState(""); // Aquí guardaremos la clave aleatoria de Flask
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorGeneral("");
    setExito("");
    setPasswordCreada("");

    // Validaciones básicas en el frontend
    if (!nombre.trim() || !correo.trim()) {
      setErrorGeneral("Por favor, completa el nombre y el correo electrónico.");
      return;
    }

    setCargando(true);
    try {
      // Enviamos solo los 3 datos requeridos. Flask se encarga de fabricar la contraseña.
      const respuesta = await apiService.registrarUsuario({
        nombre: nombre.trim(),
        correo: correo.trim(),
        rol: rol,
      });

      // Si todo sale bien, Flask nos devuelve el mensaje y la clave temporal
      setExito("¡Personal autorizado y registrado con éxito!");
      if (respuesta.password_temporal_creada) {
        setPasswordCreada(respuesta.password_temporal_creada);
      }

      // Limpiamos los campos del formulario para un nuevo registro
      setNombre("");
      setCorreo("");
      setRol("usuario");

    } catch (err) {
      // Si el token JWT de administrador venció (el error 401 que viste en consola)
      if (err.message.includes("token_expired") || err.message.includes("expirado")) {
        setErrorGeneral("Tu sesión de administrador ha expirado. Redirigiendo al Login...");
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        setTimeout(() => {
          navigate("/"); // Redirige al login tras 2.5 segundos
        }, 2500);
      } else {
        setErrorGeneral(err.message || "Error al procesar el registro.");
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <aside className="auth-aside">
        <div className="brand">📂 <span>Parklink</span></div>
        <div className="auth-hero-text">
          <h1>Panel de Control de Personal</h1>
          <p>Da de alta a nuevos funcionarios y vigilantes asignándoles roles de acceso directo en la plataforma corporativa.</p>
        </div>
        <div className="auth-footer-text">© 2026 Parklink Inc. Todos los derechos reservados.</div>
      </aside>

      <main className="auth-main">
        <div className="auth-box">
          <h2>Registrar Nuevo Personal</h2>
          <p className="subtitle">Autoriza el acceso a un nuevo funcionario o vigilante del parqueadero corporativo.</p>

          {/* Mensajes de feedback visual */}
          {errorGeneral && <div className="form-msg error">{errorGeneral}</div>}
          {exito && <div className="form-msg success">{exito}</div>}

          {/* 🔑 CUADRO CLAVE: Aquí es donde se revela la contraseña generada al azar por Flask */}
          {passwordCreada && (
            <div className="form-msg success" style={{ backgroundColor: "#e6f4ea", color: "#137333", border: "1px solid #137333", padding: "15px", marginTop: "10px", borderRadius: "6px" }}>
              <strong style={{ display: "block", marginBottom: "5px" }}>🔑 CREDENCIALES GENERADAS POR EL SISTEMA:</strong>
              <p style={{ margin: "2px 0" }}><strong>Correo:</strong> {correo || "El ingresado arriba"}</p>
              <p style={{ margin: "2px 0" }}>
                <strong>Contraseña Temporal:</strong> <span style={{ fontFamily: "monospace", fontSize: "1.15em", background: "#fff", padding: "2px 6px", borderRadius: "4px", border: "1px dashed #137333" }}>{passwordCreada}</span>
              </p>
              <small style={{ display: "block", marginTop: "8px", color: "#5f6368" }}>
                * Copia esta contraseña y entrégasela al usuario. No se volverá a mostrar en pantalla por seguridad.
              </small>
            </div>
          )}

          <form id="registerForm" onSubmit={handleSubmit}>
            <div className="fg">
              <label htmlFor="reg-name">Nombre completo del Empleado</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="reg-name"
                  required
                  placeholder="Nombre y Apellidos"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>

            <div className="fg">
              <label htmlFor="reg-user">Correo electrónico corporativo</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  id="reg-user"
                  required
                  placeholder="pepe@empresa.com"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            <div className="fg">
              <label htmlFor="reg-rol">Rol Asignado en el Sistema</label>
              <div className="input-wrapper">
                <select
                  id="reg-rol"
                  value={rol}
                  onChange={(e) => setRol(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid #ddd", background: "#fff", appearance: "none" }}
                >
                  <option value="usuario">Funcionario / Empleado</option>
                  <option value="vigilante">Vigilante / Operador</option>
                  <option value="administrador">Administrador del Sistema</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn-block" disabled={cargando}>
              {cargando ? "Registrando..." : "Autorizar y Registrar Empleado"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Registro;