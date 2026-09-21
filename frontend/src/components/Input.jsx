import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = forwardRef(function Input(
  {
    label,
    type = "text",
    error,
    hint,
    icon: Icon,
    fullWidth = true,
    className = "",
    id,
    ...props
  },
  ref,
) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className={fullWidth ? "w-full" : ""}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-neutral-700 mb-1.5"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
        )}
        <input
          ref={ref}
          id={id}
          type={inputType}
          className={[
            "block rounded-lg border bg-white px-3.5 py-2.5 text-sm text-neutral-900",
            "placeholder:text-neutral-400 transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-offset-0",
            Icon ? "pl-10" : "",
            isPassword ? "pr-10" : "",
            error
              ? "border-error-300 focus:border-error-500 focus:ring-error-200"
              : "border-neutral-300 focus:border-primary-500 focus:ring-primary-200",
            fullWidth ? "w-full" : "",
            className,
          ].join(" ")}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
      {error ? (
        <p className="mt-1 text-xs text-error-600 animate-fade-in">{error}</p>
      ) : hint ? (
        <p className="mt-1 text-xs text-neutral-500">{hint}</p>
      ) : null}
    </div>
  );
});

export default Input;
