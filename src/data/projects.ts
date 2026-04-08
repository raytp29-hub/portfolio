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
    context: "Modular dashboard for P&L analysis, ABC cost allocation, and revenue forecasting using weighted moving averages across 15+ simulated business scenarios.",
    results: [
      "4-module pipeline (cleaner → analyzer → visualizer → app) reusable across datasets",
      "Automated analysis that replaced manual spreadsheet workflows for 15+ scenarios",
      "ABC cost allocation with visual breakdown by cost center and margin tracking",
    ],
    screenshots: [
      "/screenshots/sc1.png",
      "/screenshots/sc2.png",
      "/screenshots/sc3.png",
    ],
    repoUrl: "https://github.com/raytp29-hub/big-ambitions-analyzer1.0",
    demoUrl: "https://big-ambitions-analyzer1-0.onrender.com/",
  },
  {
    slug: "competitive-intelligence",
    title: "Competitive Intelligence Platform",
    tags: ["Python", "Yelp API", "Claude API"],
    context: "Market intelligence platform that combines Yelp business data with AI-powered analysis to generate automated competitive reports for restaurant markets.",
    results: [
      "End-to-end pipeline: data collection → cleaning → AI analysis → PDF report in < 2 min",
      "Pricing and positioning patterns identified across 20+ competitors per area",
      "Structured reports with competitive scoring, gap analysis, and strategic recommendations",
    ],
    screenshots: [
      "/screenshots/ci-report.png",
      "/screenshots/ci-analysis.png",
    ],
    repoUrl: "https://github.com/raytp29-hub/restaurant-analytics-dashboard",
  },
  {
    slug: "sudoku-solver",
    title: "Sudoku Solver",
    tags: ["Python", "Backtracking", "Algorithms"],
    context: "Algorithmic solver demonstrating problem-solving skills through recursive backtracking with constraint propagation optimization.",
    results: [
      "Solves any 9×9 puzzle in < 50ms with optimized backtracking",
      "Constraint propagation pruning reduces search space by ~70%",
    ],
    repoUrl: "#",
  },
  {
    slug: "palio-brand-identity",
    title: "Palio d'Ateneo 2026 — Brand Identity",
    tags: ["CorelDRAW", "Branding", "Design System"],
    context: "Complete visual identity for the 21st Palio d'Ateneo UniCT/CUS, from concept to production across digital and print media.",
    results: [
      "Cohesive design system: logo, color palette, AktivGrotesk typography, layout grids",
      "Deployed across 8+ touchpoints: merchandise, banners, social media, print materials",
    ],
  },
];