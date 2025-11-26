import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">

        <div className="footer-section">
          <h2 className="footer-logo">TechSpeed</h2>
          <p className="footer-text">
            Логістичні операції по всій мережі м. Київ
          </p>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Навігація</h3>
          <ul className="footer-links">
            <li>Головна</li>
            <li>Логістика</li>
            <li>Історія операцій</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Контакти</h3>
          <p>Пошта: info@logistics.com</p>
          <p>Телефон: +1 (555) 123-4567</p>
          <p>Address: вул. Хрещатик, буд. 10, м. Київ</p>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Підпишіться на нас</h3>
          <div className="social-icons">
            <span>🌐</span>
            <span>💼</span>
            <span>✉️</span>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} TechSpeed. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
