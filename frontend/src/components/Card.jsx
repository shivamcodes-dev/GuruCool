export default function Card({
  children,
  className = "",
  hover = false,
  padding = "md",
  onClick,
}) {
  const paddingMap = {
    none: "",
    sm: "p-4",
    md: "p-5",
    lg: "p-6",
  };

  return (
    <div
      onClick={onClick}
      className={[
        "bg-white rounded-xl border border-neutral-200",
        hover
          ? "transition-all duration-200 hover:shadow-lg hover:shadow-neutral-200/50 hover:border-neutral-300 cursor-pointer"
          : "",
        paddingMap[padding] || paddingMap.md,
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
