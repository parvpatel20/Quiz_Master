import React, { useState, useEffect } from "react";
import HeaderAfterSignup from "../components/HeaderAfterSignup";
import { useParams } from "react-router-dom";
import { FaClipboardList, FaCheckCircle} from "react-icons/fa";
import { AiOutlineFieldTime, AiOutlineCheck, AiOutlineSwap} from "react-icons/ai";
import { BsQuestionCircleFill } from "react-icons/bs";
import Loading from "../components/Loading";

const QuizPage = () => {
  
  const { userid, quizid } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [showSummaryPage, setShowSummaryPage] = useState(false);
  const [showResultPage, setShowResultPage] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isTimeout, setIsTimeout] = useState(false); // NEW: Track timeout state
  const [loading, setLoading] = useState(true); // NEW: Track loading state

  useEffect(() => {
    const fetchQuiz = async () => {
      try {

        const response = await fetch(`https://quiz-master-backend-1a1s.onrender.com/api/quiz-page/${userid}/${quizid}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        credentials: 'include', // Include credentials for the request
        });

        // console.log(response);

        if (!response.ok) {
          throw new Error("Failed to fetch quiz data");
        }
        const responseData = await response.json();

        const quizdata = responseData.data.quiz;

        // console.log("Quiz Data:", quizdata);

        if (quizdata && quizdata.totalTime) {
          setQuizData(quizdata);
          setTimeLeft(quizdata.totalTime * 60); // Convert minutes to seconds

        }
        else {
          console.error("Quiz data is missing totalTime attribute");
        }
      } catch (err) {
        console.log("Error occured !!", err);
      } finally {
        setLoading(false); // Set loading to false after the data fetch
      }
    };

    fetchQuiz();
  }, [userid, quizid]);

  useEffect(() => {
    let timer;
    if (quizStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }
    if (timeLeft === 0) {
      setIsTimeout(true);
      submitQuiz();
    }
    return () => clearInterval(timer);
  }, [quizStarted, timeLeft]); 

  const clearOptions = (questionIndex) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[questionIndex] = null; // Reset the answer for the current question
    setSelectedAnswers(updatedAnswers);
  };
  
  const handleupdateQuizHistory = async (userId, quizId, score) => {
    try {
  
      const response = await fetch(`https://quiz-master-backend-1a1s.onrender.com/api/quiz-page/${userId}/${quizId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          score: score,
          quizDate: new Date(), // Send the current date
        }),
        credentials: 'include', // Include credentials for the request
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Quiz history updated successfully:', data);
      } else {
        console.error('Error updating quiz history:', data.message);
      }
    } catch (error) {
      console.error('Error while updating quiz history:', error);
    }
  };

  const handleOptionChange = (option, questionIndex, quizFormat) => {
    const updatedAnswers = [...selectedAnswers];
  
    switch (quizFormat.toLowerCase()) {
      case "mcq-single":
        if (updatedAnswers[questionIndex]?.[0] === option) {
          updatedAnswers[questionIndex] = null; // Deselect and mark as unanswered
        } else {
          updatedAnswers[questionIndex] = [option]; // Store as an array for consistency
        }
        break;
  
      case "mcq-multiple":
        if (updatedAnswers[questionIndex]?.includes(option)) {
          updatedAnswers[questionIndex] = updatedAnswers[questionIndex].filter(
            (answer) => answer !== option
          );
          if (updatedAnswers[questionIndex].length === 0) {
            updatedAnswers[questionIndex] = null; // Mark as unanswered if empty
          }
        } else {
          updatedAnswers[questionIndex] = [
            ...(updatedAnswers[questionIndex] || []),
            option,
          ];
        }
        break;
  
      case "true/false":
        if (updatedAnswers[questionIndex]?.[0] === option) {
          updatedAnswers[questionIndex] = null; // Deselect and mark as unanswered
        } else {
          updatedAnswers[questionIndex] = [option]; // Store as an array for consistency
        }
        break;
  
      case "fill-in-the-blank":
        if (option.trim() === "") {
          updatedAnswers[questionIndex] = null; // Mark as unanswered if the text area is empty
        } else {
          updatedAnswers[questionIndex] = [option.trim()]; // Store the text answer as an array
        }
        break;
  
      default:
        console.warn(`Unsupported quiz format: ${quizData?.format}`);
        break;
    }
  
    setSelectedAnswers(updatedAnswers);
  };
  

  const navigateToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setTimeLeft(quizData.totalTime * 60);
    setIsTimeout(false);
  };

  const submitQuiz = () => {
    setQuizSubmitted(true);
    setQuizStarted(false);
    setShowSummaryPage(true);
  };

  const handleRestartQuiz = () => {
    setQuizStarted(false);
    setQuizSubmitted(false);
    setShowSummaryPage(false);
    setShowResultPage(false);
    setSelectedAnswers([]);
    setCurrentQuestionIndex(0);
    setTimeLeft(quizData.totalTime * 60);
    setIsTimeout(false);
  };

  const getFormatName = (format) => {
    switch (format?.toLowerCase()) {
      case 'mcq-single':
        return 'MCQ (Single Correct)';
      case 'mcq-multiple':
        return 'MCQ (Multiple Correct)';
      case 'true/false':
        return 'True/False';
      case 'fill-in-the-blank':
        return 'Fill in the Blank';
      default:
        return 'Unknown Format';
    }
  };

  const calculateScore = () => {
    let totalScore = 0;

    quizData?.questions.forEach((question, index) => {
      // Correctly parse the correctOption to get an array of numbers (indexes)
      const correctOptions = question?.correctOption.map((option) =>
        option["$numberInt"] ? parseInt(option["$numberInt"], 10) : option
      ); // Mapping the correct option to an integer

      const userAnswers = selectedAnswers[index] || []; // Default to an empty array if no answer is selected

      // Extract the correct answers from the options based on the correctOption indexes
      const correctAnswers = correctOptions.map(
        (index) => question?.options[index]
      ); // Map the indexes to the correct answer texts

      switch (quizData?.format.toLowerCase()) {
        case "mcq-single":
          // For MCQ-Single, check if the single selected answer matches the correct answer string
          if (
            userAnswers.length === 1 &&
            userAnswers[0].trim().toLowerCase() ===
              correctAnswers[0].trim().toLowerCase()
          ) {
            totalScore += 1;
          }
          break;

        case "mcq-multiple":
          // For MCQ-Multiple, check if all correct answers are selected and no extras
          if (
            userAnswers.length === correctAnswers.length &&
            userAnswers.every((answer) =>
              correctAnswers.some(
                (correctAnswer) =>
                  correctAnswer.trim().toLowerCase() ===
                  answer.trim().toLowerCase()
              )
            ) &&
            correctAnswers.every((correctAnswer) =>
              userAnswers.some(
                (answer) =>
                  answer.trim().toLowerCase() ===
                  correctAnswer.trim().toLowerCase()
              )
            )
          ) {
            totalScore += 1;
          }
          break;

        case "true/false":
          if (userAnswers && userAnswers.length === 1) {
          // For True/False, check if the selected answer matches the isCorrect value (1 for true, 0 for false)
          const correctIsTrue = question?.isCorrect === 1; // If isCorrect is 1, the answer is true
          const userIsTrue = userAnswers.length === 1 && userAnswers[0].trim().toLowerCase() === "true";

          console.log(userIsTrue, correctIsTrue);

          if (userIsTrue === correctIsTrue) {
            totalScore += 1;
          }
        }
          break;

        case "fill-in-the-blank":
          // For Fill-in-the-blank, compare the answer text (case-insensitive)
          const correctAnswer = question?.correctAnswer; // The correct answer as a string
          if (
            userAnswers.length === 1 &&
            userAnswers[0]?.trim().toLowerCase() ===
              correctAnswer?.trim().toLowerCase()
          ) {
            totalScore += 1;
          }
          break;

        default:
          console.warn(`Unsupported question format: ${question?.format}`);
          break;
      }
    });

    return totalScore;
  };

  const getMissedQuestionsCount = () => {
    return quizData?.questions.filter((_, index) => !selectedAnswers[index])
      .length;
  };

  useEffect(() => {
    if (showResultPage) {
      handleupdateQuizHistory(userid, quizid, parseFloat(((calculateScore() / quizData?.questions.length) * 100).toFixed(2)));
    }
  }, [showResultPage, userid, quizid, parseFloat(((calculateScore() / quizData?.questions.length) * 100).toFixed(2))]); 


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1A36] via-[#2C4A75] to-[#0A1C36] text-[#1D2951]">
      <Loading isLoading={loading} />
      <div className="min-h-screen shadow-lg">
        {/* Instructions Page */}
        {!quizStarted && !quizSubmitted && (
          <div className="p-8">
            {/* Title */}
            <h2 className="text-4xl font-extrabold text-[#FFFFFF] mb-6 text-center tracking-wide uppercase shadow-sm">
              Quiz Instructions
            </h2>

            {/* Divider */}
            <div className="w-full h-1 bg-[#FF7F00] mx-auto mb-6 "></div>

            {/* Instructions List */}
            <ul className="text-xl space-y-6 mb-8 text-[#FFFFFF] pl-6 leading-relaxed">
              <li className="flex items-center">
                <AiOutlineFieldTime className="text-yellow-400 text-2xl mr-3" />
                <span>
                  Total Time : <strong>{quizData?.totalTime} Minutes</strong>
                </span>
              </li>
              <li className="flex items-center">
                <BsQuestionCircleFill className="text-blue-400 text-2xl mr-3" />
                <span>
                  Number of Questions :{" "}
                  <strong>{quizData?.questions.length}</strong>
                </span>
              </li>
              <li className="flex items-center">
                <FaClipboardList className="text-green-400 text-2xl mr-3" />
                <span>
                  Format : <strong>{getFormatName(quizData?.format)}</strong>
                </span>
              </li>
              <li className="flex items-center">
                <AiOutlineCheck className="text-green-500 text-2xl mr-3" />
                <span>
                  <strong>No negative marking</strong>
                </span>
              </li>
              <li className="flex items-center">
                <AiOutlineSwap className="text-orange-400 text-2xl mr-3" />
                <span className="font-semibold">
                  Free navigation between questions
                </span>
              </li>
              <li className="flex items-center">
                <img
                  src="../../assets/red_mark.png"
                  alt="Red Mark"
                  className="w-6 h-6 mr-3"
                />
                <span className="font-semibold mr-4">Unanswered</span>
                <img
                  src="../../assets/green_mark.png"
                  alt="Green Mark"
                  className="w-6 h-6 mr-3"
                />
                <span className="font-semibold">Answered</span>
              </li>
              <li className="flex items-center">
                <FaCheckCircle className="text-yellow-500 text-2xl mr-3" />
                <span>
                  Maximum Marks : <strong>{quizData?.questions.length}</strong>
                </span>
              </li>
            </ul>

            {/* Animated Button */}
            <button
              onClick={startQuiz}
              className="bg-[#FF7F00] hover:bg-[#FF9100] text-white font-medium py-3 px-8 rounded-full w-50% mt-6 transition-all duration-300 shadow-lg transform hover:scale-105 hover:shadow-2xl mx-auto block"
            >
              Start Quiz
            </button>
          </div>
        )}

        {/* Quiz Timer and Question */}
        {quizStarted && (
          <div className="flex">
            {/* Sidebar for Question Navigation */}
            <div className="w-1/4 h-screen p-6 shadow-2xl overflow-y-auto scrollbar-hide">
              <h2 className="text-xl font-bold text-[#ff9100] mb-6 text-center border-b border-[#ff9100] pb-2">
                All Questions
              </h2>
              <div
                className="grid grid-cols-4 gap-3"
                style={{
                  gridTemplateColumns: `repeat(auto-fill, minmax(60px, 1fr))`,
                }}
              >
                {quizData?.questions.map((_, index) => (
                  <button
                    key={index}
                    className={`relative w-16 h-16 transform transition-transform hover:scale-110 group ${
                      selectedAnswers[index] ? "bg-green-500" : "bg-red-500"
                    }`}
                    onClick={() => navigateToQuestion(index)}
                    style={{
                      clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", // Diamond Shape
                    }}
                  >
                    {/* Text inside the button */}
                    <span className="absolute inset-0 flex items-center justify-center font-medium text-white transition-opacity duration-300">
                      {index + 1}
                    </span>

                    {/* Hover Effect */}
                    <span
                      className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg`}
                      style={{
                        clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                      }}
                    ></span>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Quiz Content */}
            <div className="w-3/4 p-8 h-screen overflow-y-auto scrollbar-hide">
              {/* Timer */}
              <div className="flex justify-between items-center mb-6 bg-[#f3f3f3] p-4 rounded-lg shadow-md">
                {/* Timer Section */}
                <div className="flex items-center space-x-4">
                  <div className="relative w-10 h-10 flex items-center justify-center">
                    {/* Time Left */}
                    <span className="absolute inset-0 flex items-center justify-center font-bold text-[#1f3064] text-lg">
                      {Math.floor(timeLeft / 60)}:
                      {String(timeLeft % 60).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 h-3 rounded-lg overflow-hidden ml-6">
                  <div
                    className={`h-full transition-all duration-500 ${
                      timeLeft > 120
                        ? "bg-green-500"
                        : timeLeft > 60
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{
                      width: `${
                        (timeLeft / (quizData?.totalTime * 60)) * 100
                      }%`,
                    }}
                  ></div>
                </div>

                {/* Question Number */}
                <span className="bg-[#1f3064] text-white px-4 ml-4 py-2 rounded-full text-sm font-medium shadow-md text-center">
                  Question {currentQuestionIndex + 1}/
                  {quizData?.questions.length}
                </span>
              </div>

              {/* Question */}
              <div className="bg-gradient-to-r from-[#112D4E] to-[#0F1A36] text-[#ffffff] p-6 rounded-lg mb-6">
                <h2 className="text-2xl font-bold text-[#ff9100] mb-4">
                  {quizData?.questions[currentQuestionIndex].questionText}
                </h2>

                {/* Render different question types */}
                <div className="space-y-4">
                  {quizData?.format === "MCQ-Single" ||
                  quizData?.format === "MCQ-Multiple" ? (
                    // MCQ-Single or MCQ-Multiple
                    quizData?.questions[currentQuestionIndex].options.map(
                      (option, idx) => (
                        <label
                          key={idx}
                          className="block cursor-pointer transition duration-300 hover:bg-[#ff5e00] hover:text-[#ffffff] p-4 rounded-lg flex justify-start items-center"
                        >
                          <input
                            type={
                              quizData?.format === "MCQ-Single"
                                ? "radio"
                                : "checkbox"
                            }
                            name={`question-${currentQuestionIndex}`}
                            value={option}
                            checked={
                              selectedAnswers[currentQuestionIndex]?.includes(
                                option
                              ) ||
                              selectedAnswers[currentQuestionIndex] === option
                            }
                            onChange={() =>
                              handleOptionChange(
                                option,
                                currentQuestionIndex,
                                quizData?.format
                              )
                            }
                            className="hidden peer"
                          />
                          <span
                            className={`inline-block w-4 h-4 mr-3 rounded-full border-2 border-[#ffffff] peer-checked:bg-[#008000] peer-checked:border-[#008000] transition duration-300 flex justify-center items-center`}
                          ></span>
                          {option}
                        </label>
                      )
                    )
                  ) : quizData?.format === "True/False" ? (
                    // True/False
                    <div className="space-y-4">
                      {["True", "False"].map((option, idx) => (
                        <label
                          key={idx}
                          className="block cursor-pointer transition duration-300 hover:bg-[#ff5e00] hover:text-[#ffffff] p-4 rounded-lg flex justify-start items-center"
                        >
                          <input
                            type="radio"
                            name={`question-${currentQuestionIndex}`}
                            value={option}
                            checked={
                              selectedAnswers[currentQuestionIndex]?.[0] ===
                              option
                            }
                            onChange={() =>
                              handleOptionChange(
                                option,
                                currentQuestionIndex,
                                "True/False"
                              )
                            }
                            className="hidden peer"
                          />
                          <span
                            className={`inline-block w-4 h-4 mr-3 rounded-full border-2 border-[#ffffff] peer-checked:bg-[#008000] peer-checked:border-[#008000] transition duration-300 flex justify-center items-center`}
                          ></span>
                          {option}
                        </label>
                      ))}
                    </div>
                  ) : quizData?.format === "Fill-in-the-Blank" ? (
                    // Fill-in-the-blank
                    <textarea
                      value={selectedAnswers[currentQuestionIndex] || ""}
                      onChange={(e) =>
                        handleOptionChange(
                          e.target.value,
                          currentQuestionIndex,
                          "Fill-in-the-blank"
                        )
                      }
                      placeholder="Type your answer here"
                      className="w-full p-4 border-2 border-[#ff9100] rounded-lg text-black"
                    />
                  ) : null}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <button
                  onClick={() => navigateToQuestion(currentQuestionIndex - 1)}
                  disabled={currentQuestionIndex === 0}
                  className={`px-6 py-2 text-[#ffffff] text-lg font-semibold rounded-full shadow-lg hover:scale-105 transform transition duration-300 ${
                    currentQuestionIndex === 0
                      ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#FF9100] to-[#FF5E00] text-[#ffffff]"
                  }`}
                >
                  Previous
                </button>

                <button
                  onClick={() => clearOptions(currentQuestionIndex)}
                  className="px-4 py-2 bg-red-500 text-[#ffffff] text-lg font-semibold rounded-full shadow-lg hover:bg-red-600 transform transition duration-300"
                >
                  Clear Options
                </button>

                <button
                  onClick={() => navigateToQuestion(currentQuestionIndex + 1)}
                  disabled={
                    currentQuestionIndex === quizData?.questions.length - 1
                  }
                  className={`px-6 py-2 text-[#ffffff] text-lg font-semibold rounded-full shadow-lg hover:scale-105 transform transition duration-300 ${
                    currentQuestionIndex === quizData?.questions.length - 1
                      ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#FF9100] to-[#FF5E00] text-[#ffffff]"
                  }`}
                >
                  Next
                </button>
              </div>

              {/* Submit Button */}
              <button
                onClick={submitQuiz}
                className="w-full mt-5 px-6 py-2 bg-gradient-to-r from-[#FF9100] to-[#FF5E00] text-[#ffffff] text-lg font-semibold rounded-full shadow-lg hover:scale-105 transform transition duration-300"
              >
                Submit Quiz
              </button>
            </div>
          </div>
        )}

        {/* Summary Page */}
        {showSummaryPage && !showResultPage && (
          <div className="p-10 pt-40 mb-10 max-w-3xl mx-auto relative overflow-hidden">
            <h2 className="text-4xl font-bold text-[#FFFFFF] mb-8 text-center tracking-wide">
              Quiz Summary
            </h2>

            <div className="text-lg mb-8 text-[#FFFFFF]">
              <div className="flex justify-between mb-6">
                <p className="font-semibold">Attempted Questions:</p>
                <p>{quizData?.questions.length - getMissedQuestionsCount()}</p>
              </div>
              <div className="flex justify-between mb-6">
                <p className="font-semibold">Unattempted Questions:</p>
                <p>{getMissedQuestionsCount()}</p>
              </div>
            </div>

            <div className="flex justify-center gap-10 mt-20">
              <button
                onClick={() => {
                  setShowSummaryPage(false);
                  setQuizStarted(true);
                }}
                disabled={isTimeout}
                className={`px-6 py-2 text-[#ffffff] text-lg font-semibold rounded-full shadow-lg hover:scale-105 transform transition duration-300 ${
                  isTimeout
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#FF9100] to-[#FF5E00] text-[#ffffff]"
                }`}
              >
                Go Back to Quiz
              </button>
              <button
                onClick={() => setShowResultPage(true)}
                className="px-6 py-2 bg-gradient-to-r from-[#FF9100] to-[#FF5E00] text-[#ffffff] text-lg font-semibold rounded-full shadow-lg hover:scale-105 transform transition duration-300"
              >
                Check Your Score
              </button>
            </div>
          </div>
        )}

        {showResultPage && (
          <div className="h-screen overflow-y-auto scrollbar-hide">
            <HeaderAfterSignup />
            <div className="h-screen bg-gradient-to-br from-[#1F3C64] via-[#23395D] to-[#1D2951] text-white py-12 overflow-y-auto scrollbar-hide">
              <h2 className="text-5xl font-bold text-[#FFFFFF] mb-8 text-center tracking-wide">
                🏆 Congratulations!
              </h2>

              <div className="relative flex justify-center items-center mb-8">
                <div className="relative flex flex-col justify-center items-center">
                  <div className="bg-[#FF7F00] text-[#1D2951] font-extrabold text-6xl w-32 h-32 rounded-full flex items-center justify-center shadow-lg">
                    {calculateScore()}
                  </div>
                  <p className="text-xl text-[#FFFFFF] mt-4">
                    <span className="font-bold">Your Score</span> out of{" "}
                    <span className="font-bold">
                      {quizData?.questions.length}
                    </span>
                  </p>
                </div>
              </div>

              <div className="text-center mb-8 px-10">
                <p className="text-lg text-[#FFFFFF]">
                  {calculateScore() >= quizData?.questions.length * 0.8 ? (
                    <>
                      Amazing! 🎉 You've completed the quiz with flying colors! 
                      Keep up the good work and aim for even higher scores!🚀
                      Amazing! 🎉 You've completed the quiz with flying colors! 
                      Keep up the good work and aim for even higher scores!🚀
                      Amazing! 🎉 You've completed the quiz with flying colors! 
                      Keep up the good work and aim for even higher scores!🚀
                      Amazing! 🎉 You've completed the quiz with flying colors! 
                      Keep up the good work and aim for even higher scores!🚀
                      Amazing! 🎉 You've completed the quiz with flying colors! 
                      Keep up the good work and aim for even higher scores!🚀
                      Amazing! 🎉 You've completed the quiz with flying colors! 
                      Keep up the good work and aim for even higher scores!🚀
                      Amazing! 🎉 You've completed the quiz with flying colors! 
                      Keep up the good work and aim for even higher scores!🚀
                    </>
                  ) : calculateScore() >= quizData?.questions.length * 0.5 ? (
                    <>
                      Good job! You've done well, but there’s room for
                      improvement. 😊
                    </>
                  ) : (
                    <>
                      Keep it up! You're almost there. Try again and aim for a
                      better score! 💪
                    </>
                  )}
                </p>
                <p className="text-lg text-[#FFFFFF] mt-4">
                  {calculateScore() >= quizData?.questions.length * 0.8 ? (
                    <>
                      You're a quiz master! Keep this momentum going for even
                      greater achievements! 🌟
                    </>
                  ) : calculateScore() >= quizData?.questions.length * 0.5 ? (
                    <>
                      You’ve got the basics covered, but with more practice,
                      you’ll reach the top! Keep pushing! 🔥
                    </>
                  ) : (
                    <>
                      Don’t be discouraged! Take this as a learning opportunity
                      and try again for an even better score! 📚
                    </>
                  )}
                </p>
              </div>

              <div className="text-center">
                <button
                  onClick={handleRestartQuiz}
                  className="px-6 py-2 bg-gradient-to-r from-[#FF9100] to-[#FF5E00] text-[#ffffff] text-lg font-semibold rounded-full shadow-lg hover:scale-105 transform transition duration-300"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
