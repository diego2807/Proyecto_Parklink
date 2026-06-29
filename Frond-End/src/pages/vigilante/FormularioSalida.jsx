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
                hora: new Date().toLocaleString(),
                ...data
            });

            alert(data.mensaje);

            setPlaca("");

        }

        catch (error) {

            alert(error.message);

        }

        finally {

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
                            Registre la salida de un vehículo del parqueadero.
                        </p>

                    </div>

                    <div className="busqueda">

                        <label>Placa del vehículo</label>

                        <div className="busqueda-placa">

                            <input
                                type="text"
                                value={placa}
                                placeholder="ABC123"
                                onChange={(e)=>
                                    setPlaca(e.target.value.toUpperCase())
                                }
                            />

                            <button
                                onClick={registrarSalida}
                                disabled={cargando}
                            >

                                {
                                    cargando
                                    ? "Procesando..."
                                    : "Registrar Salida"
                                }

                            </button>

                        </div>

                    </div>

                    <div className="panel-info">

                        <div className="info-card">

                            <h4>🚗 Placa</h4>

                            <p>

                                {placa || "Sin ingresar"}

                            </p>

                        </div>

                        <div className="info-card">

                            <h4>📌 Estado</h4>

                            <p>

                                {
                                    resultado
                                    ? "Salida registrada"
                                    : "Esperando registro"
                                }

                            </p>

                        </div>

                    </div>

                    {

                        resultado && (

                            <div className="resultado">

                                <h3>

                                    ✅ Salida Registrada

                                </h3>

                                <div className="resultado-grid">

                                    <div className="dato">

                                        <strong>🚗 Placa</strong>

                                        <span>

                                            {resultado.placa}

                                        </span>

                                    </div>

                                    <div className="dato">

                                        <strong>🅿️ Celda liberada</strong>

                                        <span>

                                            {resultado.celda_liberada}

                                        </span>

                                    </div>

                                    <div className="dato">

                                        <strong>🕒 Hora</strong>

                                        <span>

                                            {resultado.hora}

                                        </span>

                                    </div>

                                    <div className="dato">

                                        <strong>Estado</strong>

                                        <span className="estado-ok">

                                            ✔ Operación exitosa

                                        </span>

                                    </div>

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