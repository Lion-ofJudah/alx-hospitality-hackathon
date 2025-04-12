// src/components/NavBar.jsx
import React, { useState } from 'react';
import '../styles/navbar.css'; // Import the CSS file for this component

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <a href="/" className="logo-link">Kuriftu</a>
        </div>
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item"><a href="/" className="nav-link">Home</a></li>
            <li className="nav-item"><a href="/dashboard" className="nav-link">Dashboard</a></li>
            <li className="nav-item"><a href="/feedback" className="nav-link">Feedback</a></li>
          </ul>
        </div>
        <div className="menu-icon" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
