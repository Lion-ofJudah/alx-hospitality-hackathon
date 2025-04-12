// src/components/Home.jsx
import React from 'react';
import '../styles/home.css'; // Import the CSS file for this component

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">Welcome to the Home Page</h1>
        <p className="home-description">
          Your gateway to explore our amazing platform. Discover, engage, and enjoy!
        </p>
        <button className="home-btn">Get Started</button>
      </div>
    </div>
  );
};

export default Home;
