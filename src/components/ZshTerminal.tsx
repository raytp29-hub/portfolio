import { useState, useEffect } from "react";

type ZshTerminalProps = {
  onComplete: () => void;
};

type Line = {
  d: number;
  type: "prompt" | "blank" | "ascii" | "info" | "step" | "done";
  text?: string;
  cmd?: string;
  bar?: string;
};

function ZshTerminal({ onComplete }: ZshTerminalProps) {
  const [lines, setLines] = useState<Line[]>([]);
  const [bars, setBars] = useState<Record<string, number>>({});
  const [dissolving, setDissolving] = useState(false);

  useEffect(() => {
    const seq: Line[] = [
      { d: 200, type: "prompt", cmd: "biagio --init portfolio" },
      { d: 700, type: "blank" },
      { d: 850, type: "ascii" },
      { d: 1200, type: "info", text: "  runtime  React 19 · Canvas · Vite 6" },
      {
        d: 1450,
        type: "info",
        text: "  target   production · gzip · tree-shaken",
      },
      { d: 1700, type: "blank" },
      {
        d: 1900,
        type: "step",
        text: "▶ Installing dependencies…",
        bar: "deps",
      },
      { d: 2800, type: "done", text: "  ✔ 12 packages installed" },
      { d: 3050, type: "step", text: "▶ Compiling modules…", bar: "mod" },
      {
        d: 3900,
        type: "done",
        text: "  ✔ GaussianEngine · ProjectCards · SkillBars",
      },
      { d: 4150, type: "step", text: "▶ Loading assets…", bar: "assets" },
      { d: 4900, type: "done", text: "  ✔ 4 projects · 6 skills · ready" },
      { d: 5200, type: "blank" },
      { d: 5400, type: "prompt", cmd: "launch --mode=interactive" },
    ];

    const timers: ReturnType<typeof setTimeout>[] = [];

    seq.forEach((item) => {
      timers.push(
        setTimeout(() => {
          setLines((prev) => [...prev, item]);
          if (item.bar) animateBar(item.bar);
        }, item.d),
      );
    });

    timers.push(setTimeout(() => setDissolving(true), 5900));
    timers.push(setTimeout(() => onComplete(), 6700));

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const animateBar = (id: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 25 + 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      setBars((prev) => ({ ...prev, [id]: Math.min(progress, 100) }));
    }, 60);
  };

  const renderLine = (line: Line, i: number) => {
    if (line.type === "blank") return <div key={i} style={{ height: 12 }} />;

    if (line.type === "ascii") {
      return (
        <div key={i} style={{ animation: "tIn .2s ease forwards", opacity: 0 }}>
          <pre
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              lineHeight: 1.4,
              color: "#e0e0e0",
              margin: "4px 0 8px",
            }}
          >{`  ____  _             _         _____ 
 |  _ \\(_)           (_)       / ____|
 | |_) |_  __ _  __ _ _  ___  | (___  
 |  _ <| |/ _\` |/ _\` | |/ _ \\  \\___ \\ 
 | |_) | | (_| | (_| | | (_) | ____) |
 |____/|_|\\__,_|\\__, |_|\\___/ |_____/ 
                 __/ |                 
                |___/   portfolio v2.0`}</pre>
        </div>
      );
    }

    if (line.type === "prompt") {
      return (
        <div
          key={i}
          style={{
            animation: "tIn .15s ease forwards",
            opacity: 0,
            display: "flex",
            alignItems: "center",
            gap: 0,
            marginBottom: 2,
            marginTop: 2,
          }}
        >
          <span
            style={{
              background: "#6c5ce7",
              color: "#fff",
              padding: "1px 10px 1px 8px",
              fontSize: 12,
              fontWeight: 600,
              borderRadius: "4px 0 0 4px",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            ⚡
          </span>
          <span
            style={{
              background: "#00b894",
              color: "#1a1a1a",
              padding: "1px 10px",
              fontSize: 12,
              fontWeight: 600,
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            biagio
          </span>
          <span
            style={{
              background: "#0984e3",
              color: "#fff",
              padding: "1px 10px",
              fontSize: 12,
              fontWeight: 500,
              borderRadius: "0 4px 4px 0",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            ~/portfolio
          </span>
          <span
            style={{
              color: "#00b894",
              fontSize: 14,
              margin: "0 6px",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            ❯
          </span>
          <span
            style={{
              color: "#e0e0e0",
              fontSize: 13,
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {line.cmd}
          </span>
        </div>
      );
    }

    const colorMap: Record<string, string> = {
      info: "#888",
      step: "#b0b0b0",
      done: "#00b894",
    };

    return (
      <div
        key={i}
        style={{
          animation: "tIn .15s ease forwards",
          opacity: 0,
          marginBottom: 2,
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: colorMap[line.type] || "#999",
          }}
        >
          {line.text}
        </span>
        {line.bar && bars[line.bar] !== undefined && (
          <div
            style={{
              margin: "5px 0 3px 16px",
              width: 220,
              height: 3,
              background: "#333",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${bars[line.bar]}%`,
                borderRadius: 2,
                background:
                  bars[line.bar] >= 100
                    ? "#00b894"
                    : "linear-gradient(90deg, #6c5ce7, #0984e3)",
                transition: "width 0.06s linear, background 0.3s",
              }}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#1a1a1a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: dissolving ? 0 : 1,
        transform: dissolving ? "scale(1.02)" : "scale(1)",
        transition:
          "opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)",
        pointerEvents: dissolving ? "none" : "auto",
      }}
    >
      <div
        style={{
          background: "#212121",
          border: "1px solid #333",
          borderRadius: 10,
          width: "min(580px, 92vw)",
          overflow: "hidden",
          boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
        }}
      >
        {/* Title bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "11px 14px",
            background: "#2a2a2a",
            borderBottom: "1px solid #333",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#ff5f57",
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#febc2e",
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#28c840",
            }}
          />
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: "#666",
              marginLeft: 16,
              fontWeight: 500,
            }}
          >
            biagio — zsh — 80×24
          </span>
        </div>

        {/* Terminal body */}
        <div
          style={{
            padding: "16px 20px 20px",
            fontFamily: "'JetBrains Mono', monospace",
            minHeight: 280,
          }}
        >
          {lines.map((l, i) => renderLine(l, i))}
          <span
            style={{
              display: "inline-block",
              width: 7,
              height: 15,
              background: "#e0e0e0",
              verticalAlign: "middle",
              animation: "cBlink 1s step-end infinite",
              marginTop: 4,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ZshTerminal;
