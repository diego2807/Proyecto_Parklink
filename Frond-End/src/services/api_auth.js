// src/services/api_auth.js
//
// Servicio centralizado para hablar con el backend de autenticación
// (Login y consulta de perfil común). Mantiene consistencia con api_admin.js.

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
   * Inicia sesión y guarda el token + datos de usuario en localStorage.
   * Retorna el usuario (incluyendo su rol) para que el componente decida
   * a qué vista redireccionar de inmediato.
   */
  login: async ({ correo, password }) => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      // Captura el mensaje de error estructurado que retorna tu AuthController
      throw new Error(data.mensaje || "Usuario o contraseña incorrectos.");
    }

    // 🔑 GUARDADO SEGURO: Crucial para que api_admin.jsx inyecte el Bearer token
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

  /** Cierra sesión localmente eliminando los datos del almacenamiento. */
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
  },

  /** Usuario guardado en localStorage tras el último login, si existe. */
  obtenerUsuarioActual: () => {
    const raw = localStorage.getItem("usuario");
    return raw ? JSON.parse(raw) : null;
  },

  /** Valida de forma rápida si existe una sesión activa en el cliente. */
  estaAutenticado: () => !!localStorage.getItem("token"),

  /**
   * Calcula a qué ruta del frontend debe ir el usuario según su rol en ParkLink.
   * Centralizar esto aquí evita repetir estructuras switch/if redundantes en Login.jsx.
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