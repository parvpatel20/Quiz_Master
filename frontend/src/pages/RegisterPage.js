import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Eye, EyeOff, Lock, User, Mail, GraduationCap, Camera, FileText, ArrowRight,
  ShieldCheck, UserCircle2,
} from "lucide-react";
import { Button, Input, Textarea, Select, FieldLabel, cx } from "../components/ui";
import Popup from "../components/Popup";
import AuthLayout from "../components/AuthLayout";
import { apiFetch } from "../config/api";
import { CLASS_OPTIONS, EMAIL_PATTERN, PASSWORD_PATTERN, PASSWORD_HINT } from "../config/constants";

const EASE = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};
const field = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

function passwordScore(pw) {
  let s = 0;
  if (!pw) return 0;
  if (pw.length >= 8) s++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[@#$_]/.test(pw)) s++;
  if (pw.length >= 12) s++;
  return Math.min(s, 4);
}

const STRENGTH = [
  { label: "Too weak", tone: "bg-error" },
  { label: "Weak", tone: "bg-error/80" },
  { label: "Fair", tone: "bg-warning" },
  { label: "Good", tone: "bg-info" },
  { label: "Strong", tone: "bg-success" },
];

function SectionTitle({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid h-7 w-7 place-items-center rounded-md bg-primary/10 text-primary">
        <Icon className="h-3.5 w-3.5" />
      </span>
      <div>
        <p className="text-sm font-semibold text-fg">{title}</p>
        {subtitle && <p className="text-[11px] text-subtle">{subtitle}</p>}
      </div>
    </div>
  );
}

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "", email: "", password: "", classname: "", profilePicture: null, bio: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [popup, setPopup] = useState(null);

  const setField = (name, value) => setForm((f) => ({ ...f, [name]: value }));
  const score = useMemo(() => passwordScore(form.password), [form.password]);
  const strength = STRENGTH[score];

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
    <AuthLayout maxWidth="max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="gradient-border relative p-7 sm:p-9"
      >
        <div className="pointer-events-none absolute -top-px left-1/2 h-px w-40 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary to-transparent" />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}
          className="flex flex-col items-center text-center"
        >
          <Link to="/" className="inline-flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
              <img src="/assets/logo.png" alt="" className="h-7 w-7 object-contain" />
            </span>
            <span className="font-display text-xl font-bold text-fg">
              Quiz<span className="text-primary">Master</span>
            </span>
          </Link>
          <h1 className="mt-4 font-display text-2xl font-bold text-fg sm:text-[28px]">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-muted">
            Join thousands of learners — it takes less than a minute.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-7 space-y-6"
        >
          {/* Account section */}
          <motion.section variants={field} className="space-y-3.5">
            <SectionTitle icon={UserCircle2} title="Account" subtitle="How others will see you" />
            <div className="grid gap-3.5 sm:grid-cols-2">
              <div>
                <FieldLabel icon={User} htmlFor="reg-username">Username</FieldLabel>
                <Input
                  id="reg-username" icon={User}
                  value={form.username}
                  onChange={(e) => setField("username", e.target.value)}
                  placeholder="e.g. alex_kumar" required autoComplete="username"
                />
              </div>
              <div>
                <FieldLabel icon={Mail} htmlFor="reg-email">Email</FieldLabel>
                <Input
                  id="reg-email" icon={Mail} type="email"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  placeholder="you@example.com" required autoComplete="email"
                />
              </div>
            </div>
          </motion.section>

          <div className="h-px w-full bg-line" />

          {/* Class & security section */}
          <motion.section variants={field} className="space-y-3.5">
            <SectionTitle icon={ShieldCheck} title="Class & security" />
            <div className="grid gap-3.5 sm:grid-cols-2">
              <div>
                <Select
                  id="reg-class" label="Class" icon={GraduationCap}
                  value={form.classname}
                  onChange={(v) => setField("classname", v)}
                  options={CLASS_OPTIONS} placeholder="Select your class"
                />
              </div>
              <div>
                <FieldLabel icon={Lock} htmlFor="reg-password">Password</FieldLabel>
                <Input
                  id="reg-password" icon={Lock}
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setField("password", e.target.value)}
                  placeholder="Create a password" required autoComplete="new-password"
                  rightSlot={
                    <button type="button" onClick={() => setShowPassword((v) => !v)}
                      className="grid h-8 w-8 place-items-center rounded-lg text-muted transition-colors hover:bg-surface2 hover:text-fg"
                      aria-label={showPassword ? "Hide password" : "Show password"}>
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  }
                />
              </div>
            </div>

            {/* Strength meter — full-width row under both fields */}
            <div className="rounded-lg border border-line bg-surface2/40 p-3">
              <div className="flex gap-1.5">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={cx(
                      "h-1.5 flex-1 rounded-full bg-line transition-colors duration-300",
                      i < score && strength.tone
                    )}
                  />
                ))}
              </div>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[11px]">
                <span className="text-subtle">{PASSWORD_HINT}</span>
                {form.password && (
                  <span
                    className={cx(
                      "font-semibold",
                      score <= 1 && "text-error",
                      score === 2 && "text-warning",
                      score === 3 && "text-info",
                      score === 4 && "text-success"
                    )}
                  >
                    {strength.label}
                  </span>
                )}
              </div>
            </div>
          </motion.section>

          <div className="h-px w-full bg-line" />

          {/* Profile section */}
          <motion.section variants={field} className="space-y-3.5">
            <SectionTitle icon={Camera} title="Profile" subtitle="Optional — personalize your space" />
            <div className="grid gap-3.5 sm:grid-cols-5">
              <div className="sm:col-span-2">
                <FieldLabel icon={Camera} htmlFor="reg-pic">Picture</FieldLabel>
                <input
                  id="reg-pic" type="file" accept="image/*"
                  onChange={(e) => setField("profilePicture", e.target.files[0])}
                  className="block w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm text-muted transition-colors file:mr-3 file:rounded-md file:border-0 file:bg-primary/15 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-primary hover:file:bg-primary/25 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div className="sm:col-span-3">
                <FieldLabel icon={FileText} htmlFor="reg-bio">Bio</FieldLabel>
                <Textarea
                  id="reg-bio" rows={2}
                  value={form.bio}
                  onChange={(e) => setField("bio", e.target.value)}
                  placeholder="A short intro about you"
                />
              </div>
            </div>
          </motion.section>

          <motion.div variants={field} className="pt-1">
            <Button
              type="submit"
              size="lg"
              className="btn-shine w-full shadow-md hover:shadow-lg"
              disabled={busy}
            >
              {busy ? "Creating account…" : (<>Create account <ArrowRight className="h-4 w-4" /></>)}
            </Button>
          </motion.div>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-6 text-center text-sm text-muted"
        >
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-primary transition-colors hover:text-primary/80 hover:underline underline-offset-4">
            Sign in
          </Link>
        </motion.p>
      </motion.div>

      {popup && (
        <Popup
          title={popup.title} message={popup.message}
          showActionButton={popup.action} actionButtonText={popup.actionText}
          onClose={() => setPopup(null)} onAction={() => navigate("/login")}
        />
      )}
    </AuthLayout>
  );
};

export default RegisterPage;
