import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div style={{
      background: "#212121", minHeight: "100vh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      color: "#ccc", fontFamily: "sans-serif",
    }}>
      <h1 style={{
        fontFamily: "monospace", fontSize: 120,
        color: "#333", fontWeight: 600, lineHeight: 1,
      }}>
        404
      </h1>
      <p style={{ fontFamily: "monospace", fontSize: 14, color: "#888", marginBottom: 32 }}>
        Page not found
      </p>
      <button
        onClick={() => navigate("/")}
        style={{
          fontFamily: "monospace", fontSize: 11, letterSpacing: 1.5,
          textTransform: "uppercase", padding: "13px 30px",
          background: "#00b894", color: "#1a1a1a", fontWeight: 600,
          border: "none", borderRadius: 6, cursor: "pointer",
        }}
      >
        Back to Home
      </button>
    </div>
  );
}

export default NotFound;