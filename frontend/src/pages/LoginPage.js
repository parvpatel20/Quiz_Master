import React, { useState } from "react";
import { Eye, EyeOff, Lock, User, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import navigate from react-router-dom
import Popup from "../components/Popup"; // Import Popup component
import ResponsiveBackground from "../components/ResponsiveBackground"; // Import ResponsiveBackground component
import { Link } from "react-router-dom";


const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate(); // Get the navigate function from useNavigate

  const [popup, setPopup] = useState({
    show: false,
    message: "",
    showActionButton: false,
    actionButtonText: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await fetch("https://quiz-master-backend-1a1s.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send the username and password
        credentials: "include", // Include credentials for the request
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Login Successful:", responseData);
        setPopup({
          show: true,
          message: "Login successful! Redirecting to the home page.",
          showActionButton: true,
          actionButtonText: "Home",
        });
      } else {
        console.error("Login Failed");
        setPopup({
          show: true,
          message: "Invalid credentials. Please try again.",
          showActionButton: false,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setPopup({
        show: true,
        message: "Error during login. Please try again.",
        showActionButton: false,
      });
    }
  };

  const handlePopupClose = () => {
    setPopup({ show: false, message: "", showActionButton: false });
  };

  const handleGoToHome = () => {
    navigate("/");
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen text-white flex items-center justify-center p-6 relative overflow-hidden">
      <ResponsiveBackground />

      {/* Login card with enhanced effects */}
      <div className="relative z-10 w-full max-w-md">
        {/* Glow effect behind card */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100]/20 to-[#FFD700]/20 rounded-3xl blur-2xl animate-pulse"></div>
        
        <div className="relative bg-gradient-to-br from-[#0F1A36]/95 via-[#1a2845]/90 to-[#0A1C36]/95 backdrop-blur-lg border border-[#FF9100]/30 rounded-3xl p-8 shadow-2xl hover:shadow-[#FF9100]/25 transition-all duration-700">
          {/* Animated background overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF9100]/5 via-transparent to-[#FFD700]/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          {/* Header with enhanced icon */}
          <div className="text-center mb-8 relative z-10">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-2xl blur-md opacity-60 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-2xl blur-sm opacity-40 scale-110 animate-pulse animation-delay-500"></div>
              <div className="relative p-4 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-2xl shadow-2xl">
                <Lock className="w-8 h-8 text-white animate-pulse animation-delay-1000" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-[#FF9100] via-[#FFD700] via-[#FF6B35] to-[#FF9100] bg-clip-text text-transparent animate-gradient-x">
              Welcome Back
            </h1>
            
            <div className="w-20 h-1 bg-gradient-to-r from-[#FF9100] to-[#FFD700] mx-auto rounded-full animate-pulse"></div>
          </div>

          <form
  onSubmit={handleSubmit}
  className="space-y-6 relative z-10"
>
            {/* Username field with enhanced effects */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400 group-focus-within:text-[#FF9100] transition-all duration-300 group-focus-within:scale-110" />
              </div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 bg-[#1a2845]/80 rounded-2xl text-white border-2 border-[#FF9100]/40 focus:ring-4 focus:ring-[#FF9100]/30 focus:border-[#FF9100] focus:shadow-[0_0_20px_rgba(255,145,0,0.3)] transition-all duration-300 placeholder-gray-400 text-lg font-medium shadow-inner hover:bg-[#1a2845]/90"
                placeholder="Username"
                required
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#FF9100]/10 to-[#FFD700]/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>

            {/* Password field with enhanced effects */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#FF9100] transition-all duration-300 group-focus-within:scale-110" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-12 pr-12 py-4 bg-[#1a2845]/80 rounded-2xl text-white border-2 border-[#FF9100]/40 focus:ring-4 focus:ring-[#FF9100]/30 focus:border-[#FF9100] focus:shadow-[0_0_20px_rgba(255,145,0,0.3)] transition-all duration-300 placeholder-gray-400 text-lg font-medium shadow-inner hover:bg-[#1a2845]/90"
                placeholder="Password"
                required
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#FF9100]/10 to-[#FFD700]/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#FF9100] hover:scale-110 transition-all duration-300"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Submit button with subtle glow effect */}
            <button
            type="submit"
            className="w-full my-2 px-6 py-2 bg-gradient-to-r from-[#FF9100] to-[#FF5E00] text-[#ffffff] text-lg font-semibold rounded-full shadow-lg hover:scale-105 transform transition duration-300"
          >
            Log In
          </button>
          </form>

          {/* Register link */}
          <div className="mt-8 text-center relative z-10">
            <p className="text-gray-300 text-lg">
              Don't have an account?{" "}
              <Link
              to="/register"
              className="text-[#ff9100] font-bold hover:underline"
            >
              Register
            </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced popup */}
      {popup.show && (
          <Popup
            message={popup.message}
            showActionButton={popup.showActionButton}
            actionButtonText={popup.actionButtonText}
            onClose={handlePopupClose}
            onAction={handleGoToHome}
          />
        )}

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 4s ease infinite;
        }
        .animate-spin-slow {
          animation: spin 6s linear infinite;
        }
        .animate-reverse-spin {
          animation: spin 8s linear infinite reverse;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes slide-right {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100vw); }
        }
        @keyframes slide-left {
          0% { transform: translateX(100vw); }
          100% { transform: translateX(-100%); }
        }
        .animate-slide-right {
          animation: slide-right 15s linear infinite;
        }
        .animate-slide-left {
          animation: slide-left 20s linear infinite;
        }
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-1500 { animation-delay: 1.5s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-2500 { animation-delay: 2.5s; }
        .animation-delay-3000 { animation-delay: 3s; }
        .animation-delay-3500 { animation-delay: 3.5s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
};

export default LoginPage;
