type SectionHeaderProps = {
  label: string;
  title: string;
  color?: string;
};

function SectionHeader({ label, title, color = "#6c5ce7" }: SectionHeaderProps) {
  return (
    <div style={{ marginBottom: 48 }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 14,
      }}>
        <div style={{ height: 1, width: 28, background: color }} />
        <p style={{
          fontFamily: "monospace",
          fontSize: 10,
          letterSpacing: 3,
          textTransform: "uppercase",
          color: color,
        }}>
          {label}
        </p>
      </div>
      <h2 style={{
        fontFamily: "serif",
        fontSize: 38,
        color: "#e8e8e8",
        fontWeight: 400,
      }}>
        {title}
      </h2>
    </div>
  );
}

export default SectionHeader;