import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal, Sparkles, LayoutGrid, X } from "lucide-react";
import Shell from "./Shell";
import QuizCard from "./QuizCard";
import { Card, Input, Chip, Select, Skeleton, EmptyState, Reveal, PageHeader } from "./ui";
import { apiFetch } from "../config/api";
import { useQuizzes, useToggleBookmark } from "../hooks/queries";
import { DIFFICULTY_OPTIONS, FORMAT_OPTIONS } from "../config/constants";

const SORTS = [
  { value: "newest", label: "Newest" },
  { value: "az", label: "Name (A–Z)" },
  { value: "questions", label: "Most questions" },
  { value: "time", label: "Shortest time" },
];

const CardSkeleton = () => (
  <Card className="p-6">
    <div className="flex gap-2"><Skeleton className="h-6 w-20" /><Skeleton className="h-6 w-16" /></div>
    <Skeleton className="mt-3 h-6 w-3/4" />
    <Skeleton className="mt-2 h-4 w-1/2" />
    <div className="hairline my-4" />
    <div className="grid grid-cols-3 gap-2"><Skeleton className="h-12" /><Skeleton className="h-12" /><Skeleton className="h-12" /></div>
    <Skeleton className="mt-6 h-10 w-full" />
  </Card>
);

const QuizSearch = ({ mode = "auth" }) => {
  const navigate = useNavigate();
  const isGuest = mode === "guest";

  const { data, isLoading } = useQuizzes(mode);
  const quizzes = useMemo(() => data?.quizzes || [], [data]);
  const bookmarks = useMemo(() => data?.bookmarks || [], [data]);
  const userId = data?.userid || "";
  const toggle = useToggleBookmark();

  const [q, setQ] = useState("");
  const [subject, setSubject] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [format, setFormat] = useState("");
  const [sort, setSort] = useState("newest");

  const subjects = useMemo(
    () => Array.from(new Set(quizzes.map((x) => x.subject?.trim()).filter(Boolean))).sort(),
    [quizzes]
  );

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    let list = quizzes.filter((x) => {
      const okText =
        !term ||
        [x.quizName, x.subject, x.topic].some((f) => f?.toLowerCase().includes(term));
      const okSub = !subject || x.subject?.trim() === subject;
      const okDiff = !difficulty || x.difficulty?.toLowerCase() === difficulty.toLowerCase();
      const okFmt = !format || x.format?.toLowerCase() === format.toLowerCase();
      return okText && okSub && okDiff && okFmt;
    });
    list = [...list].sort((a, b) => {
      if (sort === "az") return a.quizName.localeCompare(b.quizName);
      if (sort === "questions") return (b.questions?.length || 0) - (a.questions?.length || 0);
      if (sort === "time") return (a.totalTime || 0) - (b.totalTime || 0);
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });
    return list;
  }, [quizzes, q, subject, difficulty, format, sort]);

  const activeFilters = [subject, difficulty, format].filter(Boolean).length + (q ? 1 : 0);
  const clearAll = () => { setQ(""); setSubject(""); setDifficulty(""); setFormat(""); };

  const startQuiz = async (quizId) => {
    try {
      await apiFetch(`/quiz-page/${userId}/${quizId}`);
    } catch { /* navigate anyway; quiz page re-fetches */ }
    navigate(`/quiz-page/${userId}/${quizId}`);
  };

  return (
    <Shell isLoggedIn={!isGuest}>
      <Reveal>
        <PageHeader
          badge="Quiz library"
          badgeIcon={Sparkles}
          title="Explore quizzes"
          subtitle={`Search by name or topic, filter by subject and difficulty, and ${
            isGuest ? "sign up to start playing." : "jump straight in."
          }`}
        />
      </Reveal>

      <div className="section-gap">
        {/* Search + sort */}
        <Reveal delay={0.05}>
          <Card className="p-5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex-1">
                <Input
                  icon={Search}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search quizzes by name, subject, or topic"
                  rightSlot={q ? (
                    <button onClick={() => setQ("")} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:text-white" aria-label="Clear search">
                      <X className="h-4 w-4" />
                    </button>
                  ) : null}
                />
              </div>
              <div className="sm:w-48">
                <Select icon={SlidersHorizontal} value={sort} onChange={setSort} options={SORTS} placeholder="Sort" />
              </div>
            </div>

            {/* Subject chips */}
            {subjects.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                <Chip active={!subject} onClick={() => setSubject("")} icon={LayoutGrid}>All subjects</Chip>
                {subjects.map((s) => (
                  <Chip key={s} active={subject === s} onClick={() => setSubject(subject === s ? "" : s)}>{s}</Chip>
                ))}
              </div>
            )}

            {/* Difficulty + format chips */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase tracking-wide text-slate-500">Difficulty</span>
              {DIFFICULTY_OPTIONS.map((d) => (
                <Chip key={d.value} active={difficulty === d.value} onClick={() => setDifficulty(difficulty === d.value ? "" : d.value)}>{d.label}</Chip>
              ))}
              <span className="ml-2 text-xs uppercase tracking-wide text-slate-500">Format</span>
              {FORMAT_OPTIONS.map((f) => (
                <Chip key={f.value} active={format === f.value} onClick={() => setFormat(format === f.value ? "" : f.value)}>{f.label}</Chip>
              ))}
              {activeFilters > 0 && (
                <button onClick={clearAll} className="ml-auto inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white">
                  <X className="h-3.5 w-3.5" /> Clear
                </button>
              )}
            </div>
          </Card>
        </Reveal>

        {/* Results */}
        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm text-slate-400">
            {isLoading ? "Loading…" : `${results.length} quiz${results.length === 1 ? "" : "zes"} found`}
          </p>
        </div>

        {isLoading ? (
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
          </div>
        ) : results.length > 0 ? (
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((quiz, i) => (
              <Reveal key={quiz._id} delay={Math.min(i * 0.04, 0.3)} className="h-full">
                <QuizCard
                  quiz={quiz}
                  isGuest={isGuest}
                  bookmarked={bookmarks.includes(quiz._id)}
                  onToggleBookmark={(id) => toggle.mutate(id)}
                  onStart={startQuiz}
                />
              </Reveal>
            ))}
          </div>
        ) : (
          <Card className="mt-4">
            <EmptyState
              icon={Search}
              title="No quizzes match your filters"
              subtitle="Try a different search term, subject, or clear the filters."
            />
          </Card>
        )}
      </div>
    </Shell>
  );
};

export default QuizSearch;
