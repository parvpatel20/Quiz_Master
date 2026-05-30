import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, User, ArrowRight } from "lucide-react";
import { Button, Input, FieldLabel } from "../components/ui";
import Popup from "../components/Popup";
import { apiFetch } from "../config/api";

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
    <div className="app-bg flex min-h-screen items-center justify-center p-5">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2.5">
          <img src="/assets/logo.png" alt="" className="h-10 w-10 object-contain" />
          <span className="font-display text-xl font-bold text-fg">
            Quiz<span className="text-brand">Master</span>
          </span>
        </Link>

        <div className="card p-8">
          <h1 className="text-2xl font-bold text-fg">Sign in</h1>
          <p className="mt-1 text-sm text-muted">
            Welcome back — enter your details to continue.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div>
              <FieldLabel icon={User} htmlFor="username">Username</FieldLabel>
              <Input
                id="username" name="username" icon={User}
                value={form.username} onChange={handleChange}
                placeholder="Your username" required
              />
            </div>
            <div>
              <FieldLabel icon={Lock} htmlFor="password">Password</FieldLabel>
              <Input
                id="password" name="password" icon={Lock}
                type={showPassword ? "text" : "password"}
                value={form.password} onChange={handleChange}
                placeholder="Your password" required
                rightSlot={
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="grid h-8 w-8 place-items-center rounded-lg text-muted hover:text-fg"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                }
              />
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={busy}>
              {busy ? "Signing in…" : <>Sign in <ArrowRight className="h-4 w-4" /></>}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-brand hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>

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
    </div>
  );
};

export default LoginPage;
