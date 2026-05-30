import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, User, Mail, GraduationCap, Camera, FileText, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button, Input, Textarea, Select, FieldLabel } from "../components/ui";
import Popup from "../components/Popup";
import { apiFetch } from "../config/api";
import { CLASS_OPTIONS, EMAIL_PATTERN, PASSWORD_PATTERN, PASSWORD_HINT } from "../config/constants";

const PERKS = [
  "Take quizzes across every subject and class",
  "Track your scores, accuracy, and history",
  "Climb the global leaderboard",
];

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "", email: "", password: "", classname: "", profilePicture: null, bio: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [popup, setPopup] = useState(null);

  const setField = (name, value) => setForm((f) => ({ ...f, [name]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!EMAIL_PATTERN.test(form.email)) {
      setPopup({ title: "Check your email", message: "Please enter a valid email address.", action: false });
      return;
    }
    if (!PASSWORD_PATTERN.test(form.password)) {
      setPopup({ title: "Weak password", message: PASSWORD_HINT, action: false });
      return;
    }
    setBusy(true);
    const body = new FormData();
    Object.entries(form).forEach(([k, v]) => v != null && body.append(k, v));
    try {
      await apiFetch("/register", { method: "POST", body });
      setPopup({
        title: "Account created",
        message: "Your account is ready. Sign in to start playing.",
        action: true, actionText: "Go to sign in",
      });
    } catch (err) {
      setPopup({
        title: "Couldn't register",
        message: err.message || "Username or email already in use.",
        action: false,
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="app-bg min-h-screen px-5 py-12">
      <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-2">
        {/* Brand / perks */}
        <div className="hidden lg:block">
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/assets/logo.png" alt="" className="h-10 w-10 object-contain" />
            <span className="font-display text-xl font-bold text-fg">
              Quiz<span className="text-brand">Master</span>
            </span>
          </Link>
          <h2 className="mt-8 font-display text-4xl font-bold leading-tight text-fg">
            Learn faster,<br />one quiz at a time.
          </h2>
          <p className="mt-4 max-w-md text-muted">
            Join a community of learners and turn practice into measurable progress.
          </p>
          <ul className="mt-8 space-y-3">
            {PERKS.map((p) => (
              <li key={p} className="flex items-center gap-3 text-muted">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-brand" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Form */}
        <div className="card p-8">
          <h1 className="text-2xl font-bold text-fg">Create account</h1>
          <p className="mt-1 text-sm text-muted">It takes less than a minute.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <FieldLabel icon={User}>Username</FieldLabel>
              <Input icon={User} value={form.username}
                onChange={(e) => setField("username", e.target.value)}
                placeholder="Choose a username" required />
            </div>
            <div>
              <FieldLabel icon={Mail}>Email</FieldLabel>
              <Input icon={Mail} type="email" value={form.email}
                onChange={(e) => setField("email", e.target.value)}
                placeholder="you@example.com" required />
            </div>
            <Select
              label="Class" icon={GraduationCap} value={form.classname}
              onChange={(v) => setField("classname", v)}
              options={CLASS_OPTIONS} placeholder="Select your class"
            />
            <div>
              <FieldLabel icon={Lock}>Password</FieldLabel>
              <Input icon={Lock} type={showPassword ? "text" : "password"}
                value={form.password} onChange={(e) => setField("password", e.target.value)}
                placeholder="Create a password" required
                rightSlot={
                  <button type="button" onClick={() => setShowPassword((v) => !v)}
                    className="grid h-8 w-8 place-items-center rounded-lg text-muted hover:text-fg"
                    aria-label={showPassword ? "Hide password" : "Show password"}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                } />
              <p className="mt-2 text-xs leading-relaxed text-subtle">{PASSWORD_HINT}</p>
            </div>
            <div>
              <FieldLabel icon={Camera}>Profile picture <span className="text-subtle">(optional)</span></FieldLabel>
              <input
                type="file" accept="image/*"
                onChange={(e) => setField("profilePicture", e.target.files[0])}
                className="block w-full rounded-xl border border-line bg-surface2 px-3 py-2.5 text-sm text-muted file:mr-3 file:rounded-lg file:border-0 file:bg-brand/15 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-brand hover:file:bg-brand/25"
              />
            </div>
            <div>
              <FieldLabel icon={FileText}>Bio <span className="text-subtle">(optional)</span></FieldLabel>
              <Textarea rows={3} value={form.bio}
                onChange={(e) => setField("bio", e.target.value)}
                placeholder="Tell us about yourself" />
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={busy}>
              {busy ? "Creating…" : <>Create account <ArrowRight className="h-4 w-4" /></>}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-brand hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {popup && (
        <Popup
          title={popup.title} message={popup.message}
          showActionButton={popup.action} actionButtonText={popup.actionText}
          onClose={() => setPopup(null)} onAction={() => navigate("/login")}
        />
      )}
    </div>
  );
};

export default RegisterPage;
