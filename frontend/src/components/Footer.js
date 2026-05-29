import React from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

const Footer = ({ isLoggedIn = false }) => {
  const quizzesTo = isLoggedIn ? "/quiz-search" : "/quiz-search-before-signup";
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-ink-950">
      <div className="mx-auto max-w-content px-6 py-12 sm:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <img src="/assets/logo.png" alt="" className="h-8 w-8 object-contain" />
              <span className="font-display text-base font-bold text-white">
                Quiz<span className="text-brand">Master</span>
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-400">
              Practice quizzes across subjects, track your progress, and climb the
              leaderboard.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Explore</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/" className="text-slate-400 transition-colors hover:text-brand">
                  Home
                </Link>
              </li>
              <li>
                <Link to={quizzesTo} className="text-slate-400 transition-colors hover:text-brand">
                  Quizzes
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 transition-colors hover:text-brand">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Get in touch</h4>
            <a
              href="mailto:support@quizmaster.com"
              className="mt-3 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-brand"
            >
              <Mail className="h-4 w-4" />
              support@quizmaster.com
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-slate-500">
          © {year} Quiz Master. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
