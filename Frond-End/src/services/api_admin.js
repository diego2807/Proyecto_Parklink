// src/services/api_admin.jsx

const API_URL = "http://127.0.0.1:5000/api"; // Ajusta el puerto según corra tu Flask

/**
 * Función auxiliar para obtener las cabeceras de autenticación.
 * Recupera el token JWT que guardaste en el localStorage durante el Login.
 */
const getAuthHeaders = () => {
  const token = localStorage.getItem("token"); // O como lo hayas guardado en tu api_auth.jsx
  return {
    "Content-Type": "application/json",
    "Authorization": token ? `Bearer ${token}` : "",
  };
};

export const apiService = {
  /**
   * 1. Registrar un nuevo usuario (Funcionario o Vigilante)
   * Envia el nombre, correo y rol elegidos por el Administrador.
   */
  registrarUsuario: async (datosUsuario) => {
    try {
      const respuesta = await fetch(`${API_URL}/admin/registrar-usuario`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(datosUsuario),
      });

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(resultado.error || "No se pudo registrar al usuario.");
      }

      return resultado; // Retorna el JSON (incluyendo la clave temporal generada por Flask)
    } catch (error) {
      console.error("Error en registrarUsuario:", error);
      throw error;
    }
  },

  /**
   * 2. Obtener las celdas del parqueadero (Eléctricas y Movilidad Reducida)
   * Usado en tu componente Celdas.jsx
   */
  getCeldas: async () => {
    try {
      const respuesta = await fetch(`${API_URL}/admin/celdas`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(resultado.error || "Error al obtener el estado de las celdas.");
      }

      return resultado; // Retorna { electricas: [...], movilidad: [...] }
    } catch (error) {
      console.error("Error en getCeldas:", error);
      throw error;
    }
  },

  /**
   * 3. Obtener el historial de ingresos y salidas corporativas
   * Para consumirse en componentes de auditoría o listas
   */
  getHistorial: async () => {
    try {
      const respuesta = await fetch(`${API_URL}/admin/historial`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(resultado.error || "Error al cargar el historial.");
      }

      return resultado;
    } catch (error) {
      console.error("Error en getHistorial:", error);
      throw error;
    }
  },

  /**
   * 4. Vincular un nuevo vehículo a un funcionario
   * Usado en Vehiculos.jsx para asociar placas
   */
  vincularVehiculo: async (datosVehiculo) => {
    try {
      const respuesta = await fetch(`${API_URL}/admin/vehiculos`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(datosVehiculo),
      });

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(resultado.error || "Error al vincular el vehículo.");
      }

      return resultado;
    } catch (error) {
      console.error("Error en vincularVehiculo:", error);
      throw error;
    }
  }
};