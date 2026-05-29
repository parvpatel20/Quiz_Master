import React from "react";
import { useNavigate } from "react-router-dom";
import { Bookmark, Compass } from "lucide-react";
import Shell from "../components/Shell";
import QuizCard from "../components/QuizCard";
import { Button, Card, Skeleton, EmptyState, Reveal, PageHeader } from "../components/ui";
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
    <Shell isLoggedIn>
      <Reveal>
        <PageHeader
          badge="Saved"
          badgeIcon={Bookmark}
          title="Your bookmarks"
          subtitle="Quizzes you've saved to come back to."
        />
      </Reveal>

      <div className="section-gap">
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-72" />)}
          </div>
        ) : quizzes.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
          <Card>
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
      </div>
    </Shell>
  );
};

export default BookmarksPage;
