import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Check, X } from "lucide-react";
import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/* utils                                                              */
/* ------------------------------------------------------------------ */
export const cx = (...parts) => parts.filter(Boolean).join(" ");

/* ------------------------------------------------------------------ */
/* Button                                                             */
/* ------------------------------------------------------------------ */
const BUTTON_VARIANTS = {
  primary: "bg-primary text-primary-fg hover:opacity-90 shadow-xs",
  // `outline` kept as a secondary-style alias used across the app
  outline: "border border-line bg-surface text-fg hover:bg-surface2",
  secondary: "border border-line bg-surface text-fg hover:bg-surface2",
  ghost: "text-muted hover:bg-surface2 hover:text-fg",
  danger: "bg-error text-white hover:opacity-90",
  subtle: "bg-primary/10 text-primary hover:bg-primary/15",
};

const BUTTON_SIZES = {
  sm: "h-9 px-3.5 text-sm gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-11 px-5 text-[15px] gap-2",
};

export function Button({ as: Comp = "button", variant = "primary", size = "md", className, children, ...props }) {
  return (
    <Comp
      className={cx(
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors",
        "focus-visible:ring-2 focus-visible:ring-primary/55 disabled:opacity-50 disabled:pointer-events-none",
        BUTTON_VARIANTS[variant],
        BUTTON_SIZES[size],
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

/* ------------------------------------------------------------------ */
/* Card                                                               */
/* ------------------------------------------------------------------ */
export function Card({ className, children, hover = false, ...props }) {
  return (
    <div
      className={cx("card", hover && "transition-shadow duration-200 hover:shadow-md", className)}
      {...props}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Badge                                                              */
/* ------------------------------------------------------------------ */
const BADGE_TONES = {
  neutral: "bg-surface2 text-muted border-line",
  brand: "bg-primary/10 text-primary border-primary/20",
  green: "bg-success/10 text-success border-success/20",
  amber: "bg-warning/10 text-warning border-warning/20",
  red: "bg-error/10 text-error border-error/20",
  blue: "bg-info/10 text-info border-info/20",
};

export function Badge({ tone = "neutral", className, children }) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        BADGE_TONES[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Spinner                                                            */
/* ------------------------------------------------------------------ */
export function Spinner({ className }) {
  return (
    <span
      className={cx("inline-block rounded-full border-2 border-line border-t-primary animate-spin-smooth", className || "h-6 w-6")}
      role="status"
      aria-label="Loading"
    />
  );
}

/* ------------------------------------------------------------------ */
/* SectionHeading                                                     */
/* ------------------------------------------------------------------ */
export function SectionHeading({ icon: Icon, title, subtitle, center = false, className }) {
  return (
    <div className={cx(center && "text-center", className)}>
      <div className={cx("flex items-center gap-2.5", center && "justify-center")}>
        {Icon && (
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </span>
        )}
        <h2 className="text-xl font-semibold text-fg sm:text-2xl">{title}</h2>
      </div>
      {subtitle && <p className={cx("mt-2 text-sm text-muted", center && "mx-auto max-w-2xl")}>{subtitle}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Field primitives                                                   */
/* ------------------------------------------------------------------ */
const FIELD_BASE =
  "w-full rounded-lg border border-line bg-surface text-fg placeholder-subtle " +
  "transition-colors duration-150 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

export function FieldLabel({ icon: Icon, children, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-muted">
      {Icon && <Icon className="h-4 w-4 text-subtle" />}
      {children}
    </label>
  );
}

export function Input({ icon: Icon, className, rightSlot, ...props }) {
  return (
    <div className="relative">
      {Icon && <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />}
      <input
        className={cx(FIELD_BASE, "h-11", Icon ? "pl-9" : "pl-3.5", rightSlot ? "pr-11" : "pr-3.5", className)}
        {...props}
      />
      {rightSlot && <div className="absolute right-1.5 top-1/2 -translate-y-1/2">{rightSlot}</div>}
    </div>
  );
}

export function Textarea({ className, ...props }) {
  return <textarea className={cx(FIELD_BASE, "resize-none p-3.5", className)} {...props} />;
}

/* ------------------------------------------------------------------ */
/* Select — portal dropdown (escapes any clipping/stacking context)   */
/* ------------------------------------------------------------------ */
export function Select({ label, icon: Icon, value, onChange, options = [], placeholder = "Select…", disabled = false, id }) {
  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState(null);
  const btnRef = useRef(null);
  const menuRef = useRef(null);
  const selected = options.find((o) => o.value === value);

  const place = () => btnRef.current && setRect(btnRef.current.getBoundingClientRect());
  const toggle = () => { if (disabled) return; if (!open) place(); setOpen((v) => !v); };

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (btnRef.current?.contains(e.target) || menuRef.current?.contains(e.target)) return;
      setOpen(false);
    };
    const onEsc = (e) => e.key === "Escape" && setOpen(false);
    const close = () => setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    window.addEventListener("resize", close);
    window.addEventListener("scroll", close, true);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
      window.removeEventListener("resize", close);
      window.removeEventListener("scroll", close, true);
    };
  }, [open]);

  return (
    <div className="w-full">
      {label && <FieldLabel icon={Icon} htmlFor={id}>{label}</FieldLabel>}
      <button
        ref={btnRef}
        id={id}
        type="button"
        disabled={disabled}
        onClick={toggle}
        className={cx(FIELD_BASE, "flex h-11 w-full items-center justify-between px-3.5 text-left", disabled && "cursor-not-allowed opacity-50", open && "border-primary ring-2 ring-primary/30")}
      >
        <span className={cx("truncate text-sm", selected ? "text-fg" : "text-subtle")}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown className={cx("h-4 w-4 shrink-0 text-subtle transition-transform", open && "rotate-180")} />
      </button>

      {open && !disabled && rect &&
        createPortal(
          <div
            ref={menuRef}
            style={{ position: "fixed", top: rect.bottom + 6, left: rect.left, width: rect.width, zIndex: 80 }}
            className="max-h-64 overflow-auto rounded-lg border border-line bg-surface p-1 shadow-lg animate-fade-in"
          >
            {options.length === 0 && <p className="px-3 py-2 text-sm text-subtle">No options</p>}
            {options.map((opt) => {
              const active = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => { onChange(opt.value); setOpen(false); }}
                  className={cx(
                    "flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors",
                    active ? "bg-primary/10 text-primary" : "text-muted hover:bg-surface2 hover:text-fg"
                  )}
                >
                  <span className="truncate">{opt.label}</span>
                  {active && <Check className="h-4 w-4" />}
                </button>
              );
            })}
          </div>,
          document.body
        )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Modal                                                              */
/* ------------------------------------------------------------------ */
export function Modal({ open, onClose, title, icon: Icon, children, maxWidth = "max-w-md" }) {
  useEffect(() => {
    if (!open) return;
    const onEsc = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 animate-fade-in" onClick={onClose} />
      <div
        className={cx("relative w-full rounded-2xl border border-line bg-surface shadow-lg animate-fade-up", maxWidth)}
        role="dialog"
        aria-modal="true"
      >
        {(title || Icon) && (
          <div className="flex items-center gap-3 border-b border-line px-5 py-4 pr-12">
            {Icon && (
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
            )}
            {title && <h3 className="text-base font-semibold text-fg">{title}</h3>}
          </div>
        )}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3.5 top-3.5 grid h-8 w-8 place-items-center rounded-lg text-muted transition-colors hover:bg-surface2 hover:text-fg"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="px-5 py-5">{children}</div>
      </div>
    </div>,
    document.body
  );
}

/* ------------------------------------------------------------------ */
/* Reveal                                                             */
/* ------------------------------------------------------------------ */
export function Reveal({ children, delay = 0, y = 12, className, as = "div" }) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}

/* ------------------------------------------------------------------ */
/* AnimatedNumber                                                     */
/* ------------------------------------------------------------------ */
export function AnimatedNumber({ value = 0, duration = 800, decimals = 0, suffix = "" }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const target = Number(value) || 0;
    let raf, start;
    const step = (ts) => {
      if (start == null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setDisplay(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return <span>{display.toFixed(decimals)}{suffix}</span>;
}

/* ------------------------------------------------------------------ */
/* StatCard                                                           */
/* ------------------------------------------------------------------ */
const STAT_TONES = {
  brand: "bg-primary/10 text-primary",
  green: "bg-success/10 text-success",
  blue: "bg-info/10 text-info",
  amber: "bg-warning/10 text-warning",
  red: "bg-error/10 text-error",
};

export function StatCard({ icon: Icon, label, value, suffix = "", decimals = 0, hint, tone = "brand" }) {
  return (
    <Card hover className="flex h-full flex-col p-5">
      <span className={cx("grid h-10 w-10 place-items-center rounded-lg", STAT_TONES[tone])}>
        {Icon && <Icon className="h-5 w-5" />}
      </span>
      <p className="mt-4 font-display text-2xl font-semibold text-fg">
        <AnimatedNumber value={value} decimals={decimals} suffix={suffix} />
      </p>
      <p className="mt-0.5 text-sm text-muted">{label}</p>
      <p className="mt-0.5 text-xs text-subtle">{hint || " "}</p>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* ProgressRing                                                       */
/* ------------------------------------------------------------------ */
export function ProgressRing({ value = 0, size = 132, stroke = 10, children }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.min(100, Math.max(0, value)) / 100) * c;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" style={{ stroke: "rgb(var(--line))" }} strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" style={{ stroke: "rgb(var(--primary))" }} strokeWidth={stroke}
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Chip                                                               */
/* ------------------------------------------------------------------ */
export function Chip({ active, onClick, children, icon: Icon }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium transition-colors",
        active ? "border-primary/30 bg-primary/10 text-primary" : "border-line text-muted hover:bg-surface2 hover:text-fg"
      )}
    >
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Skeleton                                                           */
/* ------------------------------------------------------------------ */
export function Skeleton({ className }) {
  return <div className={cx("animate-pulse rounded-lg bg-surface2", className)} />;
}

/* ------------------------------------------------------------------ */
/* EmptyState                                                         */
/* ------------------------------------------------------------------ */
export function EmptyState({ icon: Icon, title, subtitle, action }) {
  return (
    <div className="flex flex-col items-center gap-3 px-6 py-14 text-center">
      {Icon && (
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-6 w-6" />
        </span>
      )}
      <p className="font-semibold text-fg">{title}</p>
      {subtitle && <p className="max-w-md text-sm text-muted">{subtitle}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* PageHeader                                                         */
/* ------------------------------------------------------------------ */
export function PageHeader({ badge, badgeIcon: BadgeIcon, title, subtitle, center = true, actions }) {
  return (
    <div className={cx("flex flex-col gap-4", center ? "items-center text-center" : "items-start", actions && !center && "sm:flex-row sm:items-end sm:justify-between")}>
      <div className={cx(center && "mx-auto max-w-2xl")}>
        {badge && (
          <Badge tone="brand">
            {BadgeIcon && <BadgeIcon className="h-3.5 w-3.5" />} {badge}
          </Badge>
        )}
        <h1 className="mt-3 font-display text-2xl font-semibold text-fg sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-2 text-muted">{subtitle}</p>}
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  );
}
