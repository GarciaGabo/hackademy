import { useState, useRef, useEffect, useCallback } from "react";
import { HiUserCircle } from "react-icons/hi";
import "../css/chatbot.css";

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "¡Hola! ¿En qué puedo ayudarte?", sender: "bot" },
    ]);
    const [userInput, setUserInput] = useState("");
    const messagesEndRef = useRef(null);

    const toggleChatbot = () => setIsOpen(!isOpen);

    const handleSendMessage = useCallback(() => {
        if (!userInput.trim()) return;

        const userMessage = { text: userInput, sender: "user" };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setUserInput("");

        setTimeout(() => {
            const botResponses = [
                "¡Interesante! Cuéntame más.",
                "Voy a procesar tu solicitud...",
                "¿Puedes ser más específico?",
                "Déjame revisar la información.",
            ];
            const botMessage = { text: botResponses[Math.floor(Math.random() * botResponses.length)], sender: "bot" };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        }, 1000);
    }, [userInput]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="chat-div">
            <button className="chatbot-icon" onClick={toggleChatbot} aria-label="Abrir chatbot">
                <img src="/chatbot.jpeg" alt="Chatbot" />
            </button>

            <div className={`chatbot-container ${isOpen ? "open" : "closed"}`}>
                <div className="chatbot-header">
                    <span>SeguriBot</span>
                </div>

                <div className="messages-container">
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.sender}`}>
                            {message.sender === "user" ? (
                                <HiUserCircle size={30} className="message-icon user" />
                            ) : (
                                <img src="/chatbot.jpeg" alt="Chatbot" className="message-icon bot" />
                            )}
                            <p>{message.text}</p>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <div className="input-container">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Escribe tu mensaje..."
                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <button onClick={handleSendMessage}>Enviar</button>
                </div>
            </div>
        </div>
    );
};
