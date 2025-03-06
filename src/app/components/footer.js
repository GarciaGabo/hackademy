import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import "../css/footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-links">
                <p>Privacidad</p>
                <p>Términos y Condiciones</p>
                <p>Contacto</p>
            </div>
            <div className="social-icons">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="icon facebook">
                    <FaFacebookF />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="icon twitter">
                    <FaTwitter />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="icon instagram">
                    <FaInstagram />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="icon linkedin">
                    <FaLinkedinIn />
                </a>
            </div>
        </footer>
    );
}
