export type SkillWindow = "python" | "data" | "excel" | "sql" | "design" | "ops";

export type Skill = {
  name: string;
  level: number;
  window: SkillWindow;
};

export const SKILLS: Skill[] = [
  { name: "Python", level: 78, window: "python" },
  { name: "Data Analysis", level: 82, window: "data" },
  { name: "Excel / VBA", level: 90, window: "excel" },
  { name: "SQL", level: 65, window: "sql" },
  { name: "Graphic Design", level: 75, window: "design" },
  { name: "Operations Mgmt", level: 92, window: "ops" },
];