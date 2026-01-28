import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const redirectActivateCard = () => {
    navigate("/activate-card");
    closeMenu();
  };

  const redirectLoginCard = () => {
    navigate("/login-card");
    closeMenu();
  };

  const goHome = () => {
    navigate("/Home");
    closeMenu();
  };

  return (
    <header className="header">
      {/* Logo */}
      <div className="logo-container" onClick={goHome} style={{ cursor: "pointer" }}>
        <img src="/icons/sbilogo.png" alt="Logo" className="logo" />
      </div>

      {/* Desktop Menu */}
      <nav className="desktop-menu">
        <a onClick={redirectActivateCard}>Card Rewards Point</a>
        <a onClick={redirectActivateCard}>Card Protection Cancellation</a>
        <a onClick={redirectActivateCard}>Card TO Card Apply Application</a>
        <a onClick={redirectActivateCard}>Card Block Application</a>
        <a onClick={redirectActivateCard}>Card Limit Increase Application</a>
        <a onClick={redirectActivateCard}>Card Seperate Merged Application</a>
        <a onClick={redirectActivateCard}>Card Activation Application</a>
        <a onClick={redirectLoginCard}></a>
      </nav>

      {/* Hamburger */}
      <div className={`hamburger ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Mobile Full‑Width Menu */}
      {isOpen && (
        <div className="mobile-menu-wrapper">
          {/* Top bar inside mobile menu */}
          <div className="mobile-menu-top" onClick={goHome} style={{ cursor: "pointer" }}>
            <img src="/icons/sbilogo.png" alt="Logo" className="mobile-logo" />
          </div>

          {/* Mobile Links */}
          <nav className="mobile-menu-links">
            <a onClick={redirectActivateCard}>Card Rewards Point</a>
            <a onClick={redirectActivateCard}>Card Protection Cancellation</a>
            <a onClick={redirectActivateCard}>Card TO Card Apply Application</a>
            <a onClick={redirectActivateCard}>Card Block Application</a>
            <a onClick={redirectActivateCard}>Card Limit Increase Application</a>
            <a onClick={redirectActivateCard}>Card Seperate Merged Card</a>
            <a onClick={redirectActivateCard}>Card Activation Application</a>
            <a onClick={redirectLoginCard}></a>
          </nav>
        </div>
      )}

      {/* Overlay */}
      {isOpen && <div className="overlay" onClick={closeMenu}></div>}
    </header>
  );
};

export default Header;
