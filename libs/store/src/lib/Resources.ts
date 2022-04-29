import numbro from "numbro";

export type Resource = "food" | "power" | "money" | "water" | "junk" | "barry";
export type Resources = {
  [Key in Resource]: number;
};
export type SourceKey =
  | "preserves"
  | "plants"
  | "shopping"
  | "rainfall"
  | "stream"
  | "well"
  | "letsy"
  | "crafts"
  | "scrap"
  | "copies";

export type Source = { key: SourceKey; name: string; resource: Resource };
export const sources: Source[] = [
  { key: "letsy", name: "Letsy", resource: "money" },
  { key: "crafts", name: "Crafts", resource: "money" },
  { key: "well", name: "Well Water", resource: "water" },
  { key: "stream", name: "Filtered Water", resource: "water" },
  { key: "rainfall", name: "Rainfall", resource: "water" },
  { key: "preserves", name: "Preserves", resource: "food" },
  { key: "plants", name: "Plants", resource: "food" },
  { key: "scrap", name: "Scrap", resource: "junk" },
  { key: "copies", name: "Barrys", resource: "barry" },
];

export const findSource = (key: SourceKey) => {
  const found = sources.find((source) => source.key === key);
  if (!found) {
    throw new Error(`Could not find a source with key: ${key}`);
  }
  return found;
};

const resources: {
  key: Resource;
  name: string;
  format: (value: number) => string;
  formatWithType: (value: number) => string;
}[] = [
  {
    key: "food",
    name: "Rations",
    format: (value) =>
      numbro(Math.floor(value)).format({
        thousandSeparated: true,
      }),
    formatWithType: (value) =>
      `${numbro(Math.floor(value)).format({
        thousandSeparated: true,
      })} rations`,
  },
  {
    key: "water",
    name: "Water",
    format: (value) =>
      `${numbro(Math.floor(value)).format({
        thousandSeparated: true,
      })} liters`,
    formatWithType: (value) =>
      `${numbro(Math.floor(value)).format({
        thousandSeparated: true,
      })} liters water`,
  },
  {
    key: "money",
    name: "Money",
    format: (value) =>
      numbro(value).formatCurrency({
        thousandSeparated: true,
        currencySymbol: "$",
        mantissa: 2,
      }),
    formatWithType: (value) =>
      numbro(value).formatCurrency({
        thousandSeparated: true,
        currencySymbol: "$",
        mantissa: 2,
      }),
  },
  {
    key: "junk",
    name: "Junk",
    format: (value) =>
      `${numbro(Math.floor(value)).format({
        thousandSeparated: true,
      })} lb`,
    formatWithType: (value) =>
      `${numbro(Math.floor(value)).format({
        thousandSeparated: true,
      })} lb junk`,
  },
  {
    key: "power",
    name: "Power",
    format: (value) =>
      `${numbro(Math.floor(value)).format({
        thousandSeparated: true,
      })} amp hours`,
    formatWithType: (value) =>
      `${numbro(Math.floor(value)).format({
        thousandSeparated: true,
      })} amp hours`,
  },
  {
    key: "barry",
    name: "Barrys",
    format: (value) =>
      `${numbro(Math.floor(value)).format({
        thousandSeparated: true,
      })}`,
    formatWithType: (value) =>
      `${numbro(Math.floor(value)).format({
        thousandSeparated: true,
      })}`,
  },
];

export const findResource = (key: Resource) => {
  const found = resources.find((resource) => resource.key === key);
  if (!found) {
    throw new Error(`Could not find a resource with key: ${key}`);
  }
  return found;
};
