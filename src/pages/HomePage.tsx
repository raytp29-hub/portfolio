import { useEffect, useCallback, useState, useRef } from "react";
import ZshTerminal from "../components/ZshTerminal";
import SkillWindow from "../components/SkillWindow";
import useActiveSection from "../hooks/useActiveSection";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import SkillBar from "../components/SkillBar";
import GaussianHero from "../components/GaussianHero";
import SectionHeader from "../components/SectionHeader";
import About from "../components/About";
import useIsMobile from "../hooks/useIsMobile";
import { PROJECTS } from "../data/projects";
import { SKILLS } from "../data/skills";
import { ABOUT_PARAGRAPHS, CONTACT_LINKS } from "../data/about";

function HomePage() {
  const sezioni = ["home", "projects", "skills", "about"];
  const active = useActiveSection(sezioni);
  const [activeSkill, setActiveSkill] = useState(0);
  const paused = useRef(false);
  const [booted, setBooted] = useState(false);
  const [visible, setVisible] = useState(false);
  const isMobile = useIsMobile();

  const handleBoot = useCallback(() => {
    setBooted(true);
    setTimeout(() => setVisible(true), 80);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused.current) {
        setActiveSkill((prev) => (prev + 1) % SKILLS.length);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    document.title = `Biagio Spada — ${active}`;
  }, [active]);

  return (
    <div
      style={{
        background: "#212121",
        minHeight: "100vh",
        color: "#ccc",
        fontFamily: "sans-serif",
      }}
    >
      {/* Terminal - vanish after boot */}
      {!booted && <ZshTerminal onComplete={handleBoot} />}

      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.9s ease 0.15s, transform 0.9s ease 0.15s",
        }}
      >
        <NavBar sections={sezioni} active={active} onSelect={scrollTo} />

        {/* Hero */}
        <section
          id="home"
          style={{
            position: "relative",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <GaussianHero />
          <div
            style={{
              position: "relative",
              zIndex: 1,
              padding: isMobile ? "0 20px" : "0 48px",
              maxWidth: 700,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 24,
              }}
            >
              <div style={{ height: 1, width: 40, background: "#00b894" }} />
              <p
                style={{
                  fontFamily: "monospace",
                  fontSize: 11,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  color: "#00b894",
                }}
              >
                Data Analyst
              </p>
            </div>
            <h1
              style={{
                fontFamily: "serif",
                fontSize: "clamp(44px, 6vw, 74px)",
                color: "#f2f2f2",
                fontWeight: 400,
                lineHeight: 1.05,
                marginBottom: 24,
              }}
            >
              Biagio Spada
            </h1>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                color: "#aaa",
                lineHeight: 1.6,
                fontStyle: "italic",
                marginBottom: 15,
              }}
            >
              Curious analyst and hands-on experimenter. I build to understand.
            </p>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.85,
                color: "#888",
                maxWidth: 500,
                marginBottom: 40,
              }}
            >
              I analyze data with Python, SQL, and Excel to find patterns and
              build tools that support real decisions — from automated
              dashboards to competitive intelligence reports.
            </p>
            <div style={{ display: "flex", gap: 14 }}>
              <button
                onClick={() => scrollTo("projects")}
                style={{
                  fontFamily: "monospace",
                  fontSize: 11,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  padding: "13px 30px",
                  background: "#00b894",
                  color: "#1a1a1a",
                  fontWeight: 600,
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
              >
                View Projects
              </button>
              <button
                onClick={() => scrollTo("about")}
                style={{
                  fontFamily: "monospace",
                  fontSize: 11,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  padding: "13px 30px",
                  background: "transparent",
                  color: "#aaa",
                  border: "1px solid #444",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
              >
                About Me
              </button>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 180,
              background: "linear-gradient(transparent, #212121)",
              zIndex: 2,
            }}
          />
        </section>

        {/* Projects */}
        <section
          id="projects"
          style={{
            padding: isMobile ? "60px 20px" : "100px 48px",
            maxWidth: 1080,
            margin: "0 auto",
          }}
        >
          <SectionHeader label="Portfolio" title="Selected Projects" />
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {PROJECTS.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        {/* Skills */}
        <section
          id="skills"
          style={{
            padding: isMobile ? "60px 20px" : "80px 48px",
            maxWidth: 1080,
            margin: "0 auto",
          }}
        >
          <SectionHeader label="Skills" title="Stack & Tools" />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1.4fr",
              gap: 32,
              alignItems: "start",
            }}
          >
            {/* Left — skill bars */}
            <div>
              {SKILLS.map((skill, index) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  label={skill.label}
                  delay={index * 100}
                  isActive={index === activeSkill}
                  siteVisible={visible}
                  onSelect={() => {
                    paused.current = true;
                    setActiveSkill(index);
                    setTimeout(() => {
                      paused.current = false;
                    }, 8000);
                  }}
                />
              ))}
            </div>

            {/* Right — themed window */}
            <div
              style={{
                position: isMobile ? "relative" : "sticky",
                top: isMobile ? undefined : 100,
              }}
            >
              <div
                key={activeSkill}
                style={{
                  animation: "skillFade 0.8s ease",
                }}
              >
                <SkillWindow type={SKILLS[activeSkill].window} />
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section
          id="about"
          style={{
            padding: isMobile ? "60px 20px 100px" : "80px 48px 140px",
            maxWidth: 780,
            margin: "0 auto",
          }}
        >
          <SectionHeader label="About" title="Who I Am" />
          <About paragraphs={ABOUT_PARAGRAPHS} links={CONTACT_LINKS} />
        </section>

        <Footer name="Biagio Spada" year={2026} />
      </div>
    </div>
  );
}

export default HomePage;
