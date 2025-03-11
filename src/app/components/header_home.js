import { useState } from 'react';
import React from "react";
import { logout } from '../lib/auth';
import { HiOutlineMenu } from "react-icons/hi";
import "../css/header_home.css";

export default function Header_home() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = async () => {
        try {
            await logout();
            window.location.href = '/';
        } catch (error) {
            alert(`Error al cerrar sesión: ${error.message}`);
        }
    };

    return (
        <header className="header-nav">
            <nav className="nav-menu">
                <div className="logo">
                    <div className="logoContainer">
                        <img src="/logo.png" alt="logo" />
                        <p>HACKACADEMY</p>
                    </div>
                    <div className="hamburger" onClick={toggleMenu}>
                        <HiOutlineMenu size={24} />
                    </div>
                </div>
                <div className="menu">
                    <ul className={`menu-items ${isMenuOpen ? 'active' : ''}`}>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Simuladores</a></li>
                        <li><a href="#">Mis cursos</a></li>
                        <li><a href="#">Perfil</a></li>
                        <li>
                            <a className='register-btn' onClick={handleLogout}>Cerrar Sesión</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}
