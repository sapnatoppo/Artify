// src/components/Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Logo */}
        <div className="footer-logo">
          <h2>Artify</h2>
          <p>Inspire. Create. Share your world.</p>
          <p>Where imagination meets expression.</p>

        </div>

        {/* Contact */}
        <div className="footer-column">
          <h3>Contact</h3>
          <ul>
            <li>Phone: +91 99564 45560</li>
            <li>Email: info@artify.com</li>
            <li>123 Main Street, City</li>
          </ul>
        </div>

        {/* Info*/}
        <div className="footer-column">
          <h3>Information</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href='#'>Blog</a></li>
            <li><a href="#">About us</a></li>
            <li><a href='#'>Contact us</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Artify. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
