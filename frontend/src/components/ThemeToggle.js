import React from "react";
import { Sun, Moon } from "lucide-react";
import useTheme from "../hooks/useTheme";

const ThemeToggle = ({ className = "" }) => {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className={`grid h-10 w-10 place-items-center rounded-lg border border-line text-muted transition-colors hover:bg-surface2 hover:text-fg ${className}`}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
};

export default ThemeToggle;
