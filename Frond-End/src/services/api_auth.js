// src/services/api_auth.js
//
// Servicio centralizado para hablar con el backend de autenticación
// (registro, login y consulta de perfil). Sigue el mismo patrón que
// api_admin.js para mantener consistencia en todo el proyecto.

const BASE_URL = "http://localhost:5000/api/auth";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const authService = {
  /**
   * Registra un nuevo usuario. El rol (usuario/vigilante/administrador) lo
   * decide el backend automáticamente según el dominio/correo usado.
   */
  registrar: async ({ nombreCompleto, correo, password }) => {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre_completo: nombreCompleto,
        correo,
        password,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.mensaje || "No se pudo completar el registro.");
    }
    return data;
  },

  /**
   * Inicia sesión y guarda el token + datos de usuario en localStorage.
   * Retorna el usuario (incluyendo su rol) para que el componente decida
   * a qué vista redireccionar.
   */
  login: async ({ correo, password }) => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.mensaje || "Usuario o contraseña incorrectos.");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("usuario", JSON.stringify(data.usuario));

    return data.usuario;
  },

  /** Consulta el perfil del usuario autenticado usando el token guardado. */
  obtenerPerfil: async () => {
    const response = await fetch(`${BASE_URL}/perfil`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.mensaje || "No se pudo recuperar el perfil.");
    }
    return data.usuario;
  },

  /** Cierra sesión localmente (no requiere llamada al backend). */
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
  },

  /** Usuario guardado en localStorage tras el último login, si existe. */
  obtenerUsuarioActual: () => {
    const raw = localStorage.getItem("usuario");
    return raw ? JSON.parse(raw) : null;
  },

  estaAutenticado: () => !!localStorage.getItem("token"),

  /**
   * Calcula a qué ruta del frontend debe ir el usuario según su rol.
   * Centralizar esto aquí evita repetir el switch/if en cada componente.
   */
  rutaSegunRol: (rol) => {
    switch (rol) {
      case "administrador":
        return "/KPIs";
      case "vigilante":
        return "/Inicio";
      case "usuario":
      default:
        return "/PanelControl";
    }
  },
};
