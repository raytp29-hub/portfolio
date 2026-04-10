import { type SkillWindow as SkillWindowType } from "../data/skills";
import { useState, useEffect } from "react";

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
  width: 10,
  height: 10,
  borderRadius: "50%",
  background: color,
});

function TitleBar({ title, icon }: { title: string; icon?: string }) {
  return (
    <div style={titleBar}>
      <div style={dot("#ff5f57")} />
      <div style={dot("#febc2e")} />
      <div style={dot("#28c840")} />
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: "#666",
          marginLeft: 8,
        }}
      >
        {icon && `${icon} `}
        {title}
      </span>
    </div>
  );
}

// Syntax colors
const kw = "#6c5ce7"; // keywords
const str = "#00b894"; // strings
const num = "#fd79a8"; // numbers
const cm = "#555"; // comments
const tx = "#ccc"; // text

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
        <div>
          <span style={{ color: cm }}># biagio_spada/skills.py</span>
        </div>
        <div style={{ height: 6 }} />
        <div>
          <span style={{ color: tx }}>data_manipulation </span>
          <span style={{ color: tx }}>= </span>
          <span style={{ color: tx }}>{"{"}</span>
        </div>
        <div style={{ paddingLeft: 16 }}>
          <span style={{ color: str }}>"Pandas"</span>
          <span style={{ color: tx }}>: </span>
          <span style={{ color: str }}>"core"</span>
          <span style={{ color: tx }}>,</span>
        </div>
        <div style={{ paddingLeft: 16 }}>
          <span style={{ color: str }}>"NumPy"</span>
          <span style={{ color: tx }}>: </span>
          <span style={{ color: str }}>"core"</span>
          <span style={{ color: tx }}>,</span>
        </div>
        <div style={{ paddingLeft: 16 }}>
          <span style={{ color: str }}>"Polars"</span>
          <span style={{ color: tx }}>: </span>
          <span style={{ color: str }}>"familiar"</span>
          <span style={{ color: tx }}>,</span>
        </div>
        <div>
          <span style={{ color: tx }}>{"}"}</span>
        </div>
        <div style={{ height: 6 }} />
        <div>
          <span style={{ color: tx }}>visualization </span>
          <span style={{ color: tx }}>= [</span>
          <span style={{ color: str }}>"Matplotlib"</span>
          <span style={{ color: tx }}>, </span>
          <span style={{ color: str }}>"Plotly"</span>
          <span style={{ color: tx }}>, </span>
          <span style={{ color: str }}>"Seaborn"</span>
          <span style={{ color: tx }}>]</span>
        </div>
        <div style={{ height: 6 }} />
        <div>
          <span style={{ color: tx }}>optimization </span>
          <span style={{ color: tx }}>= [</span>
          <span style={{ color: str }}>"PuLP"</span>
          <span style={{ color: tx }}>, </span>
          <span style={{ color: str }}>"SciPy"</span>
          <span style={{ color: tx }}>, </span>
          <span style={{ color: str }}>"Scikit-learn"</span>
          <span style={{ color: tx }}>]</span>
        </div>
        <div style={{ height: 6 }} />
        <div>
          <span style={{ color: tx }}>web </span>
          <span style={{ color: tx }}>= {"{"}</span>
        </div>
        <div style={{ paddingLeft: 16 }}>
          <span style={{ color: str }}>"Streamlit"</span>
          <span style={{ color: tx }}>: </span>
          <span style={{ color: str }}>"core"</span>
          <span style={{ color: tx }}>,</span>
        </div>
        <div style={{ paddingLeft: 16 }}>
          <span style={{ color: str }}>"FastAPI"</span>
          <span style={{ color: tx }}>: </span>
          <span style={{ color: str }}>"familiar"</span>
          <span style={{ color: tx }}>,</span>
        </div>
        <div style={{ paddingLeft: 16 }}>
          <span style={{ color: str }}>"BeautifulSoup"</span>
          <span style={{ color: tx }}>: </span>
          <span style={{ color: str }}>"proficient"</span>
          <span style={{ color: tx }}>,</span>
        </div>
        <div style={{ paddingLeft: 16 }}>
          <span style={{ color: str }}>"Requests"</span>
          <span style={{ color: tx }}>: </span>
          <span style={{ color: str }}>"proficient"</span>
          <span style={{ color: tx }}>,</span>
        </div>
        <div>
          <span style={{ color: tx }}>{"}"}</span>
        </div>
      </div>
    </div>
  );
}

