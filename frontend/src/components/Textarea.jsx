import { forwardRef } from "react";

const Textarea = forwardRef(function Textarea(
  {
    label,
    error,
    hint,
    fullWidth = true,
    rows = 4,
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
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        className={[
          "block rounded-lg border bg-white px-3.5 py-2.5 text-sm text-neutral-900",
          "placeholder:text-neutral-400 transition-all duration-200 resize-y",
          "focus:outline-none focus:ring-2 focus:ring-offset-0",
          error
            ? "border-error-300 focus:border-error-500 focus:ring-error-200"
            : "border-neutral-300 focus:border-primary-500 focus:ring-primary-200",
          fullWidth ? "w-full" : "",
          className,
        ].join(" ")}
        {...props}
      />
      {error ? (
        <p className="mt-1 text-xs text-error-600 animate-fade-in">{error}</p>
      ) : hint ? (
        <p className="mt-1 text-xs text-neutral-500">{hint}</p>
      ) : null}
    </div>
  );
});

export default Textarea;
