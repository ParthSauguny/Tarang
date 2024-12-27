import React from 'react';
import { Link } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';

function Homepage() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-violet-900 via-blue-800 to-gray-900 text-white">
      {/* Welcome Section */}
      <div className="text-center mt-32 space-y-6">
        <h1 className="text-6xl font-black font-serif text-yellow-400 drop-shadow-lg transition-transform duration-300 hover:scale-105">
          Welcome to TARANG - the AI Chatbot
        </h1>
        <h2 className="text-3xl font-medium text-yellow-200">
          Please Login or Signup to continue
        </h2>
      </div>

      {/* Buttons Section */}
      <div className="mt-16 space-y-6">
        <Link to="/user/signup" element={<Signup />}>
          <button className="rounded-2xl bg-purple-700 text-4xl text-white px-6 py-3 font-semibold font-serif shadow-lg hover:bg-purple-500 hover:scale-110 transition-all duration-300 mx-2">
            Signup
          </button>
        </Link>
        <Link to="/user/login" element={<Login />}>
          <button className="rounded-2xl bg-purple-700 text-4xl text-white px-6 py-3 font-semibold font-serif shadow-lg hover:bg-purple-500 hover:scale-110 transition-all duration-300 mx-2">
            Login
          </button>
        </Link>
      </div>

      {/* Footer Section */}
      <footer className="absolute bottom-4 text-center text-sm text-gray-400">
        Made with ❤️ by <span className="text-yellow-400 font-semibold">Parth Sauguny</span>
      </footer>
    </div>
  );
}

export default Homepage;
