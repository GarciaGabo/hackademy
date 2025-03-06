'use client';
import React, { useState } from "react";
import { loginWithEmailPassword, loginWithGoogle } from "@/app/lib/auth";
import "../../css/inicio_sesion.css";

export default function Registro() {
    const [formData, setFormData] = useState({
        correo: '',
        contrasena: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await loginWithEmailPassword(formData.correo, formData.contrasena);
            console.log("Usuario ha iniciado sesión");
            alert('Inicio de sesión exitoso');
            window.location.href = "/screens/home";
        } catch (error) {
            alert(`Error al iniciar sesión: ${error.message}`);
        }
    };

    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        try {
            await loginWithGoogle();
            alert('Inicio de sesión con Google exitoso');
            window.location.href = "/screens/home";
        } catch (error) {
            alert(`Error al iniciar sesión con Google: ${error.message}`);
        }
    };

    return (
        <div className="inicio-container">
            <h2 className="titulo">Inicio de Sesión</h2>
            <form onSubmit={handleSubmit} className="formulario">
                <div className="input-group">
                    <label htmlFor="correo" className="label">Correo electrónico</label>
                    <input
                        type="email"
                        id="correo"
                        name="correo"
                        value={formData.correo}
                        onChange={handleInputChange}
                        required
                        className="input"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="contrasena" className="label">Contraseña</label>
                    <input
                        type="password"
                        id="contrasena"
                        name="contrasena"
                        value={formData.contrasena}
                        onChange={handleInputChange}
                        required
                        className="input"
                    />
                </div>
                <button type="submit" className="btn-submit">Iniciar sesión</button>
                <button className="btn-google" onClick={handleGoogleLogin}>
                    <img src="/google.svg" alt="Google logo" className="google-logo" />Iniciar sesión con Google
                </button>
            </form>
        </div>
    );
}
