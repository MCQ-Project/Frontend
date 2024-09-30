import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./component/Navbar";
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import QuizResults from './pages/QuizResults';
import ForgotPassword from './component/Forgotpass';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quiz-results" element={<QuizResults />} />
        <Route path="/forgot" element={<ForgotPassword/>} />
      </Routes>
    </Router>
  );
};

export default App;
