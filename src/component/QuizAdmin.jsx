import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const QuizAdmin = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [quizResults, setQuizResults] = useState([]);
  const [quizData, setQuizData] = useState({
    category: '',
    title: '',
    question: '',
    answers: [],
    yearID: 2023,
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchQuizzes(); // Fetch quizzes when component mounts
    fetchQuizResults(); // Fetch quiz results when component mounts
  }, []);

  // Fetch all quizzes
  const fetchQuizzes = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/quiz/quizzes");
      setQuizzes(response.data);
    } catch (error) {
      toast.error("Failed to fetch quizzes.");
    }
  };

  // Fetch all quiz results
  const fetchQuizResults = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/quizresult/");
      setQuizResults(response.data);
    } catch (error) {
      toast.error("Failed to fetch quiz results.");
    }
  };

  // Handle input change for quiz data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizData({ ...quizData, [name]: value });
  };

  // Handle answer input change
  const handleAnswerChange = (index, e) => {
    const { name, value } = e.target;
    const newAnswers = [...quizData.answers];
    newAnswers[index] = { ...newAnswers[index], [name]: value };
    setQuizData({ ...quizData, answers: newAnswers });
  };

  // Add a new answer field
  const handleAddAnswer = () => {
    setQuizData({ ...quizData, answers: [...quizData.answers, { text: '', correct: false }] });
  };

  // Submit the form (create or update quiz)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update quiz
        await axios.put(`http://localhost:8081/api/quiz/quizzes/${editingId}`, quizData);
        toast.success("Quiz updated successfully!");
      } else {
        // Create new quiz
        await axios.post("http://localhost:8081/api/quiz/quizzes", quizData);
        toast.success("Quiz created successfully!");
      }
      fetchQuizzes();
      resetForm();
    } catch (error) {
      toast.error("Error while saving quiz.");
    }
  };

  // Reset the form after submission or cancel
  const resetForm = () => {
    setQuizData({ category: '', title: '', question: '', answers: [], yearID: 2023 });
    setEditingId(null);
  };

  // Handle editing a quiz (populate the form with quiz data)
  const handleEdit = (quiz) => {
    setQuizData(quiz);
    setEditingId(quiz._id);
  };

  // Handle deleting a quiz
  const handleDeleteQuiz = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/quiz/quizzes/${id}`);
      toast.success("Quiz deleted successfully!");
      fetchQuizzes();
    } catch (error) {
      toast.error("Error while deleting quiz.");
    }
  };

  // Handle deleting a quiz result
  const handleDeleteQuizResult = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/quizresult/${id}`);
      toast.success("Quiz result deleted successfully!");
      fetchQuizResults();
    } catch (error) {
      toast.error("Error while deleting quiz result.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 to-pink-400 p-6">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-4 mt-10">Quiz Admin Dashboard</h1>

      {/* Form to create/update quiz */}
      <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
        <input
          type="text"
          name="category"
          value={quizData.category}
          onChange={handleChange}
          placeholder="Category"
          required
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="title"
          value={quizData.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="question"
          value={quizData.question}
          onChange={handleChange}
          placeholder="Question"
          required
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
        />

        {quizData.answers.map((answer, index) => (
          <div key={index} className="flex items-center mb-4">
            <input
              type="text"
              name="text"
              value={answer.text}
              onChange={(e) => handleAnswerChange(index, e)}
              placeholder="Answer"
              required
              className="block w-full p-2 border border-gray-300 rounded"
            />
            <label className="ml-2">
              <input
                type="checkbox"
                name="correct"
                checked={answer.correct}
                onChange={(e) => {
                  const newAnswers = [...quizData.answers];
                  newAnswers[index].correct = e.target.checked;
                  setQuizData({ ...quizData, answers: newAnswers });
                }}
              />
              Correct
            </label>
          </div>
        ))}
        <button type="button" onClick={handleAddAnswer} className="bg-blue-500 text-white p-2 rounded mr-2">
          Add Answer
        </button>
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          {editingId ? "Update" : "Create"} Quiz
        </button>
      </form>

      {/* Table displaying quizzes */}
      <h2 className="text-2xl font-bold mb-2">Existing Quizzes</h2>
      <table className="min-w-full bg-white rounded-lg shadow-md mb-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Question</th>
            <th className="p-3 text-left">Year</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz) => (
            <tr key={quiz._id} className="border-b">
              <td className="p-3">{quiz.title}</td>
              <td className="p-3">{quiz.category}</td>
              <td className="p-3">{quiz.question}</td>
              <td className="p-3">{quiz.yearID}</td>
              <td className="p-3">
                <button
                  onClick={() => handleEdit(quiz)}
                  className="bg-yellow-500 text-white p-1 rounded mr-2">
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteQuiz(quiz._id)}
                  className="bg-red-500 text-white p-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Table displaying quiz results */}
      <h2 className="text-2xl font-bold mb-2">Quiz Results</h2>
      <table className="min-w-full bg-white rounded-lg shadow-md mb-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 text-left">User</th>
            <th className="p-3 text-left">Quiz</th>
            <th className="p-3 text-left">Score</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {quizResults.map((result) => (
            <tr key={result._id} className="border-b">
              <td className="p-3">{result?.user?.name || "Unknown User"}</td>
              <td className="p-3">{result?.quiz?.title || "Unknown Quiz"}</td>
              <td className="p-3">{result.score}</td>
              <td className="p-3">{new Date(result.date).toLocaleDateString()}</td>
              <td className="p-3">
                <button
                  onClick={() => handleDeleteQuizResult(result._id)}
                  className="bg-red-500 text-white p-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuizAdmin;
