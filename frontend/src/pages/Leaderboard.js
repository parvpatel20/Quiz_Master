import React, { useState } from "react";
import { useEffect } from "react";
import HeaderAfterSignup from "../components/HeaderAfterSignup";
import Loading from "../components/Loading";

const Leaderboard = () => {
  // State to handle the selected standard and search term
  const [selectedStandard, setSelectedStandard] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [leaderboardData, setleaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLeaderboardData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/leaderboard", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include credentials for the request
      }); // The endpoint to get leaderboard data

      if (!response.ok) {
        throw new Error("Failed to fetch leaderboard data");
      }

      const data = await response.json();

      if (data.success) {
        setleaderboardData(data.data); // Update the leaderboard with the fetched data
      } else {
        setError("No leaderboard data available");
      }
    } catch (error) {
      setError(error.message); // Handle any error during the fetch
    } finally {
      setLoading(false); // Stop loading once the data is fetched
    }
  };

  useEffect(() => {
    fetchLeaderboardData(); // Fetch leaderboard when the component mounts
  }, []);

  // Sort leaderboard by accuracy in descending order
  const sortedLeaderboard = leaderboardData.sort(
    (a, b) => b.accuracy - a.accuracy
  );

  if (error) {
    return <p>{error}</p>;
  }

  // Rank icon function
  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return rank;
    }
  };

  // Filter leaderboard data based on the selected standard
  const filteredLeaderboard = sortedLeaderboard.filter(
    (student) =>
      (student.classname === selectedStandard || selectedStandard === "") &&
      (student.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        searchTerm === "")
  );

  return (
    <div className="h-screen bg-gradient-to-br from-[#0F1A36] via-[#2C4A75] to-[#0A1C36] scrollbar-hide">
      <Loading isLoading={loading} />
      <HeaderAfterSignup />
      <div className="min-h-full p-8">
        {/* Dropdown for selecting the standard */}
        <div className="mb-6 flex justify-center">
          <select
            className="py-3 px-6 rounded-lg shadow-lg text-[#ffffff] bg-[#000e3dfb] font-bold transition-all duration-300 ease-in-out"
            value={selectedStandard}
            onChange={(e) => setSelectedStandard(e.target.value)}
          >
            <option value="" disabled>
              Select Class
            </option>
            <option value="Class 12 (Science)">Class 12 (Science)</option>
            <option value="Class 12 (Commerce)">Class 12 (Commerce)</option>
            <option value="Class 11 (Science)">Class 11 (Science)</option>
            <option value="Class 11 (Commerce)">Class 11 (Commerce)</option>
            <option value="Class 10">Class 10</option>
            <option value="Class 9">Class 9</option>
            <option value="Class 8">Class 8</option>
            <option value="Class 7">Class 7</option>
            <option value="Class 6">Class 6</option>
            <option value="Class 5">Class 5</option>
            <option value="Class 4">Class 4</option>
            <option value="Class 3">Class 3</option>
            <option value="Class 2">Class 2</option>
            <option value="Class 1">Class 1</option>
          </select>
        </div>

        {selectedStandard && (
          <div className="mb-6 flex justify-center">
            <input
              type="text"
              placeholder="Search by username"
              className="py-3 px-6 rounded-lg shadow-lg text-[#ffffff] bg-[#000e3dfb] font-bold transition-all duration-300 ease-in-out"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}

        {!selectedStandard && (
          <p className="text-center text-[#FF7F00] font-bold text-lg">
            Please select a class to view the leaderboard
          </p>
        )}

        {selectedStandard && filteredLeaderboard.length === 0 && (
          <p className="text-center text-[#FF7F00] font-bold text-lg">
            User not found
          </p>
        )}

        {selectedStandard && filteredLeaderboard.length > 0 && (
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <table className="w-full text-left">
              {/* Table Header */}
              <thead className="bg-[#000e3dfb] text-white">
                <tr>
                  <th className="py-4 px-6 text-center">Rank</th>
                  <th className="py-4 px-6">Profile</th>
                  <th className="py-4 px-6">Name</th>
                  <th className="py-4 px-6 text-center">Quizzes Given</th>
                  <th className="py-4 px-6 text-center">Accuracy (%)</th>
                </tr>
              </thead>

              {/* Table Body with Scrollable Section */}
              <tbody className="max-h-[400px] overflow-y-auto">
                {filteredLeaderboard.map((student, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-[#F9F7F7]" : "bg-[#DBE2EF]"
                    } hover:scale-105 hover:shadow-lg transition duration-300`}
                  >
                    <td className="py-5 px-6 text-center font-extrabold text-3xl">
                      {getRankIcon(index + 1)}
                    </td>
                    <td className="py-5 px-6">
                      <img
                        src={
                          student.profilePicture ||
                          "https://via.placeholder.com/150"
                        }
                        alt={`${student.username} profile`}
                        className="w-14 h-14 rounded-full border-4 border-[#FF7F00] shadow-md"
                      />
                    </td>
                    <td className="py-5 px-6 text-[#3F72AF] font-semibold text-lg">
                      {student.username}
                    </td>
                    <td className="py-5 px-6 text-center font-medium text-gray-600">
                      {student.totalQuizzesGiven}
                    </td>
                    <td className="py-5 px-6 text-center font-extrabold text-lg text-[#FF7F00]">
                      {student.accuracy}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
