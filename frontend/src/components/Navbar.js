import React, { useEffect, useRef, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { User, LogOut, Menu, X, Bookmark, LayoutDashboard } from "lucide-react";
import { apiFetch } from "../config/api";
import { cx, Button } from "./ui";
import ThemeToggle from "./ThemeToggle";

const NavItem = ({ to, children, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      cx(
        "relative px-3 py-2 text-sm font-medium transition-colors",
        isActive ? "text-fg" : "text-muted hover:text-fg"
      )
    }
  >
    {({ isActive }) => (
      <>
        {children}
        <span
          className={cx(
            "absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary transition-opacity",
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
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onDoc = (e) => profileRef.current && !profileRef.current.contains(e.target) && setMenuOpen(false);
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const handleLogout = async () => {
    try {
      await apiFetch("/logout", { method: "POST" });
    } catch {
      /* clear client state regardless */
    }
    navigate("/");
    window.location.reload();
  };

  const quizzesTo = isLoggedIn ? "/quiz-search" : "/quiz-search-before-signup";

  const links = (
    <>
      <NavItem to="/" onClick={() => setMobileOpen(false)}>Home</NavItem>
      {isLoggedIn && <NavItem to="/dashboard" onClick={() => setMobileOpen(false)}>Dashboard</NavItem>}
      <NavItem to={quizzesTo} onClick={() => setMobileOpen(false)}>Quizzes</NavItem>
      {isLoggedIn && <NavItem to="/leaderboard" onClick={() => setMobileOpen(false)}>Leaderboard</NavItem>}
      <NavItem to="/about" onClick={() => setMobileOpen(false)}>About</NavItem>
    </>
  );

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-200",
        scrolled ? "border-b border-line bg-surface/95 backdrop-blur" : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-5 py-3 sm:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/assets/logo.png" alt="" className="h-8 w-8 object-contain" />
          <span className="font-display text-lg font-bold text-fg">
            Quiz<span className="text-primary">Master</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">{links}</nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden sm:grid" />

          {isLoggedIn ? (
            <div className="relative hidden md:block" ref={profileRef}>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors hover:bg-surface2 hover:text-fg"
                aria-label="Account menu"
              >
                <User className="h-5 w-5" />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-line bg-surface p-1 shadow-lg animate-fade-in">
                  <Link to="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm text-muted hover:bg-surface2 hover:text-fg">
                    <User className="h-4 w-4" /> Profile
                  </Link>
                  <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm text-muted hover:bg-surface2 hover:text-fg">
                    <LayoutDashboard className="h-4 w-4" /> Dashboard
                  </Link>
                  <Link to="/bookmarks" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm text-muted hover:bg-surface2 hover:text-fg">
                    <Bookmark className="h-4 w-4" /> Bookmarks
                  </Link>
                  <button onClick={handleLogout} className="flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-sm text-muted hover:bg-error/10 hover:text-error">
                    <LogOut className="h-4 w-4" /> Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Button as={Link} to="/login" size="sm" className="hidden md:inline-flex">Sign in</Button>
          )}

          <button
            className="grid h-10 w-10 place-items-center rounded-lg text-muted hover:bg-surface2 hover:text-fg md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-line bg-surface px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-1">{links}</nav>
          <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
            {isLoggedIn ? (
              <div className="flex w-full flex-col gap-1">
                <Link to="/profile" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm text-muted hover:bg-surface2 hover:text-fg">
                  <User className="h-4 w-4" /> Profile
                </Link>
                <Link to="/bookmarks" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm text-muted hover:bg-surface2 hover:text-fg">
                  <Bookmark className="h-4 w-4" /> Bookmarks
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm text-muted hover:bg-error/10 hover:text-error">
                  <LogOut className="h-4 w-4" /> Log out
                </button>
                <div className="px-3 pt-2"><ThemeToggle /></div>
              </div>
            ) : (
              <>
                <Button as={Link} to="/login" size="sm">Sign in</Button>
                <ThemeToggle />
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
