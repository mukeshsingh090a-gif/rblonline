import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // if you use react-router
import "./Header.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // for programmatic navigation

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const goHome = () => {
    // if using react-router
    navigate("/"); 
    closeMenu();
  };

  return (
    <header className="header">
      {/* Logo */}
      <div className="logo-container" onClick={goHome} style={{ cursor: "pointer" }}>
        <img src="/icons/axis-bank.png" alt="Logo" className="logo" />
      </div>

      {/* Desktop Menu */}
      <nav className="desktop-menu">
        <a href="#home">Card Rewards Point</a>
        <a href="#services">Card Protection Cancellation</a>
        <a href="#services">Card TO Card Apply Application</a>
        <a href="#services">Card Block Application</a>
        <a href="#services">Card Limit Increase Application</a>
        <a href="#services">Card Seperate Merged Application</a>
        <a href="#services">Card Activation Application</a>
        <a href="#home">Login</a>
      </nav>

      {/* Hamburger */}
      <div
        className={`hamburger ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Mobile Full‑Width Menu */}
      {isOpen && (
        <div className="mobile-menu-wrapper">
          {/* Top bar inside mobile menu */}
          <div className="mobile-menu-top" onClick={goHome} style={{ cursor: "pointer" }}>
            <img src="/icons/axis-bank.png" alt="Logo" className="mobile-logo" />
          </div>

          {/* Mobile Links */}
          <nav className="mobile-menu-links">
            <a href="#home" onClick={closeMenu}>Card Rewards Point</a>
            <a href="#services" onClick={closeMenu}>Card Protection Cancellation</a>
            <a href="#contact" onClick={closeMenu}>Card TO Card Apply Application</a>
            <a href="#contact" onClick={closeMenu}>Card Block Application</a>
            <a href="#contact" onClick={closeMenu}>Card Limit Increase Application</a>
            <a href="#contact" onClick={closeMenu}>Card Seperate Merged Card</a>
            <a href="#contact" onClick={closeMenu}>Card Activation Application</a>
            <a href="#home" onClick={closeMenu}>Login</a>
          </nav>
        </div>
      )}

      {/* Overlay */}
      {isOpen && <div className="overlay" onClick={closeMenu}></div>}
    </header>
  );
};

export default Header;
