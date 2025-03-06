import React from "react";
import "../css/header_inicio.css";

export default function Header_inicio() {
    const handleRegister = () => {
        window.location.href = "/screens/registro";
    }
    const handleInicio = () => {
        window.location.href = "/screens/inicio_sesion"
    }
    return (
        <header className="header-nav">
            <nav className="nav-menu">
                <div className="logo">
                    <img src="/logo.png" />
                    <p>HACKACADEMY</p>
                </div>
                <div className="auth-buttons">
                    <ul className="menu-items">
                        <li className="plan"><a href="#plus">Plus</a></li>
                        <li><a href="#inicio">Inicio</a></li>
                        <li><a href="#">Acerca de nosotros</a></li>
                    </ul>
                    <button className="register-btn" onClick={handleRegister}>Registrarse</button>
                    <button className="login-btn" onClick={handleInicio}>Iniciar Sesión</button>
                </div>
            </nav>
        </header>
    );
}
