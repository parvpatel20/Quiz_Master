import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { apiFetch } from "../config/api";

/* ---- queries ---- */
export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => apiFetch("/profile").then((r) => r.data),
  });
}

export function useQuizzes(mode = "auth") {
  const guest = mode === "guest";
  return useQuery({
    queryKey: ["quizzes", mode],
    queryFn: async () => {
      const res = await apiFetch(guest ? "/quiz-search-before-signup" : "/quiz-search");
      if (guest) {
        const list = Array.isArray(res.data) ? res.data : Object.values(res.data || {});
        return { quizzes: list, userid: "", bookmarks: [] };
      }
      return {
        quizzes: res.data?.quizzes || [],
        userid: res.data?.userid || "",
        bookmarks: res.data?.bookmarks || [],
      };
    },
  });
}

export function useBookmarkedQuizzes() {
  return useQuery({
    queryKey: ["bookmarks"],
    queryFn: () => apiFetch("/bookmarks").then((r) => r.data?.quizzes || []),
  });
}

export function useLeaderboard() {
  return useQuery({
    queryKey: ["leaderboard"],
    queryFn: () => apiFetch("/leaderboard").then((r) => r.data || []),
  });
}

export function useQuiz(userid, quizid) {
  return useQuery({
    queryKey: ["quiz", userid, quizid],
    queryFn: () => apiFetch(`/quiz-page/${userid}/${quizid}`).then((r) => r.data?.quiz),
    enabled: Boolean(userid && quizid),
  });
}

/* ---- mutations ---- */
export function useToggleBookmark() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (quizid) => apiFetch(`/bookmarks/${quizid}`, { method: "POST" }),
    onSuccess: (res) => {
      toast.success(res?.bookmarked ? "Saved to bookmarks" : "Removed from bookmarks");
      qc.invalidateQueries({ queryKey: ["quizzes"] });
      qc.invalidateQueries({ queryKey: ["bookmarks"] });
      qc.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (err) => toast.error(err.message || "Could not update bookmark"),
  });
}
