type NavBarProps = {
  sections: string[];
  active: string;
  onSelect: (section: string) => void;
};

function NavBar({ sections, active, onSelect }: NavBarProps) {
  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "18px 48px",
      background: "rgba(33,33,33,0.97)",
      backdropFilter: "blur(16px)",
      zIndex: 100,
    }}>
      <span
        onClick={() => onSelect("home")}
        style={{
          fontFamily: "serif",
          fontSize: 24,
          color: "#e8e8e8",
          fontStyle: "italic",
          cursor: "pointer",
        }}
      >
        B.
      </span>

      <div style={{ display: "flex", gap: 28 }}>
        {sections.map((section) => (
          <span
            key={section}
            onClick={() => onSelect(section)}
            style={{
              fontFamily: "monospace",
              fontSize: 11,
              letterSpacing: 2.5,
              textTransform: "uppercase",
              color: active === section ? "#00b894" : "#777",
              cursor: "pointer",
              borderBottom: active === section
                ? "1.5px solid #00b894"
                : "1.5px solid transparent",
              paddingBottom: 8,
              transition: "all 0.3s",
            }}
          >
            {section}
          </span>
        ))}
      </div>
    </nav>
  );
}

export default NavBar;