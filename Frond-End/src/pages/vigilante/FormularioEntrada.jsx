import { useState } from "react";

import Nav from "../../components/VigilanteNav/VigilanteNav";
import { vigilanteService } from "../../services/vigilanteService";
import "../../css/VigilanteCSS/entrada.css";

function FormularioEntrada() {

    const [placa, setPlaca] = useState("");
    const [loading, setLoading] = useState(false);

    const confirmarEntrada = async () => {

        if (!placa.trim()) {
            alert("Ingrese una placa.");
            return;
        }

        try {

            setLoading(true);

            const respuesta = await vigilanteService.registrarEntrada(placa);

            alert(
                `${respuesta.mensaje}\n\nCelda asignada: ${respuesta.celda}`
            );

            setPlaca("");

        } catch (error) {

            alert(error.message);

        } finally {

            setLoading(false);

        }
    };

    return (
        <>
            <main className="main-content">

                <Nav />

                <section className="entrada">

                    <div className="titulo-pagina">
                        <h2>🚗 Registro de Entrada</h2>
                        <p>Ingrese la placa del vehículo para registrar su entrada.</p>
                    </div>

                    <div className="contenido-entrada">

                        <div className="busqueda">

                            <label htmlFor="placa">
                                Placa del vehículo
                            </label>

                            <div className="busqueda-placa">

                                <input
                                    type="text"
                                    id="placa"
                                    value={placa}
                                    onChange={(e) =>
                                        setPlaca(e.target.value.toUpperCase())
                                    }
                                    placeholder="Ej: ABC123"
                                />

                                {/* Este botón queda para cuando exista la consulta de reservas */}
                                <button disabled>
                                    Buscar
                                </button>

                            </div>

                        </div>

                        <div className="reserva">

                            <h3>📄 Información</h3>

                            <div className="info-grid">

                                <div className="info-card">
                                    <h4>🚗 Placa</h4>
                                    <p>{placa || "Sin registrar"}</p>
                                </div>

                                <div className="info-card">
                                    <h4>📌 Estado</h4>
                                    <p>Lista para registrar</p>
                                </div>

                            </div>

                            <div className="acciones">

                                <button
                                    className="btn-confirmar"
                                    onClick={confirmarEntrada}
                                    disabled={loading}
                                >
                                    {
                                        loading
                                            ? "Registrando..."
                                            : "✅ Confirmar Entrada"
                                    }
                                </button>

                                <button
                                    className="btn-visitante"
                                    disabled
                                >
                                    👥 Registrar Visitante
                                </button>

                            </div>

                        </div>

                    </div>

                </section>

            </main>

        </>
    );
}

export default FormularioEntrada;