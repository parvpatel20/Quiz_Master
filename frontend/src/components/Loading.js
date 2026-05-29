import React from "react";
import { Spinner } from "./ui";

const Loading = ({ isLoading, label = "Loading…" }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-4 bg-ink-950/90 backdrop-blur-sm">
      <Spinner className="h-12 w-12" />
      <p className="text-sm font-medium text-slate-300">{label}</p>
    </div>
  );
};

export default Loading;
