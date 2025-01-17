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
    <section>
      <h2 className="text-3xl font-extrabold text-[#FF9100] mt-10 mb-4">
        Quiz History
      </h2>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-[#1F3C64] text-white text-xl font-bold">
            <th className="border-b border-[#FF5E00] p-3 text-left">Subject</th>
            <th className="border-b border-[#FF5E00] p-3 text-left">Topic</th>
            <th className="border-b border-[#FF5E00] p-3 text-left">Score</th>
            <th className="border-b border-[#FF5E00] p-3 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {currentQuizzes.length === 0 ? (
            <tr>
              <td colSpan={4} className="p-3 text-center font-semibold text-gray-400">
                No quizzes taken yet.
              </td>
            </tr>
          ) : (
            currentQuizzes.map((outerquiz, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-[#1A2E48]" : "bg-[#1F3C64]"}`}
              >
                <td className="p-3 font-semibold">{outerquiz.quiz.subject}</td>
                <td className="p-3 font-semibold">{outerquiz.quiz.topic}</td>
                <td
                  className={`p-3 ${
                    outerquiz.score >= 90
                      ? "text-green-400"
                      : outerquiz.score >= 70
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  {outerquiz.score}%
                </td>
                <td className="p-3 font-semibold">
                  {`${new Date(outerquiz.quizDate).getDate()
                    .toString()
                    .padStart(2, "0")}/${(new Date(outerquiz.quizDate).getMonth() + 1)
                    .toString()
                    .padStart(2, "0")}/${new Date(outerquiz.quizDate)
                    .getFullYear()
                    .toString()
                    .slice(-2)}`}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        {/* Prev Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold transition-all duration-300 ease-in-out transform ${
            currentPage === 1
              ? "text-gray-500 cursor-not-allowed"
              : "text-white hover:bg-[#1D3557] hover:scale-110"
          }`}
        >
          &lt;
        </button>

        {/* Page Numbers */}
        {renderPagination().map((page, index) => (
          <button
            key={index}
            onClick={() => {
              if (page !== "...") {
                handlePageChange(page);
              }
            }}
            className={`w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold transition-all duration-300 ease-in-out transform ${
              currentPage === page
                ? "bg-[#FF5E00] text-white shadow-lg scale-110"
                : page === "..."
                ? "text-[#ffffff] font-medium"
                : "bg-[#ffffff] text-[#1D3557] hover:bg-[#457B9D] hover:text-white"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold transition-all duration-300 ease-in-out transform ${
            currentPage === totalPages
              ? "text-gray-500 cursor-not-allowed"
              : "text-white hover:bg-[#1D3557] hover:scale-110"
          }`}
        >
          &gt;
        </button>
      </div>
    </section>
  );
};

export default QuizHistory;
