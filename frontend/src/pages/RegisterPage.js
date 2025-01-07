import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import Popup from "../components/Popup";

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
      const response = await fetch("http://localhost:5000/api/register", {
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
    <div className="min-h-screen bg-gradient-to-br from-[#0F1A36] via-[#2C4A75] to-[#0A1C36] text-[#ffffff] flex justify-center items-center px-4 py-8">
      <div className="w-full max-w-5xl bg-gradient-to-br from-[#0A1C36] to-[#112D4E] rounded-3xl shadow-lg flex overflow-hidden">
        {/* Left Side: Logo and Branding */}
        <div className="hidden lg:flex flex-col justify-center items-center w-2/5 bg-[#000e3dfb] p-6">
          <img
            src="../../assets/logo.png"
            alt="Logo"
            className="w-6/7 h-1/2 mb-4"
          />
          <p className="text-[#DBE2EF] text-center text-lg font-bold">
            Welcome to our community! Create your account to join us and explore
            amazing features tailored just for you.
          </p>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-3/5 p-8 lg:p-12 bg-gradient-to-r from-[#112D4E] to-[#0F1A36] bg-gradient-to-r from-[#112D4E] to-[#0F1A36]space-y-6">
          <h2 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-[#FF9100] via-[#FFD700] to-[#FF9100] bg-clip-text text-transparent">
            Create Your Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                className="block text-sm font-medium text-[#DBE2EF]"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 bg-[#000e3dfb] text-[#FFFFFF] border border-[#FF9100] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5E00]"
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-[#DBE2EF]"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 bg-[#000e3dfb] text-[#FFFFFF] border border-[#FF9100] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5E00]"
                required
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-[#DBE2EF]"
                htmlFor="classname"
              >
                Class
              </label>
              <select
                id="classname"
                name="classname"
                value={formData.classname}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 bg-[#000e3dfb] text-[#FFFFFF] border border-[#FF9100] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5E00]"
              >
                <option value="" disabled>
                  Select your class
                </option>
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i + 1} value={`Class ${i + 1}`}>
                    Class {i + 1}
                  </option>
                ))}
                <option value="Class 11 (Science)">Class 11 (Science)</option>
                <option value="Class 11 (Commerce)">Class 11 (Commerce)</option>
                <option value="Class 11 (Arts)">Class 11 (Arts)</option>
                <option value="Class 12 (Science)">Class 12 (Science)</option>
                <option value="Class 12 (Commerce)">Class 12 (Commerce)</option>
                <option value="Class 12 (Arts)">Class 12 (Arts)</option>
              </select>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-[#DBE2EF]"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[#000e3dfb] text-[#FFFFFF] border border-[#FF9100] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5E00]"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center text-[#FF9100] hover:text-[#FF5E00] focus:outline-none"
                >
                  {showPassword ? (
                    <MdVisibilityOff className="w-5 h-5" />
                  ) : (
                    <MdVisibility className="w-5 h-5" />
                  )}
                </button>
              </div>
              <div>
                <p className="mt-3 text-sm text-[#FF9100]">
                  <strong>Note:</strong> Password must contain at least one
                  special character (@, #, $, _), uppercase letter (A-Z),
                  lowercase letter (a-z), number (0-9), and be between 8 and 16
                  characters long.
                </p>
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-[#DBE2EF]"
                htmlFor="profilePicture"
              >
                Profile Picture (Optional)
              </label>
              <input
                type="file"
                id="profilePicture"
                name="profilePicture"
                onChange={handleFileChange}
                className="w-full mt-1 px-3 py-2 bg-[#000e3dfb] text-[#FFFFFF] border border-[#FF9100] rounded-lg focus:outline-none"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-[#DBE2EF]"
                htmlFor="bio"
              >
                Bio (Optional)
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 mt-1 bg-[#000e3dfb] text-[#FFFFFF] border border-[#FF9100] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5E00]"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full my-2 px-6 py-2 bg-gradient-to-r from-[#FF9100] to-[#FF5E00] text-[#ffffff] text-lg font-semibold rounded-full shadow-lg hover:scale-105 transform transition duration-300"
            >
              Register
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-lg text-[#DBE2EF]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#FF9100] font-bold hover:underline"
              >
                Log In
              </Link>
            </p>
          </div>

          {popup.show && (
            <Popup
              message={popup.message}
              showActionButton={popup.showActionButton}
              actionButtonText={popup.actionButtonText}
              onClose={handlePopupClose}
              onAction={handleGoToLogin}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
