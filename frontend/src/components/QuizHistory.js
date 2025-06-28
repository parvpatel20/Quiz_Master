import React, { useState } from "react";

const QuizHistory = ({ quizzes }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const quizzesPerPage = 5; // Number of quizzes per page
  const maxPagesPerPage = 5; // Maximum visible page numbers in pagination

  const totalPages = Math.ceil(quizzes.length / quizzesPerPage);

  const indexOfLastQuiz = currentPage * quizzesPerPage;
  const indexOfFirstQuiz = indexOfLastQuiz - quizzesPerPage;
  const currentQuizzes = quizzes.slice(indexOfFirstQuiz, indexOfLastQuiz);

  // Calculate range of page numbers to show
  const startPage =
    Math.floor((currentPage - 1) / maxPagesPerPage) * maxPagesPerPage + 1;
  const endPage = Math.min(startPage + maxPagesPerPage - 1, totalPages);
  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  // Function to generate the pagination range with dots
  const renderPagination = () => {
    const pagination = [];

    // Add first page if not already included
    if (visiblePages[0] > 1) {
      pagination.push(1);
      if (visiblePages[0] > 2) pagination.push("..."); // Show dots if there are pages in between
    }

    // Add the visible page numbers
    pagination.push(...visiblePages);

    // Add last page if not already included
    if (visiblePages[visiblePages.length - 1] < totalPages) {
      if (visiblePages[visiblePages.length - 1] < totalPages - 1) pagination.push("...");
      pagination.push(totalPages);
    }

    return pagination;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Container with improved responsive padding */}
      <div className="relative">
        {/* Animated background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF9100]/5 via-transparent to-[#FFD700]/5 rounded-2xl opacity-60"></div>
        
        <div className="relative bg-gradient-to-br from-[#1a2845]/80 to-[#2d3f5f]/60 rounded-2xl shadow-2xl overflow-hidden border border-[#FF9100]/20 backdrop-blur-sm">
          {/* Responsive table container */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[640px]">
              <thead>
                <tr className="bg-gradient-to-r from-[#FF9100]/70 to-[#FFD700]/70 text-white">
                  <th className="p-3 sm:p-4 text-left font-bold text-sm sm:text-base">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                      Subject
                    </div>
                  </th>
                  <th className="p-3 sm:p-4 text-left font-bold text-sm sm:text-base">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                      Topic
                    </div>
                  </th>
                  <th className="p-3 sm:p-4 text-left font-bold text-sm sm:text-base">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                      Score
                    </div>
                  </th>
                  <th className="p-3 sm:p-4 text-left font-bold text-sm sm:text-base">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                      Date
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentQuizzes.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 sm:p-12 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-[#FF9100]/20 to-[#FFD700]/20 rounded-full flex items-center justify-center border border-[#FF9100]/30">
                          <svg className="w-8 h-8 text-[#FF9100]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold text-white mb-2">No quizzes taken yet</p>
                          <p className="text-gray-400 text-sm">Start your learning journey and track your progress here!</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentQuizzes.map((outerquiz, index) => (
                    <tr
                      key={index}
                      className={`group transition-all duration-300 ${
                        index % 2 === 0 
                          ? "bg-gradient-to-r from-[#1a2845]/60 to-[#2d3f5f]/40" 
                          : "bg-gradient-to-r from-[#2d3f5f]/40 to-[#1a2845]/60"
                      } hover:bg-gradient-to-r hover:from-[#FF9100]/10 hover:to-[#FFD700]/10 border-b border-[#FF9100]/10 last:border-b-0`}
                    >
                      <td className="p-3 sm:p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <span className="font-semibold text-white text-sm sm:text-base group-hover:text-[#FFD700] transition-colors duration-300">
                            {outerquiz.quiz.subject}
                          </span>
                        </div>
                      </td>
                      <td className="p-3 sm:p-4">
                        <span className="font-medium text-gray-300 text-sm sm:text-base group-hover:text-white transition-colors duration-300">
                          {outerquiz.quiz.topic}
                        </span>
                      </td>
                      <td className="p-3 sm:p-4">
                        <div className="flex items-center gap-2">
                          <div
                            className={`inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-bold border transition-all duration-300 ${
                              outerquiz.score >= 90
                                ? "bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-400 border-emerald-500/30 group-hover:from-emerald-500/30 group-hover:to-green-500/30"
                                : outerquiz.score >= 70
                                ? "bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-400 border-amber-500/30 group-hover:from-amber-500/30 group-hover:to-yellow-500/30"
                                : "bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-400 border-red-500/30 group-hover:from-red-500/30 group-hover:to-pink-500/30"
                            }`}
                          >
                            {outerquiz.score}%
                          </div>
                        </div>
                      </td>
                      <td className="p-3 sm:p-4">
                        <span className="font-medium text-gray-400 text-sm sm:text-base group-hover:text-gray-300 transition-colors duration-300">
                          {`${new Date(outerquiz.quizDate).getDate()
                            .toString()
                            .padStart(2, "0")}/${(new Date(outerquiz.quizDate).getMonth() + 1)
                            .toString()
                            .padStart(2, "0")}/${new Date(outerquiz.quizDate)
                            .getFullYear()
                            .toString()
                            .slice(-2)}`}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Enhanced Pagination Controls with Better Spacing */}
        {totalPages > 1 && (
          <div className="mt-6 px-2 sm:px-4">
            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`group relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 overflow-hidden ${
                  currentPage === 1
                    ? "text-gray-500 cursor-not-allowed bg-[#1a2845]/50 border border-gray-600/30"
                    : "text-white bg-gradient-to-r from-[#1a2845]/80 to-[#2d3f5f]/60 hover:from-[#FF9100]/20 hover:to-[#FFD700]/20 border border-[#FF9100]/30 hover:border-[#FF9100]/50 backdrop-blur-sm hover:scale-105"
                }`}
              >
                {currentPage !== 1 && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100]/10 to-[#FFD700]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
                <span className="relative">←</span>
              </button>

              {/* Page Numbers */}
              <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2">
                {renderPagination().map((page, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (page !== "...") {
                        handlePageChange(page);
                      }
                    }}
                    className={`group relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 overflow-hidden ${
                      currentPage === page
                        ? "bg-gradient-to-r from-[#FF9100] to-[#FFD700] text-white shadow-lg border border-[#FF9100] transform scale-110"
                        : page === "..."
                        ? "text-gray-400 cursor-default bg-transparent"
                        : "text-white bg-gradient-to-r from-[#1a2845]/80 to-[#2d3f5f]/60 hover:from-[#FF9100]/20 hover:to-[#FFD700]/20 border border-[#FF9100]/30 hover:border-[#FF9100]/50 backdrop-blur-sm hover:scale-105"
                    }`}
                    disabled={page === "..."}
                  >
                    {page !== "..." && currentPage !== page && (
                      <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100]/10 to-[#FFD700]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    )}
                    <span className="relative">{page}</span>
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`group relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 overflow-hidden ${
                  currentPage === totalPages
                    ? "text-gray-500 cursor-not-allowed bg-[#1a2845]/50 border border-gray-600/30"
                    : "text-white bg-gradient-to-r from-[#1a2845]/80 to-[#2d3f5f]/60 hover:from-[#FF9100]/20 hover:to-[#FFD700]/20 border border-[#FF9100]/30 hover:border-[#FF9100]/50 backdrop-blur-sm hover:scale-105"
                }`}
              >
                {currentPage !== totalPages && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100]/10 to-[#FFD700]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
                <span className="relative">→</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizHistory;
