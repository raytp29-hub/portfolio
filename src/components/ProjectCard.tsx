import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { type Project } from "../data/projects";

type ProjectCardProps = {
  project: Project;
};

/** Altezza dell'area screenshot quando espansa (px). */
const SHOT_HEIGHT = 240;

function ProjectCard({ project }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [currentShot, setCurrentShot] = useState(0);

  const hasScreenshots =
    !!project.screenshots && project.screenshots.length > 0;
  const hasHeroImage = !!project.heroImage;
  const useHeroReveal = hasHeroImage || project.heroReveal === true;
  const hasKpis = !!project.kpis && project.kpis.length > 0;
  const hasResults = !!project.results && project.results.length > 0;

  // Ciclo automatico screenshots solo durante hover (per card con heroReveal).
  useEffect(() => {
    if (!hasScreenshots || !project.screenshots) return;
    if (project.screenshots.length <= 1) return;
    if (!useHeroReveal || !hovered) return;

    const interval = setInterval(() => {
      setCurrentShot((prev) => (prev + 1) % project.screenshots!.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [hasScreenshots, project.screenshots, useHeroReveal, hovered]);

  const cardClickable = useHeroReveal && (hasHeroImage || hasScreenshots);
  const handleCardClick = () => {
    if (!cardClickable) return;
    setShowGallery(true);
  };

  return (
    <>
      <article
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleCardClick}
        style={{
          position: "relative",
          background: hovered ? "#2e2e2e" : "#2a2a2a",
          border: `1px solid ${hovered ? "#444" : "#333"}`,
          borderRadius: 14,
          overflow: "hidden",
          transition:
            "background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s ease",
          transform: hovered ? "translateY(-3px)" : "translateY(0)",
          boxShadow: hovered ? "0 16px 50px rgba(0,0,0,0.35)" : "none",
          cursor: cardClickable ? "pointer" : "default",
        }}
      >
        {/* ─── SHOT AREA (top, espandibile) — solo per card con heroReveal ─── */}
        {useHeroReveal && (
          <div
            style={{
              position: "relative",
              width: "100%",
              height: hovered ? SHOT_HEIGHT : 0,
              overflow: "hidden",
              transition: "height 0.6s cubic-bezier(.2,.9,.25,1)",
              background: "#1e1e1e",
            }}
          >
            {/* Screenshots ciclati (Comp Intel, Big Ambitions) */}
            {hasScreenshots &&
              project.screenshots &&
              project.screenshots.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "right center",
                    opacity: hovered && i === currentShot ? 1 : 0,
                    transition: "opacity 0.6s ease",
                  }}
                />
              ))}

            {/* Hero image singola (Palio) */}
            {!hasScreenshots && hasHeroImage && project.heroImage && (
              <img
                src={project.heroImage.src}
                alt=""
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center center",
                  opacity: hovered ? 1 : 0,
                  transition: "opacity 0.6s ease",
                }}
              />
            )}

            {/* KPI strip overlay — gradient dark → transparent verso l'alto */}
            {hasKpis && project.kpis && (
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  padding: "40px 28px 20px",
                  display: "flex",
                  gap: 28,
                  flexWrap: "wrap",
                  background:
                    "linear-gradient(to top, rgba(15,15,15,0.96) 0%, rgba(15,15,15,0.60) 55%, rgba(15,15,15,0) 100%)",
                  transform: hovered ? "translateY(0)" : "translateY(24px)",
                  opacity: hovered ? 1 : 0,
                  transition:
                    "transform 0.55s cubic-bezier(.2,.9,.25,1) 0.2s, opacity 0.45s ease 0.2s",
                  pointerEvents: "none",
                }}
              >
                {project.kpis.map((kpi) => (
                  <div
                    key={kpi.label}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: 9,
                        letterSpacing: 1.5,
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.55)",
                        fontWeight: 600,
                      }}
                    >
                      {kpi.label}
                    </span>
                    <span
                      style={{
                        fontFamily: "serif",
                        fontSize: 24,
                        color: "#f2f2f2",
                        fontWeight: 400,
                        lineHeight: 1.05,
                      }}
                    >
                      {kpi.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Dots per screenshots multipli — in alto a sinistra */}
            {hasScreenshots &&
              project.screenshots &&
              project.screenshots.length > 1 && (
                <div
                  style={{
                    position: "absolute",
                    top: 16,
                    left: 22,
                    display: "flex",
                    gap: 5,
                    opacity: hovered ? 1 : 0,
                    transition: "opacity 0.5s ease 0.3s",
                    zIndex: 3,
                    pointerEvents: "none",
                  }}
                >
                  {project.screenshots.map((_, i) => (
                    <div
                      key={i}
                      style={{
                        width: i === currentShot ? 14 : 5,
                        height: 5,
                        borderRadius: 3,
                        background:
                          i === currentShot
                            ? "#00b894"
                            : "rgba(255,255,255,0.35)",
                        transition: "width 0.3s",
                      }}
                    />
                  ))}
                </div>
              )}

            {/* VIEW ↗ hint — in alto a destra */}
            <span
              style={{
                position: "absolute",
                top: 14,
                right: 22,
                fontFamily: "monospace",
                fontSize: 10,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "#00b894",
                padding: "5px 12px",
                borderRadius: 4,
                background: "rgba(0,184,148,0.10)",
                border: "1px solid rgba(0,184,148,0.35)",
                opacity: hovered ? 1 : 0,
                transform: hovered ? "translateY(0)" : "translateY(-8px)",
                transition:
                  "opacity 0.4s ease 0.25s, transform 0.4s ease 0.25s",
                pointerEvents: "none",
                zIndex: 3,
              }}
            >
              View ↗
            </span>
          </div>
        )}

        {/* ─── BODY — sempre visibile ─── */}
        <div
          style={{
            padding: "28px 34px 30px",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Header: ID chip + year */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 18,
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
              {project.id}
            </span>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 11,
                color: "#666",
                letterSpacing: 0.5,
              }}
            >
              {project.year}
            </span>
          </div>

          {/* Tags */}
          <div
            style={{
              display: "flex",
              gap: 7,
              flexWrap: "wrap",
              marginBottom: 14,
            }}
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "monospace",
                  fontSize: 10,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  color: "#00b894",
                  background: "rgba(0,184,148,0.08)",
                  padding: "3px 10px",
                  borderRadius: 20,
                  border: "1px solid rgba(0,184,148,0.15)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3
            style={{
              fontFamily: "serif",
              fontSize: 26,
              color: "#e8e8e8",
              margin: "0 0 12px",
              fontWeight: 400,
              lineHeight: 1.15,
            }}
          >
            {project.title}
          </h3>

          {/* Context */}
          <p
            style={{
              fontFamily: "sans-serif",
              fontSize: 14,
              lineHeight: 1.75,
              color: "#999",
              margin: "0 0 20px",
            }}
          >
            {project.context}
          </p>

          {/* Results bullets (Catania) */}
          {hasResults && project.results && (
            <div style={{ marginBottom: 24 }}>
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 10,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  color: "#00b894",
                  marginBottom: 12,
                  display: "block",
                }}
              >
                Key Results
              </span>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {project.results.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "flex-start",
                      fontFamily: "sans-serif",
                      fontSize: 13,
                      lineHeight: 1.6,
                      color: "#aaa",
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
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* KPI grid in body — SOLO per card classiche (senza heroReveal) */}
          {!useHeroReveal && hasKpis && project.kpis && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 10,
                marginBottom: 24,
                padding: "16px 4px 4px",
                borderTop: "1px dashed #3a3a3a",
              }}
            >
              {project.kpis.map((kpi) => (
                <div
                  key={kpi.label}
                  style={{ display: "flex", flexDirection: "column", gap: 4 }}
                >
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: 9,
                      letterSpacing: 1.5,
                      textTransform: "uppercase",
                      color: "#666",
                    }}
                  >
                    {kpi.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "serif",
                      fontSize: 22,
                      color: "#e8e8e8",
                      fontWeight: 400,
                      lineHeight: 1.1,
                    }}
                  >
                    {kpi.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Actions — sempre visibili, z-index alto, stopPropagation */}
          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: "auto",
              position: "relative",
              zIndex: 10,
            }}
          >
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  fontFamily: "monospace",
                  fontSize: 11,
                  color: "#888",
                  textDecoration: "none",
                  padding: "7px 16px",
                  border: "1px solid #444",
                  borderRadius: 6,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  transition: "all 0.3s",
                }}
              >
                <span style={{ color: "#00b894" }}>↗</span> GitHub
              </a>
            )}
            {project.demoUrl && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDemo(true);
                }}
                style={{
                  textAlign: "center",
                  fontFamily: "monospace",
                  fontSize: 11,
                  color: "#1a1a1a",
                  padding: "7px 16px",
                  background: "#00b894",
                  borderRadius: 6,
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Live Demo →
              </button>
            )}
          </div>
        </div>
      </article>

      {/* ─── Gallery Modal ─── */}
      {showGallery &&
        (hasScreenshots || hasHeroImage) &&
        (() => {
          const images: string[] = hasScreenshots
            ? project.screenshots!
            : project.heroImage
              ? [project.heroImage.src]
              : [];
          const canPage = images.length > 1;
          const goPrev = () =>
            setCurrentShot((prev) => (prev - 1 + images.length) % images.length);
          const goNext = () =>
            setCurrentShot((prev) => (prev + 1) % images.length);

          return createPortal(
            <div
              onClick={() => setShowGallery(false)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 9999,
                background: "rgba(0,0,0,0.9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 24,
                backdropFilter: "blur(10px)",
              }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowGallery(false);
                }}
                style={{
                  position: "absolute",
                  top: 20,
                  right: 24,
                  background: "rgba(255,255,255,0.06)",
                  color: "#ccc",
                  border: "1px solid #444",
                  borderRadius: 8,
                  width: 40,
                  height: 40,
                  cursor: "pointer",
                  fontFamily: "monospace",
                  fontSize: 20,
                  lineHeight: 1,
                }}
              >
                ×
              </button>
              <div
                style={{
                  position: "absolute",
                  top: 24,
                  left: 24,
                  right: 76,
                  fontFamily: "monospace",
                  fontSize: 11,
                  color: "#888",
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {project.title}
                {canPage && (
                  <span style={{ color: "#00b894", marginLeft: 12 }}>
                    {currentShot + 1} / {images.length}
                  </span>
                )}
              </div>
              {canPage && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrev();
                  }}
                  style={{
                    position: "absolute",
                    left: 24,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "rgba(255,255,255,0.06)",
                    color: "#ccc",
                    border: "1px solid #444",
                    borderRadius: 8,
                    width: 44,
                    height: 44,
                    cursor: "pointer",
                    fontFamily: "monospace",
                    fontSize: 18,
                  }}
                >
                  ‹
                </button>
              )}
              <img
                src={images[currentShot]}
                alt={`${project.title} — ${currentShot + 1}`}
                onClick={(e) => e.stopPropagation()}
                style={{
                  maxWidth: "min(1200px, 92vw)",
                  maxHeight: "85vh",
                  objectFit: "contain",
                  borderRadius: 8,
                  boxShadow: "0 40px 100px rgba(0,0,0,0.7)",
                }}
              />
              {canPage && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                  style={{
                    position: "absolute",
                    right: 24,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "rgba(255,255,255,0.06)",
                    color: "#ccc",
                    border: "1px solid #444",
                    borderRadius: 8,
                    width: 44,
                    height: 44,
                    cursor: "pointer",
                    fontFamily: "monospace",
                    fontSize: 18,
                  }}
                >
                  ›
                </button>
              )}
              {canPage && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 26,
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    gap: 8,
                  }}
                >
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentShot(i);
                      }}
                      style={{
                        width: i === currentShot ? 22 : 8,
                        height: 8,
                        borderRadius: 4,
                        background: i === currentShot ? "#00b894" : "#444",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        transition: "width 0.3s",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>,
            document.body,
          );
        })()}

      {/* ─── Live Demo Modal (iframe) ─── */}
      {showDemo &&
        project.demoUrl &&
        createPortal(
          <div
            onClick={() => setShowDemo(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              background: "rgba(0,0,0,0.85)",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              padding: "24px 0",
              overflowY: "auto",
              backdropFilter: "blur(8px)",
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "90vw",
                height: "85vh",
                background: "#1a1a1a",
                borderRadius: 14,
                overflow: "hidden",
                border: "1px solid #333",
                boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 20px",
                  background: "#222",
                  borderBottom: "1px solid #333",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: 12,
                      color: "#888",
                      marginLeft: 10,
                    }}
                  >
                    {project.title} — Live Demo
                  </span>
                </div>
                <button
                  onClick={() => setShowDemo(false)}
                  style={{
                    fontFamily: "monospace",
                    fontSize: 18,
                    color: "#666",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "0 8px",
                  }}
                >
                  ×
                </button>
              </div>
              <iframe
                src={project.demoUrl}
                style={{ flex: 1, width: "100%", border: "none", background: "#fff" }}
                title={`${project.title} demo`}
              />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

export default ProjectCard;
