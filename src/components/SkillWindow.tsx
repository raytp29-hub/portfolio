import { type SkillWindow as SkillWindowType } from "../data/skills";

type SkillWindowProps = {
  type: SkillWindowType;
};

const windowBase: React.CSSProperties = {
  background: "#1e1e1e",
  border: "1px solid #333",
  borderRadius: 12,
  overflow: "hidden",
  height: "100%",
  minHeight: 320,
  display: "flex",
  flexDirection: "column",
};

const titleBar: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "10px 14px",
  background: "#252525",
  borderBottom: "1px solid #333",
};

const dot = (color: string): React.CSSProperties => ({
  width: 10, height: 10, borderRadius: "50%", background: color,
});

function TitleBar({ title, icon }: { title: string; icon?: string }) {
  return (
    <div style={titleBar}>
      <div style={dot("#ff5f57")} />
      <div style={dot("#febc2e")} />
      <div style={dot("#28c840")} />
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11, color: "#666", marginLeft: 8,
      }}>
        {icon && `${icon} `}{title}
      </span>
    </div>
  );
}

// Syntax colors
const kw = "#6c5ce7";   // keywords
const str = "#00b894";  // strings
const num = "#fd79a8";  // numbers
const cm = "#555";      // comments
const tx = "#ccc";      // text


const code: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 11,
  lineHeight: 1.8,
  padding: "14px 18px",
  flex: 1,
};

// ── Python Terminal ──────────────────────────────────
function PythonWindow() {
  return (
    <div style={windowBase}>
      <TitleBar title="python3 — skills.py" icon="🐍" />
      <div style={code}>
        <div><span style={{ color: cm }}># biagio_spada/skills.py</span></div>
        <div style={{ height: 6 }} />
        <div>
          <span style={{ color: tx }}>data_manipulation </span>
          <span style={{ color: tx }}>= </span>
          <span style={{ color: tx }}>{"{"}</span>
        </div>
        <div style={{ paddingLeft: 16 }}>
          <span style={{ color: str }}>"Pandas"</span><span style={{ color: tx }}>: </span><span style={{ color: str }}>"core"</span><span style={{ color: tx }}>,</span>
        </div>
        <div style={{ paddingLeft: 16 }}>
          <span style={{ color: str }}>"NumPy"</span><span style={{ color: tx }}>: </span><span style={{ color: str }}>"core"</span><span style={{ color: tx }}>,</span>
        </div>
        <div style={{ paddingLeft: 16 }}>
          <span style={{ color: str }}>"Polars"</span><span style={{ color: tx }}>: </span><span style={{ color: str }}>"familiar"</span><span style={{ color: tx }}>,</span>
        </div>
        <div><span style={{ color: tx }}>{"}"}</span></div>
        <div style={{ height: 6 }} />
        <div>
          <span style={{ color: tx }}>visualization </span>
          <span style={{ color: tx }}>= [</span>
          <span style={{ color: str }}>"Matplotlib"</span><span style={{ color: tx }}>, </span>
          <span style={{ color: str }}>"Plotly"</span><span style={{ color: tx }}>, </span>
          <span style={{ color: str }}>"Seaborn"</span>
          <span style={{ color: tx }}>]</span>
        </div>
        <div style={{ height: 6 }} />
        <div>
          <span style={{ color: tx }}>optimization </span>
          <span style={{ color: tx }}>= [</span>
          <span style={{ color: str }}>"PuLP"</span><span style={{ color: tx }}>, </span>
          <span style={{ color: str }}>"SciPy"</span><span style={{ color: tx }}>, </span>
          <span style={{ color: str }}>"Scikit-learn"</span>
          <span style={{ color: tx }}>]</span>
        </div>
        <div style={{ height: 6 }} />
        <div>
          <span style={{ color: tx }}>web </span>
          <span style={{ color: tx }}>= {"{"}</span>
        </div>
        <div style={{ paddingLeft: 16 }}>
          <span style={{ color: str }}>"Streamlit"</span><span style={{ color: tx }}>: </span><span style={{ color: str }}>"core"</span><span style={{ color: tx }}>,</span>
        </div>
        <div style={{ paddingLeft: 16 }}>
          <span style={{ color: str }}>"FastAPI"</span><span style={{ color: tx }}>: </span><span style={{ color: str }}>"familiar"</span><span style={{ color: tx }}>,</span>
        </div>
        <div style={{ paddingLeft: 16 }}>
          <span style={{ color: str }}>"BeautifulSoup"</span><span style={{ color: tx }}>: </span><span style={{ color: str }}>"proficient"</span><span style={{ color: tx }}>,</span>
        </div>
        <div style={{ paddingLeft: 16 }}>
          <span style={{ color: str }}>"Requests"</span><span style={{ color: tx }}>: </span><span style={{ color: str }}>"proficient"</span><span style={{ color: tx }}>,</span>
        </div>
        <div><span style={{ color: tx }}>{"}"}</span></div>
      </div>
    </div>
  );
}

