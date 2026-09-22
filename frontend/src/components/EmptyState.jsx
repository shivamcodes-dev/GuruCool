import { Search, FolderOpen } from "lucide-react";
import Button from "./Button";

const icons = {
  search: Search,
  folder: FolderOpen,
};

export default function EmptyState({
  icon = "folder",
  title = "Nothing here yet",
  description,
  action,
  actionLabel,
  onAction,
  className = "",
}) {
  const Icon = icons[icon] || FolderOpen;

  return (
    <div
      className={[
        "flex flex-col items-center justify-center text-center py-12 px-6",
        className,
      ].join(" ")}
    >
      <div className="w-14 h-14 rounded-2xl bg-neutral-100 flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-neutral-400" />
      </div>
      <h3 className="text-base font-semibold text-neutral-900 mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-neutral-500 max-w-sm">{description}</p>
      )}
      {actionLabel && (
        <Button variant="primary" size="sm" className="mt-4" onClick={onAction}>
          {action || actionLabel}
        </Button>
      )}
    </div>
  );
}
