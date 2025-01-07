import React, { useState, useEffect } from "react";
import HeaderAfterSignup from "../components/HeaderAfterSignup";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const QuizSearchPage = () => {
  const [userid, setuserid] = useState("");
  const [quizzes, setQuizzes] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("");
  const [loading, setLoading] = useState(true);

  const data = {
    "Class 4": {
      English: ["Parts of Speech"],
    },
    "Class 5": {
      Mathematics: ["Addition and Subtraction"],
    },
    "Class 6": {
      Science: ["States of Matter"],
    },
    "Class 7": {
      "General Knowledge": ["World Facts"],
    },
    "Class 12": {
      Physics: ["Quantum Mechanics"],
    },
  };

  const fetchQuizData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/quiz-search", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include credentials for the request
      });

      if (!response.ok) {
        throw new Error("Failed to fetch quiz data.");
      }

      const responseData = await response.json();

      const updatedQuizzes = Array.isArray(responseData.data.quizzes)
        ? responseData.data.quizzes
        : Object.values(responseData.data.quizzes);

      if (responseData?.data.userid) {
        setuserid(responseData.data.userid);
      }

      setQuizzes(updatedQuizzes);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
      setQuizzes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizData();
  }, []);

  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesDifficulty = selectedDifficulty
      ? quiz.difficulty.toLowerCase() === selectedDifficulty.toLowerCase()
      : true;
    const matchesFormat = selectedFormat
      ? quiz.format.toLowerCase() === selectedFormat.toLowerCase()
      : true;
    const matchesTopic = selectedTopic
      ? quiz.topic?.toLowerCase() === selectedTopic.toLowerCase()
      : true;

    return matchesDifficulty && matchesFormat && matchesTopic;
  });

  const navigate = useNavigate();

  const handleStartQuiz = async (quizId) => {
    try {
      // Fetch the quiz data

      const response = await fetch(
        `http://localhost:5000/api/quiz-page/${userid}/${quizId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include credentials for the request
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch quiz data");
      }

      console.log("response ok");

      // Now navigate to the quiz-specific page
      navigate(`/quiz-page/${userid}/${quizId}`); // Passing quizData to the next page (optional)
    } catch (error) {
      console.error("Error fetching quiz data:", error.message);
      // Handle errors, e.g., show a toast notification
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1A36] via-[#2C4A75] to-[#0A1C36] text-white">
      <Loading isLoading={loading} />
      <HeaderAfterSignup />
      <div className="max-w-screen mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-r from-[#112D4E] to-[#0F1A36] p-6 rounded-lg shadow-xl">
            <label className="text-xl text-center font-bold mb-12 bg-gradient-to-r from-[#FF9100] via-[#FFD700] to-[#FF9100] bg-clip-text text-transparent drop-shadow-lg">
              Select Class
            </label>
            <select
              className="w-full p-3 bg-[#23395D] rounded-lg text-white border border-[#FF9100] focus:ring-2 focus:ring-[#FF9100] mt-2"
              value={selectedClass}
              onChange={(e) => {
                setSelectedClass(e.target.value);
                setSelectedSubject("");
                setSelectedTopic("");
              }}
            >
              <option value="" disabled>
                Choose a class
              </option>
              {Object.keys(data).map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-gradient-to-r from-[#112D4E] to-[#0F1A36] p-6 rounded-lg shadow-xl">
            <label className="text-xl text-center font-bold mb-12 bg-gradient-to-r from-[#FF9100] via-[#FFD700] to-[#FF9100] bg-clip-text text-transparent drop-shadow-lg">
              Select Subject
            </label>
            <select
              className="w-full p-3 bg-[#23395D] rounded-lg text-white border border-[#FF9100] focus:ring-2 focus:ring-[#FF9100] mt-2"
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                setSelectedTopic("");
              }}
              disabled={!selectedClass}
            >
              <option value="" disabled>
                {selectedClass ? "Choose a subject" : "Select class first"}
              </option>
              {selectedClass &&
                Object.keys(data[selectedClass]).map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
            </select>
          </div>

          <div className="bg-gradient-to-r from-[#112D4E] to-[#0F1A36] p-6 rounded-lg shadow-xl">
            <label className="text-xl text-center font-bold mb-12 bg-gradient-to-r from-[#FF9100] via-[#FFD700] to-[#FF9100] bg-clip-text text-transparent drop-shadow-lg">
              Select Topic
            </label>
            <select
              className="w-full p-3 bg-[#23395D] rounded-lg text-white border border-[#FF9100] focus:ring-2 focus:ring-[#FF9100] mt-2"
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              disabled={!selectedSubject}
            >
              <option value="" disabled>
                {selectedSubject ? "Choose a topic" : "Select subject first"}
              </option>
              {selectedSubject &&
                data[selectedClass][selectedSubject].map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-r from-[#112D4E] to-[#0F1A36] p-6 rounded-lg shadow-xl">
            <label className="text-xl text-center font-bold mb-12 bg-gradient-to-r from-[#FF9100] via-[#FFD700] to-[#FF9100] bg-clip-text text-transparent drop-shadow-lg">
              Select Difficulty
            </label>
            <select
              className="w-full p-3 bg-[#23395D] rounded-lg text-white border border-[#FF9100] focus:ring-2 focus:ring-[#FF9100] mt-2"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
              <option value="" disabled>
                Choose a difficulty level
              </option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div className="bg-gradient-to-r from-[#112D4E] to-[#0F1A36] p-6 rounded-lg shadow-xl">
            <label className="text-xl text-center font-bold mb-12 bg-gradient-to-r from-[#FF9100] via-[#FFD700] to-[#FF9100] bg-clip-text text-transparent drop-shadow-lg">
              Select Format
            </label>
            <select
              className="w-full p-3 bg-[#23395D] rounded-lg text-white border border-[#FF9100] focus:ring-2 focus:ring-[#FF9100] mt-2"
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
            >
              <option value="" disabled>
                Choose a format
              </option>
              <option value="MCQ-Single">MCQ-Single</option>
              <option value="MCQ-Multiple">MCQ-Multiple</option>
              <option value="True/False">True/False</option>
              <option value="Fill-in-the-Blank">Fill-in-the-Blank</option>
            </select>
          </div>
        </div>

        {selectedTopic && (
          <div>
            <h2 className="text-4xl text-center font-extrabold mb-12 bg-gradient-to-r from-[#FF9100] via-[#FFD700] to-[#FF9100] bg-clip-text text-transparent drop-shadow-lg">
              Available Quizzes for{" "}
              <span className="text-[#FF9100]">{selectedTopic}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 px-4">
              {filteredQuizzes.map((quiz) => (
                <div
                  key={quiz._id}
                  className="bg-gradient-to-br from-[#0F1A36] via-[#2C4A75] to-[#0A1C36] p-6 rounded-xl shadow-2xl"
                >
                  <h3 className="text-2xl font-semibold text-[#FF9100] mb-4 text-center">
                    {quiz.quizName}
                  </h3>
                  <div className="mb-4">
                    <p className="text-lg text-white mb-2">
                      <strong>Type:</strong>{" "}
                      <span className="text-[#FFD700]">{quiz.format}</span>
                    </p>
                    <p className="text-lg text-white mb-2">
                      <strong>Questions:</strong>{" "}
                      <span className="text-[#FFD700]">
                        {quiz.questions.length}
                      </span>
                    </p>
                    <p className="text-lg text-white">
                      <strong>Difficulty:</strong>{" "}
                      <span className="text-[#FFD700]">{quiz.difficulty}</span>
                    </p>
                  </div>

                  <button
                    className="w-full px-6 py-2 bg-gradient-to-r from-[#FF9100] to-[#FF5E00] text-[#ffffff] text-lg font-semibold rounded-full shadow-lg hover:scale-105 transform transition duration-300"
                    onClick={() => handleStartQuiz(quiz._id)}
                  >
                    Start Quiz
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizSearchPage;
