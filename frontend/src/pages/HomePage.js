import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Play, BookOpen, Trophy, Search, TrendingUp, Lightbulb, Star, Quote,
  Sparkles, Target, BarChart3, MousePointerClick, ArrowRight,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import {
  Button, Card, Badge, SectionHeading, Reveal, AnimatedNumber,
} from "../components/ui";
import useAuth from "../hooks/useAuth";

const TIPS = [
  "Stay calm and focused when attempting a quiz.",
  "Read each question carefully before answering.",
  "Manage your time — don't dwell on a single question.",
  "Make educated guesses when unsure.",
  "Review your answers before submitting if time allows.",
  "Practice regularly to build consistency.",
];

const FEATURES = [
  { icon: Trophy, img: "/assets/first_feature.png", title: "Leaderboard", desc: "Compete with others and climb to the top by excelling in quizzes." },
  { icon: Search, img: "/assets/second_feature.png", title: "Explore quizzes", desc: "Discover quizzes across Science, Math, English and many more." },
  { icon: TrendingUp, img: "/assets/third_feature.png", title: "Track your growth", desc: "See your scores and accuracy improve over time." },
];

const STATS = [
  { value: 300, suffix: "+", label: "Quizzes" },
  { value: 4, suffix: "", label: "Formats" },
  { value: 12, suffix: "", label: "Classes" },
  { value: 300, suffix: "+", label: "Instructors" },
];

const STEPS = [
  { icon: MousePointerClick, title: "Pick a quiz", desc: "Filter by class, subject, topic, and difficulty." },
  { icon: Target, title: "Take the test", desc: "Answer at your pace with a live timer and navigation." },
  { icon: BarChart3, title: "Track progress", desc: "Review answers and watch your analytics grow." },
];

const TESTIMONIALS = [
  { name: "Sanjay Jha", subject: "Class 12 Science", rating: 5, avatar: "SJ", text: "Quiz Master helped me ace my entrance prep. The variety of questions is excellent." },
  { name: "Amit Verma", subject: "Class 10", rating: 5, avatar: "AV", text: "The leaderboard keeps me motivated. I've improved so much." },
  { name: "Rohit Kumar", subject: "Class 9", rating: 4, avatar: "RK", text: "Perfect for quick practice. Love the progress tracking." },
];

const HomePage = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const goToQuizzes = () => navigate(isLoggedIn ? "/quiz-search" : "/quiz-search-before-signup");

  return (
    <div className="app-bg overflow-hidden">
      <Loading isLoading={isLoggedIn === null} />
      <Navbar isLoggedIn={!!isLoggedIn} />

      {/* Hero */}
      <section className="relative mx-auto grid max-w-content items-center gap-10 px-5 pb-16 pt-28 sm:px-8 lg:grid-cols-2 lg:pt-36">
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Badge tone="brand"><Star className="h-3.5 w-3.5" /> Learn by doing</Badge>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
            Master any subject,<br />
            <span className="bg-gradient-to-r from-brand to-amber-300 bg-clip-text text-transparent">
              one quiz at a time.
            </span>
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-400">
            Test your knowledge across multiple subjects and formats, review your
            answers, track progress, and compete on the leaderboard.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" onClick={goToQuizzes}><Play className="h-5 w-5" /> Start now</Button>
            <Button size="lg" variant="outline" onClick={goToQuizzes}><BookOpen className="h-5 w-5" /> Browse quizzes</Button>
          </div>
        </motion.div>

        <motion.div
          className="hidden justify-center lg:flex"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-full bg-brand/10 blur-3xl" />
            <img src="/assets/Home_2.png" alt="Quiz Master" className="w-full max-w-md object-contain" />
          </div>
        </motion.div>
      </section>

      {/* Stats band */}
      <section className="mx-auto max-w-content px-5 sm:px-8">
        <Reveal>
          <Card className="grid grid-cols-2 gap-6 p-6 sm:grid-cols-4 sm:p-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-3xl font-bold text-white sm:text-4xl">
                  <AnimatedNumber value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-sm text-slate-400">{s.label}</p>
              </div>
            ))}
          </Card>
        </Reveal>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-content px-5 py-20 sm:px-8">
        <Reveal><SectionHeading icon={Sparkles} title="How it works" subtitle="Three steps from curious to confident." center /></Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <Card hover className="h-full p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <span className="font-display text-sm font-bold text-slate-500">0{i + 1}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.desc}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-content px-5 py-8 sm:px-8">
        <Reveal><SectionHeading icon={Star} title="What you get" center /></Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {FEATURES.map(({ icon: Icon, img, title, desc }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <Card hover className="h-full overflow-hidden">
                <div className="aspect-[16/10] w-full overflow-hidden bg-ink-900">
                  <img src={img} alt={title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand/10 text-brand"><Icon className="h-4 w-4" /></span>
                    <h3 className="text-lg font-semibold text-white">{title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{desc}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Tips */}
      <section className="mx-auto max-w-content px-5 py-20 sm:px-8">
        <Reveal><SectionHeading icon={Lightbulb} title="Quiz tips & strategies" subtitle="Small habits that make a big difference." center /></Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TIPS.map((tip, i) => (
            <Reveal key={i} delay={(i % 3) * 0.06}>
              <Card hover className="flex h-full items-start gap-3 p-5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand"><Lightbulb className="h-4 w-4" /></span>
                <p className="text-sm leading-relaxed text-slate-300">{tip}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-content px-5 py-8 sm:px-8">
        <Reveal><SectionHeading icon={Quote} title="What learners say" subtitle="Join thousands of students improving with Quiz Master." center /></Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <Card className="flex h-full flex-col p-6">
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="h-4 w-4 fill-brand text-brand" />)}
                </div>
                <p className="mt-4 flex-1 leading-relaxed text-slate-300">"{t.text}"</p>
                <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-5">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-brand/15 text-sm font-bold text-brand">{t.avatar}</span>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.subject}</p>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-content px-5 py-20 sm:px-8">
        <Reveal>
          <Card className="relative flex flex-col items-center gap-5 overflow-hidden px-6 py-16 text-center">
            <div className="pointer-events-none absolute inset-x-0 -top-20 mx-auto h-48 w-96 rounded-full bg-brand/10 blur-3xl" />
            <h2 className="relative max-w-xl font-display text-2xl font-bold text-white sm:text-3xl">
              Ready to put your knowledge to the test?
            </h2>
            <Button size="lg" onClick={goToQuizzes} className="relative">
              <Play className="h-5 w-5" /> Start a quiz <ArrowRight className="h-4 w-4" />
            </Button>
          </Card>
        </Reveal>
      </section>

      <Footer isLoggedIn={!!isLoggedIn} />
    </div>
  );
};

export default HomePage;
