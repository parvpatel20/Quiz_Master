import React, { useEffect, useRef, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { User, LogOut, Menu, X } from "lucide-react";
import { apiFetch } from "../config/api";
import { cx, Button } from "./ui";

const NavItem = ({ to, children, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      cx(
        "relative px-3 py-2 text-sm font-medium transition-colors",
        isActive ? "text-white" : "text-slate-400 hover:text-white"
      )
    }
  >
    {({ isActive }) => (
      <>
        {children}
        <span
          className={cx(
            "absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand transition-all",
            isActive ? "opacity-100" : "opacity-0"
          )}
        />
      </>
    )}
  </NavLink>
);

const Navbar = ({ isLoggedIn = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onDoc = (e) =>
      profileRef.current && !profileRef.current.contains(e.target) && setMenuOpen(false);
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const handleLogout = async () => {
    try {
      await apiFetch("/logout", { method: "POST" });
    } catch {
      /* ignore — clear client state regardless */
    }
    navigate("/");
    window.location.reload();
  };

  const quizzesTo = isLoggedIn ? "/quiz-search" : "/quiz-search-before-signup";

  const links = (
    <>
      <NavItem to="/" onClick={() => setMobileOpen(false)}>Home</NavItem>
      <NavItem to="/about" onClick={() => setMobileOpen(false)}>About</NavItem>
      <NavItem to={quizzesTo} onClick={() => setMobileOpen(false)}>Quizzes</NavItem>
      {isLoggedIn && (
        <NavItem to="/leaderboard" onClick={() => setMobileOpen(false)}>Leaderboard</NavItem>
      )}
    </>
  );

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-ink-950/85 backdrop-blur-xl"
          : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/assets/logo.png" alt="" className="h-9 w-9 object-contain" />
          <span className="font-display text-lg font-bold text-white">
            Quiz<span className="text-brand">Master</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">{links}</nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <div className="relative hidden md:block" ref={profileRef}>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-slate-200 transition-colors hover:border-brand/50 hover:text-white"
                aria-label="Account menu"
              >
                <User className="h-5 w-5" />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border border-white/10 bg-ink-850 p-1 shadow-card animate-fade-in">
                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-slate-200 hover:bg-white/5"
                  >
                    <User className="h-4 w-4 text-brand" /> Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-slate-200 hover:bg-red-500/10 hover:text-red-300"
                  >
                    <LogOut className="h-4 w-4 text-red-400" /> Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Button as={Link} to="/login" size="sm" className="hidden md:inline-flex">
              Sign in
            </Button>
          )}

          {/* Mobile toggle */}
          <button
            className="grid h-10 w-10 place-items-center rounded-lg text-slate-200 hover:bg-white/5 md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-ink-950/95 px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-1">{links}</nav>
          <div className="mt-4 border-t border-white/10 pt-4">
            {isLoggedIn ? (
              <div className="flex flex-col gap-1">
                <Link
                  to="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-slate-200 hover:bg-white/5"
                >
                  <User className="h-4 w-4 text-brand" /> Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-slate-200 hover:bg-red-500/10 hover:text-red-300"
                >
                  <LogOut className="h-4 w-4 text-red-400" /> Log out
                </button>
              </div>
            ) : (
              <Button as={Link} to="/login" size="sm" className="w-full">
                Sign in
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
