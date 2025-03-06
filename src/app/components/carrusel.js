import React, { useState, useEffect } from "react";
import "../css/carrusel.css";

export default function Carrusel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const items = [
        { 
            id: 1, 
            title: "Fundamentos de Seguridad", 
            description: "Conceptos esenciales sobre la protección de datos, sistemas y redes.", 
            image: "/recomendacion1.png" 
        },
        { 
            id: 2, 
            title: "Cyberseguridad", 
            description: "Principios básicos para proteger información y prevenir ataques cibernéticos.", 
            image: "/recomendacion1.jpg" 
        },
        { 
            id: 3, 
            title: "Cyberseguridad II", 
            description: "Estrategias avanzadas de defensa contra amenazas y vulnerabilidades.", 
            image: "/galeria1.jpg" 
        },
        { 
            id: 4, 
            title: "Cyberseguridad III", 
            description: "Técnicas y herramientas especializadas en seguridad informática.", 
            image: "/galeria2.jpg" 
        }
    ];    

    const nextItem = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    const prevItem = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextItem();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <button onClick={prevItem} className="prev-btn">{"<"}</button>
            <div className="carrusel-container">
                <div className="carrusel-slides" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {items.map((item) => (
                        <div key={item.id} className="carrusel-item">
                            <img src={item.image} alt={item.title} className="carrusel-image" />
                            <div className="carrusel-text">
                                <h2>{item.title}</h2>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button onClick={nextItem} className="next-btn">{">"}</button>
        </div>
    );
}
