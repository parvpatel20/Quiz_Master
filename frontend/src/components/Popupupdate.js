import React, { useState, useEffect } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

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
      // you should check if your current pass is ok and still
      // shoes this error.the issue is anywhere else in sending
      // patch request.

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70">
      <div className="bg-[#1D2951] p-8 rounded-2xl shadow-2xl max-w-md w-full">
        <h2 className="text-3xl font-extrabold mb-6 bg-gradient-to-r from-[#FF9100] via-[#FFD700] to-[#FF9100] bg-clip-text text-transparent drop-shadow-lg text-center">
          Update Information
        </h2>

        {/* Username */}
        {fieldType === "username" && (
          <div className="mb-5">
            <label className="block text-lg font-bold text-[#F9F7F7]">
              New Username :
            </label>
            <input
              type="text"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="mt-2 p-3 border border-[#DBE2EF] font-bold text-lg rounded-md w-full bg-[#2A3B5C] text-white focus:outline-none focus:ring-2 focus:ring-[#FF9100] focus:border-[#FF9100] transition"
              placeholder="Enter new username"
            />
          </div>
        )}

        {/* Email */}
        {fieldType === "email" && (
          <div className="mb-5">
            <label className="block text-lg font-bold text-[#F9F7F7]">
              New Email :
            </label>
            <input
              type="email"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="mt-2 p-3 border border-[#DBE2EF] font-bold text-lg rounded-md w-full bg-[#2A3B5C] text-white focus:outline-none focus:ring-2 focus:ring-[#FF9100] focus:border-[#FF9100] transition"
              placeholder="Enter your email"
            />
          </div>
        )}

        {/* Password */}
        {fieldType === "password" && (
          <div className="mb-5">
            <label className="block text-lg font-bold text-[#F9F7F7]">
              Current Password:
            </label>
            <div className="relative mt-1">
              <input
                type={showPasswordcurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mt-2 p-3 border border-[#DBE2EF] font-bold text-lg rounded-md w-full bg-[#2A3B5C] text-white focus:outline-none focus:ring-2 focus:ring-[#FF9100] focus:border-[#FF9100] transition"
                placeholder="Enter current password"
              />

              <button
                type="button"
                onClick={togglePasswordVisibilitycurrent}
                className="absolute inset-y-0 right-3 pt-2 flex items-center text-[#FFFFFF] hover:text-[#FF5E00] focus:outline-none"
              >
                {showPasswordcurrent ? (
                  <MdVisibilityOff className="w-5 h-5" />
                ) : (
                  <MdVisibility className="w-5 h-5" />
                )}
              </button>
            </div>

            <label className="block text-lg font-bold text-[#F9F7F7] mt-4">
              New Password:
            </label>

            <div className="relative mt-1">
              <input
                type={showPasswordnew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-2 p-3 border border-[#DBE2EF] font-bold text-lg rounded-md w-full bg-[#2A3B5C] text-white focus:outline-none focus:ring-2 focus:ring-[#FF9100] focus:border-[#FF9100] transition"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibilitynew}
                className="absolute inset-y-0 right-3 pt-2 flex items-center text-[#FFFFFF] hover:text-[#FF5E00] focus:outline-none"
              >
                {showPasswordnew ? (
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
        )}

        {/* Class */}
        {fieldType === "class" && (
          <div className="mb-5">
            <label className="block text-lg font-bold text-[#F9F7F7]">
              Select Class :
            </label>
            <select
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="mt-2 p-3 border border-[#DBE2EF] font-bold text-lg rounded-md w-full bg-[#2A3B5C] text-white focus:outline-none focus:ring-2 focus:ring-[#FF9100] focus:border-[#FF9100] transition"
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
        )}

        {/* Bio */}
        {fieldType === "bio" && (
          <div className="mb-5">
            <label className="block text-lg font-bold text-[#F9F7F7]">
              New Bio :
            </label>
            <textarea
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="mt-2 p-3 border border-[#DBE2EF] font-bold text-lg rounded-md w-full bg-[#2A3B5C] text-white focus:outline-none focus:ring-2 focus:ring-[#FF9100] focus:border-[#FF9100] transition"
              placeholder="Enter new bio"
            />
          </div>
        )}

        {fieldType === "profilePicture" && (
          <div className="mb-5">
            <label className="block text-lg font-bold text-[#F9F7F7]">
              New Profile Picture :
            </label>
            <input
              id="profile-picture-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full mt-1 px-3 py-2 bg-[#000e3dfb] text-[#FFFFFF] border border-[#FF9100] rounded-lg focus:outline-none"
            />
          </div>
        )}

        {(error || successMessage) && (
          <p
            className={`text-lg mb-4 px-4 py-2 font-semibold rounded-2xl shadow-lg ${
              error ? "text-red-500 bg-red-100" : "text-green-500 bg-green-100"
            }`}
          >
            {error || successMessage}
          </p>
        )}

        <div className="flex justify-between">
          <button
            onClick={() => {
              if (fieldType === "profilePicture") {
                handleProfilepicupdate(); // Call the specific function for profile picture
              } else if (fieldType === "password") {
                handlePasswordUpdate(); // Call the specific function for password
              } else {
                handleUpdate(); // Call the general update function
              }
            }}
            className={`px-6 py-2 bg-gradient-to-r from-[#FF9100] to-[#FF5E00] text-[#ffffff] text-lg font-semibold rounded-full shadow-lg hover:scale-105 transform transition duration-300 ${
              isUpdateDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isUpdateDisabled}
          >
            Update
          </button>

          <button
            onClick={() => {
              closePopup(); // Close the popup
              setNewValue(""); // Clear the input value
            }}
            className="px-6 py-2 bg-gradient-to-r from-[#FF9100] to-[#FF5E00] text-[#ffffff] text-lg font-semibold rounded-full shadow-lg hover:scale-105 transform transition duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup_update;
