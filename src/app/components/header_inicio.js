import React, { useState } from "react";
import "../css/header_inicio.css";

export default function Header_inicio() {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleRegister = () => {
        window.location.href = "/screens/registro";
    };

    const handleInicio = () => {
        window.location.href = "/screens/inicio_sesion";
    };

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <header className="header-nav">
            <nav className="nav-menu">
                <div className="logo">
                    <div className="logoContainer">
                        <img src="/logo.png" />
                        <p>HACKACADEMY</p>
                    </div>
                    <div className="hamburger" onClick={toggleMenu}>
                        ☰
                    </div>
                </div>
                <div className="menu">
                    <ul className={`menu-items ${menuOpen ? 'active' : ''}`}>
                        <li className="plan"><a href="#plus">Plus</a></li>
                        <li><a href="#inicio">Inicio</a></li>
                        <li><a href="#">Acerca de nosotros</a></li>
                        <li>
                            <button className="register-btn" onClick={handleRegister}>Registrarse</button>
                        </li>
                        <li>
                            <button className="login-btn" onClick={handleInicio}>Iniciar Sesión</button>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}
