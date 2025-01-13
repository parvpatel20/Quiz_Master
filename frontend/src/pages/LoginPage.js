import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdVisibility, MdVisibilityOff } from "react-icons/md"; // Import visibility icons
import { useNavigate } from "react-router-dom"; // Import navigate from react-router-dom
import Popup from "../components/Popup"; // Import Popup component
import ResponsiveBackground from "../components/ResponsiveBackground"; // Import ResponsiveBackground component

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
      const response = await fetch("http://localhost:5000/api/login", {
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
    <div className="min-h-screen relative z-10 text-[#ffffff] flex justify-center items-center">
      <ResponsiveBackground />
      <div className="w-full max-w-md p-10 bg-gradient-to-r from-[#112D4E] to-[#0F1A36] rounded-3xl shadow-lg">
        <h2 className="text-4xl text-center font-extrabold mb-6 bg-gradient-to-r from-[#FF9100] via-[#FFD700] to-[#FF9100] bg-clip-text text-transparent drop-shadow-lg mb-8 leading-normal">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-lg font-bold text-[#ffffff]"
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
              className="w-full p-3 mt-2 bg-[#000e3dfb] text-[#ffffff] border border-[#ff9100] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff5e00]"
              required
            />
          </div>
          <div className="mb-6 relative">
            <label
              className="block text-lg font-bold text-[#ffffff]"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 bg-[#000e3dfb] text-[#ffffff] border border-[#ff9100] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff5e00]"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center text-[#ff9100] hover:text-[#ff5e00] focus:outline-none"
              >
                {showPassword ? (
                  <MdVisibilityOff className="w-6 h-6" />
                ) : (
                  <MdVisibility className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full my-2 px-6 py-2 bg-gradient-to-r from-[#FF9100] to-[#FF5E00] text-[#ffffff] text-lg font-semibold rounded-full shadow-lg hover:scale-105 transform transition duration-300"
          >
            Log In
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-[#ffffff] text-lg">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#ff9100] font-bold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>

        {popup.show && (
          <Popup
            message={popup.message}
            showActionButton={popup.showActionButton}
            actionButtonText={popup.actionButtonText}
            onClose={handlePopupClose}
            onAction={handleGoToHome}
          />
        )}
      </div>
    </div>
  );
};

export default LoginPage;
