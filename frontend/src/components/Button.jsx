import { Loader2 } from "lucide-react";

const variants = {
  primary:
    "bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500 shadow-sm shadow-primary-600/20",
  secondary:
    "bg-secondary-600 text-white hover:bg-secondary-700 focus-visible:ring-secondary-500 shadow-sm shadow-secondary-600/20",
  accent:
    "bg-accent-500 text-white hover:bg-accent-600 focus-visible:ring-accent-500 shadow-sm shadow-accent-500/20",
  outline:
    "border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 hover:border-neutral-400 focus-visible:ring-neutral-400",
  ghost: "text-neutral-700 hover:bg-neutral-100 focus-visible:ring-neutral-400",
  danger:
    "bg-error-600 text-white hover:bg-error-700 focus-visible:ring-error-500 shadow-sm shadow-error-600/20",
  success:
    "bg-success-600 text-white hover:bg-success-700 focus-visible:ring-success-500 shadow-sm shadow-success-600/20",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-5 py-2.5 text-sm gap-2",
  lg: "px-6 py-3 text-base gap-2.5",
  icon: "p-2.5",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  type = "button",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={[
        "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        variants[variant] || variants.primary,
        sizes[size] || sizes.md,
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}
