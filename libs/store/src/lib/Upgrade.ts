import { ExplorationKey, Phase, SourceKey, UpgradeKey } from ".";

export type UpgradeEffect = {
  food?: (level: number) => number;
  water?: (level: number) => number;
  money?: (level: number) => number;
  junk?: (level: number) => number;
  power?: (level: number) => number;
  barry?: (level: number) => number;
  // Is this additive or multiplicative with other upgrades?
  type: "add" | "multiply" | "time";
};

export type Upgrade = {
  phase: Phase;
  // Max level of this upgrade
  max: number;
  // Required for this upgrade to appear. Once that happens, it's
  // always visible
  requirements: {
    money?: number;
    water?: number;
    food?: number;
    power?: number;
    exploration?: ExplorationKey;
    upgrade?: { key: UpgradeKey; level: number };
  };
  type: "purchased" | "event";
  // Required to buy this upgrade
  costs: {
    barry?: (level: number, distance: number) => number;
    money?: (level: number, distance: number) => number;
    water?: (level: number, distance: number) => number;
    food?: (level: number, distance: number) => number;
    junk?: (level: number, distance: number) => number;
    power?: (level: number, distance: number) => number;
  };
  // Readable name in-game
  name: string;
  // Flavor text for all levels
  description: string;
  // Source
  source: SourceKey;
  // Precise key for the upgrade (not string)
  key: UpgradeKey;
  // Changes caused by this upgrade
  effect: UpgradeEffect;
  // Message shown with each upgrade
  flavorTexts: {
    [level: number]: string | undefined;
  };
  negated?: {
    upgrade: UpgradeKey;
    // message when this event is negated the moment it starts
    message: string;
    // message when this event is negated later
    postMessage: string;
  };
};
