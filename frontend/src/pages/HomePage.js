import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Play, BookOpen, Trophy, Search, TrendingUp, Lightbulb, Star, Quote,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import { Button, Card, Badge, SectionHeading } from "../components/ui";
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
  {
    icon: Trophy,
    img: "/assets/first_feature.png",
    title: "Leaderboard",
    desc: "Compete with others and climb to the top by excelling in quizzes.",
  },
  {
    icon: Search,
    img: "/assets/second_feature.png",
    title: "Explore quizzes",
    desc: "Discover quizzes across Science, Math, English and many more.",
  },
  {
    icon: TrendingUp,
    img: "/assets/third_feature.png",
    title: "Track your growth",
    desc: "See your scores and accuracy improve over time.",
  },
];

const TESTIMONIALS = [
  { name: "Sanjay Jha", subject: "Class 12 Science", rating: 5, avatar: "SJ", text: "Quiz Master helped me ace my entrance prep. The variety of questions is excellent." },
  { name: "Amit Verma", subject: "Class 10", rating: 5, avatar: "AV", text: "The leaderboard keeps me motivated. I've improved so much." },
  { name: "Rohit Kumar", subject: "Class 9", rating: 4, avatar: "RK", text: "Perfect for quick practice. Love the progress tracking." },
];

const HomePage = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const goToQuizzes = () =>
    navigate(isLoggedIn ? "/quiz-search" : "/quiz-search-before-signup");

  return (
    <div className="app-bg">
      <Loading isLoading={isLoggedIn === null} />
      <Navbar isLoggedIn={!!isLoggedIn} />

      {/* Hero */}
      <section className="mx-auto grid max-w-content items-center gap-10 px-5 pb-16 pt-28 sm:px-8 lg:grid-cols-2 lg:pt-36">
        <div>
          <Badge tone="brand">
            <Star className="h-3.5 w-3.5" /> Learn by doing
          </Badge>
          <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
            Master any subject,<br />
            <span className="text-brand">one quiz at a time.</span>
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-400">
            Test your knowledge across multiple subjects and formats, track your
            progress, and compete on the leaderboard.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" onClick={goToQuizzes}>
              <Play className="h-5 w-5" /> Start now
            </Button>
            <Button size="lg" variant="outline" onClick={goToQuizzes}>
              <BookOpen className="h-5 w-5" /> Browse quizzes
            </Button>
          </div>
        </div>

        <div className="hidden justify-center lg:flex">
          <img
            src="/assets/Home_2.png"
            alt="Quiz Master"
            className="w-full max-w-md object-contain"
          />
        </div>
      </section>

      {/* Tips */}
      <section className="mx-auto max-w-content px-5 py-16 sm:px-8">
        <SectionHeading
          icon={Lightbulb}
          title="Quiz tips & strategies"
          subtitle="Small habits that make a big difference in your scores."
          center
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TIPS.map((tip, i) => (
            <Card key={i} hover className="flex items-start gap-3 p-5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand">
                <Lightbulb className="h-4 w-4" />
              </span>
              <p className="text-sm leading-relaxed text-slate-300">{tip}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-content px-5 py-16 sm:px-8">
        <SectionHeading icon={Star} title="What you get" center />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {FEATURES.map(({ icon: Icon, img, title, desc }) => (
            <Card key={title} hover className="overflow-hidden">
              <div className="aspect-[16/10] w-full overflow-hidden bg-ink-900">
                <img src={img} alt={title} className="h-full w-full object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand/10 text-brand">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="text-lg font-semibold text-white">{title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-content px-5 py-16 sm:px-8">
        <SectionHeading
          icon={Quote}
          title="What learners say"
          subtitle="Join thousands of students improving with Quiz Master."
          center
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <Card key={t.name} className="flex flex-col p-6">
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-brand text-brand" />
                ))}
              </div>
              <p className="mt-4 flex-1 leading-relaxed text-slate-300">"{t.text}"</p>
              <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-5">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand/15 text-sm font-bold text-brand">
                  {t.avatar}
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.subject}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-content px-5 pb-20 sm:px-8">
        <Card className="flex flex-col items-center gap-5 px-6 py-14 text-center">
          <h2 className="max-w-xl text-2xl font-bold text-white sm:text-3xl">
            Ready to put your knowledge to the test?
          </h2>
          <Button size="lg" onClick={goToQuizzes}>
            <Play className="h-5 w-5" /> Start a quiz
          </Button>
        </Card>
      </section>

      <Footer isLoggedIn={!!isLoggedIn} />
    </div>
  );
};

export default HomePage;
