import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Check, X } from "lucide-react";

/* ------------------------------------------------------------------ */
/* utils                                                              */
/* ------------------------------------------------------------------ */
export const cx = (...parts) => parts.filter(Boolean).join(" ");

/* ------------------------------------------------------------------ */
/* Button                                                             */
/* ------------------------------------------------------------------ */
const BUTTON_VARIANTS = {
  primary:
    "bg-brand text-ink-950 hover:bg-brand-400 shadow-glow disabled:hover:bg-brand",
  outline:
    "border border-white/15 text-slate-100 hover:border-brand/60 hover:text-white bg-white/[0.02]",
  ghost: "text-slate-300 hover:text-white hover:bg-white/5",
  danger: "bg-red-500/90 text-white hover:bg-red-500",
  subtle: "bg-brand/10 text-brand hover:bg-brand/20 border border-brand/20",
};

const BUTTON_SIZES = {
  sm: "px-3.5 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export function Button({
  as: Comp = "button",
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) {
  return (
    <Comp
      className={cx(
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200",
        "focus-visible:ring-2 focus-visible:ring-brand/60 disabled:opacity-50 disabled:cursor-not-allowed",
        "active:scale-[0.98]",
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
      className={cx(
        "card",
        hover &&
          "transition-all duration-300 hover:border-brand/40 hover:-translate-y-0.5",
        className
      )}
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
  neutral: "bg-white/5 text-slate-300 border-white/10",
  brand: "bg-brand/10 text-brand border-brand/20",
  green: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  amber: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  red: "bg-red-500/10 text-red-300 border-red-500/20",
  blue: "bg-sky-500/10 text-sky-300 border-sky-500/20",
};

export function Badge({ tone = "neutral", className, children }) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold",
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
      className={cx(
        "inline-block rounded-full border-2 border-white/15 border-t-brand animate-spin-smooth",
        className || "h-6 w-6"
      )}
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
      <div className={cx("flex items-center gap-3", center && "justify-center")}>
        {Icon && (
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand">
            <Icon className="h-5 w-5" />
          </span>
        )}
        <h2 className="text-2xl font-bold text-white sm:text-3xl">{title}</h2>
      </div>
      {subtitle && (
        <p className={cx("mt-2 text-slate-400", center && "mx-auto max-w-2xl")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Field primitives                                                   */
/* ------------------------------------------------------------------ */
const FIELD_BASE =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] text-white placeholder-slate-500 " +
  "transition-colors duration-200 focus:border-brand/70 focus:bg-white/[0.05] focus:outline-none";

export function FieldLabel({ icon: Icon, children, htmlFor }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300"
    >
      {Icon && <Icon className="h-4 w-4 text-brand" />}
      {children}
    </label>
  );
}

export function Input({ icon: Icon, className, rightSlot, ...props }) {
  return (
    <div className="relative">
      {Icon && (
        <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
      )}
      <input
        className={cx(FIELD_BASE, "py-3", Icon ? "pl-11" : "pl-4", rightSlot ? "pr-11" : "pr-4", className)}
        {...props}
      />
      {rightSlot && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2">{rightSlot}</div>
      )}
    </div>
  );
}

export function Textarea({ className, ...props }) {
  return (
    <textarea className={cx(FIELD_BASE, "resize-none p-4", className)} {...props} />
  );
}

/* ------------------------------------------------------------------ */
/* Select (single reusable dropdown — replaces duplicated SelectField) */
/* ------------------------------------------------------------------ */
export function Select({
  label,
  icon: Icon,
  value,
  onChange,
  options = [],
  placeholder = "Select…",
  disabled = false,
  id,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    const onEsc = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  return (
    <div className="w-full" ref={ref}>
      {label && <FieldLabel icon={Icon} htmlFor={id}>{label}</FieldLabel>}
      <div className="relative">
        <button
          id={id}
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setOpen((v) => !v)}
          className={cx(
            FIELD_BASE,
            "flex items-center justify-between px-4 py-3 text-left",
            disabled && "cursor-not-allowed opacity-50",
            open && "border-brand/70"
          )}
        >
          <span className={cx("truncate", selected ? "text-white" : "text-slate-500")}>
            {selected ? selected.label : placeholder}
          </span>
          <ChevronDown
            className={cx("h-4 w-4 shrink-0 text-slate-400 transition-transform", open && "rotate-180")}
          />
        </button>

        {open && !disabled && (
          <div className="absolute z-30 mt-2 max-h-64 w-full overflow-auto rounded-xl border border-white/10 bg-ink-800 p-1 shadow-card scrollbar-thin animate-fade-in">
            {options.length === 0 && (
              <p className="px-3 py-2 text-sm text-slate-500">No options</p>
            )}
            {options.map((opt) => {
              const active = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={cx(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                    active ? "bg-brand/15 text-white" : "text-slate-300 hover:bg-white/5"
                  )}
                >
                  <span className="truncate">{opt.label}</span>
                  {active && <Check className="h-4 w-4 text-brand" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
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
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div
        className={cx(
          "relative w-full rounded-2xl border border-white/10 bg-ink-850 p-6 shadow-card animate-fade-up",
          maxWidth
        )}
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-white/5 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
        {(title || Icon) && (
          <div className="mb-5 flex items-center gap-3 pr-8">
            {Icon && (
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand">
                <Icon className="h-5 w-5" />
              </span>
            )}
            {title && <h3 className="text-lg font-bold text-white">{title}</h3>}
          </div>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
}
