// src/api.js
const BASE_URL = "http://localhost:8081/api/quiz/quizzes";

export const getQuizzes = async () => {
  const response = await fetch(BASE_URL);
  return response.json();
};

export const createQuiz = async (quizData) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quizData),
  });
  return response.json();
};

export const updateQuiz = async (id, quizData) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quizData),
  });
  return response.json();
};

export const deleteQuiz = async (id) => {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
};
