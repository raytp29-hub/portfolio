export type SkillWindow = "python" | "data" | "excel" | "sql" | "design" | "ops";

export type Skill = {
  name: string;
  level: number;
  label: string;
  window: SkillWindow;
};

export const SKILLS: Skill[] = [
  { name: "Python", level: 78, label: "Advanced", window: "python" },
  { name: "Data Analysis", level: 82, label: "Advanced", window: "data" },
  { name: "Excel / VBA", level: 90, label: "Expert", window: "excel" },
  { name: "SQL", level: 65, label: "Proficient", window: "sql" },
  { name: "Graphic Design", level: 75, label: "Advanced", window: "design" },
  { name: "Operations Mgmt", level: 92, label: "Expert", window: "ops" },
];