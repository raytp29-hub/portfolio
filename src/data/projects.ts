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
      "/screenshots/sc1.png",
      "/screenshots/sc2.png",
      "/screenshots/sc3.png",
    ],
    repoUrl: "https://github.com/raytp29-hub/big-ambitions-analyzer1.0",
    demoUrl: "https://raytp29-big-ambitions-analyzer.hf.space",
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
      "/screenshots/rest_P.png",
      "/screenshots/rest_p2.png",
      "/screenshots/rest_pAI.png",
      "/screenshots/rest_pGra.png",
    ],
    repoUrl: "https://github.com/raytp29-hub/restaurant-analytics-dashboard",
  },
    {
    slug: "catania-restaurant-market",
    title: "Catania Restaurant Market Analysis",
    tags: ["Python", "SQL", "Power BI", "Web Scraping"],
    context:
      "End-to-end market intelligence pipeline for Catania's restaurant sector: automated TripAdvisor scraping with Scrapy, geocoding with Nominatim, PostgreSQL storage, and a 2-page interactive Power BI dashboard built on a star schema — designed to support a real investment decision on where and how to open a new restaurant.",
    results: [
      "Italian Seafood dominates with 76 restaurants (33% of market), while the $$–$$$ tier is oversaturated at 70% market share with the lowest avg. rating (4.36)",
      "Identified 3 underserved high-demand niches: Seafood Mediterranean, Asian Thai, and Dessert Italian",
      "Geographic analysis revealed Sud-Est as the strongest opportunity zone — only 15 restaurants but the highest avg. rating (4.50) vs. 71 in the saturated historic center",
      "Analyzed 2,599 menu items across 30 restaurants, exposing the $$$$ premium tier as largely cosmetic (€13.21 vs €13.05 avg. dish price)",
    ],
    repoUrl: "https://github.com/raytp29-hub/restaurant_anlysis.git",
    demoUrl: "https://app.powerbi.com/view?r=eyJrIjoiZTk1MWE5NjUtMGVmMS00NjU4LTg0ZmEtYTQ4NWExMGJmNWZhIiwidCI6Ijc0NTkwNTUzLTkzMjYtNDE4Yi04MDA2LTI4ODQzNjhjYTNmMiJ9&pageName=3bfe2ebd104db06a54a6",
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
