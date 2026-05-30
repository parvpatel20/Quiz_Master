import React from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

const Footer = ({ isLoggedIn = false }) => {
  const quizzesTo = isLoggedIn ? "/quiz-search" : "/quiz-search-before-signup";
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-content px-6 py-12 sm:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <img src="/assets/logo.png" alt="" className="h-7 w-7 object-contain" />
              <span className="font-display text-base font-bold text-fg">
                Quiz<span className="text-primary">Master</span>
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              Practice quizzes across subjects, track your progress, and climb the leaderboard.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-fg">Explore</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/" className="text-muted transition-colors hover:text-primary">Home</Link></li>
              <li><Link to={quizzesTo} className="text-muted transition-colors hover:text-primary">Quizzes</Link></li>
              <li><Link to="/about" className="text-muted transition-colors hover:text-primary">About</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-fg">Get in touch</h4>
            <a href="mailto:support@quizmaster.com" className="mt-3 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-primary">
              <Mail className="h-4 w-4" /> support@quizmaster.com
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-line pt-6 text-center text-sm text-subtle">
          © {year} Quiz Master. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
