const API = "http://127.0.0.1:5000/api/usuario";

export const usuarioService = {

    async obtenerPanel() {

        const token = localStorage.getItem("token");

        const response = await fetch(`${API}/panel`, {

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        const data = await response.json();

        if (!response.ok) {

            throw new Error(
                data.error || "Error obteniendo información"
            );

        }

        return data;

    },

    async obtenerVehiculos() {

        const token = localStorage.getItem("token");

        const response = await fetch(`${API}/vehiculos`, {

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        const data = await response.json();

        if (!response.ok) {

            throw new Error(
                data.error || "Error obteniendo vehículos"
            );

        }

        return data;

    },

    async registrarVehiculo(vehiculo) {

        const token = localStorage.getItem("token");

        const response = await fetch(`${API}/vehiculos`, {

            method: "POST",

            headers: {

                "Content-Type": "application/json",

                Authorization: `Bearer ${token}`

            },

            body: JSON.stringify(vehiculo)

        });

        const data = await response.json();

        if (!response.ok) {

            throw new Error(
                data.error || "Error registrando vehículo"
            );

        }

        return data;

    },


    async obtenerHistorial() {

    const token = localStorage.getItem("token");

    const response = await fetch(`${API}/historial`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Error obteniendo historial");
    }

    return data;

},
    async obtenerNotificaciones() {

        const token = localStorage.getItem("token");

        const response = await fetch(`${API}/notificaciones`, {

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        const data = await response.json();

        if (!response.ok) {

            throw new Error(
                data.error || "Error obteniendo notificaciones"
            );

        }

        return data;

    },


    async obtenerPerfil() {

    const token = localStorage.getItem("token");

    const response = await fetch(`${API}/perfil`, {

        headers: {

            Authorization: `Bearer ${token}`

        }

    });

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.error || "Error obteniendo perfil"
        );

    }

    return data;

},

async cambiarPassword(password_actual, password_nueva) {

    const token = localStorage.getItem("token");

    const response = await fetch(`${API}/cambiar-password`, {

        method: "PUT",

        headers: {

            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`

        },

        body: JSON.stringify({

            password_actual,

            password_nueva

        })

    });

    const data = await response.json();

    if (!response.ok) {

        throw new Error(data.error);

    }

    return data;

},
};
