import React from 'react';
import { toast } from 'react-toastify';

const Modal = ({ isOpen, onClose, onSubmit, userName, setUserName, feedback, setFeedback }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(); // Call the submit function passed as prop
    toast.success("Feedback submitted successfully!"); // Show success toast
    onClose(); // Close the modal after submitting
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-lg font-bold mb-4">Quiz Completed!</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="userName" className="block mb-2">Name:</label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="feedback" className="block mb-2">Feedback:</label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="w-full bg-purple-500 text-white rounded p-2 hover:bg-purple-600 transition">
            Submit
          </button>
        </form>
        <button onClick={onClose} className="mt-4 text-purple-500 hover:underline">
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
