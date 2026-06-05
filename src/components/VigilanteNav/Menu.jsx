import { useState } from "react";
import Header from "../VigilanteNav/VigilanteHeader";
import Nav from "../VigilanteNav/VigilanteNav";


function Menu({ children }) {

    const [menuActivo, setMenuActivo] = useState(false);

    const toggleMenu = () => {
        setMenuActivo(!menuActivo);
    };

    return (
        <>
            <Header toggleMenu={toggleMenu} />
            <Nav menuActivo={menuActivo} />

            {children}

        </>
    );
}

export default Menu;