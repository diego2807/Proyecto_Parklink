// Frond-End/src/services/vigilanteService.js
const API_BASE_URL = 'http://localhost:5000/api/vigilante';

// Función auxiliar para obtener el token guardado (usualmente en localStorage tras el login)
const getAuthHeaders = () => {
  const token = localStorage.getItem('token'); // Asegúrate de guardarlo con este nombre en tu Login
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const vigilanteService = {
  // 1. Apertura de Turno
  aperturaTurno: async () => {
    const response = await fetch(`${API_BASE_URL}/apertura-turno`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Error al abrir turno');
    return await response.json();
  },

  // 2. Cierre de Turno
  cierreTurno: async () => {
    const response = await fetch(`${API_BASE_URL}/cierre-turno`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Error al cerrar turno');
    return await response.json();
  },

  // 3. Registrar Entrada de Vehículo
  registrarEntrada: async (placa) => {
    const response = await fetch(`${API_BASE_URL}/entrada`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ placa }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Error en la entrada');
    return data;
  },

  // 4. Registrar Salida de Vehículo
  registrarSalida: async (placa) => {
    const response = await fetch(`${API_BASE_URL}/salida`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ placa }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Error en la salida');
    return data;
  },

  // 5. Obtener Historial del Turno actual
  obtenerHistorialTurno: async () => {
    const response = await fetch(`${API_BASE_URL}/historial-turno`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Error al obtener el historial');
    return await response.json();
  },

  // 6. Obtener Lista de Vehículos Activos
  obtenerVehiculosActivos: async () => {
    const response = await fetch(`${API_BASE_URL}/vehiculos-activos`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Error al obtener vehículos activos');
    return await response.json();
  },

  obtenerResumenTurno: async () => {
    const response = await fetch(`${API_BASE_URL}/resumen-turno`, {
        method: "GET",
        headers: getAuthHeaders(),
    });

    if (!response.ok)
        throw new Error("Error al obtener el resumen");

    return await response.json();
},


crearNovedad: async (descripcion) => {
    const response = await fetch(`${API_BASE_URL}/novedades`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ descripcion }),
    });

    const data = await response.json();

    if (!response.ok)
        throw new Error(data.error || "Error al registrar la novedad");

    return data;
},

obtenerNovedades: async () => {
    const response = await fetch(`${API_BASE_URL}/novedades`, {
        method: "GET",
        headers: getAuthHeaders(),
    });

    if (!response.ok)
        throw new Error("Error al obtener novedades");

    return await response.json();
},


registrarVisitante: async (visitante) => {
    const response = await fetch(`${API_BASE_URL}/visitantes`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(visitante),
    });

    const data = await response.json();

    if (!response.ok)
        throw new Error(data.error || "Error al registrar visitante");

    return data;
},

obtenerVisitantes: async () => {
    const response = await fetch(`${API_BASE_URL}/visitantes`, {
        method: "GET",
        headers: getAuthHeaders(),
    });

    if (!response.ok)
        throw new Error("Error al obtener visitantes");

    return await response.json();
},



// 8. Registrar Visitante
registrarVisitante: async (visitante) => {
  const response = await fetch(`${API_BASE_URL}/visitantes`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(visitante),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error al registrar visitante");
  }

  return data;
},

  // 🔍 7. Consultar reserva por placa (Ahora dentro del objeto)
  buscarReservaPorPlaca: async (placa) => {
    const response = await fetch(`${API_BASE_URL}/consulta-reserva/${placa}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'No se encontró una reserva activa para esta placa.');
    return data; // Flask debería retornar: { propietario: "...", espacio: "...", hora: "..." }
  }
}; // <-- Aquí cierra correctamente el objeto exportado

