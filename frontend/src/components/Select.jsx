import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";

const Select = forwardRef(function Select(
  {
    label,
    error,
    hint,
    options = [],
    placeholder,
    fullWidth = true,
    className = "",
    id,
    ...props
  },
  ref,
) {
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
        <select
          ref={ref}
          id={id}
          className={[
            "block appearance-none rounded-lg border bg-white px-3.5 py-2.5 pr-10 text-sm text-neutral-900",
            "transition-all duration-200 cursor-pointer",
            "focus:outline-none focus:ring-2 focus:ring-offset-0",
            error
              ? "border-error-300 focus:border-error-500 focus:ring-error-200"
              : "border-neutral-300 focus:border-primary-500 focus:ring-primary-200",
            fullWidth ? "w-full" : "",
            className,
          ].join(" ")}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
      </div>
      {error ? (
        <p className="mt-1 text-xs text-error-600 animate-fade-in">{error}</p>
      ) : hint ? (
        <p className="mt-1 text-xs text-neutral-500">{hint}</p>
      ) : null}
    </div>
  );
});

export default Select;