// ── Data Analysis Dashboard ──────────────────────────
function DataWindow() {
  const kpis = [
    { label: "Methods", value: "12+", sub: "analysis techniques" },
    { label: "BI Tools", value: "3", sub: "platforms" },
    { label: "Years", value: "7", sub: "experience" },
  ];

  const skills = [
    { name: "P&L Analysis", pct: 95 },
    { name: "Cost Allocation (ABC)", pct: 90 },
    { name: "Forecasting", pct: 78 },
    { name: "Dashboard Design", pct: 85 },
    { name: "ETL Pipelines", pct: 75 },
    { name: "Data Cleaning", pct: 92 },
    { name: "KPI Definition", pct: 88 },
    { name: "Data Storytelling", pct: 80 },
    { name: "Power BI", pct: 72 },
    { name: "A/B Testing", pct: 55 },
  ];

  return (
    <div style={windowBase}>
      <TitleBar title="dashboard — competencies" icon="📊" />
      <div style={{ padding: 14, flex: 1 }}>
        {/* KPI cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
          {kpis.map((k) => (
            <div key={k.label} style={{
              background: "#252525", borderRadius: 8, padding: "12px 10px",
              border: "1px solid #333", textAlign: "center",
            }}>
              <div style={{ fontFamily: "monospace", fontSize: 18, color: "#00b894", fontWeight: 600 }}>{k.value}</div>
              <div style={{ fontFamily: "monospace", fontSize: 8, color: "#666", letterSpacing: 1, textTransform: "uppercase", marginTop: 2 }}>{k.sub}</div>
            </div>
          ))}
        </div>
        {/* Horizontal bar chart */}
        {skills.map((s) => (
          <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "#888",
              width: 130, textAlign: "right", flexShrink: 0,
            }}>{s.name}</span>
            <div style={{ flex: 1, height: 4, background: "#2a2a2a", borderRadius: 2, overflow: "hidden" }}>
              <div style={{
                height: "100%", width: `${s.pct}%`, borderRadius: 2,
                background: s.pct >= 85 ? "#00b894" : s.pct >= 70 ? "#6c5ce7" : "#0984e3",
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Excel / VBA ──────────────────────────────────────
function ExcelWindow() {
  const cells = [
    ["", "A", "B", "C"],
    ["1", "Skill", "Category", "Level"],
    ["2", "VLOOKUP / XLOOKUP", "Formulas", "★★★"],
    ["3", "INDEX / MATCH", "Formulas", "★★★"],
    ["4", "Pivot Tables", "Data Tools", "★★★"],
    ["5", "Power Query", "Data Tools", "★★☆"],
    ["6", "Macros & VBA", "Automation", "★★★"],
    ["7", "Array Formulas", "Advanced", "★★☆"],
  ];

  return (
    <div style={windowBase}>
      <TitleBar title="skills_matrix.xlsm" icon="📗" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Spreadsheet */}
        <div style={{ padding: "8px 10px", flex: 1 }}>
          <table style={{
            width: "100%", borderCollapse: "collapse",
            fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
          }}>
            <tbody>
              {cells.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci} style={{
                      padding: "5px 8px",
                      border: "1px solid #2a2a2a",
                      background: ri === 0 || ci === 0 ? "#252525"
                        : ri === 1 ? "#1a2a1a"
                        : "#1e1e1e",
                      color: ri === 0 || ci === 0 ? "#666"
                        : cell.includes("★★★") ? "#00b894"
                        : cell.includes("★★☆") ? "#6c5ce7"
                        : "#aaa",
                      fontWeight: ri === 0 || ci === 0 || ri === 1 ? 600 : 400,
                      textAlign: ci === 0 || ri === 0 ? "center" : "left",
                      fontSize: ri === 0 || ci === 0 ? 9 : 10,
                    }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* VBA panel */}
        <div style={{
          borderTop: "1px solid #333", padding: "10px 14px", background: "#1a1a1a",
        }}>
          <div style={{ fontFamily: "monospace", fontSize: 9, color: "#555", marginBottom: 6, letterSpacing: 1 }}>VBA EDITOR</div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, lineHeight: 1.7 }}>
            <span style={{ color: kw }}>Sub</span><span style={{ color: tx }}> AutomateReport()</span><br />
            <span style={{ color: tx, paddingLeft: 12, display: "inline-block" }}>
              <span style={{ color: kw }}>Dim</span> ws <span style={{ color: kw }}>As</span> Worksheet
            </span><br />
            <span style={{ color: tx, paddingLeft: 12, display: "inline-block" }}>
              <span style={{ color: kw }}>For Each</span> ws <span style={{ color: kw }}>In</span> ThisWorkbook.Sheets
            </span><br />
            <span style={{ color: tx, paddingLeft: 24, display: "inline-block" }}>
              ws.PivotTables(<span style={{ color: num }}>1</span>).RefreshTable
            </span><br />
            <span style={{ color: kw, paddingLeft: 12, display: "inline-block" }}>Next</span><br />
            <span style={{ color: kw }}>End Sub</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SQL ──────────────────────────────────────────────
function SqlWindow() {
  return (
    <div style={windowBase}>
      <TitleBar title="query — skills.sql" icon="🗃️" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Query */}
        <div style={{ ...code, padding: "14px 16px" }}>
          <span style={{ color: kw }}>SELECT</span><span style={{ color: tx }}> skill_name,</span><br />
          <span style={{ color: tx, paddingLeft: 16, display: "inline-block" }}>category,</span><br />
          <span style={{ color: tx, paddingLeft: 16, display: "inline-block" }}>proficiency_level</span><br />
          <span style={{ color: kw }}>FROM</span><span style={{ color: tx }}> biagio.competencies</span><br />
          <span style={{ color: kw }}>WHERE</span><span style={{ color: tx }}> domain = </span><span style={{ color: str }}>'SQL'</span><br />
          <span style={{ color: kw }}>ORDER BY</span><span style={{ color: tx }}> proficiency_level </span><span style={{ color: kw }}>DESC</span><span style={{ color: tx }}>;</span>
        </div>
        {/* Result */}
        <div style={{ borderTop: "1px solid #333", padding: "10px 14px", flex: 1 }}>
          <div style={{ fontFamily: "monospace", fontSize: 9, color: str, marginBottom: 8 }}>
            ✓ 8 rows returned — 4ms
          </div>
          <table style={{
            width: "100%", borderCollapse: "collapse",
            fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
          }}>
            <thead>
              <tr>
                {["skill", "category", "level"].map((h) => (
                  <th key={h} style={{
                    padding: "4px 8px", borderBottom: "1px solid #333",
                    color: "#666", fontWeight: 500, textAlign: "left",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["JOINs (all types)", "Queries", "★★★"],
                ["GROUP BY / HAVING", "Queries", "★★★"],
                ["Window Functions", "Advanced", "★★☆"],
                ["CTEs", "Advanced", "★★☆"],
                ["Subqueries", "Queries", "★★☆"],
                ["PostgreSQL", "Platform", "★★☆"],
                ["SQLite", "Platform", "★★☆"],
                ["Indexes", "Design", "★☆☆"],
              ].map((row, i) => (
                <tr key={i}>
                  {row.map((cell, ci) => (
                    <td key={ci} style={{
                      padding: "3px 8px", borderBottom: "1px solid #2a2a2a",
                      color: cell.includes("★★★") ? "#00b894"
                        : cell.includes("★★☆") ? "#6c5ce7"
                        : cell.includes("★☆☆") ? "#fd79a8"
                        : "#999",
                    }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── Graphic Design ───────────────────────────────────
function DesignWindow() {
  const layers = [
    { name: "Brand Identity", vis: true, tag: "core" },
    { name: "Logo Design", vis: true, tag: "core" },
    { name: "Typography", vis: true, tag: "proficient" },
    { name: "Layout & Grids", vis: true, tag: "proficient" },
    { name: "Print Production", vis: true, tag: "core" },
    { name: "Color Theory", vis: true, tag: "proficient" },
  ];

  const tools = [
    { name: "CorelDRAW", level: "core" },
    { name: "Figma", level: "proficient" },
    { name: "Canva", level: "proficient" },
    { name: "Photoshop", level: "familiar" },
  ];

  return (
    <div style={windowBase}>
      <TitleBar title="design — toolkit" icon="🎨" />
      <div style={{ flex: 1, display: "flex" }}>
        {/* Main area — tools + skills as layers */}
        <div style={{ flex: 1, padding: "12px 16px", fontFamily: "'JetBrains Mono', monospace", fontSize: 10 }}>
          <div style={{ fontSize: 9, color: "#555", letterSpacing: 1, marginBottom: 10 }}>SOFTWARE</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
            {tools.map((t) => (
              <span key={t.name} style={{
                padding: "4px 10px", borderRadius: 6, fontSize: 10,
                background: t.level === "core" ? "rgba(0,184,148,0.1)" : "rgba(108,92,231,0.08)",
                color: t.level === "core" ? "#00b894" : t.level === "proficient" ? "#6c5ce7" : "#888",
                border: `1px solid ${t.level === "core" ? "rgba(0,184,148,0.2)" : "rgba(108,92,231,0.15)"}`,
              }}>
                {t.name}
              </span>
            ))}
          </div>
          <div style={{ fontSize: 9, color: "#555", letterSpacing: 1, marginBottom: 10 }}>DELIVERABLES</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["Design Systems", "Merchandise", "Social Media", "Presentations", "Print Materials"].map((d) => (
              <span key={d} style={{
                padding: "4px 10px", borderRadius: 6, fontSize: 10,
                background: "rgba(255,255,255,0.03)", color: "#aaa",
                border: "1px solid rgba(255,255,255,0.06)",
              }}>
                {d}
              </span>
            ))}
          </div>
        </div>
        {/* Right panel — Layers */}
        <div style={{
          width: 150, borderLeft: "1px solid #333", padding: "10px 10px",
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          <div style={{ fontSize: 9, color: "#555", letterSpacing: 1, marginBottom: 8 }}>LAYERS</div>
          {layers.map((l) => (
            <div key={l.name} style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "4px 0",
              color: l.tag === "core" ? "#00b894" : l.tag === "proficient" ? "#aaa" : "#666",
            }}>
              <span style={{ fontSize: 10 }}>👁</span>
              <span style={{ fontSize: 10 }}>{l.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Operations ───────────────────────────────────────
function OpsWindow() {
  const columns = [
    {
      title: "Core",
      color: "#00b894",
      items: ["Lean Management", "Process Mapping", "Cost Reduction", "Budget Planning", "Team Management"],
    },
    {
      title: "Proficient",
      color: "#6c5ce7",
      items: ["SOP Development", "Vendor Negotiation", "ISO 9001", "Stakeholder Reporting"],
    },
    {
      title: "Metrics",
      color: "#fdcb6e",
      items: ["Costs cut 15-25%", "10+ people managed", "7 years experience"],
    },
  ];

  return (
    <div style={windowBase}>
      <TitleBar title="ops — kanban" icon="📋" />
      <div style={{ flex: 1, padding: 10, display: "flex", gap: 6 }}>
        {columns.map((col) => (
          <div key={col.title} style={{ flex: 1 }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
              color: col.color, letterSpacing: 1, textTransform: "uppercase",
              marginBottom: 8, display: "flex", alignItems: "center", gap: 5,
            }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: col.color }} />
              {col.title}
              <span style={{ color: "#444", marginLeft: "auto" }}>{col.items.length}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {col.items.map((item) => (
                <div key={item} style={{
                  background: "#252525", border: "1px solid #333",
                  borderRadius: 6, padding: "8px 9px",
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                  color: col.title === "Metrics" ? col.color : "#aaa",
                  fontWeight: col.title === "Metrics" ? 600 : 400,
                  lineHeight: 1.4,
                }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main switch ──────────────────────────────────────
function SkillWindow({ type }: SkillWindowProps) {
  switch (type) {
    case "python": return <PythonWindow />;
    case "data": return <DataWindow />;
    case "excel": return <ExcelWindow />;
    case "sql": return <SqlWindow />;
    case "design": return <DesignWindow />;
    case "ops": return <OpsWindow />;
  }
}

export default SkillWindow;