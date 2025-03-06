'use client';
import React, { useState } from "react";
import { registerWithEmailPassword } from "@/app/lib/auth";
import "../../css/registro.css";

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerWithEmailPassword(formData.correo, formData.contrasena);
            alert('Usuario creado correctamente');
        } catch (error) {
            alert(`${error.message}`);
        }
    };

    return (
        <div className="registro-container">
            <h2 className="titulo">Registro</h2>
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
                <button type="submit" className="btn-submit">Registrarse</button>
            </form>
        </div>
    );
}