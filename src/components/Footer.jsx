import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Logo */}
      <div className="footer-logo">
        <img src="/icons/sbilogo.png" alt="Logo" />
      </div>

      {/* Description */}
      <p className="footer-description">
        Your data is protected with industry-standard encryption and secure protocols.
      </p>

      {/* Footer Links */}
      <div className="footer-links">
        <a href="#terms">Terms & Conditions</a>
        <a href="#policy">Policy</a>
        <a href="#support">Help & Support</a>
      </div>

      {/* Bottom Text */}
      <div className="footer-bottom">
        &copy; 2026 All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
