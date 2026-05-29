import React, { useState } from "react";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { cx } from "./ui";

const PER_PAGE = 6;

const scoreTone = (score) => {
  if (score >= 80) return "text-emerald-300 bg-emerald-500/10 border-emerald-500/20";
  if (score >= 50) return "text-amber-300 bg-amber-500/10 border-amber-500/20";
  return "text-red-300 bg-red-500/10 border-red-500/20";
};

const formatDate = (d) => {
  const date = new Date(d);
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

const QuizHistory = ({ quizzes = [] }) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(quizzes.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const slice = quizzes.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  if (quizzes.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 px-6 py-14 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand/10 text-brand">
          <BookOpen className="h-7 w-7" />
        </span>
        <p className="font-medium text-white">No quizzes taken yet</p>
        <p className="text-sm text-slate-400">
          Your attempts will appear here once you complete a quiz.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px] text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wide text-slate-400">
              <th className="px-5 py-3 font-medium">Subject</th>
              <th className="px-5 py-3 font-medium">Topic</th>
              <th className="px-5 py-3 font-medium">Score</th>
              <th className="px-5 py-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {slice.map((q, i) => (
              <tr key={i} className="border-b border-white/5 transition-colors hover:bg-white/[0.03]">
                <td className="px-5 py-3.5 font-medium text-white">{q.quiz?.subject}</td>
                <td className="px-5 py-3.5 text-slate-300">{q.quiz?.topic}</td>
                <td className="px-5 py-3.5">
                  <span className={cx("inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold", scoreTone(q.score))}>
                    {q.score}%
                  </span>
                </td>
                <td className="px-5 py-3.5 text-slate-400">{formatDate(q.quizDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 px-5 py-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-slate-300 transition-colors hover:border-brand/50 hover:text-white disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="px-2 text-sm text-slate-400">
            Page {safePage} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-slate-300 transition-colors hover:border-brand/50 hover:text-white disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizHistory;
