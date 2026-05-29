import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Clock, CheckCircle2, XCircle, RotateCcw, Play, Trophy, Target,
  BookOpen, ChevronLeft, ChevronRight, ListChecks, Eraser,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import { Card, Button, Badge, cx } from "../components/ui";
import { apiFetch } from "../config/api";
import { FORMAT_LABELS } from "../config/constants";

const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
const normInt = (o) => (o && o.$numberInt ? parseInt(o.$numberInt, 10) : o);

const QuizPage = () => {
  const { userid, quizid } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  const [answers, setAnswers] = useState([]);
  const [current, setCurrent] = useState(0);
  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [timedOut, setTimedOut] = useState(false);

  /* ---- load quiz ---- */
  useEffect(() => {
    let active = true;
    apiFetch(`/quiz-page/${userid}/${quizid}`)
      .then((res) => {
        if (!active) return;
        const data = res?.data?.quiz;
        if (data?.totalTime) {
          setQuiz(data);
          setTimeLeft(data.totalTime * 60);
        }
      })
      .catch((err) => console.error("Failed to load quiz:", err.message))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [userid, quizid]);

  /* ---- scoring ---- */
  const score = useMemo(() => {
    if (!quiz) return 0;
    const fmt = quiz.format.toLowerCase();
    let total = 0;
    quiz.questions.forEach((q, idx) => {
      const user = answers[idx] || [];
      if (fmt === "mcq-single" || fmt === "mcq-multiple") {
        const correct = (q.correctOption || [])
          .map(normInt)
          .map((i) => q.options[i])
          .filter(Boolean);
        if (fmt === "mcq-single") {
          if (
            user.length === 1 && correct[0] &&
            user[0].trim().toLowerCase() === correct[0].trim().toLowerCase()
          ) total += 1;
        } else {
          const norm = (arr) => arr.map((x) => x.trim().toLowerCase()).sort();
          const u = norm(user);
          const c = norm(correct);
          if (u.length === c.length && u.every((v, i) => v === c[i])) total += 1;
        }
      } else if (fmt === "true/false") {
        const correctIsTrue = q.isCorrect === true || q.isCorrect === 1;
        const userIsTrue = user.length === 1 && user[0].trim().toLowerCase() === "true";
        if (user.length === 1 && userIsTrue === correctIsTrue) total += 1;
      } else if (fmt === "fill-in-the-blank") {
        if (
          user.length === 1 && q.correctAnswer &&
          user[0].trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()
        ) total += 1;
      }
    });
    return total;
  }, [quiz, answers]);

  const totalQuestions = quiz?.questions.length || 0;
  const percent = totalQuestions ? Math.round((score / totalQuestions) * 100) : 0;
  const attempted = answers.filter(Boolean).length;
  const missed = totalQuestions - attempted;

  /* ---- timer ---- */
  const submitQuiz = useCallback(() => {
    setSubmitted(true);
    setStarted(false);
    setShowSummary(true);
  }, []);

  useEffect(() => {
    if (!started || timeLeft == null) return;
    if (timeLeft <= 0) {
      setTimedOut(true);
      submitQuiz();
      return;
    }
    const t = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearInterval(t);
  }, [started, timeLeft, submitQuiz]);

  /* ---- persist score once result shown ---- */
  useEffect(() => {
    if (!showResult || !quiz) return;
    apiFetch(`/quiz-page/${userid}/${quizid}`, {
      method: "POST",
      body: { score: parseFloat(percent.toFixed(2)), quizDate: new Date() },
    }).catch((err) => console.error("Failed to save score:", err.message));
  }, [showResult]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ---- answer handling ---- */
  const setAnswer = (value, idx, fmt) => {
    setAnswers((prev) => {
      const next = [...prev];
      const f = fmt.toLowerCase();
      if (f === "mcq-multiple") {
        const cur = next[idx] || [];
        next[idx] = cur.includes(value)
          ? cur.filter((v) => v !== value)
          : [...cur, value];
        if (next[idx].length === 0) next[idx] = null;
      } else if (f === "fill-in-the-blank") {
        next[idx] = value.trim() === "" ? null : [value.trim()];
      } else {
        next[idx] = next[idx]?.[0] === value ? null : [value];
      }
      return next;
    });
  };

  const clearAnswer = (idx) =>
    setAnswers((prev) => {
      const next = [...prev];
      next[idx] = null;
      return next;
    });

  const startQuiz = () => {
    setStarted(true);
    setTimeLeft(quiz.totalTime * 60);
    setTimedOut(false);
  };

  const restart = () => {
    setStarted(false);
    setSubmitted(false);
    setShowSummary(false);
    setShowResult(false);
    setAnswers([]);
    setCurrent(0);
    setTimeLeft(quiz.totalTime * 60);
    setTimedOut(false);
  };

  /* ---- views ---- */
  const Instructions = () => (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-5 py-10">
      <div className="text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand/10 text-brand">
          <BookOpen className="h-7 w-7" />
        </span>
        <h1 className="mt-5 text-3xl font-bold text-white">{quiz?.quizName || "Quiz"}</h1>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {[
          { icon: Clock, label: "Time limit", value: `${quiz?.totalTime} min` },
          { icon: Target, label: "Questions", value: totalQuestions },
          { icon: ListChecks, label: "Format", value: FORMAT_LABELS[quiz?.format] || quiz?.format },
          { icon: Trophy, label: "Max marks", value: totalQuestions },
        ].map(({ icon: Icon, label, value }) => (
          <Card key={label} className="flex items-center gap-4 p-5">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
              <p className="text-lg font-semibold text-white">{value}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-4 p-6">
        <h3 className="text-sm font-semibold text-white">Guidelines</h3>
        <ul className="mt-4 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
          <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> No negative marking</li>
          <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Free navigation between questions</li>
          <li className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-emerald-500" /> Answered questions</li>
          <li className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-red-500" /> Unanswered questions</li>
        </ul>
      </Card>

      <div className="mt-8 text-center">
        <Button size="lg" onClick={startQuiz}>
          <Play className="h-5 w-5" /> Start quiz
        </Button>
      </div>
    </div>
  );

  const q = quiz?.questions[current];

  const QuizRunner = () => (
    <div className="mx-auto grid max-w-content gap-6 px-5 py-6 lg:grid-cols-[260px_1fr]">
      {/* Sidebar */}
      <Card className="h-fit p-5">
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <div className="flex items-center justify-center gap-2 text-white">
            <Clock className="h-4 w-4 text-brand" />
            <span className="font-mono text-lg font-semibold">{formatTime(timeLeft || 0)}</span>
          </div>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className={cx(
                "h-full transition-all duration-700",
                timeLeft > 120 ? "bg-emerald-500" : timeLeft > 60 ? "bg-amber-500" : "bg-red-500"
              )}
              style={{ width: `${(timeLeft / (quiz.totalTime * 60)) * 100}%` }}
            />
          </div>
        </div>

        <p className="mt-5 text-xs uppercase tracking-wide text-slate-500">Questions</p>
        <div className="mt-3 grid grid-cols-5 gap-2">
          {quiz.questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={cx(
                "h-10 rounded-lg border text-sm font-semibold transition-colors",
                current === i
                  ? "border-brand bg-brand text-ink-950"
                  : answers[i]
                  ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300"
                  : "border-white/10 text-slate-400 hover:border-white/20"
              )}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </Card>

      {/* Question */}
      <div>
        <Card className="p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <Badge tone="brand">Question {current + 1} of {totalQuestions}</Badge>
          </div>
          <p className="mt-5 text-lg leading-relaxed text-white">{q?.questionText}</p>

          <div className="mt-6 space-y-3">
            {(quiz.format === "MCQ-Single" || quiz.format === "MCQ-Multiple") &&
              q?.options.map((opt, i) => {
                const selected = answers[current]?.includes(opt);
                return (
                  <label
                    key={i}
                    className={cx(
                      "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 transition-colors",
                      selected ? "border-brand/60 bg-brand/10 text-white" : "border-white/10 text-slate-300 hover:border-white/20"
                    )}
                  >
                    <input
                      type={quiz.format === "MCQ-Single" ? "radio" : "checkbox"}
                      name={`q-${current}`}
                      checked={selected || false}
                      onChange={() => setAnswer(opt, current, quiz.format)}
                      className="h-4 w-4 accent-brand"
                    />
                    <span>{opt}</span>
                  </label>
                );
              })}

            {quiz.format === "True/False" &&
              ["True", "False"].map((opt) => {
                const selected = answers[current]?.[0] === opt;
                return (
                  <label
                    key={opt}
                    className={cx(
                      "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 transition-colors",
                      selected ? "border-brand/60 bg-brand/10 text-white" : "border-white/10 text-slate-300 hover:border-white/20"
                    )}
                  >
                    <input
                      type="radio"
                      name={`q-${current}`}
                      checked={selected}
                      onChange={() => setAnswer(opt, current, "True/False")}
                      className="h-4 w-4 accent-brand"
                    />
                    <span>{opt}</span>
                  </label>
                );
              })}

            {quiz.format === "Fill-in-the-Blank" && (
              <textarea
                value={answers[current]?.[0] || ""}
                onChange={(e) => setAnswer(e.target.value, current, "Fill-in-the-Blank")}
                placeholder="Type your answer…"
                className="h-28 w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] p-4 text-white placeholder-slate-500 focus:border-brand/70 focus:outline-none"
              />
            )}
          </div>
        </Card>

        <div className="mt-5 flex items-center justify-between gap-3">
          <Button variant="outline" disabled={current === 0} onClick={() => setCurrent((c) => c - 1)}>
            <ChevronLeft className="h-4 w-4" /> Prev
          </Button>
          <Button variant="ghost" onClick={() => clearAnswer(current)}>
            <Eraser className="h-4 w-4" /> Clear
          </Button>
          <Button
            variant="outline"
            disabled={current === totalQuestions - 1}
            onClick={() => setCurrent((c) => c + 1)}
          >
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-6 text-center">
          <Button size="lg" onClick={submitQuiz}>Submit quiz</Button>
        </div>
      </div>
    </div>
  );

  const Summary = () => (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col justify-center px-5 py-10">
      <div className="text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand/10 text-brand">
          <Target className="h-7 w-7" />
        </span>
        <h1 className="mt-5 text-3xl font-bold text-white">Quiz summary</h1>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Card className="p-6 text-center">
          <CheckCircle2 className="mx-auto h-7 w-7 text-emerald-400" />
          <p className="mt-3 text-3xl font-bold text-white">{attempted}</p>
          <p className="text-sm text-slate-400">Attempted</p>
        </Card>
        <Card className="p-6 text-center">
          <XCircle className="mx-auto h-7 w-7 text-red-400" />
          <p className="mt-3 text-3xl font-bold text-white">{missed}</p>
          <p className="text-sm text-slate-400">Unattempted</p>
        </Card>
      </div>

      <Card className="mt-4 p-6">
        <div className="flex justify-between text-sm text-slate-400">
          <span>Progress</span>
          <span>{attempted} / {totalQuestions}</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full bg-brand transition-all" style={{ width: `${totalQuestions ? (attempted / totalQuestions) * 100 : 0}%` }} />
        </div>
      </Card>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Button
          variant="outline"
          disabled={timedOut}
          onClick={() => { setShowSummary(false); setStarted(true); }}
        >
          <ChevronLeft className="h-4 w-4" /> {timedOut ? "Time's up" : "Back to quiz"}
        </Button>
        <Button onClick={() => setShowResult(true)}>
          <Trophy className="h-4 w-4" /> View results
        </Button>
      </div>
    </div>
  );

  const message = percent >= 80
    ? { tone: "green", title: "Excellent work", body: "You've nailed this quiz. Keep the momentum going." }
    : percent >= 50
    ? { tone: "amber", title: "Good job", body: "Solid effort — a little more practice and you'll reach the top." }
    : { tone: "blue", title: "Keep learning", body: "Every expert started somewhere. Review and try again." };

  const Result = () => (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <div className="text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand/10 text-brand">
          <Trophy className="h-8 w-8" />
        </span>
        <h1 className="mt-5 text-3xl font-bold text-white">Your results</h1>
      </div>

      <div className="mt-8 flex flex-col items-center">
        <div className="grid h-36 w-36 place-items-center rounded-full border-4 border-brand/30">
          <div className="text-center">
            <p className="font-display text-4xl font-bold text-white">{score}</p>
            <p className="text-xs text-slate-400">of {totalQuestions}</p>
          </div>
        </div>
        <div className="mt-6 w-full max-w-sm">
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full bg-brand transition-all" style={{ width: `${percent}%` }} />
          </div>
          <p className="mt-2 text-center text-sm text-slate-400">{percent}% score</p>
        </div>
      </div>

      <Card className="mt-8 p-6 text-center">
        <Badge tone={message.tone}>{message.title}</Badge>
        <p className="mt-3 text-slate-300">{message.body}</p>
      </Card>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Card className="p-5 text-center">
          <CheckCircle2 className="mx-auto h-6 w-6 text-emerald-400" />
          <p className="mt-2 text-xl font-bold text-white">{score}</p>
          <p className="text-xs text-slate-400">Correct</p>
        </Card>
        <Card className="p-5 text-center">
          <XCircle className="mx-auto h-6 w-6 text-red-400" />
          <p className="mt-2 text-xl font-bold text-white">{totalQuestions - score}</p>
          <p className="text-xs text-slate-400">Incorrect / skipped</p>
        </Card>
        <Card className="p-5 text-center">
          <Clock className="mx-auto h-6 w-6 text-brand" />
          <p className="mt-2 text-xl font-bold text-white">{formatTime(quiz.totalTime * 60 - (timeLeft || 0))}</p>
          <p className="text-xs text-slate-400">Time taken</p>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <Button size="lg" onClick={restart}>
          <RotateCcw className="h-5 w-5" /> Try again
        </Button>
      </div>
    </div>
  );

  return (
    <div className="app-bg">
      <Loading isLoading={loading} />
      <Navbar isLoggedIn />
      <div className="pt-20">
        {!started && !submitted && quiz && <Instructions />}
        {started && quiz && <QuizRunner />}
        {showSummary && !showResult && <Summary />}
        {showResult && quiz && <Result />}
      </div>
    </div>
  );
};

export default QuizPage;
