import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Layers, Tag, Gauge, ListChecks, Search, Lock, ArrowRight, FileText } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Loading from "./Loading";
import { Select, Card, Button, Badge, SectionHeading } from "./ui";
import { apiFetch } from "../config/api";
import { CLASS_OPTIONS, DIFFICULTY_OPTIONS, FORMAT_OPTIONS } from "../config/constants";

const difficultyTone = (d) => {
  switch (d?.toLowerCase()) {
    case "easy": return "green";
    case "medium": return "amber";
    case "hard": return "red";
    default: return "brand";
  }
};

const uniq = (arr) => Array.from(new Set(arr));
const gradeKey = (cls) => cls.replace(/Class\s*/i, "").trim();

/**
 * Shared quiz browser.
 * mode="auth"  -> fetches /quiz-search, quizzes are startable.
 * mode="guest" -> fetches /quiz-search-before-signup, start is locked.
 */
const QuizSearch = ({ mode = "auth" }) => {
  const navigate = useNavigate();
  const isGuest = mode === "guest";

  const [quizzes, setQuizzes] = useState([]);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);

  const [cls, setCls] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [format, setFormat] = useState("");

  useEffect(() => {
    let active = true;
    const endpoint = isGuest ? "/quiz-search-before-signup" : "/quiz-search";
    apiFetch(endpoint)
      .then((res) => {
        if (!active) return;
        const payload = isGuest ? res?.data : res?.data?.quizzes;
        setQuizzes(Array.isArray(payload) ? payload : Object.values(payload || {}));
        if (!isGuest && res?.data?.userid) setUserId(res.data.userid);
      })
      .catch(() => active && setQuizzes([]))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [isGuest]);

  const subjectOptions = useMemo(() => {
    if (!cls) return [];
    return uniq(
      quizzes
        .filter((q) => q.class.trim() === gradeKey(cls))
        .map((q) => q.subject.trim())
    ).map((s) => ({ value: s, label: s }));
  }, [cls, quizzes]);

  const topicOptions = useMemo(() => {
    if (!subject) return [];
    return uniq(
      quizzes
        .filter(
          (q) =>
            q.class.trim() === gradeKey(cls) &&
            q.subject.trim().toLowerCase() === subject.trim().toLowerCase()
        )
        .map((q) => q.topic.trim())
    ).map((t) => ({ value: t, label: t }));
  }, [subject, cls, quizzes]);

  const results = useMemo(
    () =>
      quizzes.filter((q) => {
        const okDiff = difficulty ? q.difficulty?.toLowerCase() === difficulty.toLowerCase() : true;
        const okFmt = format ? q.format?.toLowerCase() === format.toLowerCase() : true;
        const okTopic = topic ? q.topic?.toLowerCase() === topic.toLowerCase() : true;
        return okDiff && okFmt && okTopic;
      }),
    [quizzes, difficulty, format, topic]
  );

  const startQuiz = async (quizId) => {
    try {
      await apiFetch(`/quiz-page/${userId}/${quizId}`);
      navigate(`/quiz-page/${userId}/${quizId}`);
    } catch {
      navigate(`/quiz-page/${userId}/${quizId}`);
    }
  };

  return (
    <div className="app-bg">
      <Navbar isLoggedIn={!isGuest} />

      <main className="mx-auto max-w-content px-5 pb-20 pt-28 sm:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Badge tone="brand">
            <Search className="h-3.5 w-3.5" /> Quiz library
          </Badge>
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Find your next quiz
          </h1>
          <p className="mt-3 text-slate-400">
            Filter by class, subject, and topic to discover quizzes that match what
            you want to practice.
          </p>
        </div>

        {/* Filters */}
        <Card className="mt-10 p-6">
          <div className="grid gap-5 md:grid-cols-3">
            <Select
              label="Class" icon={BookOpen} value={cls}
              onChange={(v) => { setCls(v); setSubject(""); setTopic(""); }}
              options={CLASS_OPTIONS} placeholder="Select class"
            />
            <Select
              label="Subject" icon={Layers} value={subject}
              onChange={(v) => { setSubject(v); setTopic(""); }}
              options={subjectOptions} disabled={!cls}
              placeholder={cls ? "Select subject" : "Select class first"}
            />
            <Select
              label="Topic" icon={Tag} value={topic} onChange={setTopic}
              options={topicOptions} disabled={!subject}
              placeholder={subject ? "Select topic" : "Select subject first"}
            />
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <Select
              label="Difficulty" icon={Gauge} value={difficulty}
              onChange={setDifficulty} options={DIFFICULTY_OPTIONS}
              placeholder="Any difficulty"
            />
            <Select
              label="Format" icon={ListChecks} value={format}
              onChange={setFormat} options={FORMAT_OPTIONS}
              placeholder="Any format"
            />
          </div>
        </Card>

        {/* Results */}
        {topic ? (
          <section className="mt-12">
            <SectionHeading
              icon={BookOpen}
              title="Available quizzes"
              subtitle={`Topic: ${topic}`}
            />
            {results.length > 0 ? (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((quiz) => (
                  <Card key={quiz._id} hover className="flex flex-col p-6">
                    <h3 className="text-lg font-semibold text-white">{quiz.quizName}</h3>
                    <div className="hairline my-4" />
                    <dl className="space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <dt className="text-slate-400">Format</dt>
                        <dd><Badge tone="blue">{quiz.format}</Badge></dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-slate-400">Questions</dt>
                        <dd className="font-medium text-white">{quiz.questions.length}</dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-slate-400">Difficulty</dt>
                        <dd><Badge tone={difficultyTone(quiz.difficulty)}>{quiz.difficulty}</Badge></dd>
                      </div>
                    </dl>
                    <div className="mt-6">
                      {isGuest ? (
                        <Button as={"a"} href="/register" variant="outline" className="w-full">
                          <Lock className="h-4 w-4" /> Sign up to play
                        </Button>
                      ) : (
                        <Button className="w-full" onClick={() => startQuiz(quiz._id)}>
                          Start quiz <ArrowRight className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="mt-8 flex flex-col items-center gap-3 px-6 py-16 text-center">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand/10 text-brand">
                  <Search className="h-7 w-7" />
                </span>
                <p className="font-medium text-white">No quizzes match these filters</p>
                <p className="max-w-md text-sm text-slate-400">
                  Try a different difficulty or format to see more results.
                </p>
              </Card>
            )}
          </section>
        ) : (
          <Card className="mt-12 flex flex-col items-center gap-3 px-6 py-20 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-brand/10 text-brand">
              <FileText className="h-8 w-8" />
            </span>
            <p className="text-lg font-semibold text-white">Start by picking a topic</p>
            <p className="max-w-md text-sm text-slate-400">
              Choose a class, subject, and topic above and the matching quizzes will
              show up here.
            </p>
          </Card>
        )}
      </main>

      <Footer isLoggedIn={!isGuest} />
      <Loading isLoading={loading} />
    </div>
  );
};

export default QuizSearch;
