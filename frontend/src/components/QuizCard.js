import React from "react";
import { Link } from "react-router-dom";
import { Bookmark, ArrowRight, Lock, Clock, ListChecks, HelpCircle } from "lucide-react";
import { Card, Button, Badge, cx } from "./ui";

const difficultyTone = (d) => {
  switch (d?.toLowerCase()) {
    case "easy": return "green";
    case "medium": return "amber";
    case "hard": return "red";
    default: return "brand";
  }
};

const QuizCard = ({ quiz, isGuest = false, bookmarked = false, onToggleBookmark, onStart }) => (
  <Card hover className="group relative flex flex-col p-6">
    {!isGuest && (
      <button
        onClick={() => onToggleBookmark?.(quiz._id)}
        aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
        className={cx(
          "absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-lg border transition-colors",
          bookmarked
            ? "border-brand/40 bg-brand/15 text-brand"
            : "border-white/10 text-slate-400 hover:border-brand/40 hover:text-brand"
        )}
      >
        <Bookmark className={cx("h-4 w-4", bookmarked && "fill-brand")} />
      </button>
    )}

    <div className="flex items-center gap-2 pr-12">
      <Badge tone="neutral">{quiz.subject}</Badge>
      <Badge tone={difficultyTone(quiz.difficulty)}>{quiz.difficulty}</Badge>
    </div>

    <h3 className="mt-3 text-lg font-semibold text-white">{quiz.quizName}</h3>
    <p className="mt-1 text-sm text-slate-500">{quiz.topic}</p>

    <div className="hairline my-4" />

    <dl className="grid grid-cols-3 gap-2 text-center text-sm">
      <div>
        <dt className="flex items-center justify-center gap-1 text-slate-500"><HelpCircle className="h-3.5 w-3.5" /></dt>
        <dd className="mt-1 font-semibold text-white">{quiz.questions?.length}</dd>
        <dd className="text-xs text-slate-500">Questions</dd>
      </div>
      <div>
        <dt className="flex items-center justify-center gap-1 text-slate-500"><Clock className="h-3.5 w-3.5" /></dt>
        <dd className="mt-1 font-semibold text-white">{quiz.totalTime}m</dd>
        <dd className="text-xs text-slate-500">Time</dd>
      </div>
      <div>
        <dt className="flex items-center justify-center gap-1 text-slate-500"><ListChecks className="h-3.5 w-3.5" /></dt>
        <dd className="mt-1 truncate text-xs font-semibold text-white">{quiz.format}</dd>
        <dd className="text-xs text-slate-500">Format</dd>
      </div>
    </dl>

    <div className="mt-6">
      {isGuest ? (
        <Button as={Link} to="/register" variant="outline" className="w-full">
          <Lock className="h-4 w-4" /> Sign up to play
        </Button>
      ) : (
        <Button className="w-full" onClick={() => onStart?.(quiz._id)}>
          Start quiz <ArrowRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  </Card>
);

export default QuizCard;
