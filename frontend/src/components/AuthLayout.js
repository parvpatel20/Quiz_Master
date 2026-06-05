import React from "react";

/* ------------------------------------------------------------------ */
/* AuthLayout                                                          */
/*                                                                    */
/* Centred shell for Login and Register pages.                         */
/* Background carries two soft, slowly-drifting primary-tinted        */
/* gradient blobs plus a subtle grid texture.                          */
/* ------------------------------------------------------------------ */

export default function AuthLayout({ children, maxWidth = "max-w-md" }) {
  return (
    <div className="app-bg relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-10 sm:px-8">
      {/* Animated background blobs — soft, slow, primary-tinted */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-[-10%] h-[28rem] w-[28rem] rounded-full bg-primary/15 blur-3xl animate-blob-slow" />
        <div className="absolute -right-32 bottom-[-15%] h-[32rem] w-[32rem] rounded-full bg-primary/10 blur-3xl animate-blob-slower" />
        <div className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgb(var(--line))/0.5_1px,transparent_1px),linear-gradient(90deg,rgb(var(--line))/0.5_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </div>

      <div className={`w-full ${maxWidth}`}>{children}</div>
    </div>
  );
}
