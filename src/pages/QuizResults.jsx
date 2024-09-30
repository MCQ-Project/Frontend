import React, { useState, useEffect } from 'react';

const QuizResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizResults = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/quizresult');
        if (!response.ok) {
          throw new Error('Failed to fetch quiz results');
        }
        const data = await response.json();
        setResults(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizResults();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-3xl font-bold">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-3xl font-bold text-red-500">{error}</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6">Your Quiz Results</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        {results.length === 0 ? (
          <p>No results available.</p>
        ) : (
          <ul className="space-y-4">
            {results.map((result) => (
              <li key={result._id} className="p-4 bg-purple-100 rounded-lg">
                <h2 className="font-semibold">{result.userName}</h2>
                <p><strong>Category:</strong> {result.category}</p>
                <p><strong>Score:</strong> {result.correctAnswers}/{result.attemptedQuestions} ({result.percentage}%)</p>
                <p><strong>Feedback:</strong> {result.feedback}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default QuizResults;
