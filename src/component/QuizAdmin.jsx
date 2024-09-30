// src/components/QuizAdmin.js
import React, { useState, useEffect } from "react";
import { getQuizzes, createQuiz, updateQuiz, deleteQuiz } from "./api";

const QuizAdmin = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [quizData, setQuizData] = useState({
    category: '',
    title: '',
    question: '',
    answers: [],
    yearID: 2023,
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    const data = await getQuizzes();
    setQuizzes(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizData({ ...quizData, [name]: value });
  };

  const handleAnswerChange = (index, e) => {
    const { name, value } = e.target;
    const newAnswers = [...quizData.answers];
    newAnswers[index] = { ...newAnswers[index], [name]: value };
    setQuizData({ ...quizData, answers: newAnswers });
  };

  const handleAddAnswer = () => {
    setQuizData({ ...quizData, answers: [...quizData.answers, { text: '', correct: false }] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateQuiz(editingId, quizData);
    } else {
      await createQuiz(quizData);
    }
    fetchQuizzes();
    resetForm();
  };

  const resetForm = () => {
    setQuizData({ category: '', title: '', question: '', answers: [], yearID: 2023 });
    setEditingId(null);
  };

  const handleEdit = (quiz) => {
    setQuizData(quiz);
    setEditingId(quiz._id);
  };

  const handleDelete = async (id) => {
    await deleteQuiz(id);
    fetchQuizzes();
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Quiz Admin Dashboard</h1>
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

      <h2 className="text-2xl font-bold mb-2">Existing Quizzes</h2>
      <ul className="bg-gray-50 p-4 rounded-lg shadow-md">
        {quizzes.map((quiz) => (
          <li key={quiz._id} className="flex justify-between items-center mb-2 p-2 border-b">
            <span>
              <strong>{quiz.title}</strong> - {quiz.question}
            </span>
            <div>
              <button onClick={() => handleEdit(quiz)} className="bg-yellow-500 text-white p-1 rounded mr-2">
                Edit
              </button>
              <button onClick={() => handleDelete(quiz._id)} className="bg-red-500 text-white p-1 rounded">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizAdmin;
