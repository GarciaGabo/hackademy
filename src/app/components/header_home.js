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
                    <img src="/logo.png" />
                    <p>HACKACADEMY</p>
                </div>
                <div className="auth-buttons">
                    <ul className="menu-items">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Simuladores</a></li>
                        <li><a href="#">Mis cursos</a></li>
                        <li><a href="#" onClick={toggleMenu}><HiOutlineMenu size={18} /></a>
                            {isMenuOpen && (
                                <ul className="dropdown-menu">
                                    <li><a href="#">Perfil</a></li>
                                    <li><a href="#" onClick={handleLogout}>Cerrar Sesión</a></li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}
