
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  Play, 
  Trophy, 
  Target, 
  BookOpen, 
  Users, 
  ChevronLeft, 
  ChevronRight,
  Award,
  Zap,
  Star,
  Sparkles
} from "lucide-react";
import HeaderAfterSignup from "../components/HeaderAfterSignup";
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
    updatedAnswers[questionIndex] = null;
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
          updatedAnswers[questionIndex] = null;
        } else {
          updatedAnswers[questionIndex] = [option];
        }
        break;
  
      case "mcq-multiple":
        if (updatedAnswers[questionIndex]?.includes(option)) {
          updatedAnswers[questionIndex] = updatedAnswers[questionIndex].filter(
            (answer) => answer !== option
          );
          if (updatedAnswers[questionIndex].length === 0) {
            updatedAnswers[questionIndex] = null;
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
          updatedAnswers[questionIndex] = null;
        } else {
          updatedAnswers[questionIndex] = [option];
        }
        break;
  
      case "fill-in-the-blank":
        if (option.trim() === "") {
          updatedAnswers[questionIndex] = null;
        } else {
          updatedAnswers[questionIndex] = [option.trim()];
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

  const getFormatIcon = (format) => {
    switch (format?.toLowerCase()) {
      case 'mcq-single': return <Award className="w-6 h-6 text-white" />;
      case 'mcq-multiple': return <Users className="w-6 h-6 text-white" />;
      case 'true/false': return <Zap className="w-6 h-6 text-white" />;
      case 'fill-in-the-blank': return <BookOpen className="w-6 h-6 text-white" />;
      default: return <Users className="w-6 h-6 text-[#FF9100]" />;
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
    return quizData?.questions.filter((_, index) => !selectedAnswers[index]).length;
  };

  useEffect(() => {
    if (showResultPage) {
      handleupdateQuizHistory(userid, quizid, parseFloat(((calculateScore() / quizData?.questions.length) * 100).toFixed(2)));
    }
  }, [showResultPage, userid, quizid, parseFloat(((calculateScore() / quizData?.questions.length) * 100).toFixed(2))]); 

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1A36] via-[#2C4A75] to-[#0A1C36] text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[#FF9100]/20 to-[#FFD700]/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-[#2C4A75]/30 to-[#FF9100]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <Loading isLoading={loading} />
      <div className="relative z-10">
        {/* Instructions Page */}
        {!quizStarted && !quizSubmitted && (
          <div className="min-h-screen flex items-center justify-center p-6">
            <div className="max-w-4xl w-full">
              {/* Hero Section */}
              <div className="text-center mb-12">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-full blur-2xl opacity-60 animate-pulse"></div>
                  <div className="relative p-4 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-full">
                    <BookOpen className="w-12 h-12 text-white" />
                  </div>
                </div>
                
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#FF9100] via-[#FFD700] to-[#FF6B35] bg-clip-text text-transparent">
                  {quizData?.quizName || "Quiz Instructions"}
                </h1>
                
                <div className="w-20 h-1 bg-gradient-to-r from-[#FF9100] to-[#FFD700] mx-auto rounded-full"></div>
              </div>

              {/* Instructions Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="bg-gradient-to-br from-[#1a2845]/90 via-[#2d3f5f]/80 to-[#0f1729]/90 backdrop-blur-lg p-6 rounded-3xl border border-[#FF9100]/30 shadow-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-xl">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#FF9100]">Time Limit</h3>
                      <p className="text-white text-xl font-semibold">{quizData?.totalTime} Minutes</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#1a2845]/90 via-[#2d3f5f]/80 to-[#0f1729]/90 backdrop-blur-lg p-6 rounded-3xl border border-[#FF9100]/30 shadow-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-xl">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#FF9100]">Questions</h3>
                      <p className="text-white text-xl font-semibold">{quizData?.questions.length} Total</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#1a2845]/90 via-[#2d3f5f]/80 to-[#0f1729]/90 backdrop-blur-lg p-6 rounded-3xl border border-[#FF9100]/30 shadow-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-xl">
                      {getFormatIcon(quizData?.format)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#FF9100]">Format</h3>
                      <p className="text-white text-lg font-semibold">{getFormatName(quizData?.format)}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#1a2845]/90 via-[#2d3f5f]/80 to-[#0f1729]/90 backdrop-blur-lg p-6 rounded-3xl border border-[#FF9100]/30 shadow-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-xl">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#FF9100]">Max Marks</h3>
                      <p className="text-white text-xl font-semibold">{quizData?.questions.length}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Instructions */}
              <div className="bg-gradient-to-br from-[#1a2845]/90 via-[#2d3f5f]/80 to-[#0f1729]/90 backdrop-blur-lg p-8 rounded-3xl border border-[#FF9100]/30 shadow-2xl mb-8">
                <h3 className="text-xl font-bold text-[#FF9100] mb-6 text-center">Quiz Guidelines</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span>No negative marking</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span>Free navigation between questions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-green-500 rounded-sm flex-shrink-0"></div>
                    <span>Answered questions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-red-500 rounded-sm flex-shrink-0"></div>
                    <span>Unanswered questions</span>
                  </div>
                </div>
              </div>

              {/* Start Button */}
              <div className="text-center">
                <button
                  onClick={startQuiz}
                  className="group relative px-12 py-4 bg-gradient-to-r from-[#FF9100] to-[#FFD700] text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-[#FF9100]/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#FF9100] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center gap-3">
                    <Play className="w-6 h-6" />
                    Start Quiz
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quiz Interface */}
        {quizStarted && (
          <div className="min-h-screen flex">
            {/* Sidebar for Question Navigation */}
            <div className="w-80 bg-gradient-to-b from-[#1a2845]/95 via-[#2d3f5f]/90 to-[#0f1729]/95 backdrop-blur-lg border-r border-[#FF9100]/30 p-6">
              <div className="mb-8">
                <div className="text-center mb-6">
                  <h2 className="text-lg font-bold text-[#FF9100] mb-2">Quiz Progress</h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-[#FF9100] to-[#FFD700] mx-auto rounded-full"></div>
                </div>
                
                {/* Timer Display */}
                <div className="bg-gradient-to-r from-[#FF9100]/20 to-[#FFD700]/20 backdrop-blur-sm p-4 rounded-2xl border border-[#FF9100]/30 mb-6">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <Clock className="w-5 h-5 text-[#FF9100]" />
                    <span className="text-lg font-bold text-white">{formatTime(timeLeft)}</span>
                  </div>
                  <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-1000 ${
                        timeLeft > 120 ? "bg-green-500" : timeLeft > 60 ? "bg-yellow-500" : "bg-red-500"
                      }`}
                      style={{
                        width: `${(timeLeft / (quizData?.totalTime * 60)) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Question Progress */}
                <div className="text-center mb-6">
                  <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-full text-white font-semibold">
                    Question {currentQuestionIndex + 1} of {quizData?.questions.length}
                  </div>
                </div>
              </div>

              {/* Question Grid */}
              <div>
                <h3 className="text-sm font-semibold text-gray-300 mb-4 text-center">All Questions</h3>
                <div className="grid grid-cols-5 gap-3">
                  {quizData?.questions.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => navigateToQuestion(index)}
                      className={`w-12 h-12 rounded-xl font-semibold transition-all duration-300 border-2 ${
                        currentQuestionIndex === index
                          ? "bg-gradient-to-r from-[#FF9100] to-[#FFD700] text-white border-[#FF9100] shadow-lg scale-110"
                          : selectedAnswers[index]
                          ? "bg-green-500 text-white border-green-400 hover:scale-105"
                          : "bg-red-500/80 text-white border-red-400 hover:scale-105"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Quiz Content */}
            <div className="flex-1 p-8">
              {/* Question Content */}
              <div className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-br from-[#1a2845]/95 via-[#2d3f5f]/90 to-[#0f1729]/95 backdrop-blur-lg p-8 rounded-3xl border border-[#FF9100]/30 shadow-2xl mb-8">
                  <div className="mb-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-xl">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-[#FF9100]">
                          Question {currentQuestionIndex + 1}
                        </h2>
                        <div className="w-12 h-0.5 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-full"></div>
                      </div>
                    </div>
                    
                    <p className="text-lg text-white leading-relaxed">
                      {quizData?.questions[currentQuestionIndex]?.questionText}
                    </p>
                  </div>

                  {/* Answer Options */}
                  <div className="space-y-4">
                    {quizData?.format === "MCQ-Single" || quizData?.format === "MCQ-Multiple" ? (
                      quizData?.questions[currentQuestionIndex]?.options.map((option, idx) => (
                        <label
                          key={idx}
                          className={`block cursor-pointer p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                            selectedAnswers[currentQuestionIndex]?.includes(option)
                              ? "bg-gradient-to-r from-[#FF9100]/20 to-[#FFD700]/20 border-[#FF9100] text-white"
                              : "bg-[#1a2845]/60 border-gray-600 text-gray-300 hover:border-[#FF9100]/50 hover:bg-[#FF9100]/10"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <input
                              type={quizData?.format === "MCQ-Single" ? "radio" : "checkbox"}
                              name={`question-${currentQuestionIndex}`}
                              value={option}
                              checked={selectedAnswers[currentQuestionIndex]?.includes(option) || false}
                              onChange={() => handleOptionChange(option, currentQuestionIndex, quizData?.format)}
                              className="w-5 h-5 text-[#FF9100] bg-transparent border-2 border-gray-400 rounded focus:ring-[#FF9100] focus:ring-2"
                            />
                            <span className="text-lg font-medium">{option}</span>
                          </div>
                        </label>
                      ))
                    ) : quizData?.format === "True/False" ? (
                      ["True", "False"].map((option, idx) => (
                        <label
                          key={idx}
                          className={`block cursor-pointer p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                            selectedAnswers[currentQuestionIndex]?.[0] === option
                              ? "bg-gradient-to-r from-[#FF9100]/20 to-[#FFD700]/20 border-[#FF9100] text-white"
                              : "bg-[#1a2845]/60 border-gray-600 text-gray-300 hover:border-[#FF9100]/50 hover:bg-[#FF9100]/10"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <input
                              type="radio"
                              name={`question-${currentQuestionIndex}`}
                              value={option}
                              checked={selectedAnswers[currentQuestionIndex]?.[0] === option}
                              onChange={() => handleOptionChange(option, currentQuestionIndex, "True/False")}
                              className="w-5 h-5 text-[#FF9100] bg-transparent border-2 border-gray-400 rounded focus:ring-[#FF9100] focus:ring-2"
                            />
                            <span className="text-base font-medium">{option}</span>
                          </div>
                        </label>
                      ))
                    ) : quizData?.format === "Fill-in-the-Blank" ? (
                      <textarea
                        value={selectedAnswers[currentQuestionIndex]?.[0] || ""}
                        onChange={(e) => handleOptionChange(e.target.value, currentQuestionIndex, "Fill-in-the-blank")}
                        placeholder="Type your answer here..."
                        className="w-full p-6 bg-[#1a2845]/80 backdrop-blur-sm rounded-2xl text-white border-2 border-[#FF9100]/40 focus:ring-4 focus:ring-[#FF9100]/30 focus:border-[#FF9100] transition-all duration-300 resize-none h-32"
                      />
                    ) : null}
                  </div>
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center justify-between gap-4">
                  <button
                    onClick={() => navigateToQuestion(currentQuestionIndex - 1)}
                    disabled={currentQuestionIndex === 0}
                    className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                      currentQuestionIndex === 0
                        ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-[#FF9100] to-[#FFD700] text-white hover:shadow-lg hover:scale-105"
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Previous
                  </button>

                  <button
                    onClick={() => clearOptions(currentQuestionIndex)}
                    className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-2xl font-semibold hover:bg-red-600 hover:scale-105 transition-all duration-300"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Clear
                  </button>

                  <button
                    onClick={() => navigateToQuestion(currentQuestionIndex + 1)}
                    disabled={currentQuestionIndex === quizData?.questions.length - 1}
                    className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                      currentQuestionIndex === quizData?.questions.length - 1
                        ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-[#FF9100] to-[#FFD700] text-white hover:shadow-lg hover:scale-105"
                    }`}
                  >
                    Next
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Submit Button */}
                <div className="text-center mt-8">
                  <button
                    onClick={submitQuiz}
                    className="px-12 py-4 bg-gradient-to-r from-[#FF9100] to-[#FFD700] text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-[#FF9100]/50 transition-all duration-300 hover:scale-105"
                  >
                    Submit Quiz
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* Summary Page */}
        {showSummaryPage && !showResultPage && (
          <div className="min-h-screen flex items-center justify-center p-6">
            <div className="max-w-4xl w-full">
              {/* Hero Section */}
              <div className="text-center mb-12">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-full blur-2xl opacity-60 animate-pulse"></div>
                  <div className="relative p-4 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-full">
                    <Target className="w-12 h-12 text-white" />
                  </div>
                </div>
                
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#FF9100] via-[#FFD700] to-[#FF6B35] bg-clip-text text-transparent">
                  Quiz Summary
                </h1>
                
                <div className="w-20 h-1 bg-gradient-to-r from-[#FF9100] to-[#FFD700] mx-auto rounded-full"></div>
              </div>

              {/* Summary Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Attempted Questions Card */}
                <div className="bg-gradient-to-br from-[#1a2845]/90 via-[#2d3f5f]/80 to-[#0f1729]/90 backdrop-blur-lg p-8 rounded-3xl border border-[#FF9100]/30 shadow-2xl">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-4">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {quizData?.questions.length - getMissedQuestionsCount()}
                    </h3>
                    <p className="text-[#FF9100] font-semibold text-lg">Attempted Questions</p>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mt-2 rounded-full"></div>
                  </div>
                </div>

                {/* Unattempted Questions Card */}
                <div className="bg-gradient-to-br from-[#1a2845]/90 via-[#2d3f5f]/80 to-[#0f1729]/90 backdrop-blur-lg p-8 rounded-3xl border border-[#FF9100]/30 shadow-2xl">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-rose-500 rounded-full mb-4">
                      <XCircle className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {getMissedQuestionsCount()}
                    </h3>
                    <p className="text-[#FF9100] font-semibold text-lg">Unattempted Questions</p>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-red-500 to-rose-500 mx-auto mt-2 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Progress Visualization */}
              <div className="bg-gradient-to-br from-[#1a2845]/90 via-[#2d3f5f]/80 to-[#0f1729]/90 backdrop-blur-lg p-8 rounded-3xl border border-[#FF9100]/30 shadow-2xl mb-12">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-[#FF9100] mb-2">Quiz Progress</h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-[#FF9100] to-[#FFD700] mx-auto rounded-full"></div>
                </div>
                
                <div className="relative">
                  <div className="flex justify-between text-sm text-gray-300 mb-2">
                    <span>0</span>
                    <span className="text-[#FF9100] font-semibold">
                      {quizData?.questions.length - getMissedQuestionsCount()} / {quizData?.questions.length}
                    </span>
                    <span>{quizData?.questions.length}</span>
                  </div>
                  <div className="w-full bg-gray-700 h-4 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#FF9100] to-[#FFD700] transition-all duration-1000 ease-out"
                      style={{
                        width: `${((quizData?.questions.length - getMissedQuestionsCount()) / quizData?.questions.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <div className="text-center mt-4">
                    <span className="text-2xl font-bold text-white">
                      {Math.round(((quizData?.questions.length - getMissedQuestionsCount()) / quizData?.questions.length) * 100)}%
                    </span>
                    <span className="text-gray-300 ml-2">Complete</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button
                  onClick={() => {
                    setShowSummaryPage(false);
                    setQuizStarted(true);
                  }}
                  disabled={isTimeout}
                  className={`group relative px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                    isTimeout
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-500 hover:to-gray-600 hover:scale-105 shadow-lg hover:shadow-gray-500/25"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ChevronLeft className="w-5 h-5" />
                    {isTimeout ? "Time's Up!" : "Back to Quiz"}
                  </div>
                </button>

                <button
                  onClick={() => setShowResultPage(true)}
                  className="group relative px-8 py-4 bg-gradient-to-r from-[#FF9100] to-[#FFD700] text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-[#FF9100]/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#FF9100] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center gap-3">
                    <Trophy className="w-6 h-6" />
                    View Results
                  </div>
                </button>
              </div>

              {/* Encouragement Message */}
              {getMissedQuestionsCount() > 0 && (
                <div className="mt-8 text-center">
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500/20 border border-yellow-500/30 rounded-2xl">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="text-yellow-100">
                      You still have {getMissedQuestionsCount()} question{getMissedQuestionsCount() > 1 ? 's' : ''} to complete!
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Results Page */}
        {showResultPage && (
          <div className="min-h-screen flex items-center justify-center p-6">
            <div className="max-w-5xl w-full">
              <HeaderAfterSignup />
              {/* Celebration Header */}
              <div className="text-center mb-12">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-full blur-3xl opacity-60 animate-pulse"></div>
                  <div className="relative p-6 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-full">
                    <Trophy className="w-16 h-16 text-white" />
                  </div>
                </div>
                
                <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#FF9100] via-[#FFD700] to-[#FF6B35] bg-clip-text text-transparent">
                  🏆 Congratulations!
                </h1>
                
                <div className="w-24 h-1 bg-gradient-to-r from-[#FF9100] to-[#FFD700] mx-auto rounded-full"></div>
              </div>

              {/* Score Display */}
              <div className="text-center mb-12">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-full blur-2xl opacity-40 animate-pulse"></div>
                  <div className="relative bg-gradient-to-r from-[#FF9100] to-[#FFD700] text-white font-extrabold text-6xl w-40 h-40 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20">
                    {calculateScore()}
                  </div>
                </div>
                
                <div className="mt-6">
                  <p className="text-2xl text-white font-semibold">
                    Your Score: <span className="text-[#FF9100]">{calculateScore()}</span> out of{" "}
                    <span className="text-[#FFD700]">{quizData?.questions.length}</span>
                  </p>
                  
                  <div className="mt-4 max-w-md mx-auto">
                    <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#FF9100] to-[#FFD700] transition-all duration-2000 ease-out"
                        style={{
                          width: `${(calculateScore() / quizData?.questions.length) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <p className="text-lg text-gray-300 mt-2">
                      {Math.round((calculateScore() / quizData?.questions.length) * 100)}% Score
                    </p>
                  </div>
                </div>
              </div>

              {/* Performance Message */}
              <div className="bg-gradient-to-br from-[#1a2845]/90 via-[#2d3f5f]/80 to-[#0f1729]/90 backdrop-blur-lg p-8 rounded-3xl border border-[#FF9100]/30 shadow-2xl mb-12">
                <div className="text-center">
                  <div className="mb-6">
                    {calculateScore() >= quizData?.questions.length * 0.8 ? (
                      <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-500/20 border border-green-500/30 rounded-2xl">
                        <Sparkles className="w-6 h-6 text-green-400" />
                        <span className="text-green-100 font-semibold text-lg">Excellent Performance!</span>
                      </div>
                    ) : calculateScore() >= quizData?.questions.length * 0.5 ? (
                      <div className="inline-flex items-center gap-3 px-6 py-3 bg-yellow-500/20 border border-yellow-500/30 rounded-2xl">
                        <Star className="w-6 h-6 text-yellow-400" />
                        <span className="text-yellow-100 font-semibold text-lg">Good Job!</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-3 px-6 py-3 bg-blue-500/20 border border-blue-500/30 rounded-2xl">
                        <Zap className="w-6 h-6 text-blue-400" />
                        <span className="text-blue-100 font-semibold text-lg">Keep Learning!</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-lg text-white leading-relaxed">
                      {calculateScore() >= quizData?.questions.length * 0.8 ? (
                        "Amazing! 🎉 You've completed the quiz with flying colors! You're a quiz master!"
                      ) : calculateScore() >= quizData?.questions.length * 0.5 ? (
                        "Good job! You've done well, but there's room for improvement. Keep pushing! 🔥"
                      ) : (
                        "Don't be discouraged! Take this as a learning opportunity and try again for an even better score! 📚"
                      )}
                    </p>
                    
                    <p className="text-base text-gray-300">
                      {calculateScore() >= quizData?.questions.length * 0.8 ? (
                        "Keep this momentum going for even greater achievements! 🌟"
                      ) : calculateScore() >= quizData?.questions.length * 0.5 ? (
                        "You've got the basics covered, but with more practice, you'll reach the top!"
                      ) : (
                        "Every expert was once a beginner. Practice makes perfect!"
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quiz Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-gradient-to-br from-[#1a2845]/90 via-[#2d3f5f]/80 to-[#0f1729]/90 backdrop-blur-lg p-6 rounded-2xl border border-green-500/30">
                  <div className="text-center">
                    <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
                    <h3 className="text-xl font-bold text-white mb-1">{calculateScore()}</h3>
                    <p className="text-green-400 text-sm">Correct Answers</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-[#1a2845]/90 via-[#2d3f5f]/80 to-[#0f1729]/90 backdrop-blur-lg p-6 rounded-2xl border border-red-500/30">
                  <div className="text-center">
                    <XCircle className="w-8 h-8 text-red-400 mx-auto mb-3" />
                    <h3 className="text-xl font-bold text-white mb-1">{quizData?.questions.length - calculateScore()}</h3>
                    <p className="text-red-400 text-sm">Incorrect/Skipped</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-[#1a2845]/90 via-[#2d3f5f]/80 to-[#0f1729]/90 backdrop-blur-lg p-6 rounded-2xl border border-[#FF9100]/30">
                  <div className="text-center">
                    <Clock className="w-8 h-8 text-[#FF9100] mx-auto mb-3" />
                    <h3 className="text-xl font-bold text-white mb-1">
                      {formatTime((quizData?.totalTime * 60) - timeLeft)}
                    </h3>
                    <p className="text-[#FF9100] text-sm">Time Taken</p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="text-center">
                <button
                  onClick={handleRestartQuiz}
                  className="group relative px-12 py-4 bg-gradient-to-r from-[#FF9100] to-[#FFD700] text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-[#FF9100]/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#FF9100] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center gap-3">
                    <RotateCcw className="w-6 h-6" />
                    Try Again
                  </div>
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
