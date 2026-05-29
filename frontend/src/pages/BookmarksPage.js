import React from "react";
import { useNavigate } from "react-router-dom";
import { Bookmark, Compass } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import QuizCard from "../components/QuizCard";
import { Badge, Button, Card, Skeleton, EmptyState, Reveal } from "../components/ui";
import { apiFetch } from "../config/api";
import { useBookmarkedQuizzes, useProfile, useToggleBookmark } from "../hooks/queries";

const BookmarksPage = () => {
  const navigate = useNavigate();
  const { data: quizzes = [], isLoading } = useBookmarkedQuizzes();
  const { data: profile } = useProfile();
  const toggle = useToggleBookmark();
  const userId = profile?._id || "";

  const startQuiz = async (quizId) => {
    try { await apiFetch(`/quiz-page/${userId}/${quizId}`); } catch { /* re-fetch on page */ }
    navigate(`/quiz-page/${userId}/${quizId}`);
  };

  return (
    <div className="app-bg">
      <Navbar isLoggedIn />

      <main className="mx-auto max-w-content px-5 pb-20 pt-28 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Badge tone="brand"><Bookmark className="h-3.5 w-3.5" /> Saved</Badge>
          <h1 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">Your bookmarks</h1>
          <p className="mt-3 text-slate-400">Quizzes you've saved to come back to.</p>
        </Reveal>

        {isLoading ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-64" />)}
          </div>
        ) : quizzes.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {quizzes.map((quiz, i) => (
              <Reveal key={quiz._id} delay={Math.min(i * 0.04, 0.3)}>
                <QuizCard
                  quiz={quiz}
                  bookmarked
                  onToggleBookmark={(id) => toggle.mutate(id)}
                  onStart={startQuiz}
                />
              </Reveal>
            ))}
          </div>
        ) : (
          <Card className="mt-10">
            <EmptyState
              icon={Bookmark}
              title="No bookmarks yet"
              subtitle="Save quizzes from the library to find them quickly later."
              action={
                <Button onClick={() => navigate("/quiz-search")}>
                  <Compass className="h-4 w-4" /> Explore quizzes
                </Button>
              }
            />
          </Card>
        )}
      </main>

      <Footer isLoggedIn />
    </div>
  );
};

export default BookmarksPage;
