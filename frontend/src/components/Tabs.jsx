import { useState } from "react";

export default function Tabs({
  tabs = [],
  defaultIndex = 0,
  onChange,
  className = "",
  size = "md",
}) {
  const [active, setActive] = useState(defaultIndex);

  const handleSelect = (idx) => {
    setActive(idx);
    onChange?.(idx);
  };

  const sizeClass = size === "lg" ? "text-base" : "text-sm";
  const padClass = size === "lg" ? "px-5 py-3" : "px-4 py-2.5";

  return (
    <div className={className}>
      <div className="flex items-center gap-1 border-b border-neutral-200 overflow-x-auto">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(idx)}
            className={[
              "relative font-medium transition-colors whitespace-nowrap",
              padClass,
              sizeClass,
              active === idx
                ? "text-primary-700"
                : "text-neutral-500 hover:text-neutral-700",
            ].join(" ")}
          >
            <span className="flex items-center gap-2">
              {tab.icon && <tab.icon className="w-4 h-4" />}
              {tab.label}
              {tab.count != null && (
                <span
                  className={[
                    "px-1.5 py-0.5 rounded-full text-xs font-medium",
                    active === idx
                      ? "bg-primary-100 text-primary-700"
                      : "bg-neutral-100 text-neutral-500",
                  ].join(" ")}
                >
                  {tab.count}
                </span>
              )}
            </span>
            {active === idx && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full" />
            )}
          </button>
        ))}
      </div>
      {tabs[active]?.content && (
        <div className="pt-4 animate-fade-in">{tabs[active].content}</div>
      )}
    </div>
  );
}
