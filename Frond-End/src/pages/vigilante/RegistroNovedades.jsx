import { useEffect, useState } from "react";

import Footer from "../../components/VigilanteNav/VigilanteFooter";
import Header from "../../components/VigilanteNav/VigilanteHeader";
import Nav from "../../components/VigilanteNav/VigilanteNav";

import "../../css/VigilanteCSS/novedades.css";

function RegistroNovedades() {

    const [descripcion, setDescripcion] = useState("");
    const [novedades, setNovedades] = useState([]);

    const token = localStorage.getItem("token");

    const cargarNovedades = async () => {
        try {

            const respuesta = await fetch(
                "http://127.0.0.1:5000/api/vigilante/novedades",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await respuesta.json();

            setNovedades(data);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        cargarNovedades();
    }, []);

    const registrarNovedad = async (e) => {

        e.preventDefault();

        if (!descripcion.trim()) {
            alert("Debe escribir una novedad");
            return;
        }

        try {

            const respuesta = await fetch(
                "http://127.0.0.1:5000/api/vigilante/novedades",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        descripcion
                    })
                }
            );

            const data = await respuesta.json();

            if (!respuesta.ok) {
                alert(data.error);
                return;
            }

            alert(data.mensaje);

            setDescripcion("");

            cargarNovedades();

        } catch (error) {
            console.error(error);
            alert("Error al registrar la novedad");
        }
    };

    return (
        <>
            <Header />

            <main className="main-content">

                <Nav />

                <section className="novedades">

                    <div className="titulo-pagina">
                        <h2>📋 Registro de Novedades</h2>

                        <p>
                            Registre cualquier situación o incidente ocurrido durante el turno.
                        </p>
                    </div>

                    <form
                        className="formulario-novedad"
                        onSubmit={registrarNovedad}
                    >

                        <div className="campo">
                            <label>Descripción</label>

                            <textarea
                                rows="5"
                                value={descripcion}
                                onChange={(e) =>
                                    setDescripcion(e.target.value)
                                }
                                placeholder="Describa la novedad..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn-registrar"
                        >
                            ✅ Registrar Novedad
                        </button>

                    </form>

                    <div className="recordatorio">
                        <strong>💡 Importante:</strong>
                        Registre la novedad con la mayor claridad posible para facilitar el seguimiento.
                    </div>

                    <div className="historial-novedades">

                        <h3>📑 Historial de Novedades</h3>

                        {
                            novedades.length === 0
                                ? (
                                    <p>No hay novedades registradas.</p>
                                )
                                : (
                                    novedades.map((novedad) => (
                                        <div
                                            key={novedad.id}
                                            className="card-novedad"
                                        >
                                            <p>
                                                {novedad.descripcion}
                                            </p>

                                            <small>
                                                {novedad.fecha}
                                            </small>
                                        </div>
                                    ))
                                )
                        }

                    </div>

                </section>

            </main>

            <Footer />
        </>
    );
}

export default RegistroNovedades;