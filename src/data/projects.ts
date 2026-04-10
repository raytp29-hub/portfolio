export type Project = {
  slug: string;
  title: string;
  tags: string[];
  context: string;
  results: string[];
  screenshots?: string[];
  repoUrl?: string;
  demoUrl?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "big-ambitions-analyzer",
    title: "Big Ambitions Analyzer",
    tags: ["Python", "Streamlit", "Pandas"],
    context:
      "Modular dashboard for P&L analysis, ABC cost allocation, and revenue forecasting using weighted moving averages across 15+ simulated business scenarios.",
    results: [
      "Built a reusable dashboard that automated P&L analysis across 15+ business scenarios",
      "Replaced manual spreadsheet workflows, reducing analysis time from hours to minutes",
      "Visual cost breakdown by department, enabling faster budget decisions",
    ],
    screenshots: [
      "/portfolio/screenshots/sc1.png",
      "/portfolio/screenshots/sc2.png",
      "/portfolio/screenshots/sc3.png",
    ],
    repoUrl: "https://github.com/raytp29-hub/big-ambitions-analyzer1.0",
    demoUrl: "https://big-ambitions-analyzer1-0.onrender.com/",
  },
  {
    slug: "competitive-intelligence",
    title: "Competitive Intelligence Platform",
    tags: ["Python", "Yelp API", "Claude API"],
    context:
      "Market intelligence platform that combines Yelp business data with AI-powered analysis to generate automated competitive reports for restaurant markets.",
    results: [
      "Automated the full research process — from raw data to PDF report in under 2 minutes",
      "Mapped pricing and positioning patterns across 20+ competitors per area",
      "Generated actionable reports with competitive scoring and strategic recommendations",
    ],
    screenshots: [
      "/portfolio/screenshots/rest_P.png",
      "/portfolio/screenshots/rest_p2.png",
      "/portfolio/screenshots/rest_pAI.png",
      "/portfolio/screenshots/rest_pGra.png",
    ],
    repoUrl: "https://github.com/raytp29-hub/restaurant-analytics-dashboard",
  },
  {
    slug: "catania-restaurant-market",
    title: "Restaurant Market Analysis",
    tags: ["Python", "SQL", "Power BI", "Web Scraping"],
    context:
      "Collected and analyzed data on 250+ restaurants in Catania to identify saturated zones, pricing gaps, and market opportunities — supporting the decision of where and how to open a new restaurant.",
    results: [
      "Scraped and structured data on 250+ restaurants into a PostgreSQL database",
      "Analysis and dashboard in progress — insights coming soon",
    ],
    repoUrl: "https://github.com/raytp29-hub/catania-restaurant-analysis",
  },
  {
    slug: "palio-brand-identity",
    title: "Palio d'Ateneo 2026 — Brand Identity",
    tags: ["CorelDRAW", "Branding", "Design System"],
    context:
      "Complete visual identity for the 21st Palio d'Ateneo UniCT/CUS, from concept to production across digital and print media.",
    results: [
      "Designed a complete brand identity from scratch — logo, colors, typography, and layout system",
      "Applied across 8+ formats: merchandise, event banners, social media, and print materials",
    ],
  },
];
