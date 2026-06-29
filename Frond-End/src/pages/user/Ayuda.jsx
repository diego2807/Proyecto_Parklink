import { useState } from "react";
import "../../css/UserCSS/Styles.css";
import Nav from "../../components/UserNav/UserNav";

function Ayuda() {

    const [abierto, setAbierto] = useState(null);

    const preguntas = [

        {
            titulo: "¿Cómo registrar un vehículo?",
            respuesta:
                "Ingrese al módulo Vehículos, complete los datos solicitados y presione Registrar Vehículo."
        },

        {
            titulo: "¿Cómo consultar los cupos disponibles?",
            respuesta:
                "Ingrese al módulo Semáforo para visualizar el estado actual del parqueadero y la cantidad de cupos libres."
        },

        {
            titulo: "¿Cómo consultar mi historial?",
            respuesta:
                "Desde el módulo Historial podrá revisar todas sus entradas y salidas registradas."
        },

        {
            titulo: "¿Cómo eliminar un vehículo?",
            respuesta:
                "Actualmente esta función se encuentra disponible únicamente para el administrador del sistema."
        },

        {
            titulo: "¿Qué significan los colores del semáforo?",
            respuesta:
                "🟢 Verde: Alta disponibilidad. 🟡 Amarillo: Disponibilidad media. 🔴 Rojo: Parqueadero casi lleno."
        }

    ];

    return (

        <>
            <Nav />

            <div className="page">

                <div className="topbar">

                    <div>

                        <h1>Centro de Ayuda</h1>

                        <p>

                            Encuentre respuestas rápidas sobre el uso de ParkLink.

                        </p>

                    </div>

                </div>

                <section className="cards">

                    <div className="card">

                        <div className="card-icon blue">

                            <i className="fas fa-book"></i>

                        </div>

                        <div>

                            <h3>Guías Disponibles</h3>

                            <span>5</span>

                        </div>

                    </div>

                    <div className="card">

                        <div className="card-icon green">

                            <i className="fas fa-headset"></i>

                        </div>

                        <div>

                            <h3>Soporte</h3>

                            <span>24/7</span>

                        </div>

                    </div>

                    <div className="card">

                        <div className="card-icon orange">

                            <i className="fas fa-circle-info"></i>

                        </div>

                        <div>

                            <h3>Versión</h3>

                            <span>1.0</span>

                        </div>

                    </div>

                </section>

                <div className="panel">

                    <div className="panel-header">

                        <h2>

                            Preguntas Frecuentes

                        </h2>

                    </div>

                    {

                        preguntas.map((item, index) => (

                            <div
                                className="faq-item"
                                key={index}
                            >

                                <div

                                    className="faq-question"

                                    style={{
                                        cursor: "pointer",
                                        fontWeight: "bold",
                                        marginBottom: "10px"
                                    }}

                                    onClick={() =>
                                        setAbierto(
                                            abierto === index
                                                ? null
                                                : index
                                        )
                                    }

                                >

                                    {

                                        abierto === index

                                            ? "▲ "

                                            : "▼ "

                                    }

                                    {item.titulo}

                                </div>

                                {

                                    abierto === index && (

                                        <div
                                            className="faq-answer"
                                            style={{
                                                marginBottom: "20px"
                                            }}
                                        >

                                            {item.respuesta}

                                        </div>

                                    )

                                }

                            </div>

                        ))

                    }

                </div>

                <div className="panel">

                    <div className="panel-header">

                        <h2>

                            Manual Rápido

                        </h2>

                    </div>

                    <ol style={{ paddingLeft: "20px", lineHeight: "2" }}>

                        <li>Registre sus vehículos.</li>

                        <li>Consulte el semáforo antes de ingresar.</li>

                        <li>Revise el historial de movimientos.</li>

                        <li>Consulte las notificaciones del sistema.</li>

                        <li>Contacte soporte cuando sea necesario.</li>

                    </ol>

                </div>

                <div className="panel">

                    <div className="panel-header">

                        <h2>

                            Contacto

                        </h2>

                    </div>

                    <p>

                        <strong>Correo:</strong>

                        soporte@parklink.com

                    </p>

                    <p>

                        <strong>Teléfono:</strong>

                        +57 300 123 4567

                    </p>

                    <p>

                        <strong>Horario:</strong>

                        Lunes a Viernes

                        8:00 AM - 6:00 PM

                    </p>

                </div>

            </div>

        </>

    );

}

export default Ayuda;