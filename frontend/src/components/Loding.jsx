import { Loader2 } from "lucide-react";

export function Spinner({ size = "md", className = "" }) {
  const sizeMap = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };
  return (
    <Loader2
      className={[
        "animate-spin text-primary-600",
        sizeMap[size] || sizeMap.md,
        className,
      ].join(" ")}
    />
  );
}

export function FullPageLoader({ label = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-3 bg-neutral-50">
      <Spinner size="xl" />
      <p className="text-sm text-neutral-500">{label}</p>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-5 space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full skeleton-shimmer" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-1/2 skeleton-shimmer rounded" />
          <div className="h-3 w-1/3 skeleton-shimmer rounded" />
        </div>
      </div>
      <div className="h-3 w-full skeleton-shimmer rounded" />
      <div className="h-3 w-2/3 skeleton-shimmer rounded" />
      <div className="flex gap-2">
        <div className="h-6 w-20 skeleton-shimmer rounded-full" />
        <div className="h-6 w-20 skeleton-shimmer rounded-full" />
      </div>
    </div>
  );
}

export default Spinner;
