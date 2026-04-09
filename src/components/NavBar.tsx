import { useState } from "react";
import { CONTACT_LINKS } from "../data/about";
import useIsMobile from "../hooks/useIsMobile";

type NavBarProps = {
  sections: string[];
  active: string;
  onSelect: (section: string) => void;
};

function NavBar({ sections, active, onSelect }: NavBarProps) {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav style={{
        position: "sticky", top: 0, left: 0, right: 0,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: isMobile ? "14px 20px" : "18px 48px",
        background: "rgba(33,33,33,0.97)",
        backdropFilter: "blur(16px)",
        zIndex: 100,
      }}>
        <span
          onClick={() => onSelect("home")}
          style={{
            fontFamily: "'Instrument Serif', serif", fontSize: 24,
            color: "#e8e8e8", fontStyle: "italic", cursor: "pointer",
          }}
        >
          B.
        </span>

        {/* Desktop nav */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            {sections.map((section) => (
              <span
                key={section}
                onClick={() => onSelect(section)}
                style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                  letterSpacing: 2.5, textTransform: "uppercase",
                  color: active === section ? "#00b894" : "#777",
                  cursor: "pointer",
                  borderBottom: active === section ? "1.5px solid #00b894" : "1.5px solid transparent",
                  paddingBottom: 8, transition: "all 0.3s",
                }}
              >
                {section}
              </span>
            ))}

            <div style={{ width: 1, height: 16, background: "#444" }} />

            {CONTACT_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target={link.url.startsWith("mailto") ? "_self" : "_blank"}
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
                  color: "#777", textDecoration: "none", transition: "color 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#00b894")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#777")}
              >
                {link.icon}
              </a>
            ))}
          </div>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              display: "flex", flexDirection: "column", gap: 5, padding: 4,
            }}
          >
            <div style={{
              width: 22, height: 2, background: menuOpen ? "#00b894" : "#ccc",
              transition: "all 0.3s",
              transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none",
            }} />
            <div style={{
              width: 22, height: 2, background: "#ccc",
              opacity: menuOpen ? 0 : 1, transition: "opacity 0.3s",
            }} />
            <div style={{
              width: 22, height: 2, background: menuOpen ? "#00b894" : "#ccc",
              transition: "all 0.3s",
              transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none",
            }} />
          </button>
        )}
      </nav>

      {/* Mobile menu overlay */}
      {isMobile && menuOpen && (
        <div style={{
          position: "sticky",
          top: 50,
          left: 0,
          right: 0,
          background: "rgba(33,33,33,0.98)",
          backdropFilter: "blur(20px)",
          zIndex: 99,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "24px 20px",
          gap: 20,
          borderBottom: "1px solid #333",
        }}>
          {sections.map((section) => (
            <span
              key={section}
              onClick={() => { onSelect(section); setMenuOpen(false); }}
              style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 13,
                letterSpacing: 3, textTransform: "uppercase",
                color: active === section ? "#00b894" : "#888",
                cursor: "pointer", transition: "color 0.3s",
              }}
            >
              {section}
            </span>
          ))}

          <div style={{ width: 40, height: 1, background: "#444" }} />

          <div style={{ display: "flex", gap: 24 }}>
            {CONTACT_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target={link.url.startsWith("mailto") ? "_self" : "_blank"}
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 16,
                  color: "#888", textDecoration: "none",
                }}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default NavBar;