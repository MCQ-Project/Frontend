import React, { useEffect, useState } from 'react';

const QuizPanel = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/quizresult');
        const data = await response.json();
        setQuizData(data);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchQuizData();
  }, []);

  const handleAnswerClick = (isCorrect) => {
    setUserAnswers([...userAnswers, isCorrect]);
    if (isCorrect) setScore(score + 1);
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  const renderQuestion = () => {
    const question = quizData[currentQuestionIndex];

    // Check if question exists
    if (!question) {
      return <p>Loading question...</p>;
    }

    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">{question.title}</h2>
        <p className="text-lg mb-2">{question.question}</p>
        <div className="space-y-2">
          {question.answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(answer.correct)}
              className="w-full bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 transition duration-300"
            >
              {answer.text}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderResult = () => {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
        <p className="text-lg">Your score: {score} out of {quizData.length}</p>
        <button
          onClick={() => {
            setShowResult(false);
            setCurrentQuestionIndex(0);
            setUserAnswers([]);
            setScore(0);
          }}
          className="mt-4 bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 transition duration-300"
        >
          Restart Quiz
        </button>
      </div>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      {showResult ? renderResult() : quizData.length > 0 ? renderQuestion() : <p>Loading...</p>}
    </div>
  );
};

export default QuizPanel;
