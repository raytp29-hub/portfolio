
type FooterProps = {
  name: string;
  year: number;
};

function Footer({ name, year }: FooterProps) {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "28px 48px",
        borderTop: "1px solid #333",
        fontFamily: "monospace",
        fontSize: 10,
        color: "#555",
        letterSpacing: 1,
      }}
    >
      © {year} {name} — Built with curiosity
    </footer>
  );
}

export default Footer;
