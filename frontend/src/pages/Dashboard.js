import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, Cell,
} from "recharts";
import {
  ListChecks, Target, Trophy, Flame, TrendingUp, BookOpen, ArrowRight, Activity, Award, Compass,
} from "lucide-react";
import Shell from "../components/Shell";
import {
  Card, Badge, Button, StatCard, ProgressRing, AnimatedNumber, SectionHeading,
  Reveal, Skeleton, EmptyState,
} from "../components/ui";
import { useProfile, useQuizzes } from "../hooks/queries";

const dayKey = (d) => new Date(d).toISOString().slice(0, 10);

function computeStreak(dates) {
  if (!dates.length) return 0;
  const set = new Set(dates.map(dayKey));
  let streak = 0;
  const cursor = new Date();
  // allow today or yesterday as the streak anchor
  if (!set.has(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  while (set.has(dayKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-white/10 bg-ink-800 px-3 py-2 text-xs shadow-card">
      <p className="text-slate-400">{label}</p>
      <p className="font-semibold text-white">{payload[0].value}%</p>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useProfile();
  const { data: quizData } = useQuizzes("auth");

  const history = useMemo(
    () =>
      (user?.quizData || [])
        .filter((q) => q.quizDate && q.score !== undefined && q.quiz)
        .sort((a, b) => new Date(a.quizDate) - new Date(b.quizDate)),
    [user]
  );

  const timeline = useMemo(
    () =>
      history.map((q, i) => ({
        name: `#${i + 1}`,
        date: new Date(q.quizDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short" }),
        score: q.score,
      })),
    [history]
  );

  const bySubject = useMemo(() => {
    const map = {};
    history.forEach((q) => {
      const s = q.quiz?.subject || "Other";
      (map[s] = map[s] || []).push(q.score);
    });
    return Object.entries(map)
      .map(([subject, scores]) => ({
        subject,
        accuracy: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      }))
      .sort((a, b) => b.accuracy - a.accuracy);
  }, [history]);

  const streak = useMemo(() => computeStreak(history.map((q) => q.quizDate)), [history]);
  const recent = useMemo(() => [...history].reverse().slice(0, 5), [history]);

  const recommended = useMemo(() => {
    const list = quizData?.quizzes || [];
    return [...list]
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .slice(0, 3);
  }, [quizData]);

  const accuracy = Number(user?.accuracy || 0);
  const hasData = history.length > 0;

  if (isLoading) {
    return (
      <Shell isLoggedIn>
        <Skeleton className="h-40 w-full rounded-2xl" />
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-36" />)}
        </div>
      </Shell>
    );
  }

  return (
    <Shell isLoggedIn>
      {/* Greeting / hero */}
        <Reveal>
          <Card className="relative overflow-hidden p-6 sm:p-8">
            <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-brand/10 blur-3xl" />
            <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <img
                  src={user?.profilePicture || "/assets/logo.png"}
                  alt=""
                  className="h-16 w-16 rounded-2xl border border-white/10 object-cover"
                />
                <div>
                  <p className="text-sm text-slate-400">Welcome back,</p>
                  <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
                    {user?.username || "Learner"}
                  </h1>
                  <p className="mt-1 text-sm text-slate-500">{user?.classname}</p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <ProgressRing value={accuracy} size={104} stroke={9}>
                  <div>
                    <p className="font-display text-2xl font-bold text-white">
                      <AnimatedNumber value={accuracy} suffix="%" />
                    </p>
                    <p className="text-[10px] uppercase tracking-wide text-slate-500">Accuracy</p>
                  </div>
                </ProgressRing>
                <Button onClick={() => navigate("/quiz-search")}>
                  <Compass className="h-4 w-4" /> New quiz
                </Button>
              </div>
            </div>
          </Card>
        </Reveal>

        {/* Stats */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal delay={0.04} className="h-full"><StatCard icon={ListChecks} label="Quizzes taken" value={user?.totalQuizzesGiven || 0} hint="All-time attempts" /></Reveal>
          <Reveal delay={0.08} className="h-full"><StatCard icon={Target} label="Avg. accuracy" value={accuracy} suffix="%" tone="green" hint="Across all quizzes" /></Reveal>
          <Reveal delay={0.12} className="h-full"><StatCard icon={Trophy} label="Best score" value={user?.maxScore || 0} suffix="%" tone="amber" hint="Personal best" /></Reveal>
          <Reveal delay={0.16} className="h-full"><StatCard icon={Flame} label="Day streak" value={streak} tone="red" hint={streak > 0 ? "Keep it going!" : "Take a quiz today"} /></Reveal>
        </div>

        {!hasData ? (
          <Card className="mt-6">
            <EmptyState
              icon={Activity}
              title="No activity yet"
              subtitle="Take your first quiz to unlock your analytics — progress, accuracy by subject, and streaks."
              action={<Button onClick={() => navigate("/quiz-search")}><Compass className="h-4 w-4" /> Start a quiz</Button>}
            />
          </Card>
        ) : (
          <>
            {/* Charts */}
            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              <Reveal className="lg:col-span-2 h-full">
                <Card className="flex h-full flex-col p-6">
                  <SectionHeading icon={TrendingUp} title="Score over time" />
                  <div className="mt-6 h-64 flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={timeline} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#FF9100" stopOpacity={0.4} />
                            <stop offset="100%" stopColor="#FF9100" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                        <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis domain={[0, 100]} stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip content={<ChartTooltip />} cursor={{ stroke: "rgba(255,145,0,0.3)" }} />
                        <Line type="monotone" dataKey="score" stroke="#FF9100" strokeWidth={2.5} dot={{ r: 3, fill: "#FF9100" }} activeDot={{ r: 5 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </Reveal>

              <Reveal delay={0.06} className="h-full">
                <Card className="flex h-full flex-col p-6">
                  <SectionHeading icon={Award} title="Top subjects" />
                  <div className="mt-6 h-64 flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={bySubject.slice(0, 6)} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
                        <XAxis type="number" domain={[0, 100]} hide />
                        <YAxis type="category" dataKey="subject" stroke="#94a3b8" fontSize={12} width={90} tickLine={false} axisLine={false} />
                        <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                        <Bar dataKey="accuracy" radius={[0, 6, 6, 0]} barSize={16}>
                          {bySubject.slice(0, 6).map((_, i) => (
                            <Cell key={i} fill={i === 0 ? "#FF9100" : "rgba(255,145,0,0.55)"} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </Reveal>
            </div>

            {/* Recent activity */}
            <Reveal className="mt-6">
              <Card className="p-6">
                <SectionHeading icon={Activity} title="Recent activity" />
                <ul className="mt-5 divide-y divide-white/5">
                  {recent.map((q, i) => (
                    <li key={i} className="flex items-center justify-between gap-3 py-3">
                      <div className="min-w-0">
                        <p className="truncate font-medium text-white">{q.quiz?.subject}</p>
                        <p className="truncate text-xs text-slate-500">{q.quiz?.topic}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-500">
                          {new Date(q.quizDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
                        </span>
                        <Badge tone={q.score >= 80 ? "green" : q.score >= 50 ? "amber" : "red"}>{q.score}%</Badge>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          </>
        )}

        {/* Recommended */}
        {recommended.length > 0 && (
          <section className="mt-6">
            <div className="flex items-center justify-between gap-3">
              <SectionHeading icon={BookOpen} title="Fresh quizzes" />
              <Button variant="ghost" size="sm" onClick={() => navigate("/quiz-search")}>
                Browse all <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {recommended.map((quiz, i) => (
                <Reveal key={quiz._id} delay={i * 0.05} className="h-full">
                  <Card
                    hover
                    className="flex h-full cursor-pointer flex-col p-6"
                    onClick={() => navigate(`/quiz-page/${user?._id}/${quiz._id}`)}
                  >
                    <div className="flex items-center gap-2">
                      <Badge tone="neutral">{quiz.subject}</Badge>
                      <Badge tone={quiz.difficulty?.toLowerCase() === "hard" ? "red" : quiz.difficulty?.toLowerCase() === "medium" ? "amber" : "green"}>
                        {quiz.difficulty}
                      </Badge>
                    </div>
                    <p className="mt-3 font-semibold text-white">{quiz.quizName}</p>
                    <p className="text-xs text-slate-500">{quiz.topic}</p>
                    <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-brand">
                      Start <ArrowRight className="h-4 w-4" />
                    </span>
                  </Card>
                </Reveal>
              ))}
            </div>
          </section>
        )}
    </Shell>
  );
};

export default Dashboard;
