import { useEffect, useState } from "react";

import Nav from "../../components/VigilanteNav/VigilanteNav";

import "../../css/VigilanteCSS/mapa.css";

function MapaGrafico() {

    const [celdas, setCeldas] = useState([]);

    useEffect(() => {
        cargarCeldas();
    }, []);

    const cargarCeldas = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://127.0.0.1:5000/api/admin/celdas",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            setCeldas(data);

        } catch (error) {
            console.error("Error cargando celdas:", error);
        }
    };

    const totalCeldas = celdas.length;

    const celdasOcupadas = celdas.filter(
        celda => celda.ocupada
    ).length;

    const celdasDisponibles =
        totalCeldas - celdasOcupadas;

    return (
        <>

            <div id="modulo-mapa-vigilante">

                <main className="main-content">

                    <Nav />

                    <section className="mapa">

                        <div className="titulo-pagina">
                            <h2>🅿️ Mapa Gráfico del Parqueadero</h2>

                            <p>
                                Visualización en tiempo real del estado de los espacios.
                            </p>
                        </div>

                        <section className="metrics-grid">

                            <div className="metric-card">
                                <div className="metric-icon">🔲</div>

                                <div className="metric-data">
                                    <div className="num">
                                        {totalCeldas}
                                    </div>

                                    <div className="lbl">
                                        Celdas Totales
                                    </div>
                                </div>
                            </div>

                            <div className="metric-card">
                                <div className="metric-icon">🟢</div>

                                <div className="metric-data">
                                    <div className="num">
                                        {celdasDisponibles}
                                    </div>

                                    <div className="lbl">
                                        Disponibles
                                    </div>
                                </div>
                            </div>

                            <div className="metric-card">
                                <div className="metric-icon">🔴</div>

                                <div className="metric-data">
                                    <div className="num">
                                        {celdasOcupadas}
                                    </div>

                                    <div className="lbl">
                                        Ocupadas
                                    </div>
                                </div>
                            </div>

                        </section>

                        <div className="plano-container">

                            <div className="esquema-sotano">

                                <div className="zona-parqueo">

                                    {celdas.map((celda) => (

                                        <div
                                            key={celda.id}
                                            className={
                                                celda.ocupada
                                                    ? "puesto ocupado"
                                                    : "puesto disponible"
                                            }
                                        >
                                            {celda.codigo_celda}
                                        </div>

                                    ))}

                                </div>

                                <div className="nucleo">
                                    NÚCLEO ESTRUCTURAL: ASCENSORES TORRE PRINCIPAL
                                </div>

                            </div>

                        </div>

                        <div className="footer-mapa">
                            <span>
                                TOTAL CELDAS: {totalCeldas}
                            </span>

                            <span>
                                DISPONIBLES: {celdasDisponibles}
                            </span>

                            <span>
                                OCUPADAS: {celdasOcupadas}
                            </span>
                        </div>

                    </section>

                </main>

            </div>
        </>
    );
}

export default MapaGrafico;