import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Banner = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleGetStarted = () => {
    navigate("/quiz_eng"); // Navigate to the Quiz page
  };

  return (
    <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white p-12 text-center overflow-hidden">
      <h1 className="text-4xl font-bold mb-4 mt-12 transition-transform transform hover:scale-105">Welcome to Er MCQ</h1>
      <p className="text-lg mb-6">Your ultimate platform for practicing quizzes and improving knowledge.</p>
      <button 
        onClick={handleGetStarted} 
        className="bg-white text-blue-500 font-semibold px-6 py-2 rounded hover:bg-gray-200 transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        Get Started
      </button>

      {/* Decorative element (optional) */}
      <div className="absolute inset-0 bg-opacity-25 bg-white rounded-lg transform scale-125 -z-10"></div>
    </div>
  );
};

export default Banner;
