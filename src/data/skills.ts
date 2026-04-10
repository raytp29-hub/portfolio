export type SkillWindow =
  | "python"
  | "data"
  | "excel"
  | "sql"
  | "ops";

export type Skill = {
  name: string;
  level: number;
  label: string;
  window: SkillWindow;
};

export const SKILLS: Skill[] = [
  { name: "Python", level: 78, label: "Advanced", window: "python" },
  { name: "SQL", level: 65, label: "Proficient", window: "sql" },
  { name: "Excel / VBA", level: 90, label: "Expert", window: "excel" },
  { name: "Power BI", level: 55, label: "Proficient", window: "data" },
  { name: "Operations Mgmt", level: 92, label: "Expert", window: "ops" },
];
