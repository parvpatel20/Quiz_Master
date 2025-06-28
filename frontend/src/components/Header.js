import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleQuizClick = async () => {
    try {
      await fetch('https://quiz-master-backend-1a1s.onrender.com/api/quiz-search-before-signup', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
    } catch (error) {
      console.error('Error during GET request:', error);
    }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
        scrolled 
          ? 'bg-[#0A0F1C]/95 backdrop-blur-xl border-b border-[#FF9100]/20 shadow-2xl shadow-[#FF9100]/10' 
          : 'bg-transparent'
      }`}>
        {/* Animated background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100]/5 via-transparent to-[#FFD700]/5 opacity-0 hover:opacity-100 transition-opacity duration-1000"></div>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-2 left-1/4 w-1 h-1 bg-[#FFD700] rounded-full animate-ping delay-100"></div>
          <div className="absolute top-4 right-1/3 w-1 h-1 bg-[#FF9100] rounded-full animate-ping delay-300"></div>
          <div className="absolute bottom-2 left-2/3 w-1 h-1 bg-[#FFD700] rounded-full animate-ping delay-500"></div>
        </div>

        <div className="relative container mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            
            {/* Left: Logo with Symbol */}
            <div className="flex-shrink-0 w-1/4">
              <Link to="/" className="group flex items-center space-x-3 transition-transform duration-500 hover:scale-105">
                <div className="relative">
                  <img
                    src="../../assets/logo.png"
                    alt="Quiz Master Logo"
                    className="h-12 w-12 object-contain"
                  />
                </div>
                
                <div className="relative">
                  <span className="text-2xl font-black bg-gradient-to-r from-[#FF9100] via-[#FFD700] to-[#FF9100] bg-clip-text text-transparent bg-size-200 animate-gradient-x">
                    Quiz Master
                  </span>
                  {/* Underline effect */}
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF9100] to-[#FFD700] transition-all duration-500 group-hover:w-full"></div>
                </div>
              </Link>
            </div>

            {/* Center: Navigation Menu */}
            <nav className="flex-1 flex items-center justify-center">
              <div className="flex items-center space-x-8">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `relative px-4 py-2 text-l font-bold transition-all duration-300 group ${
                      isActive 
                        ? 'text-[#FF9100]' 
                        : 'text-white/80 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="relative z-10">Home</span>
                      <div className={`absolute bottom-0 h-0.5 bg-gradient-to-r from-[#FF9100] to-[#FFD700] transition-all duration-300 ${
                        isActive 
                          ? 'w-full left-0' 
                          : 'w-0 group-hover:w-full group-hover:left-0'
                      }`}></div>
                    </>
                  )}
                </NavLink>

                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `relative px-4 py-2 text-l font-bold transition-all duration-300 group ${
                      isActive 
                        ? 'text-[#FF9100]' 
                        : 'text-white/80 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="relative z-10">About</span>
                      <div className={`absolute bottom-0 h-0.5 bg-gradient-to-r from-[#FF9100] to-[#FFD700] transition-all duration-300 ${
                        isActive 
                          ? 'w-full left-0' 
                          : 'w-0 group-hover:w-full group-hover:left-0'
                      }`}></div>
                    </>
                  )}
                </NavLink>

                <NavLink
                  to="/quiz-search-before-signup"
                  onClick={handleQuizClick}
                  className={({ isActive }) =>
                    `relative px-4 py-2 text-l font-bold transition-all duration-300 group ${
                      isActive 
                        ? 'text-[#FF9100]' 
                        : 'text-white/80 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="relative z-10">Quizzes</span>
                      <div className={`absolute bottom-0 h-0.5 bg-gradient-to-r from-[#FF9100] to-[#FFD700] transition-all duration-300 ${
                        isActive 
                          ? 'w-full left-0' 
                          : 'w-0 group-hover:w-full group-hover:left-0'
                      }`}></div>
                    </>
                  )}
                </NavLink>

                <span className="relative px-4 py-2 text-l font-bold text-gray-500 cursor-not-allowed" title="Leaderboard is currently disabled">
                  Leaderboard
                </span>
              </div>
            </nav>

            {/* Right: Sign Up/Login Button */}
            <div className="flex-shrink-0 w-1/4 flex justify-end">
              <Link to="/login">
                <button className="relative px-8 py-3 bg-gradient-to-r from-[#FF9100] to-[#FFD700] text-white text-lg font-bold rounded-full shadow-lg shadow-[#FF9100]/25 hover:shadow-xl hover:shadow-[#FF9100]/40 transform hover:scale-105 transition-all duration-300 group overflow-hidden">
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#FF9100] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  
                  <span className="relative z-10">Sign Up/Login</span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes gradient-x {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 3s ease infinite;
          }
          
          .bg-size-200 {
            background-size: 200% 200%;
          }
        `}</style>
      </header>

      {/* Spacer div to prevent content from going under fixed header */}
      <div className="h-20"></div>
    </>
  );
};

export default Header;
