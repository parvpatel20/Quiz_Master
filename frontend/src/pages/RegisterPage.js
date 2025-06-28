import React, { useState } from "react";
import { Eye, EyeOff, Lock, User, Mail, GraduationCap, Camera, FileText, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import ResponsiveBackground from "../components/ResponsiveBackground";
import Popup from "../components/Popup";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    classname: "",
    profilePicture: null,
    bio: "",
  });

  const navigate = useNavigate();

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

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const emailPattern = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$_]).{8,16}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    if (!emailPattern.test(formData.email)) {
      setPopup({
        show: true,
        message: "Enter Valid email address",
        showActionButton: false,
      });
      return;
    }

    if (!passwordPattern.test(formData.password)) {
      setPopup({
        show: true,
        message: "Enter Valid Password",
        showActionButton: false,
      });
      return; // Prevent form submission if validation fails
    }

    try {
      const response = await fetch("https://quiz-master-backend-1a1s.onrender.com/api/register", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        setFormData({
          username: "",
          email: "",
          password: "",
          classname: "",
          profilePicture: null,
          bio: "",
        });

        setPopup({
          show: true,
          message: "Registration successful! You can now log in.",
          showActionButton: true,
          actionButtonText: "Login",
        });
      } else {
        setPopup({
          show: true,
          message: "Username or email already in use. Please try again.",
          showActionButton: false,
        });
      }
    } catch (error) {
      setPopup({
        show: true,
        message: "Error during registration. Please try again.",
        showActionButton: false,
      });
    }
  };

  const handlePopupClose = () => {
    setPopup({ show: false, message: "", showActionButton: false });
  };

  const handleGoToLogin = () => {
    navigate("/login");
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };


  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <ResponsiveBackground />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-center gap-8">
          
          {/* Left Side: Branding */}
          <div className="w-full lg:w-2/5 flex flex-col justify-center items-center p-8 relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100]/10 to-[#FFD700]/10 rounded-3xl blur-3xl"></div>
            
            <div className="relative z-10 text-center">
              {/* Logo */}
              <div className="mb-8 relative">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-3xl blur-md opacity-50 animate-pulse"></div>
                  <div className="relative w-90 h-100 xl:w-70 xl:h-90 mx-auto">
                    <div className="w-full h-full rounded-3xl p-1">
                      <div className="w-full h-full rounded-3xl flex items-center justify-center">
                        <div className="w-6/7 h-6/7 rounded-2xl flex items-center justify-center">
                          <img
                            src="../../assets/logo.png"
                            alt="Logo"
                            className="w-70 h-70 object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Welcome Text */}
              <h3 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-[#FF9100] via-[#FFD700] to-[#FF6B35] bg-clip-text text-transparent animate-gradient-x">
                Join Us Today!
              </h3>

              <p className="text-gray-300 text-lg lg:text-xl leading-relaxed mb-8">
                Create your account and become part of our amazing learning community. 
                Connect, share, and grow with students worldwide.
              </p>

              {/* Feature highlights */}
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-3 text-gray-300">
                  <Sparkles className="w-5 h-5 text-[#FF9100] animate-pulse" />
                  <span>Connect with peers globally</span>
                </div>
                <div className="flex items-center justify-center space-x-3 text-gray-300">
                  <Sparkles className="w-5 h-5 text-[#FF6B35] animate-pulse animation-delay-1000" />
                  <span>Grow together as a community</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Registration Form */}
          <div className="w-full lg:w-3/5 relative">
            {/* Glow effect behind form */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100]/20 to-[#FFD700]/20 rounded-3xl blur-2xl"></div>
            
            <div className="relative bg-gradient-to-br from-[#0F1A36]/95 via-[#1a2845]/90 to-[#0A1C36]/95 backdrop-blur-lg border border-[#FF9100]/30 rounded-3xl p-8 lg:p-12 shadow-2xl">
              
              {/* Header */}
              <div className="text-center mb-8">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-2xl blur-md opacity-60 animate-pulse"></div>
                  <div className="relative p-4 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-2xl shadow-2xl">
                    <User className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <h2 className="text-3xl lg:text-4xl font-bold mb-3 bg-gradient-to-r from-[#FF9100] via-[#FFD700] to-[#FF6B35] bg-clip-text text-transparent animate-gradient-x">
                  Create Account
                </h2>
                
                <div className="w-20 h-1 bg-gradient-to-r from-[#FF9100] to-[#FFD700] mx-auto rounded-full"></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Username */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-[#FF9100] transition-all duration-300" />
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-[#1a2845]/80 rounded-2xl text-white border-2 border-[#FF9100]/40 focus:ring-4 focus:ring-[#FF9100]/30 focus:border-[#FF9100] focus:shadow-[0_0_20px_rgba(255,145,0,0.3)] transition-all duration-300 placeholder-gray-400 hover:bg-[#1a2845]/90"
                    placeholder="Username"
                    required
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#FF9100]/10 to-[#FFD700]/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>

                {/* Email */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-[#FF9100] transition-all duration-300" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-[#1a2845]/80 rounded-2xl text-white border-2 border-[#FF9100]/40 focus:ring-4 focus:ring-[#FF9100]/30 focus:border-[#FF9100] focus:shadow-[0_0_20px_rgba(255,145,0,0.3)] transition-all duration-300 placeholder-gray-400 hover:bg-[#1a2845]/90"
                    placeholder="Email Address"
                    required
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#FF9100]/10 to-[#FFD700]/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>

                {/* Class */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                    <GraduationCap className="h-5 w-5 text-gray-400 group-focus-within:text-[#FF9100] transition-all duration-300" />
                  </div>
                  <select
                    name="classname"
                    value={formData.classname}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-[#1a2845]/80 rounded-2xl text-white border-2 border-[#FF9100]/40 focus:ring-4 focus:ring-[#FF9100]/30 focus:border-[#FF9100] focus:shadow-[0_0_20px_rgba(255,145,0,0.3)] transition-all duration-300 hover:bg-[#1a2845]/90 appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="bg-[#1a2845] text-gray-400">
                      Select your class
                    </option>
                    {Array.from({ length: 10 }, (_, i) => (
                      <option key={i + 1} value={`Class ${i + 1}`} className="bg-[#1a2845] text-white">
                        Class {i + 1}
                      </option>
                    ))}
                    <option value="Class 11 (Science)" className="bg-[#1a2845] text-white">Class 11 (Science)</option>
                    <option value="Class 11 (Commerce)" className="bg-[#1a2845] text-white">Class 11 (Commerce)</option>
                    <option value="Class 11 (Arts)" className="bg-[#1a2845] text-white">Class 11 (Arts)</option>
                    <option value="Class 12 (Science)" className="bg-[#1a2845] text-white">Class 12 (Science)</option>
                    <option value="Class 12 (Commerce)" className="bg-[#1a2845] text-white">Class 12 (Commerce)</option>
                    <option value="Class 12 (Arts)" className="bg-[#1a2845] text-white">Class 12 (Arts)</option>
                  </select>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#FF9100]/10 to-[#FFD700]/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>

                {/* Password */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#FF9100] transition-all duration-300" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-4 bg-[#1a2845]/80 rounded-2xl text-white border-2 border-[#FF9100]/40 focus:ring-4 focus:ring-[#FF9100]/30 focus:border-[#FF9100] focus:shadow-[0_0_20px_rgba(255,145,0,0.3)] transition-all duration-300 placeholder-gray-400 hover:bg-[#1a2845]/90"
                    placeholder="Password"
                    required
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#FF9100]/10 to-[#FFD700]/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#FF9100] hover:scale-110 transition-all duration-300"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                {/* Password requirement text */}
                <p className="text-sm text-gray-400 ml-2">
                  Password must contain uppercase, lowercase, number, special character (@#$_), 8-16 chars
                </p>

                {/* Profile Picture */}
                <div className="relative group">
                  <div className="absolute top-6 pl-4 flex items-center pointer-events-none">
                    <Camera className="h-6 w-6 text-gray-400 group-focus-within:text-[#FF9100] transition-all duration-300" />
                  </div>
                  <input
                    type="file"
                    name="profilePicture"
                    onChange={handleFileChange}
                    className="w-full pl-12 pr-4 py-4 bg-[#1a2845]/80 rounded-2xl text-white border-2 border-[#FF9100]/40 focus:ring-4 focus:ring-[#FF9100]/30 focus:border-[#FF9100] transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-gradient-to-r file:from-[#FF9100] file:to-[#FFD700] file:text-white file:font-semibold file:cursor-pointer hover:file:scale-105 hover:bg-[#1a2845]/90"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#FF9100]/10 to-[#FFD700]/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>

                {/* Bio */}
                <div className="relative group">
                  <div className="absolute top-5 left-0 pl-4 flex items-start pointer-events-none">
                    <FileText className="h-5 w-5 text-gray-400 group-focus-within:text-[#FF9100] transition-all duration-300" />
                  </div>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="3"
                    className="w-full pl-12 pr-4 py-4 bg-[#1a2845]/80 rounded-2xl text-white border-2 border-[#FF9100]/40 focus:ring-4 focus:ring-[#FF9100]/30 focus:border-[#FF9100] focus:shadow-[0_0_20px_rgba(255,145,0,0.3)] transition-all duration-300 placeholder-gray-400 resize-none hover:bg-[#1a2845]/90"
                    placeholder="Tell us about yourself (optional)"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#FF9100]/10 to-[#FFD700]/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>

                {/* Submit Button */}
                <button
              type="submit"
              className="w-full my-2 px-6 py-2 bg-gradient-to-r from-[#FF9100] to-[#FF5E00] text-[#ffffff] text-lg font-semibold rounded-full shadow-lg hover:scale-105 transform transition duration-300"
            >
              Create Account
            </button>
              </form>

              {/* Login Link */}
              <div className="mt-8 text-center">
                <p className="text-gray-300 text-lg">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-[#FF9100] font-bold hover:text-[#FFD700] hover:underline transition-colors duration-300"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup */}
      {popup.show && (
        <Popup
          message={popup.message}
          showActionButton={popup.showActionButton}
          actionButtonText={popup.actionButtonText}
          onClose={handlePopupClose}
          onAction={handleGoToLogin}
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
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-1000 { animation-delay: 1s; }
      `}</style>
    </div>
  );
};

export default RegisterPage;
