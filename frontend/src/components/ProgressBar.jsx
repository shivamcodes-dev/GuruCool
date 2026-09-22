const sizes = {
  sm: "h-1.5",
  md: "h-2",
  lg: "h-2.5",
  xl: "h-3",
};

const colorClasses = {
  primary: "bg-primary-600",
  secondary: "bg-secondary-600",
  accent: "bg-accent-500",
  success: "bg-success-500",
  warning: "bg-warning-500",
  error: "bg-error-500",
};

export default function ProgressBar({
  value = 0,
  max = 100,
  size = "md",
  color = "primary",
  label,
  showValue = false,
  valuePosition = "right",
  animated = true,
  className = "",
}) {
  const pct = Math.min(Math.max((value / max) * 100, 0), 100);
  const sizeClass = sizes[size] || sizes.md;
  const barColor = colorClasses[color] || colorClasses.primary;

  return (
    <div className={className}>
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && <span className="text-sm text-neutral-600">{label}</span>}
          {showValue && (
            <span
              className={[
                "text-sm font-medium",
                valuePosition === "right"
                  ? "text-neutral-900"
                  : "text-neutral-500",
              ].join(" ")}
            >
              {value}
              {max !== 100 ? `/${max}` : "%"}
            </span>
          )}
        </div>
      )}
      <div
        className={[
          "w-full bg-neutral-100 rounded-full overflow-hidden",
          sizeClass,
        ].join(" ")}
      >
        <div
          className={[
            "h-full rounded-full transition-all duration-500",
            barColor,
            animated ? "transition-all duration-500" : "",
          ].join(" ")}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
