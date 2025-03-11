'use client';
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { loginWithEmailPassword, loginWithGoogle } from "@/app/lib/auth";
import "../../css/inicio_sesion.css";

export default function Registro() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        correo: '',
        contrasena: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        try {
            await loginWithEmailPassword(formData.correo, formData.contrasena);
            alert('Inicio de sesión exitoso');
            router.push('/screens/home');
        } catch (error) {
            setError('Error al iniciar sesión. Verifica tus datos e inténtalo de nuevo.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await loginWithGoogle();
            alert('Inicio de sesión con Google exitoso');
            router.push('/screens/home');
        } catch (error) {
            setError('Error al iniciar sesión con Google. Por favor, inténtalo nuevamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="inicio-container">
            <h2 className="titulo">Inicio de Sesión</h2>
            {error && <div className="error-message" aria-live="polite">{error}</div>}
            
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

                <button 
                    type="submit" 
                    className="btn-submit" 
                    disabled={isLoading}
                >
                    {isLoading ? 'Cargando...' : 'Iniciar sesión'}
                </button>

                <button 
                    className="btn-google" 
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                >
                    <img src="/google.svg" alt="Google logo" className="google-logo" />
                    {isLoading ? 'Cargando...' : 'Iniciar sesión con Google'}
                </button>
            </form>
        </div>
    );
}
