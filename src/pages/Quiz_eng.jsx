import React, { useState, useEffect } from 'react';
import Modal from './Modal'; // Import the Modal component
import { toast } from 'react-toastify'; // Import toast

const Quiz = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [userName, setUserName] = useState('John Doe'); // Placeholder for user's name
  const [feedback, setFeedback] = useState(''); // Feedback state
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/quiz/quizzes');
        const data = await response.json();
        const filteredData = data.filter(quiz => quiz.category === 'EngineeringEntrance');
        setQuizData(filteredData);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };
    fetchQuizData();
  }, []);

  const handleAnswer = (isCorrect, index) => {
    setSelectedAnswerIndex(index);
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswerIndex(null);
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizCompleted(true);
      toast.info("Quiz completed! Please provide your feedback."); // Notify user
    }
  };

  const handleSubmitResults = async () => {
    const percentage = (score / quizData.length) * 100;
    try {
      const response = await fetch('http://localhost:8081/api/quizresult/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName,
          category: 'EngineeringEntrance',
          attemptedQuestions: quizData.length,
          correctAnswers: score,
          percentage: percentage.toFixed(2),
          feedback: feedback || "Well done! Keep practicing."
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      console.log("Quiz results submitted successfully:", result);
      toast.success("Quiz results submitted successfully!"); // Show success toast
    } catch (error) {
      console.error("Error submitting quiz results:", error);
      toast.error("Failed to submit quiz results. Please try again."); // Show error toast
    }
  };

  useEffect(() => {
    if (isQuizCompleted) {
      setIsModalOpen(true); // Open modal when quiz is completed
    }
  }, [isQuizCompleted]);

  const handleModalSubmit = () => {
    handleSubmitResults(); // Submit results when modal form is submitted
  };

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
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleModalSubmit}
          userName={userName}
          setUserName={setUserName}
          feedback={feedback}
          setFeedback={setFeedback}
        />
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
                  disabled={selectedAnswerIndex !== null}
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
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              {currentQuestion.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
