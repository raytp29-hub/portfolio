type Link = {
  icon: string;
  label: string;
  url: string;
};

type AboutProps = {
  paragraphs: string[];
  links: Link[];
};

function About({ paragraphs, links }: AboutProps) {
  return (
    <div>
      {paragraphs.map((text, i) => (
        <p
          key={i}
          style={{
            fontSize: 15,
            lineHeight: 1.9,
            color: "#888",
            marginBottom: 18,
          }}
        >
          {text}
        </p>
      ))}

      <div
        style={{
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
          marginTop: 40,
        }}
      >
        {links.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "monospace",
              fontSize: 11,
              color: "#aaa",
              textDecoration: "none",
              padding: "10px 20px",
              border: "1px solid #333",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              gap: 8,
              transition: "all 0.3s",
            }}
          >
            <span style={{ color: "#00b894" }}>{link.icon}</span>
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default About;
