// src/components/Feedback.jsx
import React, { useState } from 'react';
import '../styles/feedback.css'; // Import the CSS file for this component

const Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const [category, setCategory] = useState('');

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div className="feedback-container">
      <div className="feedback-card">
        <h1 className="feedback-title">Give Us Your Feedback</h1>
        <p className="feedback-description">
          We value your opinion. Please share your thoughts with us!
        </p>

        {/* Dropdown for Category Selection */}
        <div className="feedback-category">
          <label htmlFor="category" className="category-label">Select Category:</label>
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
            className="feedback-dropdown"
          >
            <option value="" disabled>Select a category</option>
            <option value="food">Food</option>
            <option value="service">Service</option>
            <option value="room">Room</option>
            <option value="water">Water</option>
            <option value="transportation">Transportation</option>
            <option value="games">Games</option>
          </select>
        </div>

        {/* Feedback Textarea */}
        <textarea
          value={feedback}
          onChange={handleFeedbackChange}
          className="feedback-textarea"
          placeholder="Type your feedback here..."
        ></textarea>
        
        <button className="feedback-btn">Submit Feedback</button>
      </div>
    </div>
  );
};

export default Feedback;
