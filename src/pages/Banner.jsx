import React from 'react';

const Banner = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-12 text-center">
      <h1 className="text-4xl font-bold mb-4 mt-12">Welcome to Er MCQ</h1>
      <p className="text-lg mb-6">Your ultimate platform for practicing quizzes and improving knowledge.</p>
      <button className="bg-white text-blue-500 font-semibold px-6 py-2 rounded hover:bg-gray-200 transition">
        Get Started
      </button>
    </div>
  );
};

export default Banner;
