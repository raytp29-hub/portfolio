import { useState, useMemo } from "react";
import { TIMELINE, TIMELINE_YEARS, type TimelineEntry } from "../data/timeline";
import useIsMobile from "../hooks/useIsMobile";

/**
 * Card di una singola esperienza. Riceve `inFocus` (l'anno hoverato copre
 * questa entry) e `dimmed` (c'è un focus attivo ma questa non è quella).
 * Il wrapper esterno gestisce `order` per il reorder in cima al focus,
 * più opacity/scale/filter per la dissolvenza.
 */
function EntryCard({ entry }: { entry: TimelineEntry }) {
  return (
    <div
      style={{
        background: "#2a2a2a",
        border: "1px solid #333",
        borderRadius: 14,
        padding: "28px 32px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
        }}
      >
        <span
          style={{
            fontFamily: "monospace",
            fontSize: 10,
            letterSpacing: 1.5,
            color: "#00b894",
            padding: "3px 10px",
            border: "1px solid rgba(0,184,148,0.35)",
            borderRadius: 4,
            background: "rgba(0,184,148,0.06)",
            fontWeight: 600,
          }}
        >
          {entry.id}
        </span>
        <span
          style={{
            fontFamily: "monospace",
            fontSize: 11,
            color: "#666",
            letterSpacing: 0.5,
          }}
        >
          {entry.start} — {entry.end}
        </span>
      </div>

      <h3
        style={{
          fontFamily: "serif",
          fontSize: 22,
          color: "#e8e8e8",
          fontWeight: 400,
          margin: "0 0 6px",
          lineHeight: 1.25,
        }}
      >
        {entry.role}
      </h3>

      <p
        style={{
          fontFamily: "monospace",
          fontSize: 11,
          color: "#888",
          letterSpacing: 1,
          textTransform: "uppercase",
          margin: "0 0 18px",
        }}
      >
        {entry.company} · {entry.location}
      </p>

      <div>
        {entry.highlights.map((h, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 10,
              marginBottom: 8,
              alignItems: "flex-start",
            }}
          >
            <span
              style={{
                color: "#00b894",
                fontSize: 14,
                lineHeight: "20px",
                flexShrink: 0,
              }}
            >
              ▸
            </span>
            <p
              style={{
                fontFamily: "sans-serif",
                fontSize: 13,
                lineHeight: 1.65,
                color: "#aaa",
                margin: 0,
              }}
            >
              {h}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Timeline() {
  const isMobile = useIsMobile();
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const activeYearSet = useMemo(() => {
    const s = new Set<number>();
    TIMELINE.forEach((e) => {
      for (let y = e.startYear; y <= e.endYear; y++) s.add(y);
    });
    return s;
  }, []);

  const isMatch = (e: TimelineEntry) =>
    selectedYear !== null &&
    e.startYear <= selectedYear &&
    selectedYear <= e.endYear;

  const hasFocus = selectedYear !== null;
  const visibleCount = hasFocus
    ? TIMELINE.filter(isMatch).length
    : TIMELINE.length;

  // Indice dell'anno hoverato lungo la strip — usato per posizionare la knob
  // (indicatore mint che scorre come lo slider di un range input).
  const knobIndex =
    hasFocus && selectedYear !== null
      ? TIMELINE_YEARS.indexOf(selectedYear)
      : -1;

  return (
    <div>
      {/* ── Meta banner con slider anni ── */}
      <div
        style={{
          background: "rgba(0,184,148,0.04)",
          border: "1px solid #333",
          borderRadius: 12,
          padding: "18px 22px",
          marginBottom: 22,
        }}
      >
        {/* Riga superiore: label + counter */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 10,
              letterSpacing: 2,
              color: "#888",
              textTransform: "uppercase",
            }}
          >
            Career · {TIMELINE_YEARS[0]} → Now
            {hasFocus && (
              <span style={{ color: "#00d4aa", marginLeft: 10 }}>
                · YEAR {selectedYear}
              </span>
            )}
          </span>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 10,
              color: "#555",
              letterSpacing: 1.5,
            }}
          >
            {visibleCount} / {TIMELINE.length} ENTRIES
          </span>
        </div>

        {/* Slider strip — hover per scorrere, mouseLeave per reset */}
        <div
          onMouseLeave={() => setSelectedYear(null)}
          style={{
            position: "relative",
            borderTop: "1px dashed #333",
            paddingTop: 14,
          }}
        >
          {/* Track linea di base */}
          <div
            style={{
              position: "absolute",
              top: 30,
              left: 12,
              right: 12,
              height: 2,
              background: "#333",
              borderRadius: 1,
            }}
          />

          {/* Knob mint che segue l'anno hoverato */}
          {knobIndex >= 0 && (
            <div
              style={{
                position: "absolute",
                top: 25,
                left: `calc(${(knobIndex + 0.5) * (100 / TIMELINE_YEARS.length)}% )`,
                transform: "translateX(-50%)",
                width: 12,
                height: 12,
                background: "#00b894",
                borderRadius: "50%",
                boxShadow: "0 0 12px rgba(0,184,148,0.7)",
                transition: "left 0.35s cubic-bezier(.2,.7,.2,1)",
                zIndex: 3,
              }}
            />
          )}

          {/* Anni cliccabili + hoverabili */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${TIMELINE_YEARS.length}, 1fr)`,
              gap: 4,
              position: "relative",
              zIndex: 2,
              paddingTop: 14,
            }}
          >
            {TIMELINE_YEARS.map((y) => {
              const isActive = activeYearSet.has(y);
              const isSelected = selectedYear === y;
              return (
                <button
                  key={y}
                  onMouseEnter={() => isActive && setSelectedYear(y)}
                  onClick={() => isActive && setSelectedYear(y)}
                  disabled={!isActive}
                  style={{
                    fontFamily: "monospace",
                    fontSize: isMobile ? 9 : 10,
                    padding: "6px 0",
                    borderRadius: 4,
                    cursor: isActive ? "pointer" : "not-allowed",
                    background: "transparent",
                    color: isSelected
                      ? "#00d4aa"
                      : isActive
                        ? "#aaa"
                        : "#444",
                    border: "none",
                    fontWeight: isSelected ? 600 : 400,
                    letterSpacing: 0.5,
                    transition: "color 0.2s",
                  }}
                >
                  {y}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Entries — la card focus va in cima via flex `order` ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        {TIMELINE.map((entry) => {
          const match = isMatch(entry);
          const dimmed = hasFocus && !match;
          return (
            <div
              key={entry.id}
              style={{
                order: match ? -1 : 0,
                opacity: dimmed ? 0.15 : 1,
                transform: match
                  ? "scale(1.015) translateY(-2px)"
                  : "scale(1)",
                filter: dimmed ? "grayscale(0.6)" : "none",
                pointerEvents: dimmed ? "none" : "auto",
                zIndex: match ? 3 : 1,
                boxShadow: match
                  ? "0 20px 60px rgba(0,184,148,0.10), 0 8px 24px rgba(0,0,0,0.35)"
                  : "none",
                borderRadius: 14,
                transition:
                  "opacity 0.4s cubic-bezier(.4,0,.2,1), transform 0.4s cubic-bezier(.4,0,.2,1), filter 0.4s ease, box-shadow 0.4s ease",
              }}
            >
              <EntryCard entry={entry} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Timeline;
