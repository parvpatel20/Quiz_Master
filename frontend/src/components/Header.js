import React from "react";
import { NavLink , Link} from "react-router-dom";
const Header = () => {

  const handleQuizClick = async () => {
    try {
      // Trigger the GET request without processing the response data
      await fetch('http://localhost:5000/api/quiz-search-before-signup', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include credentials for the request
      });
  
      // console.log(response.json());
      
    } catch (error) {
      console.error('Error during GET request:', error);
    }
  };

  return (
    <header className="bg-gradient-to-r from-[#0F1A36] to-[#2C4A75] py-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-8">
        {/* Logo */}
        <div className="flex items-center space-x-1">
          <img
            src="../../assets/logo.png" // Replace with your logo path
            alt="Quiz Master Logo"
            className="h-12 w-12 object-contain"
          />
          <span className="text-[#ffffff] text-2xl font-extrabold tracking-wide uppercase">
            Quiz Master
          </span>
        </div>

        {/* Navbar */}
        <nav className="flex space-x-8 text-[#ffffff] text-lg font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-[#FF9100] hover:underline underline-offset-4 transition duration-300 ${
                isActive ? "text-[#FF9100] underline" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `hover:text-[#FF9100] hover:underline underline-offset-4 transition duration-300 ${
                isActive ? "text-[#FF9100] underline" : ""
              }`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/quiz-search-before-signup"
            className={({ isActive }) =>
              `hover:text-[#FF9100] hover:underline underline-offset-4 transition duration-300 ${
                isActive ? "text-[#FF9100] underline" : ""
              }`
            }
            onClick={handleQuizClick} // Trigger GET request when clicked
          >
            Quizzes
          </NavLink>
          <span
            className="text-gray-400 cursor-not-allowed"
            title="Leaderboard is currently disabled"
          >
            Leaderboard
          </span>
        </nav>

        {/* Sign Up/Login Button */}
        <Link to="/login">
          <button className="px-6 py-2 bg-gradient-to-r from-[#FF9100] to-[#FF5E00] text-[#ffffff] text-lg font-semibold rounded-full shadow-lg hover:scale-105 transform transition duration-300">
            Sign Up/Login
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
