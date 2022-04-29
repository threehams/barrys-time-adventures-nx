export type Skills = {
  [Key in Skill]: {
    current: number;
    permanent: number;
    thisLoop: number;
  };
};
export type Skill =
  | "perception"
  | "endurance"
  | "patience"
  | "tech"
  | "strength";

export const skills: { name: string; key: Skill }[] = [
  { name: "Perception", key: "perception" },
  { name: "Endurance", key: "endurance" },
  { name: "Patience", key: "patience" },
  { name: "Tech", key: "tech" },
  { name: "Strength", key: "strength" },
];

export const findSkill = (key: Skill) => {
  const found = skills.find((skill) => skill.key === key);
  if (!found) {
    throw new Error(`Could not find a skill with key: ${key}`);
  }
  return found;
};
