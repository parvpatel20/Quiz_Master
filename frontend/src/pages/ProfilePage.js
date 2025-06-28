import React, { useState, useEffect } from "react";
import HeaderAfterSignup from "../components/HeaderAfterSignup";
import { Edit, User, Mail, Book, FileText, GraduationCap, TrendingUp, BarChart3, Trophy, Sparkles, Target } from "lucide-react";
import Popupupdate from "../components/Popupupdate";
import Loading from "../components/Loading";
import QuizHistory from "../components/QuizHistory";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentField, setCurrentField] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProfileData = async () => {
    try {
      const response = await fetch("https://quiz-master-backend-1a1s.onrender.com/api/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile data.");
      }

      const responseData = await response.json();
      setUser(responseData.data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const [sortedQuizzes, setSortedQuizzes] = useState([]);

  useEffect(() => {
    if (user?.quizData) {
      const validQuizzes = user.quizData.filter(
        (quiz) => quiz.quizDate && quiz.score !== undefined && quiz.quiz
      );

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
    setIsPopupOpen(true);
    setMenuOpen(false);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
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

  const statsCards = [
    {
      title: "Total Quizzes",
      value: user?.totalQuizzesGiven || 0,
      icon: GraduationCap,
      gradient: "from-[#FF9100] to-[#FFD700]",
      bg: "bg-gradient-to-br from-[#FF9100]/10 to-[#FFD700]/10",
      border: "border-[#FF9100]/30",
      textColor: "text-[#FF9100]"
    },
    {
      title: "Average Accuracy",
      value: `${user?.accuracy || 0}%`,
      icon: BarChart3,
      gradient: "from-emerald-500 to-green-500",
      bg: "bg-gradient-to-br from-emerald-500/10 to-green-500/10",
      border: "border-emerald-500/30",
      textColor: "text-emerald-600"
    },
    {
      title: "Highest Score",
      value: `${user?.maxScore || 0}%`,
      icon: Trophy,
      gradient: "from-purple-500 to-violet-500",
      bg: "bg-gradient-to-br from-purple-500/10 to-violet-500/10",
      border: "border-purple-500/30",
      textColor: "text-purple-600"
    },
    {
      title: "Lowest Score",
      value: `${user?.minScore || 0}%`,
      icon: Target,
      gradient: "from-rose-500 to-red-500",
      bg: 'bg-gradient-to-r from-rose-500/20 to-red-500/20',
      border: 'border-rose-400/30',
      textColor: "text-red-600"
    }
  ];
const InfoField = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-4 py-3">
    {/* Icon - sized to match heading + value height */}
    <div className="w-8 h-8 flex items-center justify-center">
      <Icon className="w-6 h-6 text-[#FF9100]" />
    </div>
    
    {/* Content */}
    <div className="flex-1">
      <p className="text-xs text-gray-400 mb-1 font-medium uppercase tracking-wide">{label}</p>
      <p className="text-white text-base font-medium">{value}</p>
    </div>
    
    {/* Separator line */}
    <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#FF9100]/20 to-transparent"></div>
  </div>
);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1A36] via-[#2C4A75] to-[#0A1C36] text-white relative">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[#FF9100]/20 to-[#FFD700]/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-[#2C4A75]/30 to-[#FF9100]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <Loading isLoading={loading} />
      <HeaderAfterSignup />
      
      {/* Main scrollable container - Whole page scroll */}
      <div className="relative max-w-7xl mx-auto p-6 z-10 overflow-y-auto">
        <div className="flex gap-4 min-h-[calc(100vh-140px)]">
          
          {/* Left Sidebar - 30% - User Details Section */}
          <div className="w-[30%] bg-gradient-to-br from-[#0F1A36]/95 via-[#1a2845]/90 to-[#0A1C36]/95 backdrop-blur-lg rounded-3xl shadow-2xl relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF9100]/5 via-transparent to-[#FFD700]/5 rounded-3xl opacity-60"></div>
            
            {/* Edit Menu */}
            <div className="absolute top-6 right-6 z-20">
              <div
                className="relative"
                onMouseEnter={() => setMenuOpen(true)}
                onMouseLeave={() => setMenuOpen(false)}
              >
                <button className="group relative p-3 bg-gradient-to-r from-[#FF9100]/20 to-[#FFD700]/20 hover:from-[#FF9100]/30 hover:to-[#FFD700]/30 rounded-2xl border border-[#FF9100]/30 transition-all duration-300 backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-2xl blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <Edit className="relative w-5 h-5 text-[#FF9100] group-hover:text-white transition-colors duration-300" />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 w-56 bg-gradient-to-br from-[#1a2845]/95 to-[#0F1A36]/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-[#FF9100]/30 py-3 z-30 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FF9100]/10 via-transparent to-[#FFD700]/10 rounded-2xl"></div>
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
                        onClick={() => handleOpenPopup(field.toLowerCase())}
                        className="relative w-full px-5 py-3 text-left text-white hover:bg-gradient-to-r hover:from-[#FF9100]/20 hover:to-[#FFD700]/20 transition-all duration-200 text-sm font-semibold border-b border-[#FF9100]/10 last:border-b-0"
                      >
                        Change {field}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* User Details - Independent scroll */}
            <div className="relative h-[calc(100vh-140px)] overflow-y-auto scrollbar-hide">
              <div className="p-8">
                {/* Profile Picture */}
                <div className="flex justify-center mb-12">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                    <div className="relative w-40 h-40 rounded-full bg-gradient-to-r from-[#FF9100] to-[#FFD700] p-2 shadow-2xl">
                      <img
                        src={
                          user?.profilePicture
                        }
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover bg-[#1a2845] border-4 border-white/20"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 p-2 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-full shadow-lg">
                      <Sparkles className="w-5 h-5 text-white animate-spin-slow" />
                    </div>
                  </div>
                </div>

                {/* User Information */}
                
                <div className="relative">
          <InfoField 
            icon={User} 
            label="Username" 
            value={user?.username || "Loading..."} 
          />
        </div>
        
        <div className="relative">
          <InfoField 
            icon={Mail} 
            label="Email" 
            value={user?.email || "Loading..."} 
          />
        </div>
        
        <div className="relative">
          <InfoField 
            icon={Book} 
            label="Class" 
            value={user?.classname || "Not specified"} 
          />
        </div>
        
        {/* Bio Section */}
        <div className="relative py-3">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 flex items-center justify-center mt-1">
              <FileText className="w-6 h-6 text-[#FF9100]" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-400 mb-1 font-medium uppercase tracking-wide">Bio</p>
              <p className="text-white text-base leading-relaxed">
                {user?.bio || (
                  <span className="italic text-gray-400">
                    No bio added yet. Share something about yourself!
                  </span>
                )}
              </p>
            </div>
          </div>
          {/* Separator line */}
          <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#FF9100]/20 to-transparent"></div>
        </div>
        
              </div>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="w-px bg-gradient-to-b from-transparent via-[#FF9100]/50 to-transparent"></div>

          {/* Right Content - 70% - Stats and Quiz History */}
          <div className="w-[70%] bg-gradient-to-br from-[#0F1A36]/95 via-[#1a2845]/90 to-[#0A1C36]/95 backdrop-blur-lg rounded-3xl shadow-2xl relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF9100]/5 via-transparent to-[#FFD700]/5 rounded-3xl opacity-60"></div>
            
            {/* Right section - Independent scroll */}
            <div className="relative h-[calc(100vh-140px)] overflow-y-auto scrollbar-hide">
              <div className="p-8 space-y-8">
                
                {/* Performance Stats Section */}
                <div className="relative">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-xl blur-sm opacity-60"></div>
                      <div className="relative p-3 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-xl">
                        <BarChart3 className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-[#FF9100] via-[#FFD700] to-[#FF6B35] bg-clip-text text-transparent">
                        Performance Statistics
                      </h2>
                      <div className="w-16 h-0.5 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-full mt-2"></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {statsCards.map((stat, index) => {
                      const IconComponent = stat.icon;
                      return (
                        <div
                          key={index}
                          className={`group relative ${stat.bg} backdrop-blur-sm rounded-2xl p-6 border ${stat.border} hover:shadow-2xl transition-all duration-500 overflow-hidden`}
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          {/* Animated background effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          
                          <div className="relative">
                            <div className="flex items-center justify-between mb-4">
                              <div className={`relative p-3 rounded-xl bg-gradient-to-r ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl"></div>
                                <IconComponent className="relative w-6 h-6 text-white" />
                              </div>
                            </div>
                            
                            <div>
                              <p className="text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide">
                                {stat.title}
                              </p>
                              <p className={`text-3xl font-black ${stat.textColor} group-hover:scale-105 transition-transform duration-300`}>
                                {stat.value}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Separator Line between Stats and Quiz History */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#FF9100]/50 to-transparent my-8"></div>

                {/* Quiz History Section with independent scroll */}
                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-xl blur-sm opacity-60"></div>
                      <div className="relative p-3 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-xl">
                        <GraduationCap className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-[#FF9100] via-[#FFD700] to-[#FF6B35] bg-clip-text text-transparent">
                        Quiz History
                      </h2>
                      <div className="w-16 h-0.5 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-full mt-2"></div>
                    </div>
                  </div>
                  
                  {/* Quiz History with its own scroll - max height to show 5-6 quizzes */}
                  <div className="max-h-[600px] overflow-y-auto scrollbar-hide bg-gradient-to-br from-[#1a2845]/50 to-[#2d3f5f]/30 rounded-2xl border border-[#FF9100]/20 backdrop-blur-sm">
                    <QuizHistory quizzes={sortedQuizzes} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Component */}
      <Popupupdate
        isOpen={isPopupOpen}
        closePopup={handleClosePopup}
        fieldType={currentField}
        updateUser={(updatedField, newValue) =>
          handleUserUpdate(updatedField, newValue)
        }
      />

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .animate-spin-slow {
          animation: spin 4s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;
