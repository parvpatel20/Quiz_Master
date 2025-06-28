
import React, { useState, useEffect } from "react";
import { User, LogOut, Zap } from "lucide-react";
import { NavLink } from "react-router-dom";

const HeaderAfterSignup = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("https://quiz-master-backend-1a1s.onrender.com/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
      });
      window.location.href = "/";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleQuizClick = async () => {
    try {
      await fetch("https://quiz-master-backend-1a1s.onrender.com/api/quiz-search", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
      });
    } catch (error) {
      console.error("Error during GET request:", error);
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
              <a href="/" className="group flex items-center space-x-3 transition-transform duration-500 hover:scale-105">
                <div className="relative">
                  {/* Glowing orb behind logo */}
                  {/* <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-full blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div> */}
                  
                  <img
            src="../../assets/logo.png" // Replace with your logo path
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
              </a>
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
                  to="/quiz-search"
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

                <NavLink
                  to="/leaderboard"
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
                      <span className="relative z-10">Leaderboard</span>
                      <div className={`absolute bottom-0 h-0.5 bg-gradient-to-r from-[#FF9100] to-[#FFD700] transition-all duration-300 ${
                        isActive 
                          ? 'w-full left-0' 
                          : 'w-0 group-hover:w-full group-hover:left-0'
                      }`}></div>
                    </>
                  )}
                </NavLink>
              </div>
            </nav>

            {/* Right: Profile Menu */}
            <div className="flex-shrink-0 w-1/4 flex justify-end">
              <div
                className="relative group"
                onMouseEnter={() => setIsMenuOpen(true)}
                onMouseLeave={() => setIsMenuOpen(false)}
              >
                {/* Profile Button */}
                <button className="relative p-3 rounded-full bg-gradient-to-r from-[#FF9100]/20 to-[#FFD700]/20 border border-[#FF9100]/30 backdrop-blur-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#FF9100]/25">
                  {/* Rotating ring effect */}
                  <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-[#FF9100] to-[#FFD700] opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-spin-slow"></div>
                  <div className="absolute inset-0.5 rounded-full bg-[#0A0F1C] group-hover:bg-transparent transition-colors duration-300"></div>
                  
                  <User className="relative w-5 h-5 text-[#FFD700] group-hover:text-white transition-colors duration-300" />
                </button>

                {/* Floating Dropdown */}
                <div className={`absolute right-0 top-full w-48 transition-all duration-300 ${
                  isMenuOpen 
                    ? 'opacity-100 translate-y-0 pointer-events-auto' 
                    : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}>
                  <div className="relative bg-[#0A0F1C]/95 backdrop-blur-xl rounded-2xl border border-[#FF9100]/30 shadow-2xl shadow-[#FF9100]/10 overflow-hidden">
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FF9100]/10 via-transparent to-[#FFD700]/10"></div>
                    
                    <div className="relative">
                      {/* Profile Link */}
                      <a
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-3 text-white/90 hover:text-white transition-all duration-300 group/item hover:bg-[#FF9100]/10"
                      >
                        <div className="p-1.5 rounded-lg bg-gradient-to-r from-[#FF9100]/20 to-[#FFD700]/20 group-hover/item:from-[#FF9100]/40 group-hover/item:to-[#FFD700]/40 transition-all duration-300">
                          <User className="w-4 h-4 text-[#FFD700]" />
                        </div>
                        <span className="text-sm font-medium">Profile</span>
                      </a>

                      {/* Logout Button */}
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-white/90 hover:text-white transition-all duration-300 group/item hover:bg-red-500/10"
                      >
                        <div className="p-1.5 rounded-lg bg-gradient-to-r from-red-500/20 to-red-400/20 group-hover/item:from-red-500/40 group-hover/item:to-red-400/40 transition-all duration-300">
                          <LogOut className="w-4 h-4 text-red-400" />
                        </div>
                        <span className="text-sm font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes gradient-x {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 3s ease infinite;
          }
          
          .animate-spin-slow {
            animation: spin-slow 3s linear infinite;
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

export default HeaderAfterSignup;
