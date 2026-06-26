import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Nav from "../../components/VigilanteNav/VigilanteNav";
import { vigilanteService } from "../../services/vigilanteService";

import "../../css/VigilanteCSS/salida.css";

function FormularioSalida() {

    const [placa, setPlaca] = useState("");
    const [resultado, setResultado] = useState(null);
    const [cargando, setCargando] = useState(false);

    const [searchParams] = useSearchParams();

    // Cargar automáticamente la placa que viene desde ListaVehiculosActivo
    useEffect(() => {

        const placaURL = searchParams.get("placa");

        if (placaURL) {
            setPlaca(placaURL);
        }

    }, [searchParams]);

    const registrarSalida = async () => {

        if (!placa.trim()) {
            alert("Ingrese una placa.");
            return;
        }

        try {

            setCargando(true);

            const placaRegistrada = placa.toUpperCase();

            const data = await vigilanteService.registrarSalida(
                placaRegistrada
            );

            setResultado({
                placa: placaRegistrada,
                ...data
            });

            alert(data.mensaje);

            setPlaca("");

        } catch (error) {

            alert(error.message);

        } finally {

            setCargando(false);

        }

    };

    return (
        <>
            <main className="main-content">

                <Nav />

                <section className="salida">

                    <div className="titulo-pagina">

                        <h2>🚙 Registro de Salida</h2>

                        <p>
                            Digite la placa del vehículo para registrar su salida.
                        </p>

                    </div>

                    <div className="busqueda">

                        <label htmlFor="placaSalida">
                            Placa del vehículo
                        </label>

                        <div className="busqueda-placa">

                            <input
                                type="text"
                                id="placaSalida"
                                value={placa}
                                onChange={(e) =>
                                    setPlaca(e.target.value.toUpperCase())
                                }
                                placeholder="Ej: ABC123"
                            />

                            <button
                                onClick={registrarSalida}
                                disabled={cargando}
                            >
                                {
                                    cargando
                                        ? "Registrando..."
                                        : "Registrar Salida"
                                }
                            </button>

                        </div>

                    </div>

                    {
                        resultado && (

                            <div className="reserva">

                                <h3>✅ Salida Registrada</h3>

                                <div className="dato">

                                    <strong>🚗 Placa</strong>

                                    <span>{resultado.placa}</span>

                                </div>

                                <div className="dato">

                                    <strong>🅿️ Celda Liberada</strong>

                                    <span>{resultado.celda_liberada}</span>

                                </div>

                                <div className="dato">

                                    <strong>📋 Estado</strong>

                                    <span>
                                        Salida registrada correctamente
                                    </span>

                                </div>

                            </div>

                        )
                    }

                </section>

            </main>
        </>
    );

}

export default FormularioSalida;