import React, { useState, useEffect } from 'react';

const Quiz = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null); // Track the selected answer index

  // Fetching quiz data from the API
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/quiz/quizzes');
        const data = await response.json();
        console.log("Quiz data fetched successfully:", data);
        const filteredData = data.filter(quiz => quiz.category === 'License');
        setQuizData(filteredData);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };
    fetchQuizData();
  }, []);

  const handleAnswer = (isCorrect, index) => {
    setSelectedAnswerIndex(index); // Set the selected answer index
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswerIndex(null); // Reset selected answer index for the next question
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

  useEffect(() => {
    if (isQuizCompleted) {
      handleSubmitResults(); // Submit results when the quiz is completed
    }
  }, [isQuizCompleted]);

  if (isQuizCompleted) {
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
    <div className="flex flex-col items-center justify-center h-screen bg-purple-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <h2 className="text-lg font-bold mb-4">{currentQuestion.question}</h2>
        <p className="text-gray-700 mb-4"><strong>Category:</strong> {currentQuestion.category}</p>
        <ul className="space-y-4">
          {currentQuestion.answers.map((answer, index) => {
            let bgColor = '';
            if (selectedAnswerIndex !== null) {
              if (selectedAnswerIndex === index && answer.correct) {
                bgColor = 'bg-green-200'; // Correct answer
              } else if (selectedAnswerIndex === index && !answer.correct) {
                bgColor = 'bg-red-200'; // Incorrect answer
              } else if (answer.correct) {
                bgColor = 'bg-green-100'; // Show correct answer if selected answer was wrong
              }
            }
            return (
              <li key={index} className={`p-4 rounded-lg ${bgColor}`}>
                <button
                  onClick={() => handleAnswer(answer.correct, index)}
                  className="w-full text-left"
                  disabled={selectedAnswerIndex !== null} // Disable buttons after an answer is selected
                >
                  {answer.text}
                </button>
              </li>
            );
          })}
        </ul>
        {selectedAnswerIndex !== null && (
          <div className="mt-4">
            <button
              onClick={handleNextQuestion}
              className="p-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
            >
              Next
            </button>
          </div>
        )}
        <div className="mt-4">
          <p className="text-gray-600">Question {currentQuestionIndex + 1} of {quizData.length}</p>
        </div>
        {selectedAnswerIndex !== null && (
          <div className="mt-4 p-4 border rounded bg-gray-100">
            <h3 className="font-semibold">Explanation:</h3>
            <p>{currentQuestion.explanation}</p> {/* Display explanation here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
