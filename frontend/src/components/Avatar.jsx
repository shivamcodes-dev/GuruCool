import { getInitials } from "../utils/helpers";

const sizes = {
  xs: "w-6 h-6 text-xs",
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-lg",
  "2xl": "w-20 h-20 text-xl",
};

const statusColors = {
  online: "bg-success-500",
  offline: "bg-neutral-300",
  busy: "bg-error-500",
  away: "bg-warning-500",
};

export default function Avatar({
  src,
  name,
  size = "md",
  status,
  ring = false,
  className = "",
}) {
  const sizeClass = sizes[size] || sizes.md;
  const ringClass = ring ? "ring-2 ring-primary-500 ring-offset-2" : "";

  return (
    <div
      className={["relative inline-flex flex-shrink-0", className].join(" ")}
    >
      {src ? (
        <img
          src={src}
          alt={name || "avatar"}
          className={["rounded-full object-cover", sizeClass, ringClass].join(
            " ",
          )}
        />
      ) : (
        <div
          className={[
            "rounded-full flex items-center justify-center font-semibold bg-primary-100 text-primary-700",
            sizeClass,
            ringClass,
          ].join(" ")}
        >
          {name ? getInitials(name) : "?"}
        </div>
      )}
      {status && (
        <span
          className={[
            "absolute bottom-0 right-0 rounded-full ring-2 ring-white",
            statusColors[status] || statusColors.offline,
            size === "xs" || size === "sm" ? "w-2 h-2" : "w-3 h-3",
          ].join(" ")}
        />
      )}
    </div>
  );
}
