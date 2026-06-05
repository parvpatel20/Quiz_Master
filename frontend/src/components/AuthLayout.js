import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/* AuthLayout                                                          */
/*                                                                    */
/* Shared shell used by both Login and Register pages.                 */
/* Left panel = brand pitch + animated decorative icons.               */
/* Right panel = the form (passed as `children`).                      */
/* Background carries two soft, slowly-drifting gradient blobs         */
/* in the primary colour, plus a subtle grid texture.                  */
/* ------------------------------------------------------------------ */

const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: EASE },
  }),
};

function BrandMark() {
  return (
    <Link to="/" className="group inline-flex items-center gap-2.5">
      <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-primary/10 ring-1 ring-primary/20 transition-colors group-hover:bg-primary/15">
        <img src="/assets/logo.png" alt="" className="h-7 w-7 object-contain" />
      </span>
      <span className="font-display text-xl font-bold text-fg">
        Quiz<span className="text-primary">Master</span>
      </span>
    </Link>
  );
}

function FloatIcon({ Icon, className, delay = 0, duration = 6 }) {
  return (
    <motion.div
      className={`pointer-events-none absolute ${className}`}
      initial={{ y: 0, rotate: 0, opacity: 0.85 }}
      animate={{ y: [0, -14, 0], rotate: [0, 6, -4, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20 backdrop-blur-sm">
        <Icon className="h-5 w-5" />
      </span>
    </motion.div>
  );
}

function FeaturePanel({ eyebrow, title, subtitle, perks = [], icons = [] }) {
  return (
    <div className="relative hidden h-full w-full overflow-hidden rounded-2xl border border-line bg-surface p-10 lg:flex lg:flex-col lg:justify-between">
      {/* local panel glow */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <motion.div initial="hidden" animate="show" variants={fadeUp} custom={0}>
        <BrandMark />
      </motion.div>

      <div className="relative">
        {/* floating decorative icons */}
        {icons.map((it, idx) => (
          <FloatIcon
            key={idx}
            Icon={it.icon}
            className={it.className}
            delay={it.delay ?? idx * 0.4}
            duration={it.duration ?? 6}
          />
        ))}

        <motion.div initial="hidden" animate="show" variants={fadeUp} custom={1}>
          {eyebrow && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {eyebrow}
            </span>
          )}
          <h2 className="mt-5 font-display text-4xl font-bold leading-[1.1] text-fg xl:text-5xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
              {subtitle}
            </p>
          )}
        </motion.div>

        {perks.length > 0 && (
          <motion.ul
            className="mt-8 space-y-3"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } } }}
          >
            {perks.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.li
                  key={i}
                  variants={fadeUp}
                  className="flex items-start gap-3 text-sm text-muted"
                >
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="leading-relaxed">{p.text}</span>
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="text-xs text-subtle"
      >
        Built for learners who love measurable progress.
      </motion.div>
    </div>
  );
}

export default function AuthLayout({ children, featureProps }) {
  return (
    <div className="app-bg relative min-h-screen overflow-hidden px-5 py-8 sm:px-8 sm:py-12">
      {/* Animated background blobs — soft, slow, primary-tinted */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-[-10%] h-[28rem] w-[28rem] rounded-full bg-primary/15 blur-3xl animate-blob-slow" />
        <div className="absolute -right-32 bottom-[-15%] h-[32rem] w-[32rem] rounded-full bg-primary/10 blur-3xl animate-blob-slower" />
        <div className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgb(var(--line))/0.5_1px,transparent_1px),linear-gradient(90deg,rgb(var(--line))/0.5_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </div>

      {/* Mobile-only top brand */}
      <div className="mb-8 flex justify-center lg:hidden">
        <BrandMark />
      </div>

      <div className="mx-auto grid max-w-5xl items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
        <FeaturePanel {...featureProps} />
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}
