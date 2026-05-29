import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import QuizSearchPage from "./pages/QuizSearchPage";
import QuizSearchBeforeSignup from "./pages/QuizSearchBeforeSignup";
import QuizPage from "./pages/QuizPage";
import Leaderboard from "./pages/Leaderboard";
import About from "./pages/About";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => (
  <>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/quiz-search" element={<QuizSearchPage />} />
      <Route path="/quiz-search-before-signup" element={<QuizSearchBeforeSignup />} />
      <Route path="/quiz-page/:userid/:quizid" element={<QuizPage />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </>
);

export default App;