// ── Data Analysis Dashboard ──────────────────────────
function DataWindow() {
  const [animated, setAnimated] = useState(false);
  const [lineProgress, setLineProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Animazione line chart progressiva
  useEffect(() => {
    if (!animated) return;
    let frame = 0;
    const totalFrames = 60;
    const interval = setInterval(() => {
      frame++;
      setLineProgress(frame / totalFrames);
      if (frame >= totalFrames) clearInterval(interval);
    }, 25);
    return () => clearInterval(interval);
  }, [animated]);

  // Dati line chart
  const lineData = [20, 35, 28, 50, 42, 65, 58, 75, 70, 85];
  const lineMax = 100;

  // Dati bar chart verticale
  const barData = [
    { label: "Charts", value: 85, color: "#00b894" },
    { label: "DAX", value: 60, color: "#6c5ce7" },
    { label: "Model", value: 55, color: "#0984e3" },
    { label: "ETL", value: 50, color: "#fd79a8" },
    { label: "Filter", value: 70, color: "#00b894" },
    { label: "KPIs", value: 75, color: "#6c5ce7" },
  ];

  // Genera path per line chart
  const generateLinePath = () => {
    const w = 160;
    const h = 60;
    const stepX = w / (lineData.length - 1);
    const visiblePoints = Math.floor(lineProgress * lineData.length);

    let path = "";
    for (let i = 0; i <= visiblePoints && i < lineData.length; i++) {
      const x = i * stepX;
      const y = h - (lineData[i] / lineMax) * h;
      path += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
    }
    return path;
  };

  // Area fill path
  const generateAreaPath = () => {
    const w = 160;
    const h = 60;
    const stepX = w / (lineData.length - 1);
    const visiblePoints = Math.floor(lineProgress * lineData.length);

    let path = `M 0 ${h}`;
    for (let i = 0; i <= visiblePoints && i < lineData.length; i++) {
      const x = i * stepX;
      const y = h - (lineData[i] / lineMax) * h;
      path += ` L ${x} ${y}`;
    }
    if (visiblePoints >= 0) {
      const lastX = Math.min(visiblePoints, lineData.length - 1) * stepX;
      path += ` L ${lastX} ${h} Z`;
    }
    return path;
  };

  return (
    <div style={windowBase}>
      <TitleBar title="dashboard — Power BI" icon="📊" />
      <div style={{ padding: 14, flex: 1 }}>
        {/* Slicer / Filtri */}
        <div
          style={{
            display: "flex",
            gap: 6,
            marginBottom: 12,
            borderBottom: "1px solid #333",
            paddingBottom: 8,
          }}
        >
          {["All", "DAX", "Visuals", "Modeling"].map((f, i) => (
            <span
              key={f}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                padding: "3px 10px",
                borderRadius: 4,
                background: i === 0 ? "rgba(0,184,148,0.12)" : "#252525",
                color: i === 0 ? "#00b894" : "#666",
                border: `1px solid ${i === 0 ? "rgba(0,184,148,0.25)" : "#333"}`,
              }}
            >
              {f}
            </span>
          ))}
        </div>

        {/* KPI Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 6,
            marginBottom: 12,
          }}
        >
          {[
            { label: "Measures", value: "12+", color: "#00b894" },
            { label: "Reports", value: "5", color: "#6c5ce7" },
            { label: "Sources", value: "3", color: "#0984e3" },
          ].map((kpi) => (
            <div
              key={kpi.label}
              style={{
                background: "#252525",
                borderRadius: 6,
                padding: "8px 6px",
                border: "1px solid #333",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 16,
                  color: kpi.color,
                  fontWeight: 600,
                }}
              >
                {kpi.value}
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 7,
                  color: "#666",
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  marginTop: 1,
                }}
              >
                {kpi.label}
              </div>
            </div>
          ))}
        </div>

        {/* Donut + Line Chart affiancati */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            marginBottom: 12,
          }}
        >
          {/* Donut Chart */}
          <div
            style={{
              background: "#252525",
              borderRadius: 8,
              padding: 10,
              border: "1px solid #333",
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 8,
                color: "#555",
                letterSpacing: 1,
                marginBottom: 6,
              }}
            >
              SKILL DISTRIBUTION
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <svg width="60" height="60" viewBox="0 0 80 80">
                <circle
                  cx="40"
                  cy="40"
                  r="30"
                  fill="none"
                  stroke="#2a2a2a"
                  strokeWidth="8"
                />
                {[
                  { pct: 35, color: "#00b894", offset: 0 },
                  { pct: 25, color: "#6c5ce7", offset: 35 },
                  { pct: 22, color: "#0984e3", offset: 60 },
                  { pct: 18, color: "#fd79a8", offset: 82 },
                ].map((seg) => {
                  const circumference = 2 * Math.PI * 30;
                  const dash = (seg.pct / 100) * circumference;
                  const gap = circumference - dash;
                  const offsetVal = -(seg.offset / 100) * circumference;
                  return (
                    <circle
                      key={seg.color}
                      cx="40"
                      cy="40"
                      r="30"
                      fill="none"
                      stroke={seg.color}
                      strokeWidth="8"
                      strokeDasharray={`${animated ? dash : 0} ${animated ? gap : circumference}`}
                      strokeDashoffset={offsetVal}
                      strokeLinecap="round"
                      style={{
                        transition:
                          "stroke-dasharray 1.5s cubic-bezier(.25,.46,.45,.94)",
                        transform: "rotate(-90deg)",
                        transformOrigin: "center",
                      }}
                    />
                  );
                })}
              </svg>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {[
                  { label: "Visuals", color: "#00b894" },
                  { label: "DAX", color: "#6c5ce7" },
                  { label: "Model", color: "#0984e3" },
                  { label: "ETL", color: "#fd79a8" },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <div
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: item.color,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 8,
                        color: "#888",
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Line Chart */}
          <div
            style={{
              background: "#252525",
              borderRadius: 8,
              padding: 10,
              border: "1px solid #333",
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 8,
                color: "#555",
                letterSpacing: 1,
                marginBottom: 6,
              }}
            >
              LEARNING PROGRESS
            </div>
            <svg
              width="100%"
              height="60"
              viewBox="0 0 160 60"
              preserveAspectRatio="none"
            >
              {/* Grid lines */}
              {[0, 20, 40, 60].map((y) => (
                <line
                  key={y}
                  x1="0"
                  y1={y}
                  x2="160"
                  y2={y}
                  stroke="#333"
                  strokeWidth="0.5"
                />
              ))}
              {/* Area fill */}
              <path d={generateAreaPath()} fill="rgba(0,184,148,0.1)" />
              {/* Line */}
              <path
                d={generateLinePath()}
                fill="none"
                stroke="#00b894"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Dot at end */}
              {lineProgress > 0 &&
                (() => {
                  const idx = Math.min(
                    Math.floor(lineProgress * lineData.length),
                    lineData.length - 1,
                  );
                  const x = idx * (160 / (lineData.length - 1));
                  const y = 60 - (lineData[idx] / lineMax) * 60;
                  return <circle cx={x} cy={y} r="3" fill="#00b894" />;
                })()}
            </svg>
          </div>
        </div>

        {/* Bar Chart Verticale */}
        <div
          style={{
            background: "#252525",
            borderRadius: 8,
            padding: 10,
            border: "1px solid #333",
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 8,
              color: "#555",
              letterSpacing: 1,
              marginBottom: 8,
            }}
          >
            COMPETENCY BREAKDOWN
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-around",
              height: 60,
              gap: 4,
            }}
          >
            {barData.map((bar) => (
              <div
                key={bar.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 3,
                  flex: 1,
                }}
              >
                <div
                  style={{
                    width: "100%",
                    maxWidth: 20,
                    height: animated ? `${bar.value * 0.55}px` : "0px",
                    background: `linear-gradient(180deg, ${bar.color}, ${bar.color}88)`,
                    borderRadius: "3px 3px 0 0",
                    transition: "height 1.2s cubic-bezier(.25,.46,.45,.94)",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 7,
                    color: "#666",
                  }}
                >
                  {bar.label}
                </span>
              </div>
            ))}
          </div>
        </div>
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
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
            }}
          >
            <tbody>
              {cells.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      style={{
                        padding: "5px 8px",
                        border: "1px solid #2a2a2a",
                        background:
                          ri === 0 || ci === 0
                            ? "#252525"
                            : ri === 1
                              ? "#1a2a1a"
                              : "#1e1e1e",
                        color:
                          ri === 0 || ci === 0
                            ? "#666"
                            : cell.includes("★★★")
                              ? "#00b894"
                              : cell.includes("★★☆")
                                ? "#6c5ce7"
                                : "#aaa",
                        fontWeight:
                          ri === 0 || ci === 0 || ri === 1 ? 600 : 400,
                        textAlign: ci === 0 || ri === 0 ? "center" : "left",
                        fontSize: ri === 0 || ci === 0 ? 9 : 10,
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* VBA panel */}
        <div
          style={{
            borderTop: "1px solid #333",
            padding: "10px 14px",
            background: "#1a1a1a",
          }}
        >
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 9,
              color: "#555",
              marginBottom: 6,
              letterSpacing: 1,
            }}
          >
            VBA EDITOR
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              lineHeight: 1.7,
            }}
          >
            <span style={{ color: kw }}>Sub</span>
            <span style={{ color: tx }}> AutomateReport()</span>
            <br />
            <span
              style={{ color: tx, paddingLeft: 12, display: "inline-block" }}
            >
              <span style={{ color: kw }}>Dim</span> ws{" "}
              <span style={{ color: kw }}>As</span> Worksheet
            </span>
            <br />
            <span
              style={{ color: tx, paddingLeft: 12, display: "inline-block" }}
            >
              <span style={{ color: kw }}>For Each</span> ws{" "}
              <span style={{ color: kw }}>In</span> ThisWorkbook.Sheets
            </span>
            <br />
            <span
              style={{ color: tx, paddingLeft: 24, display: "inline-block" }}
            >
              ws.PivotTables(<span style={{ color: num }}>1</span>).RefreshTable
            </span>
            <br />
            <span
              style={{ color: kw, paddingLeft: 12, display: "inline-block" }}
            >
              Next
            </span>
            <br />
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
          <span style={{ color: kw }}>SELECT</span>
          <span style={{ color: tx }}> skill_name,</span>
          <br />
          <span style={{ color: tx, paddingLeft: 16, display: "inline-block" }}>
            category,
          </span>
          <br />
          <span style={{ color: tx, paddingLeft: 16, display: "inline-block" }}>
            proficiency_level
          </span>
          <br />
          <span style={{ color: kw }}>FROM</span>
          <span style={{ color: tx }}> biagio.competencies</span>
          <br />
          <span style={{ color: kw }}>WHERE</span>
          <span style={{ color: tx }}> domain = </span>
          <span style={{ color: str }}>'SQL'</span>
          <br />
          <span style={{ color: kw }}>ORDER BY</span>
          <span style={{ color: tx }}> proficiency_level </span>
          <span style={{ color: kw }}>DESC</span>
          <span style={{ color: tx }}>;</span>
        </div>
        {/* Result */}
        <div
          style={{ borderTop: "1px solid #333", padding: "10px 14px", flex: 1 }}
        >
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 9,
              color: str,
              marginBottom: 8,
            }}
          >
            ✓ 8 rows returned — 4ms
          </div>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
            }}
          >
            <thead>
              <tr>
                {["skill", "category", "level"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "4px 8px",
                      borderBottom: "1px solid #333",
                      color: "#666",
                      fontWeight: 500,
                      textAlign: "left",
                    }}
                  >
                    {h}
                  </th>
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
                    <td
                      key={ci}
                      style={{
                        padding: "3px 8px",
                        borderBottom: "1px solid #2a2a2a",
                        color: cell.includes("★★★")
                          ? "#00b894"
                          : cell.includes("★★☆")
                            ? "#6c5ce7"
                            : cell.includes("★☆☆")
                              ? "#fd79a8"
                              : "#999",
                      }}
                    >
                      {cell}
                    </td>
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



