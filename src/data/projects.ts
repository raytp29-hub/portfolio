export type ProjectKpi = {
  /** Label piccola uppercase — es. "COMPETITORS", "TIME", "OUTPUT". */
  label: string;
  /** Valore mostrato grande — es. "20+", "<2 min", "PDF". */
  value: string;
};

export type ProjectHeroImage = {
  /** Path pubblico dell'immagine (es. "/screenshots/color_guide.png"). */
  src: string;
  /** Rotazione in gradi durante lo slide-in (default 30). */
  tilt?: number;
};

export type Project = {
  slug: string;
  
  /** ID stile "P-001" mostrato in alto a sinistra nella card. */
  id: string;
  /** Anno (o range) mostrato in alto a destra nella card. */
  year: string;
  title: string;
  tags: string[];
  context: string;
  /** KPI grid (3 celle). Sostituisce la vecchia "KEY RESULTS" bullet list. */
  kpis?: ProjectKpi[];
  screenshots?: string[];
  /** Immagine di reveal su hover (usata quando la card non ha screenshots panel). */
  heroImage?: ProjectHeroImage;
  /**
   * Se true, la card usa il pattern hover-reveal invece del pannello screenshots fisso a destra.
   * Su hover l'immagine (heroImage.src oppure screenshots ciclati) sale davanti al contenuto.
   * Su click apre il modal gallery. Utile per progetti con visual forte.
   */
  heroReveal?: boolean;
  repoUrl?: string;
  demoUrl?: string;
  results?: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: "catania-restaurant-market",
    title: "Catania Restaurant Market Analysis",
    tags: ["Python", "SQL", "Power BI", "Web Scraping"],
    context: "End-to-end market intelligence pipeline for Catania's restaurant sector: automated TripAdvisor scraping with Scrapy, geocoding with Nominatim, PostgreSQL storage, and a 2-page interactive Power BI dashboard built on a star schema — designed to support a real investment decision on where and how to open a new restaurant.",
    results: [
      "Italian Seafood dominates with 76 restaurants (33% of market), while the $$–$$$ tier is oversaturated at 70% market share with the lowest avg. rating (4.36)",
      "Identified 3 underserved high-demand niches: Seafood Mediterranean, Asian Thai, and Dessert Italian",
      "Geographic analysis revealed Sud-Est as the strongest opportunity zone — only 15 restaurants but the highest avg. rating (4.50) vs. 71 in the saturated historic center",
      "Analyzed 2,599 menu items across 30 restaurants, exposing the $$$$ premium tier as largely cosmetic (€13.21 vs €13.05 avg. dish price)",
    ],
    repoUrl: "https://github.com/raytp29-hub/restaurant_anlysis.git",
    demoUrl: "https://app.powerbi.com/view?r=eyJrIjoiZTk1MWE5NjUtMGVmMS00NjU4LTg0ZmEtYTQ4NWExMGJmNWZhIiwidCI6Ijc0NTkwNTUzLTkzMjYtNDE4Yi04MDA2LTI4ODQzNjhjYTNmMiJ9&pageName=3bfe2ebd104db06a54a6",
    id: "P-001",
    year: "2025",
    
    
  },
  {
    slug: "competitive-intelligence",
    id: "P-002",
    year: "2024",
    title: "Competitive Intelligence Platform",
    tags: ["Python", "Yelp API", "Claude API"],
    context:
      "Market intelligence platform that combines Yelp business data with AI-powered analysis to generate automated competitive reports for restaurant markets.",
    kpis: [
      { label: "Competitors / area", value: "20+" },
      { label: "Report time", value: "< 2 min" },
      { label: "Output", value: "PDF" },
    ],
    screenshots: [
      "/screenshots/rest_P.png",
      "/screenshots/rest_p2.png",
      "/screenshots/rest_pAI.png",
      "/screenshots/rest_pGra.png",
    ],
    heroReveal: true,
    repoUrl: "https://github.com/raytp29-hub/restaurant-analytics-dashboard",
  },
  {
    slug: "big-ambitions-analyzer",
    id: "P-003",
    year: "2024",
    title: "Big Ambitions Analyzer",
    tags: ["Python", "Streamlit", "Pandas"],
    context:
      "Modular dashboard for P&L analysis, ABC cost allocation, and revenue forecasting using weighted moving averages across 15+ simulated business scenarios.",
    
    screenshots: [
      "/screenshots/sc1.png",
      "/screenshots/sc2.png",
      "/screenshots/sc3.png",
    ],
    heroReveal: true,
    repoUrl: "https://github.com/raytp29-hub/big-ambitions-analyzer1.0",
    demoUrl: "https://raytp29-big-ambitions-analyzer.hf.space",
  },
  {
    slug: "palio-brand-identity",
    id: "P-004",
    year: "2026",
    title: "Palio d'Ateneo 2026 — Brand Identity",
    tags: ["CorelDRAW", "Branding", "Design System"],
    context:
      "Complete visual identity for the 21st Palio d'Ateneo UniCT/CUS, from concept to production across digital and print media.",
    kpis: [
      { label: "Formats", value: "8+" },
      { label: "Scope", value: "Brand ID" },
      { label: "Tool", value: "CorelDRAW" },
    ],
    heroImage: {
      src: "/screenshots/color_guide.png",
      tilt: 30,
    },
  },
];
