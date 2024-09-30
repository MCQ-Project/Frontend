import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 shadow-lg fixed w-full z-10">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-white hover:text-gray-200 transition duration-300">
          Er MCQ
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {['/', '/quiz', '/quiz-results'].map((path, index) => (
            <Link
              key={index}
              to={path}
              className="text-white hover:text-gray-200 transition duration-300 relative group"
            >
              {path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            className="text-white hover:text-gray-200"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="md:hidden flex flex-col mt-4 space-y-2 bg-white rounded shadow-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.5 }} // Adjust duration for speed
        >
          {['/', '/quiz', '/quiz-results'].map((path, index) => (
            <Link
              key={index}
              to={path}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-300"
              onClick={() => setMobileMenuOpen(false)} // Close menu on link click
            >
              {path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
            </Link>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
