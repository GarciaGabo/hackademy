"use client";
import React from "react";
import "../../css/inicio.css";
import Header_inicio from "@/app/components/header_inicio";
import Footer from "@/app/components/footer";
import ChatBot from "@/app/components/chatbot";

const plans = [
  { title: "Principiante", price: "$216 MXN/mes", benefitsCount: 1 },
  { title: "Intermedio", price: "$216 MXN/mes", benefitsCount: 2 },
  { title: "Avanzado", price: "$216 MXN/mes", benefitsCount: 3 },
  { title: "Experto", price: "$216 MXN/mes", benefitsCount: 4 }
];

const benefits = [
  "Contenido profesional y actualizado con certificados digitales",
  "Certificados físicos para las rutas de aprendizaje profesional",
  "Acceso a las escuelas de Startups, Inglés y liderazgo",
  "Eventos exclusivos",
  "Descarga contenido en la app móvil"
];

export default function Inicio() {
  return (
    <div className="page">
      <Header_inicio />
      <div className="nosotros" id="inicio">
        <div className="contenido">
          <h3>La escuela de Cyberseguridad Latinoamérica</h3>
          <p>Millones de estudiantes y empresas aprenden en Hack Academy</p>
        </div>
        <div className="galeria">
          <img src="/galeria1.jpg" />
          <img src="/galeria2.jpg" />
          <img src="/galeria3.jpg" />
          <img src="/galeria4.jpg" />
        </div>
      </div>
      <div className="group_card" id="plus">
        {plans.map((plan, index) => (
          <div className="card" key={index}>
            <h2>{plan.title}</h2>
            <p>{plan.price}</p>
            <ul>
              {benefits.slice(0, plan.benefitsCount).map((benefit, i) => (
                <li key={i}>{benefit}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="sucribete">
        <button type="submit">Suscribete</button>
      </div>
      <Footer />
      <ChatBot />
    </div>
  );
}
