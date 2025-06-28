import React, { useState, useEffect } from "react";
import { ChevronDown, BookOpen, Users, Target, Award, Clock, Filter, Search, Star, Zap, Trophy, Sparkles, Check } from "lucide-react";
import Header from "../components/Header";
import Loading from "../components/Loading";

const QuizSearchPageBeforeSignup = () => {
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
      const response = await fetch(
        "https://quiz-master-backend-1a1s.onrender.com/api/quiz-search-before-signup",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch quiz data.");
      }

      const responseData = await response.json();

      const updatedQuizzes = Array.isArray(responseData.data)
        ? responseData.data
        : Object.values(responseData.data);

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

  const getDifficultyStyles = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': 
        return {
          color: 'text-emerald-300',
          bg: 'bg-gradient-to-r from-emerald-500/20 to-green-500/20',
          border: 'border-emerald-400/30',
          icon: <Target className="w-4 h-4 text-emerald-300" />
        };
      case 'medium': 
        return {
          color: 'text-amber-300',
          bg: 'bg-gradient-to-r from-amber-500/20 to-yellow-500/20',
          border: 'border-amber-400/30',
          icon: <Target className="w-4 h-4 text-amber-300" />
        };
      case 'hard': 
        return {
          color: 'text-rose-300',
          bg: 'bg-gradient-to-r from-rose-500/20 to-red-500/20',
          border: 'border-rose-400/30',
          icon: <Target className="w-4 h-4 text-rose-300" />
        };
      default: 
        return {
          color: 'text-[#FFD700]',
          bg: 'bg-gradient-to-r from-[#FF9100]/20 to-[#FFD700]/20',
          border: 'border-[#FF9100]/30',
          icon: <Target className="w-4 h-4 text-[#FFD700]" />
        };
    }
  };

  const getFormatIcon = (format) => {
    switch (format) {
      case 'MCQ-Single': return <Award className="w-5 h-5 text-blue-400" />;
      case 'MCQ-Multiple': return <Users className="w-5 h-5 text-purple-400" />;
      case 'True/False': return <Zap className="w-5 h-5 text-green-400" />;
      case 'Fill-in-the-Blank': return <BookOpen className="w-5 h-5 text-orange-400" />;
      default: return <Users className="w-5 h-5 text-[#FF9100]" />;
    }
  };

  const SelectField = ({ 
  label, 
  value, 
  onChange, 
  options, 
  disabled = false,
  placeholder, 
  icon: Icon,
  gradient 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className="relative w-full">
      {/* Label with enhanced styling */}
      <label className="block text-lg font-bold text-gray-200 mb-3 tracking-wide">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-6 h-6 text-white/80" />}
          {label}
        </div>
      </label>
      
      {/* Enhanced Select Container */}
      <div className="relative">
        {/* Main select button with improved design */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            relative w-full px-4 py-4 text-left
            ${gradient}
            border-2 border-white/20
            rounded-xl
            shadow-lg shadow-black/20
            backdrop-blur-sm
            transition-all duration-300 ease-out
            ${disabled 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:border-white/40 hover:shadow-xl hover:shadow-black/30 focus:outline-none focus:border-white/60 focus:shadow-xl focus:shadow-black/40'
            }
            ${isOpen ? 'border-white/60 shadow-xl shadow-black/40' : ''}
            ${isFocused && !disabled ? 'scale-[1.02]' : ''}
            group
          `}
        >
          {/* Background pattern overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Content container */}
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              {/* Icon with enhanced styling */}
              {Icon && (
                <div className="flex-shrink-0 p-2 bg-white/20 rounded-lg border border-white/30">
                  <Icon className="w-5 h-5 text-white/90" />
                </div>
              )}
              
              {/* Text content */}
              <div className="flex flex-col min-w-0 flex-1">
                {selectedOption ? (
                  <>
                    <span className="text-white font-medium text-base tracking-wide">
                      {selectedOption.value}
                    </span>
                    {selectedOption.label !== selectedOption.value && (
                      <span className="text-white/70 text-sm mt-0.5 truncate">
                        {selectedOption.label.split(' - ')[1] || selectedOption.label}
                      </span>
                    )}
                  </>
                ) : (
                  <span className={`font-medium ${disabled ? 'text-white/40' : 'text-white/60'}`}>
                    {placeholder}
                  </span>
                )}
              </div>
            </div>
            
            {/* Enhanced dropdown arrow */}
            <div className={`
              flex-shrink-0 ml-3 p-1.5 rounded-lg 
              bg-white/20 border border-white/30
              transition-all duration-300
              ${isOpen ? 'rotate-180 bg-white/30' : ''}
            `}>
              <ChevronDown className="w-4 h-4 text-white/90" />
            </div>
          </div>
          
          {/* Bottom accent line */}
          <div className={`
            absolute bottom-0 left-4 right-4 h-0.5 
            bg-gradient-to-r from-white/60 to-white/40
            transition-all duration-300
            ${isOpen || isFocused ? 'opacity-100' : 'opacity-0'}
          `} />
        </button>
        
        {/* Enhanced Dropdown Menu */}
        {isOpen && !disabled && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Options container with improved design */}
            <div className="absolute top-full left-0 right-0 mt-2 z-20">
              <div className={`
                ${gradient}
                border-2 border-white/40
                rounded-xl
                shadow-2xl shadow-black/30
                backdrop-blur-sm
                overflow-hidden
                animate-in slide-in-from-top-2 duration-200
                max-h-64 overflow-y-auto
              `}>
                {/* Header accent */}
                <div className="h-1 bg-gradient-to-r from-white/40 via-white/60 to-white/40" />
                
                {options.map((option, index) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onChange({ target: { value: option.value } });
                      setIsOpen(false);
                    }}
                    className={`
                      w-full px-4 py-4 text-left
                      transition-all duration-200
                      hover:bg-white/20
                      focus:bg-white/20 focus:outline-none
                      ${value === option.value ? 'bg-white/25' : ''}
                      ${index !== options.length - 1 ? 'border-b border-white/10' : ''}
                      group
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        {/* Option icon indicator */}
                        <div className={`
                          w-2 h-2 rounded-full transition-all duration-200
                          ${value === option.value 
                            ? 'bg-white shadow-lg shadow-white/50' 
                            : 'bg-white/30 group-hover:bg-white/60'
                          }
                        `} />
                        
                        {/* Option content */}
                        <div className="flex flex-col min-w-0 flex-1">
                          <span className={`
                            font-medium text-base tracking-wide transition-colors duration-200
                            ${value === option.value ? 'text-white' : 'text-white/90 group-hover:text-white'}
                          `}>
                            {option.value}
                          </span>
                          {option.label !== option.value && option.label.includes(' - ') && (
                            <span className={`
                              text-sm mt-0.5 transition-colors duration-200
                              ${value === option.value ? 'text-white/80' : 'text-white/70 group-hover:text-white/80'}
                            `}>
                              {option.label.split(' - ')[1]}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Check icon for selected option */}
                      {value === option.value && (
                        <div className="flex-shrink-0 p-1 bg-white/30 rounded-lg">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1A36] via-[#2C4A75] to-[#0A1C36] text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[#FF9100]/20 to-[#FFD700]/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-[#2C4A75]/30 to-[#FF9100]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <Loading isLoading={loading} />
      <Header />
      
      <div className="relative max-w-7xl mx-auto p-6 z-10">
        {/* Spectacular Hero Section */}
        <div className="text-center mb-16 py-12">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-full blur-2xl opacity-60 animate-pulse"></div>
            <div className="relative p-6 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-full">
              <Sparkles className="w-16 h-16 text-white animate-spin-slow" />
            </div>
          </div>
          
          <h1 className="text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-[#FF9100] via-[#FFD700] via-[#FF6B35] to-[#FF9100] bg-clip-text text-transparent animate-gradient-x">
              Discover Amazing
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#FFD700] via-[#FF9100] to-[#FF6B35] bg-clip-text text-transparent">
              Quiz Adventures
            </span>
          </h1>
          
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
            Embark on an educational journey with our stunning collection of interactive quizzes
          </p>
          
          {/* Decorative elements */}
          <div className="flex justify-center items-center gap-6 mt-8">
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#FF9100] to-transparent rounded-full"></div>
            <Star className="w-8 h-8 text-[#FFD700] animate-spin-slow" />
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent rounded-full"></div>
          </div>
        </div>

        {/* Stunning Filter Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-[#FF9100]/20 to-[#FFD700]/20 rounded-full border border-[#FF9100]/30 backdrop-blur-lg">
              <Filter className="w-8 h-8 text-[#FF9100]" />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#FF9100] to-[#FFD700] bg-clip-text text-transparent">
                Customize Your Learning Experience
              </h2>
            </div>
          </div>
          
          {/* Primary Filters with different gradients */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            <SelectField
                          label="Academic Level"
                          value={selectedClass}
                          onChange={(e) => {
                            setSelectedClass(e.target.value);
                            setSelectedSubject("");
                            setSelectedTopic("");
                          }}
                          options={[
                            ...Array.from({ length: 10 }, (_, i) => ({
                              value: `Class ${i + 1}`,
                              label: `Class ${i + 1}`,
                            })),
                            { value: "Class 11 (Science)", label: "Class 11 (Science)" },
                            { value: "Class 11 (Commerce)", label: "Class 11 (Commerce)" },
                            { value: "Class 11 (Arts)", label: "Class 11 (Arts)" },
                            { value: "Class 12 (Science)", label: "Class 12 (Science)" },
                            { value: "Class 12 (Commerce)", label: "Class 12 (Commerce)" },
                            { value: "Class 12 (Arts)", label: "Class 12 (Arts)" },
                          ]}
                          placeholder="Select your class level"
                          icon={BookOpen}
                          gradient="bg-gradient-to-br from-[#1a2845]/90 via-[#2d3f5f]/80 to-[#0f1729]/90"
                        />
            
                        <SelectField
                          label="Subject Area"
                          value={selectedSubject}
                          onChange={(e) => {
                            setSelectedSubject(e.target.value);
                            setSelectedTopic(""); // Reset topic
                          }}
                          options={
                            selectedClass
                              ? Array.from(
                                  new Set(
                                    quizzes
                                      .filter(
                                        (quiz) =>
                                          quiz.class.trim() ===
                                          selectedClass.replace(/Class\s*/i, "").trim()
                                      )
                                      .map((quiz) => quiz.subject.trim())
                                  )
                                ).map((subject) => ({
                                  value: subject,
                                  label: subject,
                                }))
                              : []
                          }
                          disabled={!selectedClass}
                          placeholder={
                            selectedClass ? "Choose your subject" : "Select class first"
                          }
                          icon={Target}
                          gradient="bg-gradient-to-br from-[#2d1b45]/90 via-[#3f2d5f]/80 to-[#1a0f29]/90"
                        />
            
                        <SelectField
                          label="Learning Topic"
                          value={selectedTopic}
                          onChange={(e) => setSelectedTopic(e.target.value)}
                          options={
                            selectedSubject
                              ? Array.from(
                                  new Set(
                                    quizzes
                                      .filter(
                                        (quiz) =>
                                          quiz.class.trim() ===
                                            selectedClass.replace(/Class\s*/i, "").trim() &&
                                          quiz.subject.trim().toLowerCase() ===
                                            selectedSubject.trim().toLowerCase()
                                      )
                                      .map((quiz) => quiz.topic.trim())
                                  )
                                ).map((topic) => ({
                                  value: topic,
                                  label: topic,
                                }))
                              : []
                          }
                          disabled={!selectedSubject}
                          placeholder={
                            selectedSubject ? "Pick your topic" : "Select subject first"
                          }
                          icon={Sparkles}
                          gradient="bg-gradient-to-br from-[#451b2d]/90 via-[#5f2d3f]/80 to-[#29101a]/90"
                        />
          </div>

          {/* Secondary Filters */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SelectField
              label="Challenge Level"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              options={[
                { value: "Easy", label: "Easy - Perfect for beginners" },
                { value: "Medium", label: "Medium - Balanced challenge" },
                { value: "Hard", label: "Hard - Expert level" },
              ]}
              placeholder="Choose your challenge"
              icon={Trophy}
              gradient="bg-gradient-to-br from-[#1b4545]/90 via-[#2d5f5f]/80 to-[#0f2929]/90"
            />

            <SelectField
              label="Quiz Format"
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              options={[
                { value: "MCQ-Single", label: "Multiple Choice (Single)" },
                { value: "MCQ-Multiple", label: "Multiple Choice (Multiple)" },
                { value: "True/False", label: "True or False" },
                { value: "Fill-in-the-Blank", label: "Fill in the Blank" },
              ]}
              placeholder="Select quiz style"
              icon={Zap}
              gradient="bg-gradient-to-br from-[#45351b]/90 via-[#5f4f2d]/80 to-[#29210f]/90"
            />
          </div>
        </div>

        {/* Spectacular Quiz Results */}
        {selectedTopic && (
          <div className="animate-in slide-in-from-bottom duration-700">
            {/* Results Header */}
            <div className="text-center mb-16">
              <div className="text-center mb-16">
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-[#FF9100] via-[#FFD700] to-[#FF9100] bg-clip-text text-transparent drop-shadow-2xl">
                Available Quizzes
              </h2>
              <div className="inline-block">
                <p className="text-2xl text-white bg-gradient-to-r from-[#112D4E]/80 to-[#0F1A36]/80 backdrop-blur-lg px-8 py-4 rounded-full border border-[#FF9100]/30 shadow-xl">
                  Topic: <span className="text-[#FF9100] font-bold">{selectedTopic}</span>
                </p>
              </div>
            </div>
              
              <div className="flex justify-center items-center gap-4">
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FF9100] to-[#FFD700] rounded-full"></div>
                <div className="p-3 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-full">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <div className="w-24 h-1 bg-gradient-to-r from-[#FFD700] via-[#FF9100] to-transparent rounded-full"></div>
              </div>
            </div>

            {filteredQuizzes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                {filteredQuizzes.map((quiz, index) => {
                  const difficultyStyles = getDifficultyStyles(quiz.difficulty);
                  return (
                    <div
                      key={quiz._id}
                      className="group relative"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      {/* Glowing background effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#FF9100]/20 via-[#FFD700]/10 to-[#FF6B35]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="relative bg-gradient-to-br from-[#0F1A36]/95 via-[#1a2845]/90 to-[#0A1C36]/95 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-[#FF9100]/30 transition-all duration-500">
                        
                        {/* Quiz Header */}
                        <div className="text-center mb-8">
                          <div className="relative inline-block mb-6">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-2xl blur-md opacity-60"></div>
                            <div className="relative p-4 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-2xl">
                              <BookOpen className="w-10 h-10 text-white" />
                            </div>
                          </div>
                          
                          <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-[#FF9100] via-[#FFD700] to-[#FF6B35] bg-clip-text text-transparent">
                            {quiz.quizName}
                          </h3>
                          
                          <div className="w-20 h-1 bg-gradient-to-r from-[#FF9100] to-[#FFD700] mx-auto rounded-full"></div>
                        </div>

                        {/* Quiz Statistics */}
                        <div className="space-y-4 mb-8">
                          {/* Format */}
                          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#1a2845]/60 to-[#2d3f5f]/40 rounded-2xl border border-blue-500/20">
                            <div className="flex items-center gap-4">
                              {getFormatIcon(quiz.format)}
                              <span className="text-white font-semibold text-lg">Format</span>
                            </div>
                            <span className="text-blue-300 font-bold px-4 py-2 bg-blue-500/20 rounded-xl border border-blue-400/30">
                              {quiz.format}
                            </span>
                          </div>

                          {/* Questions Count */}
                          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#2d1a45]/60 to-[#3f2d5f]/40 rounded-2xl border border-purple-500/20">
                            <div className="flex items-center gap-4">
                              <Clock className="w-5 h-5 text-purple-400" />
                              <span className="text-white font-semibold text-lg">Questions</span>
                            </div>
                            <span className="text-purple-300 font-bold px-4 py-2 bg-purple-500/20 rounded-xl border border-purple-400/30">
                              {quiz.questions.length}
                            </span>
                          </div>

                          {/* Difficulty */}
                          <div className={`flex items-center justify-between p-4 rounded-2xl border ${difficultyStyles.bg} ${difficultyStyles.border}`}>
                            <div className="flex items-center gap-4">
                              {difficultyStyles.icon}
                              <span className="text-white font-semibold text-lg">Difficulty</span>
                            </div>
                            <span className={`font-bold px-4 py-2 rounded-xl border ${difficultyStyles.color} ${difficultyStyles.bg} ${difficultyStyles.border}`}>
                              {quiz.difficulty}
                            </span>
                          </div>
                        </div>

                        {/* Call to Action */}
                        <div className="relative">
                          <button
                            className="w-full px-6 py-5 bg-gradient-to-r from-[#FF9100]/30 to-[#FF5E00]/30 text-white text-lg font-bold rounded-2xl cursor-not-allowed opacity-70 border-2 border-[#FF9100]/40 relative overflow-hidden backdrop-blur-sm"
                            disabled
                          >
                            <div className="flex items-center justify-center gap-3">
                              <Users className="w-6 h-6" />
                              <span>🔐 Sign Up Required for Access</span>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="relative inline-block mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100]/20 to-[#FFD700]/20 rounded-full blur-2xl"></div>
                  <div className="relative p-8 bg-gradient-to-r from-[#FF9100]/10 to-[#FFD700]/10 rounded-full border border-[#FF9100]/30">
                    <Search className="w-20 h-20 text-[#FF9100]" />
                  </div>
                </div>
                <h3 className="text-4xl font-bold text-white mb-6">No Quizzes Found</h3>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  Try adjusting your filters to discover more amazing quizzes that match your learning goals.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Welcome State */}
        {!selectedTopic && (
          <div className="text-center py-24">
            <div className="relative inline-block mb-12">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100]/30 to-[#FFD700]/30 rounded-full blur-3xl animate-pulse"></div>
              <div className="relative p-12 bg-gradient-to-r from-[#FF9100]/20 to-[#FFD700]/20 rounded-full border border-[#FF9100]/30 backdrop-blur-lg">
                <BookOpen className="w-24 h-24 text-[#FF9100]" />
              </div>
            </div>
            <h3 className="text-5xl font-bold text-white mb-8">Ready to Begin Your Journey?</h3>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
              Select your preferences from the beautiful filters above and unlock a world of knowledge with our carefully crafted quiz collection.
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        .animate-spin-slow {
          animation: spin 4s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default QuizSearchPageBeforeSignup;
