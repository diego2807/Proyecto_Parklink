import { useState } from "react";

import Footer from "../../components/VigilanteNav/VigilanteFooter";
import Header from "../../components/VigilanteNav/VigilanteHeader";
import Nav from "../../components/VigilanteNav/VigilanteNav";

import "../../css/VigilanteCSS/visitantes.css";

function FormularioVisitantes() {

    const [formulario, setFormulario] = useState({
        nombre_completo: "",
        documento: "",
        placa_vehiculo: "",
        area_visitada: "",
        motivo_visita: ""
    });

    const handleChange = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        });
    };

    const registrarVisitante = async (e) => {
        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://127.0.0.1:5000/api/vigilante/visitantes",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(formulario)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.error || data.mensaje);
                return;
            }

            alert("✅ Visitante registrado correctamente");

            setFormulario({
                nombre_completo: "",
                documento: "",
                placa_vehiculo: "",
                area_visitada: "",
                motivo_visita: ""
            });

        } catch (error) {
            console.error(error);
            alert("Error al conectar con el servidor");
        }
    };

    return (
        <>
            <Header />

            <main className="main-content">
                <Nav />

                <section className="visitantes">

                    <div className="titulo-pagina">
                        <h2>👥 Registro de Visitantes</h2>

                        <p>
                            Registre los datos del visitante para autorizar el ingreso.
                        </p>
                    </div>

                    <form
                        className="formulario-visitante"
                        onSubmit={registrarVisitante}
                    >

                        <div className="campo">
                            <label>Nombre Completo</label>

                            <input
                                type="text"
                                name="nombre_completo"
                                value={formulario.nombre_completo}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="campo">
                            <label>Documento</label>

                            <input
                                type="text"
                                name="documento"
                                value={formulario.documento}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="campo">
                            <label>Placa del Vehículo</label>

                            <input
                                type="text"
                                name="placa_vehiculo"
                                value={formulario.placa_vehiculo}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="campo">
                            <label>Persona o Área Visitada</label>

                            <input
                                type="text"
                                name="area_visitada"
                                value={formulario.area_visitada}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="campo">
                            <label>Motivo de la Visita</label>

                            <textarea
                                rows="4"
                                name="motivo_visita"
                                value={formulario.motivo_visita}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="recordatorio">
                            <strong>💡 Importante:</strong>
                            Verifique la identidad del visitante antes de autorizar el ingreso.
                        </div>

                        <button
                            type="submit"
                            className="btn-registrar"
                        >
                            ✅ Registrar Visitante
                        </button>

                    </form>

                </section>

            </main>

            <Footer />
        </>
    );
}

export default FormularioVisitantes;