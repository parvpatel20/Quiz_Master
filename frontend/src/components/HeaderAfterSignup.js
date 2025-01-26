import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Profile icon from react-icons

const HeaderAfterSignup = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for dropdown visibility

  const handleLogout = async () => {
    try {
      await fetch("https://quiz-master-backend-1a1s.onrender.com/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include', // Include credentials for the request
      });

      console.log("in handle logout");
      window.location.href = "/"; // Redirect to the home page
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleQuizClick = async () => {
    try {
      // Trigger the GET request without processing the response data
      await fetch("https://quiz-master-backend-1a1s.onrender.com/api/quiz-search", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include', // Include credentials for the request
      });

      // console.log(response.json());
    } catch (error) {
      console.error("Error during GET request:", error);
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
        <nav className="flex space-x-8 text-[#ffffff] text-lg font-medium mr-12">
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
            to="/quiz-search"
            className={({ isActive }) =>
              `hover:text-[#FF9100] hover:underline underline-offset-4 transition duration-300 ${
                isActive ? "text-[#FF9100] underline" : ""
              }`
            }
            onClick={handleQuizClick} // Trigger GET request when clicked
          >
            Quizzes
          </NavLink>
          <NavLink
            to="/leaderboard"
            className={({ isActive }) =>
              `hover:text-[#FF9100] hover:underline underline-offset-4 transition duration-300 ${
                isActive ? "text-[#FF9100] underline" : ""
              }`
            }
          >
            Leaderboard
          </NavLink>
        </nav>

        {/* Profile Icon with Dropdown Menu */}
        <div
          className="relative"
          onMouseEnter={() => setIsMenuOpen(true)} // Show menu on hover
          onMouseLeave={() => setIsMenuOpen(false)} // Hide menu on mouse leave
        >
          <div className="text-[#FFFFFF] ml-12 mr-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2a6 6 0 110 12 6 6 0 010-12zm0 14c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z" />
            </svg>
          </div>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div
              className="absolute right-0 w-52 bg-[#1F3A64] shadow-lg rounded-lg transition-all duration-300 ease-in-out transform scale-95"
              onMouseEnter={() => setIsMenuOpen(true)} // Keeps dropdown open on hover
              onMouseLeave={() => setIsMenuOpen(false)} // Closes when the mouse leaves
            >
              {/* Profile Link */}
              <Link
                to="/profile"
                className="flex items-center gap-3 px-4 py-3 text-white text-base font-medium hover:bg-[#000e3dfb] hover:text-[#ffffff] transition-colors duration-300 rounded-t-lg"
              >
                <FaUserCircle className="text-[#FFD700] text-xl" />
                <span>View Profile</span>
              </Link>
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-white text-base font-medium hover:bg-[#000e3dfb] hover:text-[#ffffff] transition-colors duration-300 rounded-b-lg"
              >
                <i className="fas fa-sign-out-alt text-[#FF7F00] text-xl"></i>
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderAfterSignup;
