// src/services/api_admin.js

const API_URL = "http://127.0.0.1:5000/api"; // Ajusta el puerto según corra tu Flask

/**
 * Función auxiliar para obtener las cabeceras de autenticación.
 * Recupera el token JWT que guardaste en el localStorage durante el Login.
 */
const getAuthHeaders = () => {
  const token = localStorage.getItem("token"); 
  return {
    "Content-Type": "application/json",
    "Authorization": token ? `Bearer ${token}` : "",
  };
};

export const apiService = {
  /**
   * 1. Registrar un nuevo usuario (Funcionario o Vigilante)
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

      return resultado; 
    } catch (error) {
      console.error("Error en registrarUsuario:", error);
      throw error;
    }
  },

  /**
   * 2. Obtener el estado de las celdas especiales
   */
  getCeldas: async () => {
    try {
      const respuesta = await fetch(`${API_URL}/admin/celdas`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(resultado.error || "Error al obtener las celdas.");
      }

      return resultado; 
    } catch (error) {
      console.error("Error en getCeldas:", error);
      throw error;
    }
  },

  /**
   * 3. Obtener el historial de ingresos y salidas corporativas
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

  registrarAcceso: async (datosAcceso) => {
    try {
      const respuesta = await fetch(`${API_URL}/admin/registrar-acceso`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(datosAcceso),
      });

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(resultado.error || "No se pudo procesar el registro en portería.");
      }

      return resultado;
    } catch (error) {
      console.error("Error en registrarAcceso:", error);
      throw error;
    }
  },

  /**
   * 4. Obtener todos los vehículos vinculados (GET)
   * ¡Este es el método que consume la tabla de Vehiculos.jsx!
   */
  getVehiculos: async () => {
    try {
      const respuesta = await fetch(`${API_URL}/admin/vehiculos`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        // Lanza el mensaje de error que viene directo desde Flask
        throw new Error(resultado.error || "Error al recuperar el listado de vehículos.");
      }

      return resultado; // Retorna el array de vehículos
    } catch (error) {
      console.error("Error en getVehiculos:", error);
      throw error;
    }
  },

  /**
   * 5. Vincular un nuevo vehículo a un funcionario (POST)
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
        throw new Error(resultado.error || "No se pudo vincular el vehículo.");
      }

      return resultado;
    } catch (error) {
      console.error("Error en vincularVehiculo:", error);
      throw error;
    }
  },
  
  /**
   * 6. Dar de baja un vehículo por su ID (DELETE)
   */
    eliminarVehiculo: async (vehiculoId) => {
    try {
      const respuesta = await fetch(`${API_URL}/admin/vehiculos/${vehiculoId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(resultado.error || "No se pudo dar de baja el vehículo.");
      }

      return resultado;
    } catch (error) {
      console.error("Error en eliminarVehiculo:", error);
      throw error;
    }
  },
  /**
   * 8. Cambiar el estado de ocupación de una celda (PUT)
   */
  actualizarEstadoCelda: async (celdaId, estadoOcupada) => {
    try {
      const respuesta = await fetch(`${API_URL}/admin/celdas/${celdaId}/estado`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ ocupada: estadoOcupada }),
      });
      const resultado = await respuesta.json();
      if (!respuesta.ok) {
        throw new Error(resultado.error || "No se pudo actualizar el estado de la celda.");
      }
      return resultado;
    } catch (error) {
      console.error("Error en actualizarEstadoCelda:", error);
      throw error;
    }
  },
  // Dentro de apiService en api_admin.js (Recuerda poner la coma arriba)
  
  /**
   * 9. Registrar una nueva celda de uso prioritario (POST)
   */
    registrarCelda: async (datosCelda) => {
    try {
      const respuesta = await fetch(`${API_URL}/admin/celdas`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(datosCelda),
      });
      const resultado = await respuesta.json();
      if (!respuesta.ok) {
        throw new Error(resultado.error || "No se pudo registrar la celda.");
      }
      return resultado;
    } catch (error) {
      console.error("Error en registrarCelda:", error);
      throw error;
    }
  }
};