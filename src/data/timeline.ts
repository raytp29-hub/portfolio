export type TimelineEntry = {
  /** ID stile "T-001" mostrato nel chip in alto a sinistra. */
  id: string;
  /** Date leggibili — mostrate in alto a destra. */
  start: string;
  end: string;
  /** Anni numerici — utili se in futuro renderizziamo la strip Gantt. */
  startYear: number;
  endYear: number;
  role: string;
  company: string;
  location: string;
  /** Bullet dei risultati — max ~4 per entry per non allungare le card. */
  highlights: string[];
};

/** Anni della strip in alto — copre l'intera carriera dichiarata dal CV. */
export const TIMELINE_YEARS = [
  2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026,
];

export const TIMELINE: TimelineEntry[] = [
  {
    id: "T-004",
    start: "2024",
    end: "Present",
    startYear: 2024,
    endYear: 2026,
    role: "Data Analytics Transition",
    company: "Personal projects · Job search",
    location: "Catania · Remote",
    highlights: [
      "Self-taught Python, SQL, Power BI, VBA on real business problems",
      "Portfolio: Big Ambitions Analyzer, Competitive Intelligence Platform, Catania Restaurant Market Analysis (230+ restaurants, star schema)",
      "Actively pursuing Data / BI Analyst roles across Italy",
    ],
  },
  {
    id: "T-003",
    start: "Jan 2022",
    end: "Jan 2025",
    startYear: 2022,
    endYear: 2025,
    role: "Operations Manager",
    company: "Pizzeria Bistrò 47",
    location: "Catania",
    highlights: [
      "Excel + VBA dashboards used daily by 10+ team members → −40% reporting time",
      "Standardized inventory and shift-planning workflows for scalability",
      "Analytical support for pricing, menu optimization, and promo strategies",
    ],
  },
  {
    id: "T-002",
    start: "Mar 2020",
    end: "Dec 2022",
    startYear: 2020,
    endYear: 2022,
    role: "Store Manager",
    company: "Ristorante Fichera",
    location: "Catania",
    highlights: [
      "Detailed cost analysis + waste-area identification → −20% costs in 12 months",
      "Customer segmentation and targeted promo strategy → +20% ROI",
      "Kitchen-dining workflow redesign → −15% service time",
      "Standardized supplier processes across 15+ vendor relationships",
    ],
  },
  {
    id: "T-001",
    start: "Jan 2018",
    end: "Dec 2019",
    startYear: 2018,
    endYear: 2019,
    role: "Sales & Customer Service Representative",
    company: "Tipografia Spada",
    location: "Sicily",
    highlights: [
      "Strategic cross-selling based on customer-needs analysis → +22% avg. order value",
      "Technical consulting on graphic and digital solutions for customized print products",
    ],
  },
];
