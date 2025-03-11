"use client";
import React, { useState } from "react";
import { useAuthState } from "@/app/lib/auth";
import Carrusel from "@/app/components/carrusel";
import Header_home from "@/app/components/header_home";
import "../../css/home.css";
import Footer from "@/app/components/footer";
import ChatBot from "@/app/components/chatbot";

export default function Home() {
    const user = useAuthState();
    const cursos = [
        { id: 1, nombre: "Fundamentos de Seguridad", progreso: 80 },
        { id: 2, nombre: "Cyberseguridad", progreso: 45 },
        { id: 3, nombre: "Cyberseguridad II", progreso: 25 },
    ];

    const benefits = [
        "Contenido profesional y actualizado con certificados digitales",
        "Certificados físicos para las rutas de aprendizaje profesional",
        "Acceso a las escuelas de Startups, Inglés y liderazgo",
        "Eventos exclusivos",
        "Descarga contenido en la app móvil"
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextCurso = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cursos.length);
    };

    const prevCurso = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + cursos.length) % cursos.length
        );
    };

    const cursoActual = cursos[currentIndex];
    const [firstName] = user ? user.displayName.split(" ") : [""];

    return (
        <div className="page">
            <Header_home />
            <div className="recomendaciones">
                <h1>Podría interesarte {user ? firstName : ""} :</h1>
                <Carrusel />
            </div>
            <div className="beneficios">
                <h1>Beneficios Premium</h1>
                <ul>
                    {benefits.map((benefit, i) => (
                        <li key={i}>{benefit}</li>
                    ))}
                </ul>
            </div>
            <div className="progreso">
                <h1>Progreso de los cursos</h1>
                <div className="curso">
                    <h2>{cursoActual.nombre}</h2>
                    <p>{cursoActual.progreso}% completado</p>
                    <div className="barra">
                        <span
                            style={{
                                width: `${cursoActual.progreso}%`,
                            }}
                        ></span>
                    </div>
                    <div className="carousel-controls">
                        <button className="prev-btn" onClick={prevCurso}>Anterior</button>
                        <button className="button-continuar">Iniciar curso</button>
                        <button className="next-btn" onClick={nextCurso}>Siguiente</button>
                    </div>
                </div>
            </div>
            <Footer />
            <ChatBot />
        </div>
    );
}
