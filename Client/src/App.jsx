// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Components
import Navbar from './Component/Navbar';
import Home from './pages/Home';
import Feedback from './pages/Feedback';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar /> {/* Use the Navbar component */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
