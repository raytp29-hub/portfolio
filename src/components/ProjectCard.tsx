import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { type Project } from "../data/projects";

type ProjectCardProps = {
  project: Project;
};

function ProjectCard({ project }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [currentShot, setCurrentShot] = useState(0);
  const hasScreenshots =
    !!project.screenshots && project.screenshots.length > 0;

  // Auto-cycle screenshots
  useEffect(() => {
    if (!hasScreenshots || !project.screenshots) return;
    if (project.screenshots.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentShot((prev) => (prev + 1) % project.screenshots!.length);
    }, 3000); // cambia ogni 3 secondi

    return () => clearInterval(interval);
  }, [hasScreenshots, project.screenshots]);

  return (
    <>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "grid",
          gridTemplateColumns: hasScreenshots ? "2fr 1fr" : "1fr",
          background: hovered ? "#2e2e2e" : "#2a2a2a",
          border: `1px solid ${hovered ? "#444" : "#333"}`,
          borderRadius: 14,
          overflow: "hidden",
          transition: "all 0.4s ease",
          transform: hovered ? "translateY(-3px)" : "translateY(0)",
          boxShadow: hovered ? "0 16px 50px rgba(0,0,0,0.35)" : "none",
          minHeight: 280,
        }}
      >
        {/* Left 2/3 — content */}
        <div
          style={{
            padding: "32px 36px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Tags */}
          <div
            style={{
              display: "flex",
              gap: 7,
              flexWrap: "wrap",
              marginBottom: 16,
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
              fontSize: 24,
              color: "#e8e8e8",
              margin: "0 0 12px",
              fontWeight: 400,
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

          {/* Results */}
          <div style={{ marginBottom: 24 }}>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 10,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                color: "#6c5ce7",
                marginBottom: 10,
                display: "block",
              }}
            >
              Key Results
            </span>
            {project.results.map((result, i) => (
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
                    lineHeight: 1.6,
                    color: "#aaa",
                    margin: 0,
                  }}
                >
                  {result}
                </p>
              </div>
            ))}
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: 12, marginTop: "auto" }}>
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
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
                onClick={() => setShowDemo(true)}
                style={{
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

        {/* Right 1/3 — screenshots */}
        {hasScreenshots && project.screenshots && (
          <div
            style={{
              position: "relative",
              background: "#1e1e1e",
              borderLeft: "1px solid #333",
              overflow: "hidden",
            }}
          >
            {/* Screenshots */}
            {project.screenshots.map((src, i) => (
              <div
                key={src}
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: i === currentShot ? 1 : 0,
                  transition: "opacity 0.8s ease",
                  zIndex: 2,
                }}
              >
                <img
                  src={src}
                  alt={`${project.title} screenshot ${i + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
            ))}

            {/* Placeholder — dietro le immagini, visibile solo se non caricano */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                zIndex: 1,
              }}
            >
              <span
                style={{ fontFamily: "monospace", fontSize: 24, color: "#333" }}
              >
                📸
              </span>
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 10,
                  color: "#444",
                  letterSpacing: 1,
                }}
              >
                SCREENSHOTS
              </span>
            </div>

            {/* Dots */}
            {project.screenshots.length > 1 && (
              <div
                style={{
                  position: "absolute",
                  bottom: 12,
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  gap: 6,
                  zIndex: 10,
                }}
              >
                {project.screenshots.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentShot(i)}
                    style={{
                      width: i === currentShot ? 16 : 6,
                      height: 6,
                      borderRadius: 3,
                      background: i === currentShot ? "#00b894" : "#444",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.3s",
                      padding: 0,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Demo Modal */}
      {showDemo && project.demoUrl && createPortal(
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
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "#ff5f57",
                  }}
                />
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "#febc2e",
                  }}
                />
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "#28c840",
                  }}
                />
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
              style={{
                flex: 1,
                width: "100%",
                border: "none",
                background: "#fff",
              }}
              title={`${project.title} demo`}
            />
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

export default ProjectCard;
