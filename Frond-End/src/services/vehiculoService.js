const API = "http://127.0.0.1:5000/api/usuario";

export const vehiculoService = {

    async obtenerVehiculos() {

        const token = localStorage.getItem("token");

        const response = await fetch(`${API}/vehiculos`, {

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error("Error obteniendo vehículos");
        }

        return data;

    }

};