import { useState, useRef, useEffect, useCallback } from "react";
import { HiUserCircle } from "react-icons/hi";
import "../css/chatbot.css";

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "¡Hola! Soy SeguriBot. ¿Cómo puedo ayudarte con ciberseguridad hoy?", sender: "bot" },
    ]);
    const [userInput, setUserInput] = useState("");
    const messagesEndRef = useRef(null);

    const keywords = ["ciberseguridad", "seguridad", "hackers", "phishing", "malware", "firewall", "datos", "contraseñas", "encriptación"];

    const toggleChatbot = () => setIsOpen(!isOpen);

    const handleSendMessage = useCallback(() => {
        if (!userInput.trim()) return;

        const userMessage = { text: userInput, sender: "user" };
        const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;

        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setUserInput("");

        const containsCybersecurityKeywords = keywords.some((keyword) => userInput.toLowerCase().includes(keyword));

        if (!containsCybersecurityKeywords) {
            const errorMessage = {
                text: "Lo siento, solo puedo responder preguntas sobre ciberseguridad. ¿Tienes alguna pregunta relacionada?",
                sender: "bot",
            };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
            return;
        }

        setTimeout(() => {
            fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "deepseek/deepseek-r1:free",
                    messages: [{ role: "user", content: userInput + 'responde en español' }],
                })
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    const errorMessage = {
                        text: "Lo siento, ocurrió un error en el servidor. Por favor, intenta de nuevo más tarde.",
                        sender: "bot",
                    };
                    setMessages((prevMessages) => [...prevMessages, errorMessage]);
                } else if (data.choices && data.choices.length > 0) {
                    const botMessage = {
                        text: convertMarkdownToPlainText(data.choices[0].message.content),
                        sender: "bot",
                    };
                    setMessages((prevMessages) => [...prevMessages, botMessage]);
                } else {
                    const errorMessage = {
                        text: "Lo siento, no pude obtener una respuesta adecuada. ¿Puedes reformular tu pregunta?",
                        sender: "bot",
                    };
                    setMessages((prevMessages) => [...prevMessages, errorMessage]);
                }
            })
            .catch((error) => {
                console.error("Error al obtener la respuesta del bot:", error);
                const errorMessage = {
                    text: "Lo siento, hubo un error al procesar tu mensaje. Intenta nuevamente o reformula tu pregunta.",
                    sender: "bot"
                };
                setMessages((prevMessages) => [...prevMessages, errorMessage]);
            });
        }, 1000);
    }, [userInput]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const convertMarkdownToPlainText = (markdownText) => {
        return markdownText
            .replace(/\*\*(.*?)\*\*/g, '$1')
            .replace(/__(.*?)__/g, '$1')
            .replace(/~~(.*?)~~/g, '$1')
            .replace(/`(.*?)`/g, '$1')
            .replace(/^### (.*?)$/gm, '$1')
            .replace(/^## (.*?)$/gm, '$1')
            .replace(/^# (.*?)$/gm, '$1')
            .replace(/!\[.*?\]\(.*?\)/g, '')
            .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
            .replace(/\*/g, '$1')
            .trim();
    };

    return (
        <div className="chat-div">
            <button className="chatbot-icon" onClick={toggleChatbot} aria-label="Abrir chatbot de ciberseguridad">
                <img src="/chatbot.jpeg" alt="Chatbot" />
            </button>

            <div className={`chatbot-container ${isOpen ? "open" : "closed"}`}>
                <div className="chatbot-header">
                    <span>SeguriBot - Ciberseguridad</span>
                </div>

                <div className="messages-container" aria-live="polite">
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
                        placeholder="Escribe tu pregunta sobre ciberseguridad..."
                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <button onClick={handleSendMessage}>Enviar</button>
                </div>
            </div>
        </div>
    );
};
