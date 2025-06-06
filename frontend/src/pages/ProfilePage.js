import React, { useState, useEffect } from "react";
import HeaderAfterSignup from "../components/HeaderAfterSignup";
import { FiEdit } from "react-icons/fi";
import Popupupdate from "../components/Popupupdate";
import Loading from "../components/Loading";
import QuizHistory from "../components/QuizHistory";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentField, setCurrentField] = useState(""); // To store the field being edited
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProfileData = async () => {
    try {
      const response = await fetch(
        "https://quiz-master-backend-1a1s.onrender.com/api/profile",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch profile data.");
      }

      const responseData = await response.json(); // Parse JSON response
      setUser(responseData.data); // Assuming data is inside the "data" key
    } catch (error) {
      console.error("Error fetching profile data:", error);
    } finally {
      setLoading(false); // Stop loading when the data is fetched
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const [sortedQuizzes, setSortedQuizzes] = useState([]);

  useEffect(() => {
    if (user?.quizData) {
      // Filter out invalid quizzes (e.g., empty quiz objects)
      const validQuizzes = user.quizData.filter(
        (quiz) => quiz.quizDate && quiz.score !== undefined && quiz.quiz
      );

      // Sort valid quizzes by quizDate (newest first)
      const quizzes = [...validQuizzes].sort(
        (a, b) => new Date(b.quizDate) - new Date(a.quizDate)
      );

      setSortedQuizzes(quizzes);
    }
  }, [user]);

  const handleOpenPopup = (field) => {
    if (field === "profile picture") {
      setCurrentField("profilePicture");
    } else {
      setCurrentField(field);
    }
    setIsPopupOpen(true); // Open the popup
    setMenuOpen(false); // Close the dropdown menu
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // Close the popup
  };

  const handleUserUpdate = (updatedField, newValue) => {
    if (newValue === "") {
      return;
    }

    if (updatedField === "class") {
      setUser((prevUser) => ({
        ...prevUser,
        classname: newValue,
      }));
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        [updatedField]: newValue,
      }));
    }
  };

  return (
    <div className="h-screen bg-[#FFFFFF] text-white overflow-y-auto scrollbar-hide">
      <Loading isLoading={loading} />
      <HeaderAfterSignup />
      <div className="h-screen mx-auto grid grid-cols-1 md:grid-cols-4 gap-0.5 overflow-y-auto scrollbar-hide">
        {/* Sidebar */}
        <div className="col-span-1 bg-gradient-to-r from-[#112D4E] to-[#0F1A36] p-6 shadow-xl relative overflow-y-auto scrollbar-hide">
          <div className="absolute top-4 right-4">
            <div
              className="relative group"
              onMouseEnter={() => setMenuOpen(true)}
              onMouseLeave={() => setMenuOpen(false)}
            >
              {/* Three Dots Button */}
              <button className="text-white text-lg hover:text-[#FF9100] focus:outline-none px-3 py-3 rounded-full hover:bg-[#FF9100] transition">
                <FiEdit className="text-white text-2xl" />
              </button>

              {/* Dropdown Menu */}
              {menuOpen && (
                <div className="absolute right-0 mt-0 w-52 bg-[#1F3A64] rounded-lg shadow-xl z-10">
                  {[
                    "Username",
                    "Email",
                    "Class",
                    "Bio",
                    "Profile Picture",
                    "Password",
                  ].map((field, index) => (
                    <button
                      key={index}
                      onClick={() => handleOpenPopup(field.toLowerCase())} // Open popup with the selected field
                      className="w-full px-4 py-3 text-left text-white font-bold hover:bg-[#000e3dfb] hover:text-[#ffffff] rounded transition"
                    >
                      Change {field}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center space-y-6 p-2 m-2">
            {/* Profile Picture Section */}
            <div className="relative w-32 h-32">
              <img
                src={
                  user?.profilePicture?.trim()
                    ? user.profilePicture
                    : "../../assets/logo_half.png"
                }
                alt="Profile"
                className="w-full h-full rounded-full border-4 border-[#FF9100] object-cover"
              />
            </div>

            {/* User Info Section */}
            <div className="w-full p-4 rounded-lg space-y-4">
              {[
                { label: "Username", value: user?.username, name: "username" },
                { label: "Email", value: user?.email, name: "email" },
                {
                  label: "Class",
                  value: user?.classname || "Not specified",
                  name: "classname",
                },
              ].map((item, index) => (
                <div>
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <p className="font-semibold">{item.label}</p>
                  </div>
                  <div>
                    <p className="text-[#FF9100] font-bold text-lg">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bio Section */}
            <div className="w-full text-center">
              <h3 className="font-extrabold text-2xl text-[#FF9100] mb-2">
                Bio
              </h3>
              <div className="bg-[#1F3C64] p-4 rounded-lg">
                <p className="text-white">
                  {user?.bio || (
                    <span className="italic text-[#FF9100]">
                      No bio added yet.
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-3 bg-gradient-to-br from-[#0F1A36] via-[#2C4A75] to-[#0A1C36] p-10 shadow-lg overflow-y-auto scrollbar-hide">
          {/* Stats Section */}
          <section className="mb-6">
            <h2 className="text-3xl font-extrabold text-[#FF9100] mb-4">
              Your Stats
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-gradient-to-r from-[#FF9100]/80 via-[#FFD700]/80 to-[#FF9100]/80 p-4 rounded-lg text-center shadow-lg">
                <h3 className="text-lg font-bold text-[#000e3dfb]">
                  Total Quizzes
                </h3>
                <p className="text-white text-xl font-extrabold">
                  {user?.totalQuizzesGiven}
                </p>
              </div>
              <div className="bg-gradient-to-r from-[#FF9100]/80 via-[#FFD700]/80 to-[#FF9100]/80 p-4 rounded-lg text-center shadow-lg">
                <h3 className="text-lg font-bold text-[#000e3dfb]">
                  Average Accuracy
                </h3>
                <p className="text-white text-xl font-extrabold ">
                  {user?.accuracy}%
                </p>
              </div>
              <div className="bg-gradient-to-r from-[#FF9100]/80 via-[#FFD700]/80 to-[#FF9100]/80 p-4 rounded-lg text-center shadow-lg">
                <h3 className="text-lg font-bold text-[#000e3dfb]">
                  Highest Score
                </h3>
                <p className="text-white text-xl font-extrabold">
                  {user?.maxScore}%
                </p>
              </div>
              <div className="bg-gradient-to-r from-[#FF9100]/80 via-[#FFD700]/80 to-[#FF9100]/80 p-4 rounded-lg text-center shadow-lg">
                <h3 className="text-lg font-bold text-[#000e3dfb]">
                  Lowest Score
                </h3>
                <p className="text-white text-xl font-extrabold">
                  {user?.minScore}%
                </p>
              </div>
            </div>
          </section>

          {/* Quiz History */}

          <QuizHistory quizzes={sortedQuizzes} />
        </div>
      </div>

      {/* Popup Component */}
      <Popupupdate
        isOpen={isPopupOpen}
        closePopup={handleClosePopup}
        fieldType={currentField} // Pass the field being edited to the popup
        updateUser={(updatedField, newValue) =>
          handleUserUpdate(updatedField, newValue)
        }
      />
    </div>
  );
};

export default ProfilePage;
