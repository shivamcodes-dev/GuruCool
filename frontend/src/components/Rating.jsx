import { Star } from "lucide-react";

const sizes = {
  sm: { star: "w-3.5 h-3.5", text: "text-xs" },
  md: { star: "w-4 h-4", text: "text-sm" },
  lg: { star: "w-5 h-5", text: "text-base" },
};

export default function Rating({
  value = 0,
  count,
  size = "md",
  showValue = true,
  interactive = false,
  onChange,
  className = "",
}) {
  const { star, text } = sizes[size] || sizes.md;

  const handleClick = (idx) => {
    if (interactive && onChange) onChange(idx);
  };

  return (
    <div className={["inline-flex items-center gap-1", className].join(" ")}>
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((idx) => {
          const filled = idx <= Math.round(value);
          return (
            <Star
              key={idx}
              onClick={() => handleClick(idx)}
              className={[
                star,
                filled
                  ? "fill-accent-400 text-accent-400"
                  : "fill-neutral-200 text-neutral-200",
                interactive
                  ? "cursor-pointer transition-colors hover:fill-accent-300 hover:text-accent-300"
                  : "",
              ].join(" ")}
            />
          );
        })}
      </div>
      {showValue && (
        <span className={["font-medium text-neutral-700", text].join(" ")}>
          {value.toFixed(1)}
        </span>
      )}
      {count != null && (
        <span className={["text-neutral-400", text].join(" ")}>({count})</span>
      )}
    </div>
  );
}
