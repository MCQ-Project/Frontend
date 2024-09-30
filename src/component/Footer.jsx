import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 mt-8">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-white text-center md:text-left">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Er MCQ. All Rights Reserved.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
          {['/', '/quiz', '/quiz-results'].map((path, index) => (
            <Link
              key={index}
              to={path}
              className="text-white hover:text-gray-200 transition duration-300"
            >
              {path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
            </Link>
          ))}
          <Link
            to="/contact"
            className="text-white hover:text-gray-200 transition duration-300"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
