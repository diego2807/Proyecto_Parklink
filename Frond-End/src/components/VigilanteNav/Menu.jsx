import { useState } from "react";
import Header from "../../components/VigilanteNav/VigilanteHeader";
import Nav from "../../components/VigilanteNav/VigilanteNav";


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