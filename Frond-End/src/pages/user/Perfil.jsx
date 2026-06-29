import { useEffect, useState } from "react";
import Nav from "../../components/UserNav/UserNav";
import "../../css/UserCSS/Styles.css";
import { usuarioService } from "../../services/usuarioService";

function Perfil() {


    const [passwordActual, setPasswordActual] = useState("");

    const [passwordNueva, setPasswordNueva] = useState("");

    const [confirmarPassword, setConfirmarPassword] = useState("");

    const [perfil, setPerfil] = useState(null);

    useEffect(() => {

        cargarPerfil();

    }, []);

    async function cargarPerfil() {

        try {

            const data = await usuarioService.obtenerPerfil();

            setPerfil(data);

        }

        catch(error){

            console.error(error);

        }

    }

    if(!perfil){

        return <h2 style={{padding:"30px"}}>Cargando perfil...</h2>

    }

    async function actualizarPassword() {

    try {

        if (passwordNueva !== confirmarPassword) {

            alert("Las contraseñas no coinciden");

            return;

        }

        await usuarioService.cambiarPassword(

            passwordActual,

            passwordNueva

        );

        alert("Contraseña actualizada correctamente.");

        setPasswordActual("");

        setPasswordNueva("");

        setConfirmarPassword("");

    }

    catch(error){

        alert(error.message);

    }

}

    return(

        <>
            <Nav/>

            <div className="page">

                <div className="topbar">

                    <div>

                        <h1>Mi Perfil</h1>

                        <p>

                            Información de tu cuenta en ParkLink.

                        </p>

                    </div>

                </div>

                    <section className="perfil-header">

                    <div className="perfil-avatar">

                        <i className="fas fa-user-circle"></i>

                    </div>

                    <div className="perfil-info">

                        <h2>

                            {perfil.nombre_completo}

                        </h2>

                        <p>

                            {perfil.correo}

                        </p>

                        <span className="badge success">

                            {perfil.rol}

                        </span>

                    </div>

                </section>


                <section className="cards">

                    <div className="card">

                        <div className="card-icon blue">

                            <i className="fas fa-car"></i>

                        </div>

                        <div>

                            <h3>

                                Vehículos

                            </h3>

                            <span>

                                {perfil.vehiculos}

                            </span>

                        </div>

                    </div>


                    <div className="card">

                        <div className="card-icon green">

                            <i className="fas fa-calendar-check"></i>

                        </div>

                        <div>

                            <h3>

                                Reservas

                            </h3>

                            <span>

                                {perfil.reservas}

                            </span>

                        </div>

                    </div>


                    <div className="card">

                        <div className="card-icon orange">

                            <i className="fas fa-shield-halved"></i>

                        </div>

                        <div>

                            <h3>

                                Rol

                            </h3>

                            <span>

                                {perfil.rol}

                            </span>

                        </div>

                    </div>

                </section>

                    <section className="panel">

                    <div className="panel-header">

                        <h2>

                            Cambiar contraseña

                        </h2>

                    </div>

                    <div className="perfil-password">

                    <input
                    type="password"
                    placeholder="Contraseña actual"
                    value={passwordActual}
                    onChange={(e)=>setPasswordActual(e.target.value)}
                    />

                    <input
                    type="password"
                    placeholder="Nueva contraseña"
                    value={passwordNueva}
                    onChange={(e)=>setPasswordNueva(e.target.value)}
                    />

                    <input
                    type="password"
                    placeholder="Confirmar nueva contraseña"
                    value={confirmarPassword}
                    onChange={(e)=>setConfirmarPassword(e.target.value)}
                    />
                    
                    <button
                    onClick={actualizarPassword}
                    >

                    <i className="fas fa-key"></i>

                    Actualizar contraseña

                    </button>

                    </div>

                </section>

            </div>

        </>

    );

}

export default Perfil;