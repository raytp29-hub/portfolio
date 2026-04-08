export type Dataset = {
  label: string;
  mu: number;
  sigma: number;
  color: [number, number, number]; // RGB
};

export const DATASETS: Dataset[] = [
  { label: "Revenue Q4",  mu:  0.1, sigma: 0.8, color: [0, 184, 148]   },
  { label: "Churn Rate",  mu: -0.4, sigma: 1.2, color: [108, 92, 231]  },
  { label: "NPS Score",   mu:  0.3, sigma: 0.6, color: [9, 132, 227]   },
  { label: "Cost Delta",  mu: -0.2, sigma: 1.0, color: [253, 121, 168] },
  { label: "Efficiency",  mu:  0.5, sigma: 0.5, color: [0, 184, 148]   },
];