import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2.5 text-sm",
  lg: "px-5 py-3 text-base",
};

export default function Dropdown({
  options = [],
  value,
  onChange,
  placeholder = "Select...",
  size = "md",
  className = "",
  align = "left",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className={["relative", className].join(" ")}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={[
          "w-full flex items-center justify-between gap-2 rounded-lg border bg-white text-neutral-900",
          "transition-colors hover:border-neutral-400",
          "focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500",
          open
            ? "border-primary-500 ring-2 ring-primary-200"
            : "border-neutral-300",
          sizes[size] || sizes.md,
        ].join(" ")}
      >
        <span className={selected ? "text-neutral-900" : "text-neutral-400"}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          className={[
            "w-4 h-4 text-neutral-400 transition-transform",
            open ? "rotate-180" : "",
          ].join(" ")}
        />
      </button>

      {open && (
        <div
          className={[
            "absolute z-30 mt-1 w-full bg-white rounded-lg border border-neutral-200 shadow-lg shadow-neutral-200/50",
            "py-1 max-h-60 overflow-y-auto animate-fade-in",
            align === "right" ? "right-0" : "left-0",
          ].join(" ")}
        >
          {options.length === 0 ? (
            <p className="px-4 py-2 text-sm text-neutral-400">No options</p>
          ) : (
            options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange?.(option.value);
                  setOpen(false);
                }}
                className={[
                  "w-full flex items-center justify-between px-4 py-2 text-sm transition-colors",
                  option.value === value
                    ? "bg-primary-50 text-primary-700 font-medium"
                    : "text-neutral-700 hover:bg-neutral-50",
                ].join(" ")}
              >
                {option.label}
                {option.value === value && <Check className="w-4 h-4" />}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