// ── Operations ───────────────────────────────────────
function OpsWindow() {
  const columns = [
    {
      title: "Core",
      color: "#00b894",
      items: [
        "Lean Management",
        "Process Mapping",
        "Cost Reduction",
        "Budget Planning",
        "Team Management",
      ],
    },
    {
      title: "Proficient",
      color: "#6c5ce7",
      items: [
        "SOP Development",
        "Vendor Negotiation",
        "Stakeholder Reporting",
      ],
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
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                color: col.color,
                letterSpacing: 1,
                textTransform: "uppercase",
                marginBottom: 8,
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: col.color,
                }}
              />
              {col.title}
              <span style={{ color: "#444", marginLeft: "auto" }}>
                {col.items.length}
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {col.items.map((item) => (
                <div
                  key={item}
                  style={{
                    background: "#252525",
                    border: "1px solid #333",
                    borderRadius: 6,
                    padding: "8px 9px",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    color: col.title === "Metrics" ? col.color : "#aaa",
                    fontWeight: col.title === "Metrics" ? 600 : 400,
                    lineHeight: 1.4,
                  }}
                >
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
    case "python":
      return <PythonWindow />;
    case "data":
      return <DataWindow />;
    case "excel":
      return <ExcelWindow />;
    case "sql":
      return <SqlWindow />;
    case "ops":
      return <OpsWindow />;
  }
}

export default SkillWindow;
