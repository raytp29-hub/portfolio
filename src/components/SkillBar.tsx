import { useState, useEffect, useRef } from "react";

type SkillBarProps = {
  name: string;
  level: number;
  label: string;
  delay: number;
  isActive: boolean;
  onSelect: () => void;
  siteVisible: boolean;
};

function SkillBar({
  name,
  level,
  label,
  delay,
  isActive,
  onSelect,
  siteVisible,
}: SkillBarProps) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!seen || !siteVisible) return;
    const t = setTimeout(() => setWidth(level), 200 + delay);
    return () => clearTimeout(t);
  }, [seen, siteVisible, level, delay]);

  return (
    <div
      ref={ref}
      onMouseEnter={onSelect}
      style={{
        marginBottom: 16,
        padding: "10px 14px",
        borderRadius: 8,
        cursor: "pointer",
        background: isActive ? "rgba(0,184,148,0.06)" : "transparent",
        border: `1px solid ${isActive ? "rgba(0,184,148,0.15)" : "transparent"}`,
        transition: "all 0.3s",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 6,
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: isActive ? "#00b894" : "#ccc",
            transition: "color 0.3s",
          }}
        >
          {name}
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color:
              label === "Expert"
                ? "#00b894"
                : label === "Advanced"
                  ? "#6c5ce7"
                  : "#888",
          }}
        >
          {label}
        </span>
      </div>
      <div
        style={{
          height: 4,
          background: "#333",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${width}%`,
            background: isActive
              ? "linear-gradient(90deg, #00b894, #00d4aa)"
              : "linear-gradient(90deg, #6c5ce7, #00b894)",
            borderRadius: 2,
            transition:
              "width 1.2s cubic-bezier(.25,.46,.45,.94), background 0.3s",
          }}
        />
      </div>
    </div>
  );
}

export default SkillBar;
