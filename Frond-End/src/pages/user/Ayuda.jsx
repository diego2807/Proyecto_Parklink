import '../../css/UserCSS/Styles.css'
import Nav from '../../components/UserNav/UserNav'

function Ayuda (){
    return(

        <>
        <Nav/>
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

        <div className="faq-item">

            <div className="faq-question"
            onClick="toggleFAQ(this)">

                ▼ ¿Cómo registrar un vehículo?

            </div>

            <div className="faq-answer">

                Ingrese al módulo Vehículos,
                complete los campos requeridos y
                presione "Registrar Vehículo".

            </div>

        </div>

        <div className="faq-item">

            <div className="faq-question"
            onClick="toggleFAQ(this)">

                ▼ ¿Cómo consultar los cupos disponibles?

            </div>

            <div className="faq-answer">

                Diríjase al módulo Semáforo para
                visualizar el estado actual del
                parqueadero y la disponibilidad
                de espacios.

            </div>

        </div>

        <div className="faq-item">

            <div className="faq-question"
            onClick="toggleFAQ(this)">

                ▼ ¿Cómo ver mi historial?

            </div>

            <div className="faq-answer">

                Ingrese al módulo Historial para
                consultar fechas, horas de ingreso,
                salida y vehículos utilizados.

            </div>

        </div>

        <div className="faq-item">

            <div className="faq-question"
            onClick="toggleFAQ(this)">

                ▼ ¿Cómo eliminar un vehículo?

            </div>

            <div className="faq-answer">

                Desde la sección Vehículos,
                ubique el vehículo registrado y
                pulse el botón Eliminar.

            </div>

        </div>

        <div className="faq-item">

            <div className="faq-question"
            onClick="toggleFAQ(this)">

                ▼ ¿Qué significan los colores del semáforo?

            </div>

            <div className="faq-answer">

                🟢 Verde: Disponibilidad alta.

                🟡 Amarillo: Disponibilidad media.

                🔴 Rojo: Parqueadero casi lleno.

            </div>

        </div>

    </div>

    <div className="panel">

        <div className="panel-header">

            <h2>

                Manual Rápido de Uso

            </h2>

        </div>

        <ol style={{paddingLeft:'20px',lineHeight:'2'}}>

            <li>
                Registre sus vehículos autorizados.
            </li>

            <li>
                Consulte la disponibilidad en el semáforo.
            </li>

            <li>
                Revise sus registros en el historial.
            </li>

            <li>
                Manténgase informado mediante las notificaciones.
            </li>

            <li>
                Contacte soporte en caso de inconvenientes.
            </li>

        </ol>

    </div>

    <div className="panel">

        <div className="panel-header">

            <h2>

                Contacto de Soporte

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
    )
}

export default Ayuda