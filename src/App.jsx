import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./component/Navbar";
import Home from './pages/Home';
import Quiz from './pages/Quiz_license';
import Quiz_eng from './pages/Quiz_eng';
import QuizResults from './pages/QuizResults';
import ForgotPassword from './component/Forgotpass';
import Admin from './component/QuizAdmin';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz_license" element={<Quiz />} />
        <Route path="/quiz_eng" element={<Quiz_eng />} />
        <Route path="/quiz-results" element={<QuizResults />} />
        <Route path="/forgot" element={<ForgotPassword/>} />
        <Route path="/admin" element={<Admin/>} />
      </Routes>
    </Router>
  );
};

export default App;
