import React, { useState, useEffect } from "react";
import { 
  Trophy, 
  Crown, 
  Medal, 
  Star, 
  Search, 
  Users, 
  Target, 
  Award, 
  Zap, 
  ChevronDown,
  Sparkles,
  TrendingUp,
  BookOpen,
  Filter
} from "lucide-react";
import HeaderAfterSignup from "../components/HeaderAfterSignup";
import Loading from "../components/Loading";

const Leaderboard = () => {
  const [selectedStandard, setSelectedStandard] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLeaderboardData = async () => {
    try {
      const response = await fetch("https://quiz-master-backend-1a1s.onrender.com/api/leaderboard", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch leaderboard data");
      }

      const data = await response.json();

      if (data.success) {
        setLeaderboardData(data.data);
      } else {
        setError("No leaderboard data available");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const sortedLeaderboard = leaderboardData.sort(
    (a, b) => b.accuracy - a.accuracy
  );

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="w-8 h-8 text-[#FFD700] animate-pulse" />;
      case 2:
        return <Medal className="w-8 h-8 text-gray-400" />;
      case 3:
        return <Award className="w-8 h-8 text-[#CD7F32]" />;
      default:
        return <span className="text-2xl font-bold text-[#FF9100]">#{rank}</span>;
    }
  };

  const getRankBadge = (rank) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400/20 via-[#FFD700]/20 to-yellow-600/20";
      case 2:
        return "bg-gradient-to-r from-gray-300/20 via-gray-400/20 to-gray-500/20";
      case 3:
        return "bg-gradient-to-r from-orange-400/20 via-[#CD7F32]/20 to-orange-600/20";
      default:
        return "bg-gradient-to-r from-[#FF9100] to-[#FF6B35]";
    }
  };

  const filteredLeaderboard = sortedLeaderboard.filter(
    (student) =>
      (student.classname === selectedStandard || selectedStandard === "") &&
      (student.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        searchTerm === "")
  );

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F1A36] via-[#2C4A75] to-[#0A1C36] flex items-center justify-center">
        <div className="text-center">
          <div className="p-8 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-3xl border border-red-400/30 backdrop-blur-lg">
            <Trophy className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <p className="text-2xl text-red-300 font-bold">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1A36] via-[#2C4A75] to-[#0A1C36] text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[#FF9100]/20 to-[#FFD700]/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-[#2C4A75]/30 to-[#FF9100]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <Loading isLoading={loading} />
      <HeaderAfterSignup />
      
      <div className="relative max-w-7xl mx-auto p-6 z-10">
        {/* Spectacular Hero Section */}
        <div className="text-center mb-16 py-12">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-full blur-2xl opacity-60 animate-pulse"></div>
            <div className="relative p-6 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-full">
              <Trophy className="w-16 h-16 text-white animate-bounce" />
            </div>
          </div>
          
          <h1 className="text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-[#FF9100] via-[#FFD700] via-[#FF6B35] to-[#FF9100] bg-clip-text text-transparent animate-gradient-x">
              Champions
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#FFD700] via-[#FF9100] to-[#FF6B35] bg-clip-text text-transparent">
              Leaderboard
            </span>
          </h1>
          
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
            Discover the top performers and celebrate academic excellence across all classes
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
              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#FF9100] to-[#FFD700] bg-clip-text text-transparent">
                Find Champions
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Class Selection */}
            <div className="relative group">
              <div className="relative p-6 rounded-3xl shadow-2xl border bg-gradient-to-br from-[#1a2845]/90 via-[#2d3f5f]/80 to-[#0f1729]/90 border-[#FF9100]/30 backdrop-blur-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF9100]/10 via-transparent to-[#FFD700]/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-xl blur-sm opacity-60"></div>
                    <div className="relative p-3 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-xl">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold bg-gradient-to-r from-[#FF9100] via-[#FFD700] to-[#FF6B35] bg-clip-text text-transparent">
                      Select Class
                    </h3>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-full mt-1"></div>
                  </div>
                </div>

                <div className="relative">
                  <select
                    className="w-full p-4 bg-[#1a2845]/80 backdrop-blur-sm rounded-2xl text-white border-2 border-[#FF9100]/40 focus:ring-4 focus:ring-[#FF9100]/30 focus:border-[#FF9100] transition-all duration-300 appearance-none cursor-pointer text-lg font-medium shadow-inner"
                    value={selectedStandard}
                    onChange={(e) => setSelectedStandard(e.target.value)}
                  >
                    <option value="" className="text-gray-400 bg-[#1a2845]">Choose your class level</option>
                    <option value="Class 12 (Science)" className="bg-[#1a2845] text-white">Class 12 (Science)</option>
                    <option value="Class 12 (Commerce)" className="bg-[#1a2845] text-white">Class 12 (Commerce)</option>
                    <option value="Class 11 (Science)" className="bg-[#1a2845] text-white">Class 11 (Science)</option>
                    <option value="Class 11 (Commerce)" className="bg-[#1a2845] text-white">Class 11 (Commerce)</option>
                    <option value="Class 10" className="bg-[#1a2845] text-white">Class 10</option>
                    <option value="Class 9" className="bg-[#1a2845] text-white">Class 9</option>
                    <option value="Class 8" className="bg-[#1a2845] text-white">Class 8</option>
                    <option value="Class 7" className="bg-[#1a2845] text-white">Class 7</option>
                    <option value="Class 6" className="bg-[#1a2845] text-white">Class 6</option>
                    <option value="Class 5" className="bg-[#1a2845] text-white">Class 5</option>
                    <option value="Class 4" className="bg-[#1a2845] text-white">Class 4</option>
                    <option value="Class 3" className="bg-[#1a2845] text-white">Class 3</option>
                    <option value="Class 2" className="bg-[#1a2845] text-white">Class 2</option>
                    <option value="Class 1" className="bg-[#1a2845] text-white">Class 1</option>
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <ChevronDown className="w-6 h-6 text-[#FF9100]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative group">
              <div className="relative p-6 rounded-3xl shadow-2xl border bg-gradient-to-br from-[#2d1b45]/90 via-[#3f2d5f]/80 to-[#1a0f29]/90 border-[#FF9100]/30 backdrop-blur-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF9100]/10 via-transparent to-[#FFD700]/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-xl blur-sm opacity-60"></div>
                    <div className="relative p-3 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-xl">
                      <Search className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold bg-gradient-to-r from-[#FF9100] via-[#FFD700] to-[#FF6B35] bg-clip-text text-transparent">
                      Search Champion
                    </h3>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-full mt-1"></div>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter username to find..."
                    className="w-full p-4 bg-[#1a2845]/80 backdrop-blur-sm rounded-2xl text-white border-2 border-[#FF9100]/40 focus:ring-4 focus:ring-[#FF9100]/30 focus:border-[#FF9100] transition-all duration-300 text-lg font-medium shadow-inner placeholder-gray-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <Search className="w-6 h-6 text-[#FF9100]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* No Class Selected State */}
        {!selectedStandard && (
          <div className="text-center py-24">
            <div className="relative inline-block mb-12">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100]/30 to-[#FFD700]/30 rounded-full blur-3xl animate-pulse"></div>
              <div className="relative p-12 bg-gradient-to-r from-[#FF9100]/20 to-[#FFD700]/20 rounded-full border border-[#FF9100]/30 backdrop-blur-lg">
                <Users className="w-24 h-24 text-[#FF9100]" />
              </div>
            </div>
            <h3 className="text-5xl font-bold text-white mb-8">Select a Class to View Champions</h3>
            <p className="text-2xl text-[#FF9100] max-w-3xl mx-auto leading-relaxed font-light">
              Choose your class from the filter above to discover the top performers and celebrate their achievements!
            </p>
          </div>
        )}

        {/* Leaderboard Table */}
        {selectedStandard && filteredLeaderboard.length > 0 && (
          <div className="animate-in slide-in-from-bottom duration-700">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-[#FF9100] via-[#FFD700] to-[#FF9100] bg-clip-text text-transparent drop-shadow-2xl">
                Class Champions
              </h2>
              <div className="inline-block">
                <p className="text-2xl text-white bg-gradient-to-r from-[#112D4E]/80 to-[#0F1A36]/80 backdrop-blur-lg px-8 py-4 rounded-full border border-[#FF9100]/30 shadow-xl">
                  Class: <span className="text-[#FF9100] font-bold">{selectedStandard}</span>
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#0F1A36]/95 via-[#1a2845]/90 to-[#0A1C36]/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-[#FF9100]/30 overflow-hidden">
              {/* Table Header */}
              <div className="bg-gradient-to-r from-[#FF9100] to-[#FFD700] p-1">
                <div className="bg-gradient-to-r from-[#0F1A36]/95 to-[#1a2845]/95 backdrop-blur-lg rounded-2xl">
                  <div className="grid grid-cols-5 gap-4 p-6 text-center font-bold text-lg">
                    <div className="flex items-center justify-center gap-2">
                      <Trophy className="w-6 h-6 text-[#FFD700]" />
                      <span className="text-[#FFD700]">Rank</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Users className="w-6 h-6 text-[#FF9100]" />
                      <span className="text-[#FF9100]">Profile</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Star className="w-6 h-6 text-[#FFD700]" />
                      <span className="text-[#FFD700]">Champion</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <BookOpen className="w-6 h-6 text-[#FF9100]" />
                      <span className="text-[#FF9100]">Quizzes</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <TrendingUp className="w-6 h-6 text-[#FFD700]" />
                      <span className="text-[#FFD700]">Accuracy</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Table Body */}
              <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
                {filteredLeaderboard.map((student, index) => {
                  const rank = index + 1;
                  return (
                    <div
                      key={index}
                      className={`grid grid-cols-5 gap-4 p-6 border-b border-[#FF9100]/20 hover:bg-gradient-to-r hover:from-[#FF9100]/10 hover:to-[#FFD700]/10 transition-all duration-300 group ${rank <= 3 ? 'bg-gradient-to-r from-[#FF9100]/5 to-[#FFD700]/5' : ''}`}
                    >
                      {/* Rank */}
                      <div className="flex items-center justify-center">
                        <div className={`p-4 rounded-2xl border-2 ${rank <= 3 ? getRankBadge(rank) : 'bg-gradient-to-r from-[#FF9100]/20 to-[#FFD700]/20'} border-[#FF9100]/30 transition-transform duration-300 group-hover:scale-110`}>
                          {getRankIcon(rank)}
                        </div>
                      </div>

                      {/* Profile Picture */}
                      <div className="flex items-center justify-center">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-full blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <img
                            src={student.profilePicture || "https://via.placeholder.com/150"}
                            alt={`${student.username} profile`}
                            className="relative w-16 h-16 rounded-full border-4 border-[#FF9100] shadow-lg transition-transform duration-300 group-hover:scale-110"
                          />
                          {rank <= 3 && (
                            <div className="absolute -top-2 -right-2 p-1 bg-gradient-to-r from-[#FFD700] to-[#FF9100] rounded-full">
                              <Sparkles className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Username */}
                      <div className="flex items-center justify-center">
                        <div className="text-center">
                          <p className={`text-xl font-bold ${rank <= 3 ? 'bg-gradient-to-r from-[#FF9100] to-[#FFD700] bg-clip-text text-transparent' : 'text-white'} transition-all duration-300`}>
                            {student.username}
                          </p>
                          {rank <= 3 && (
                            <div className="flex justify-center mt-1">
                              <div className="w-8 h-0.5 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-full"></div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Quizzes Given */}
                      <div className="flex items-center justify-center">
                        <div className="text-center p-3 bg-gradient-to-r from-[#1a2845]/60 to-[#2d3f5f]/40 rounded-xl border border-[#FF9100]/20 transition-transform duration-300 group-hover:scale-105">
                          <p className="text-2xl font-bold text-[#FF9100]">{student.totalQuizzesGiven}</p>
                          <p className="text-sm text-gray-300">Completed</p>
                        </div>
                      </div>

                      {/* Accuracy */}
                      <div className="flex items-center justify-center">
                        <div className="text-center p-3 bg-gradient-to-r from-[#FF9100]/20 to-[#FFD700]/20 rounded-xl border border-[#FFD700]/30 transition-transform duration-300 group-hover:scale-105">
                          <p className="text-3xl font-black text-[#FFD700]">{student.accuracy}%</p>
                          <p className="text-sm text-gray-300">Success Rate</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* No Results State */}
        {selectedStandard && filteredLeaderboard.length === 0 && (
          <div className="text-center py-20">
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100]/20 to-[#FFD700]/20 rounded-full blur-2xl"></div>
              <div className="relative p-8 bg-gradient-to-r from-[#FF9100]/10 to-[#FFD700]/10 rounded-full border border-[#FF9100]/30">
                <Search className="w-20 h-20 text-[#FF9100]" />
              </div>
            </div>
            <h3 className="text-4xl font-bold text-white mb-6">No Champions Found</h3>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {searchTerm 
                ? `No students found matching "${searchTerm}" in ${selectedStandard}. Try a different search term.`
                : `No leaderboard data available for ${selectedStandard} yet. Be the first to take a quiz!`
              }
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
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 26, 54, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #FF9100, #FFD700);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #FFD700, #FF9100);
        }
      `}</style>
    </div>
  );
};

export default Leaderboard;
