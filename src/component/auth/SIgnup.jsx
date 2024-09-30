import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userImage, setUserImage] = useState(""); // Optional field
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8081/api/user/signup", {
        fullname,
        email,
        password,
        userImage: userImage || undefined, // Pass undefined if userImage is not provided
        isAdmin: false // Always set isAdmin to false
      });

      // Handle successful signup
      console.log(response.data);
      navigate("/login"); // Redirect to login page after successful signup
    } catch (error) {
      console.error("Error during signup:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Sign Up</h2>
        
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
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
        
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-700">User Image (optional)</label>
          <input
            type="url"
            value={userImage}
            onChange={(e) => setUserImage(e.target.value)}
            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button type="submit" className="bg-blue-500 text-white p-3 rounded w-full hover:bg-blue-600 transition duration-200">Sign Up</button>
        
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-500 hover:underline focus:outline-none"
          >
            Sign In
          </button>
        </p>
      </form>
    </div>
  );
};

export default Signup;
