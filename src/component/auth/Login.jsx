import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8081/api/user/login", {
        email,
        password,
      });

      // Handle successful login
      console.log(response.data);
      localStorage.setItem("user", JSON.stringify(response.data)); // Save user data to local storage
      navigate("/"); // Redirect to home page after successful login
      window.location.reload(); // Refresh the page after navigating
    } catch (error) {
      console.error("Error during login:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Login</h2>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-3 rounded w-full hover:bg-blue-600 transition duration-200">Login</button>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-500 hover:underline focus:outline-none"
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
