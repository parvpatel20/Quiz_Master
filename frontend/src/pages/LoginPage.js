import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, User, ArrowRight } from "lucide-react";
import { Button, Input, FieldLabel } from "../components/ui";
import Popup from "../components/Popup";
import AuthLayout from "../components/AuthLayout";
import { apiFetch } from "../config/api";

const EASE = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const field = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [popup, setPopup] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await apiFetch("/login", { method: "POST", body: form });
      setPopup({
        title: "Welcome back",
        message: "You're signed in. Let's get to your quizzes.",
        action: true,
        actionText: "Continue",
      });
    } catch (err) {
      setPopup({
        title: "Sign in failed",
        message: err.message || "Invalid credentials. Please try again.",
        action: false,
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="gradient-border relative p-7 sm:p-8"
      >
        <div className="pointer-events-none absolute -top-px left-1/2 h-px w-32 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary to-transparent" />

        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}>
          <Link to="/" className="mb-5 inline-flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
              <img src="/assets/logo.png" alt="" className="h-7 w-7 object-contain" />
            </span>
            <span className="font-display text-xl font-bold text-fg">
              Quiz<span className="text-primary">Master</span>
            </span>
          </Link>
          <h1 className="font-display text-2xl font-bold text-fg sm:text-[28px]">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-muted">
            Enter your details to continue your learning streak.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-7 space-y-5"
        >
          <motion.div variants={field}>
            <FieldLabel icon={User} htmlFor="username">Username</FieldLabel>
            <Input
              id="username" name="username" icon={User}
              value={form.username} onChange={handleChange}
              placeholder="Your username" required autoComplete="username"
            />
          </motion.div>

          <motion.div variants={field}>
            <FieldLabel icon={Lock} htmlFor="password">Password</FieldLabel>
            <Input
              id="password" name="password" icon={Lock}
              type={showPassword ? "text" : "password"}
              value={form.password} onChange={handleChange}
              placeholder="Your password" required autoComplete="current-password"
              rightSlot={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="grid h-8 w-8 place-items-center rounded-lg text-muted transition-colors hover:bg-surface2 hover:text-fg"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
            />
          </motion.div>

          <motion.div variants={field} className="pt-1">
            <Button
              type="submit"
              size="lg"
              className="btn-shine w-full shadow-md hover:shadow-lg"
              disabled={busy}
            >
              {busy ? "Signing in…" : (<>Sign in <ArrowRight className="h-4 w-4" /></>)}
            </Button>
          </motion.div>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-6 text-center text-sm text-muted"
        >
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-primary transition-colors hover:text-primary/80 hover:underline underline-offset-4">
            Create one
          </Link>
        </motion.p>
      </motion.div>

      {popup && (
        <Popup
          title={popup.title}
          message={popup.message}
          showActionButton={popup.action}
          actionButtonText={popup.actionText}
          onClose={() => setPopup(null)}
          onAction={() => navigate("/")}
        />
      )}
    </AuthLayout>
  );
};

export default LoginPage;
