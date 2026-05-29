import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Pencil, User, Mail, GraduationCap, FileText, BarChart3, Trophy, Target, ListChecks, ArrowRight,
} from "lucide-react";
import Shell from "../components/Shell";
import Popupupdate from "../components/Popupupdate";
import QuizHistory from "../components/QuizHistory";
import { Card, SectionHeading, Button, PageHeader, Reveal, cx } from "../components/ui";
import { apiFetch } from "../config/api";

const EDIT_FIELDS = [
  { label: "Username", field: "username" },
  { label: "Email", field: "email" },
  { label: "Class", field: "class" },
  { label: "Bio", field: "bio" },
  { label: "Profile picture", field: "profilePicture" },
  { label: "Password", field: "password" },
];

const InfoRow = ({ icon: Icon, label, value, muted }) => (
  <div className="flex items-start gap-3 border-b border-white/5 py-3.5 last:border-0">
    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
    <div className="min-w-0">
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className={cx("mt-0.5 break-words", muted ? "italic text-slate-500" : "text-white")}>
        {value}
      </p>
    </div>
  </div>
);

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [popupField, setPopupField] = useState(null);

  const loadProfile = () => {
    apiFetch("/profile")
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Failed to load profile:", err.message))
      .finally(() => setLoading(false));
  };

  useEffect(loadProfile, []);

  const sortedQuizzes = useMemo(() => {
    if (!user?.quizData) return [];
    return user.quizData
      .filter((q) => q.quizDate && q.score !== undefined && q.quiz)
      .sort((a, b) => new Date(b.quizDate) - new Date(a.quizDate));
  }, [user]);

  const handleUserUpdate = (field, value) => {
    if (value === "" || value == null) return;
    setUser((prev) => ({
      ...prev,
      [field === "class" ? "classname" : field]: value,
    }));
  };

  const stats = [
    { label: "Total quizzes", value: user?.totalQuizzesGiven ?? 0, icon: ListChecks },
    { label: "Avg. accuracy", value: `${user?.accuracy ?? 0}%`, icon: BarChart3 },
    { label: "Highest score", value: `${user?.maxScore ?? 0}%`, icon: Trophy },
    { label: "Lowest score", value: `${user?.minScore ?? 0}%`, icon: Target },
  ];

  return (
    <Shell isLoggedIn loading={loading}>
      <Reveal>
        <PageHeader
          center={false}
          badge="Account"
          badgeIcon={User}
          title="Your profile"
          subtitle="Manage your details and review your quiz performance."
        />
      </Reveal>

      <div className="section-gap grid gap-6 lg:grid-cols-3">
          {/* Left: identity */}
          <Card className="relative p-7 lg:col-span-1">
            {/* Edit menu */}
            <div className="absolute right-5 top-5">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                onBlur={() => setTimeout(() => setMenuOpen(false), 150)}
                className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-slate-300 transition-colors hover:border-brand/50 hover:text-white"
                aria-label="Edit profile"
              >
                <Pencil className="h-4 w-4" />
              </button>
              {menuOpen && (
                <div className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-xl border border-white/10 bg-ink-850 p-1 shadow-card animate-fade-in">
                  {EDIT_FIELDS.map(({ label, field }) => (
                    <button
                      key={field}
                      onMouseDown={() => { setPopupField(field); setMenuOpen(false); }}
                      className="block w-full rounded-lg px-3 py-2.5 text-left text-sm text-slate-300 hover:bg-white/5 hover:text-white"
                    >
                      Change {label.toLowerCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col items-center text-center">
              <img
                src={user?.profilePicture || "/assets/logo.png"}
                alt="Profile"
                className="h-32 w-32 rounded-full border border-white/10 object-cover"
              />
              <h2 className="mt-4 text-xl font-bold text-white">
                {user?.username || "—"}
              </h2>
              <p className="text-sm text-slate-500">{user?.classname || "—"}</p>
            </div>

            <div className="mt-6">
              <InfoRow icon={User} label="Username" value={user?.username || "—"} />
              <InfoRow icon={Mail} label="Email" value={user?.email || "—"} />
              <InfoRow icon={GraduationCap} label="Class" value={user?.classname || "Not specified"} />
              <InfoRow
                icon={FileText}
                label="Bio"
                value={user?.bio || "No bio added yet."}
                muted={!user?.bio}
              />
            </div>
          </Card>

          {/* Right: stats + history */}
          <div className="space-y-6 lg:col-span-2">
            <Card className="p-7">
              <div className="flex items-center justify-between gap-3">
                <SectionHeading icon={BarChart3} title="Performance" />
                <Button as={Link} to="/dashboard" variant="outline" size="sm">
                  Dashboard <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
                {stats.map(({ label, value, icon: Icon }) => (
                  <div key={label} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand/10 text-brand">
                      <Icon className="h-4 w-4" />
                    </span>
                    <p className="mt-3 text-2xl font-bold text-white">{value}</p>
                    <p className="text-xs text-slate-500">{label}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="overflow-hidden">
              <div className="p-7 pb-0">
                <SectionHeading icon={ListChecks} title="Quiz history" />
              </div>
              <div className="mt-4">
                <QuizHistory quizzes={sortedQuizzes} />
              </div>
            </Card>
          </div>
        </div>

      <Popupupdate
        isOpen={popupField !== null}
        closePopup={() => setPopupField(null)}
        fieldType={popupField || ""}
        updateUser={handleUserUpdate}
      />
    </Shell>
  );
};

export default ProfilePage;
