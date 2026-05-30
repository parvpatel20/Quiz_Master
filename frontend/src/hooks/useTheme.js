import { useEffect, useState } from "react";

const KEY = "qm-theme";
const listeners = new Set();

function read() {
  if (typeof localStorage === "undefined") return "light";
  return localStorage.getItem(KEY) === "dark" ? "dark" : "light";
}

let current = read();

function apply(theme) {
  if (typeof document !== "undefined") {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }
}

// Apply once on module load so the initial paint matches the stored theme.
apply(current);

export function setTheme(theme) {
  current = theme === "dark" ? "dark" : "light";
  if (typeof localStorage !== "undefined") localStorage.setItem(KEY, current);
  apply(current);
  listeners.forEach((l) => l(current));
}

export function toggleTheme() {
  setTheme(current === "dark" ? "light" : "dark");
}

/** Subscribe to the global theme. Returns { theme, toggle, setTheme }. */
export default function useTheme() {
  const [theme, setLocal] = useState(current);
  useEffect(() => {
    const l = (t) => setLocal(t);
    listeners.add(l);
    return () => listeners.delete(l);
  }, []);
  return { theme, toggle: toggleTheme, setTheme };
}
