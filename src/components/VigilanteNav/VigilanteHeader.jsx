function Header({ toggleMenu }) {
    return (
        <header className="header">

            <button
                className="menu-btn"
                onClick={toggleMenu}
            >
                ☰
            </button>

            <div className="logo">
                🚗 Parklink
            </div>

            <div className="usuario">
                👮 Vigilante
            </div>

        </header>
    );
}

export default Header;