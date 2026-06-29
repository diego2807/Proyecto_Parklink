const API = "http://127.0.0.1:5000/api/usuario";

export const reservaService = {

    async crearReserva(datos) {

        const token = localStorage.getItem("token");

        const response = await fetch(`${API}/reservas`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify(datos)

        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Error al crear reserva");
        }

        return data;
    },

    async obtenerReservas() {

        const token = localStorage.getItem("token");

        const response = await fetch(`${API}/reservas`, {

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Error cargando reservas");
        }

        return data;
    }

};