import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage"; // Placeholder
import LoginPage from "./pages/LoginPage"; // Placeholder
import ProfilePage from "./pages/ProfilePage"; // Placeholder
import QuizSearchPage from "./pages/QuizSearchPage";
import QuizPage from "./pages/QuizPage";
import Leaderboard from "./pages/Leaderboard";
import About from "./pages/About";
import '@fortawesome/fontawesome-free/css/all.min.css';
import QuizSearchPageBeforeSignup from "./pages/QuizSearchBeforeSignup";
import Popup from "./components/Popup";

// ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/quiz-search" element={<QuizSearchPage />} />
        <Route path="/quiz-search-before-signup" element={<QuizSearchPageBeforeSignup />} />
        <Route path="/quiz-page/:userid/:quizid" element={<QuizPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/popup" element={<Popup />} />
      </Routes>
    </>
  );
};

export default App;
