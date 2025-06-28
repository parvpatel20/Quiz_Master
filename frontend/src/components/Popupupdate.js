import React, { useState, useEffect } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { User, Mail, Lock, GraduationCap, FileText, Camera, X, Check, AlertCircle, Sparkles } from "lucide-react";

const Popup_update = ({ isOpen, closePopup, fieldType, updateUser }) => {
  const [newValue, setNewValue] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [file, setFile] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPasswordcurrent, setShowPasswordcurrent] = useState(false);
  const [showPasswordnew, setShowPasswordnew] = useState(false);

  // Reset the input field when the popup is closed
  useEffect(() => {
    if (!isOpen) {
      setNewValue(""); // Clear input when popup is closed
      setError("");
      setSuccessMessage("");
      setFile(null);
    }
  }, [isOpen]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Set the selected file
  };

  const togglePasswordVisibilitycurrent = () => {
    setShowPasswordcurrent((prev) => !prev);
  };

  const togglePasswordVisibilitynew = () => {
    setShowPasswordnew((prev) => !prev);
  };

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$_]).{8,16}$/;

  const handlePasswordUpdate = async () => {
    if (!passwordPattern.test(newPassword)) {
      setError("Enter Valid password");
      return;
    }

    try {
      const response = await fetch(
        "https://quiz-master-backend-1a1s.onrender.com/api/change-password",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
          credentials: "include", // Include credentials for the request
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.message || "Password updated successfully.");
        setCurrentPassword("");
        setNewPassword("");
        setError("");
      } else {
        const errorData = await response.json();
        setError(
          errorData.message || "An error occurred while updating the password."
        );
      }
    } catch (err) {
      setError("Invalid Current Password");
    }
  };

  const handleProfilepicupdate = async () => {
    if (!file) {
      return; // No file selected, do nothing
    }

    const formData = new FormData();
    formData.append("profilePicture", file); // Add the file

    try {
      const response = await fetch(
        "https://quiz-master-backend-1a1s.onrender.com/api/profile-picture",
        {
          method: "PATCH",
          body: formData,
          credentials: "include", // Include credentials for the request
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        setSuccessMessage(
          responseData.message || "Details updated successfully."
        );
        updateUser(fieldType, responseData.data.profilePicture);
        setNewValue(""); // Clear the input field
        setError("");
      } else {
        const errorData = await response.json();
        setError(
          errorData.message || "An error occurred while updating details."
        );
      }
    } catch (err) {
      setError("Failed to send the request. Please try again.");
    }
  };

  // Handle the update action
  const handleUpdate = async () => {
    // Validate based on fieldType
    if (fieldType === "email" && !validateEmail(newValue)) {
      setError("Enter Valid email address");
      return;
    }

    try {
      const response = await fetch("https://quiz-master-backend-1a1s.onrender.com/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fieldType,
          value: newValue,
        }),
        credentials: "include", // Include credentials for the request
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.message || "Details updated successfully.");
        updateUser(fieldType, newValue);
        setNewValue(""); // Clear the input field
        setError("");
      } else {
        const errorData = await response.json();
        setError(
          errorData.message || "An error occurred while updating details."
        );
      }
    } catch (err) {
      setError("Failed to send the request. Please try again.");
    }
  };

  // Simple email validation for @gmail.com domain
  const validateEmail = (email) => {
    const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return regex.test(email);
  };

  const isUpdateDisabled =
    (fieldType === "profilePicture" && !file) ||
    (fieldType === "password" &&
      (currentPassword.trim() === "" || newPassword.trim() === "")) ||
    (fieldType !== "password" &&
      fieldType !== "profilePicture" &&
      newValue.trim() === "");

  // Get field-specific configuration
  const getFieldConfig = () => {
    switch (fieldType) {
      case "username":
        return {
          title: "Update Username",
          icon: <User className="w-7 h-7 text-white" />,
          gradient: "from-[#FF9100]/20 to-[#FFD700]/20",
          borderColor: "border-[#FF9100]/30"
        };
      case "email":
        return {
          title: "Update Email",
          icon: <Mail className="w-7 h-7 text-white" />,
          gradient: "from-[#FF9100]/20 to-[#FFD700]/20",
          borderColor: "border-[#FF9100]/30"
        };
      case "password":
        return {
          title: "Change Password",
          icon: <Lock className="w-7 h-7 text-white" />,
          gradient: "from-[#FF9100]/20 to-[#FFD700]/20",
          borderColor: "border-[#FF9100]/30"
        };
      case "class":
        return {
          title: "Update Class",
          icon: <GraduationCap className="w-7 h-7 text-white" />,
          gradient: "from-[#FF9100]/20 to-[#FFD700]/20",
          borderColor: "border-[#FF9100]/30"
        };
      case "bio":
        return {
          title: "Update Bio",
          icon: <FileText className="w-7 h-7 text-white" />,
          gradient: "from-[#FF9100]/20 to-[#FFD700]/20",
          borderColor: "border-[#FF9100]/30"
        };
      case "profilePicture":
        return {
          title: "Update Profile Picture",
          icon: <Camera className="w-7 h-7 text-white" />,
          gradient: "from-[#FF9100]/20 to-[#FFD700]/20",
          borderColor: "border-[#FF9100]/30"
        };
      default:
        return {
          title: "Update Information",
          icon: <Sparkles className="w-7 h-7 text-white" />,
          gradient: "from-[#FF9100]/20 to-[#FFD700]/20",
          borderColor: "border-[#FF9100]/30"
        };
    }
  };

  const fieldConfig = getFieldConfig();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-lg"
        onClick={closePopup}
      ></div>
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-[#FF9100]/20 to-[#FFD700]/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-[#FFD700]/20 to-[#FF9100]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Modal Content - Ultra modern design */}
      <div className="relative bg-white/5 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-white/10 transition-all duration-500 scroll-smooth">
        
        <button
          onClick={closePopup}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 backdrop-blur-sm transition-all duration-300 border border-white/20"
        >
          <X className="w-5 h-5 text-white transition-transform duration-300" />
        </button>

        {/* Modern Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-2xl blur-lg opacity-70 animate-pulse"></div>
            <div className="relative p-4 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-2xl shadow-lg">
              {fieldConfig.icon}
            </div>
          </div>
          
          <h2 className="text-3xl font-bold mb-4 text-white drop-shadow-lg">
            {fieldConfig.title}
          </h2>
          
          <div className="w-20 h-0.5 bg-gradient-to-r from-[#FF9100] to-[#FFD700] mx-auto rounded-full"></div>
        </div>

        {/* Form Fields with modern glassmorphism */}
        <div className="space-y-6">
          {/* Username */}
          {fieldType === "username" && (
            <div className="space-y-3">
              <label className="flex items-center gap-3 text-lg font-semibold text-white/90">
                <User className="w-5 h-5 text-[#FF9100]" />
                New Username
              </label>
              <input
                type="text"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                className="w-full p-4 bg-white/10 backdrop-blur-sm rounded-2xl text-white border border-white/20 focus:border-[#FF9100] focus:bg-white/15 transition-all duration-300 text-base placeholder-white/50 shadow-inner"
                placeholder="Enter new username"
              />
            </div>
          )}

          {/* Email */}
          {fieldType === "email" && (
            <div className="space-y-3">
              <label className="flex items-center gap-3 text-lg font-semibold text-white/90">
                <Mail className="w-5 h-5 text-[#FF9100]" />
                New Email
              </label>
              <input
                type="email"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                className="w-full p-4 bg-white/10 backdrop-blur-sm rounded-2xl text-white border border-white/20 focus:border-[#FF9100] focus:bg-white/15 transition-all duration-300 text-base placeholder-white/50 shadow-inner"
                placeholder="Enter your email"
              />
            </div>
          )}

          {/* Password */}
          {fieldType === "password" && (
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="flex items-center gap-3 text-lg font-semibold text-white/90">
                  <Lock className="w-5 h-5 text-[#FF9100]" />
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswordcurrent ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full p-4 bg-white/10 backdrop-blur-sm rounded-2xl text-white border border-white/20 focus:border-[#FF9100] focus:bg-white/15 transition-all duration-300 text-base placeholder-white/50 shadow-inner pr-14"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibilitycurrent}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 transition-colors p-1"
                  >
                    {showPasswordcurrent ? (
                      <MdVisibilityOff className="w-5 h-5" />
                    ) : (
                      <MdVisibility className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-3 text-lg font-semibold text-white/90">
                  <Lock className="w-5 h-5 text-[#FF9100]" />
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswordnew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-4 bg-white/10 backdrop-blur-sm rounded-2xl text-white border border-white/20 focus:border-[#FF9100] focus:bg-white/15 transition-all duration-300 text-base placeholder-white/50 shadow-inner pr-14"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibilitynew}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 transition-colors p-1"
                  >
                    {showPasswordnew ? (
                      <MdVisibilityOff className="w-5 h-5" />
                    ) : (
                      <MdVisibility className="w-5 h-5" />
                    )}
                  </button>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-[#FF9100]/10 to-[#FFD700]/10 rounded-2xl border border-[#FF9100]/30 backdrop-blur-sm">
                  <p className="text-sm text-[#FFD700] leading-relaxed">
                    <AlertCircle className="w-4 h-4 inline mr-2" />
                    <strong>Password Requirements:</strong> Must contain at least one special character (@, #, $, _), uppercase letter (A-Z), lowercase letter (a-z), number (0-9), and be between 8-16 characters long.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Class */}
          {fieldType === "class" && (
            <div className="space-y-3">
              <label className="flex items-center gap-3 text-lg font-semibold text-white/90">
                <GraduationCap className="w-5 h-5 text-[#FF9100]" />
                Select Class
              </label>
              <select
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                className="w-full p-4 bg-white/10 backdrop-blur-sm rounded-2xl text-white border border-white/20 focus:border-[#FF9100] focus:bg-white/15 transition-all duration-300 text-base appearance-none cursor-pointer shadow-inner"
              >
                <option value="" disabled className="text-gray-400 bg-gray-800">
                  Select your class
                </option>
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i + 1} value={`Class ${i + 1}`} className="bg-gray-800 text-white">
                    Class {i + 1}
                  </option>
                ))}
                <option value="Class 11 (Science)" className="bg-gray-800 text-white">Class 11 (Science)</option>
                <option value="Class 11 (Commerce)" className="bg-gray-800 text-white">Class 11 (Commerce)</option>
                <option value="Class 11 (Arts)" className="bg-gray-800 text-white">Class 11 (Arts)</option>
                <option value="Class 12 (Science)" className="bg-gray-800 text-white">Class 12 (Science)</option>
                <option value="Class 12 (Commerce)" className="bg-gray-800 text-white">Class 12 (Commerce)</option>
                <option value="Class 12 (Arts)" className="bg-gray-800 text-white">Class 12 (Arts)</option>
              </select>
            </div>
          )}

          {/* Bio */}
          {fieldType === "bio" && (
            <div className="space-y-3">
              <label className="flex items-center gap-3 text-lg font-semibold text-white/90">
                <FileText className="w-5 h-5 text-[#FF9100]" />
                New Bio
              </label>
              <textarea
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                rows={4}
                className="w-full p-4 bg-white/10 backdrop-blur-sm rounded-2xl text-white border border-white/20 focus:border-[#FF9100] focus:bg-white/15 transition-all duration-300 text-base placeholder-white/50 shadow-inner resize-none"
                placeholder="Tell us about yourself..."
              />
            </div>
          )}

          {/* Profile Picture */}
          {fieldType === "profilePicture" && (
            <div className="space-y-3">
              <label className="flex items-center gap-3 text-lg font-semibold text-white/90">
                <Camera className="w-5 h-5 text-[#FF9100]" />
                New Profile Picture
              </label>
              <label className="w-full flex flex-col items-center justify-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-dashed border-white/30 transition-all duration-300 cursor-pointer">
                <Camera className="w-10 h-10 text-[#FF9100] mb-4 transition-transform duration-300" />
                <span className="text-base font-medium text-white mb-2">
                  {file ? file.name : "Click to upload image"}
                </span>
                <span className="text-sm text-white/60">
                  PNG, JPG, GIF up to 10MB
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>

        {/* Status Messages */}
        {(error || successMessage) && (
          <div className={`mt-6 p-4 rounded-2xl border backdrop-blur-sm ${
            error 
              ? "bg-red-500/10 border-red-400/30 text-red-300" 
              : "bg-green-500/10 border-green-400/30 text-green-300"
          }`}>
            <div className="flex items-center gap-3">
              {error ? (
                <AlertCircle className="w-5 h-5 text-red-400" />
              ) : (
                <Check className="w-5 h-5 text-green-400" />
              )}
              <p className="text-base font-medium">
                {error || successMessage}
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={() => {
              if (fieldType === "profilePicture") {
                handleProfilepicupdate();
              } else if (fieldType === "password") {
                handlePasswordUpdate();
              } else {
                handleUpdate();
              }
            }}
            className={`flex-1 px-8 py-4 bg-gradient-to-r from-[#FF9100] to-[#FFD700] text-white text-base font-bold rounded-2xl shadow-xl transform transition-all duration-300 ${
              isUpdateDisabled 
                ? "opacity-50 cursor-not-allowed" 
                : ""
            } relative overflow-hidden`}
            disabled={isUpdateDisabled}
          >
            <span className="relative flex items-center justify-center gap-2">
              <Check className="w-5 h-5" />
              Update
            </span>
          </button>

          <button
            onClick={() => {
              closePopup();
              setNewValue("");
            }}
            className="flex-1 px-8 py-4 bg-white/10 backdrop-blur-sm text-white text-base font-bold rounded-2xl shadow-xl transform transition-all duration-300 border border-white/20 relative overflow-hidden"
          >
            <span className="relative flex items-center justify-center gap-2">
              <X className="w-5 h-5" />
              Cancel
            </span>
          </button>
        </div>
      </div>

      <style jsx>{`
        /* Custom scrollbar for webkit browsers */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #FF9100, #FFD700);
          border-radius: 10px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #FF9100, #FFD700);
        }
      `}</style>
    </div>
  );
};

export default Popup_update;
