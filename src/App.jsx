import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from "./component/Navbar";
import Home from './pages/Home';
import Quiz from './pages/Quiz_license';
import Quiz_eng from './pages/Quiz_eng';
import QuizResults from './pages/QuizResults';
import ForgotPassword from './component/Forgotpass';
import Admin from './component/QuizAdmin';
import Signup from './component/auth/SIgnup'; // Import the Auth component
import Login from './component/auth/Login';

const App = () => {
  const isAuthenticated = !!localStorage.getItem("user"); // Check if user is logged in

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz_license" element={isAuthenticated ? <Quiz /> : <Navigate to="/" />} />
        <Route path="/quiz_eng" element={isAuthenticated ? <Quiz_eng /> : <Navigate to="/" />} />
        <Route path="/quiz-results" element={isAuthenticated ? <QuizResults /> : <Navigate to="/" />} />
        <Route path="/forgot" element={isAuthenticated ? <ForgotPassword /> : <Navigate to="/" />} />
        <Route path="/admin" element={isAuthenticated ? <Admin /> : <Navigate to="/" />} />
        <Route path="/signup" element={<Signup />} /> {/* Add login route here */}
        <Route path="/login" element={<Login />} /> {/* Add login route here */}
      </Routes>
    </Router>
  );
};

export default App;
