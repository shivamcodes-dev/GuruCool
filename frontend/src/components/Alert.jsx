import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

const config = {
  success: {
    icon: CheckCircle,
    container: "bg-success-50 border-success-200 text-success-800",
    iconColor: "text-success-600",
    accent: "bg-success-500",
  },
  error: {
    icon: XCircle,
    container: "bg-error-50 border-error-200 text-error-800",
    iconColor: "text-error-600",
    accent: "bg-error-500",
  },
  warning: {
    icon: AlertTriangle,
    container: "bg-warning-50 border-warning-200 text-warning-800",
    iconColor: "text-warning-600",
    accent: "bg-warning-500",
  },
  info: {
    icon: Info,
    container: "bg-primary-50 border-primary-200 text-primary-800",
    iconColor: "text-primary-600",
    accent: "bg-primary-500",
  },
};

export default function Alert({
  variant = "info",
  title,
  children,
  onClose,
  className = "",
}) {
  const c = config[variant] || config.info;
  const Icon = c.icon;

  return (
    <div
      className={[
        "relative flex items-start gap-3 rounded-xl border p-4 animate-fade-in",
        c.container,
        className,
      ].join(" ")}
    >
      <div className={["flex-shrink-0", c.iconColor].join(" ")}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        {title && <p className="text-sm font-semibold mb-0.5">{title}</p>}
        {children && <div className="text-sm opacity-90">{children}</div>}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
