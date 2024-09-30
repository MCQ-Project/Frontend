import React, { useState, useEffect } from 'react';

const Quiz = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  
  // Fetching quiz data from the API
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/quiz/quizzes');
        const data = await response.json();
        console.log("Quiz data fetched successfully:", data);
        setQuizData(data);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };
    fetchQuizData();
  }, []);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handleSubmitResults = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/quizresult/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          score: score,
          totalQuestions: quizData.length,
          // Add any other relevant data here
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      console.log("Quiz results submitted successfully:", result);
    } catch (error) {
      console.error("Error submitting quiz results:", error);
    }
  };

  if (isQuizCompleted) {
    handleSubmitResults(); // Submit results when the quiz is completed
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold mb-4">Your Score: {score} out of {quizData.length}</h2>
        <button
          onClick={() => window.location.reload()}
          className="p-4 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
        >
          Play Again
        </button>
      </div>
    );
  }

  if (!quizData.length) return <div>Loading...</div>;

  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-purple-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <h2 className="text-lg font-bold mb-4">
          {currentQuestion.question}
        </h2>
        <ul className="space-y-4">
          {currentQuestion.answers.map((answer, index) => (
            <li key={index} className="p-4 bg-purple-200 rounded-lg">
              <button
                onClick={() => handleAnswer(answer.correct)}
                className="w-full text-left"
              >
                {answer.text}
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <p className="text-gray-600">
            Question {currentQuestionIndex + 1} of {quizData.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
