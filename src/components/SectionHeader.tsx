type SectionHeaderProps = {
  /** Numero sezione ("01", "02", "03", …). Renderizzato come chip mint. */
  id: string;
  /** Titolo della sezione. Renderizzato come h2 serif grande. */
  title: string;
  /** Percorso fittizio a destra ("// PROJECTS.JSON", "// SKILLS.YML"). Opzionale. */
  filename?: string;
};

function SectionHeader({ id, title, filename }: SectionHeaderProps) {
  return (
    <div style={{ marginBottom: 48 }}>
      {/* Riga alta: chip ID + filename a destra */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <span
          style={{
            fontFamily: "monospace",
            fontSize: 11,
            letterSpacing: 1.5,
            color: "#00b894",
            padding: "3px 10px",
            border: "1px solid rgba(0,184,148,0.35)",
            borderRadius: 4,
            background: "rgba(0,184,148,0.06)",
            fontWeight: 600,
          }}
        >
          {id}
        </span>
        {filename && (
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 11,
              letterSpacing: 1,
              color: "#555",
            }}
          >
            {filename}
          </span>
        )}
      </div>
      {/* Titolo grande */}
      <h2
        style={{
          fontFamily: "serif",
          fontSize: 38,
          color: "#e8e8e8",
          fontWeight: 400,
          lineHeight: 1.1,
        }}
      >
        {title}
      </h2>
    </div>
  );
}

export default SectionHeader;
