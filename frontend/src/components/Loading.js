import React from "react";
import { Spinner } from "./ui";

const Loading = ({ isLoading, label = "Loading…" }) => {
  if (!isLoading) return null;
  return (
    <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-4 bg-bg/80 backdrop-blur-sm">
      <Spinner className="h-10 w-10" />
      <p className="text-sm font-medium text-muted">{label}</p>
    </div>
  );
};

export default Loading;
