import {
  Phase,
  PlayerExplorations,
  PurchasedTimedUpgrades,
  PurchasedUpgrades,
} from "..";
import { Resources } from "../Resources";
import { Upgrade } from "../Upgrade";

export type UpgradeKey =
  | "PF1"
  | "PF2"
  | "PF3"
  | "PF4"
  | "PF5"
  | "PF6"
  | "PF7"
  | "PJ1"
  | "PJ2"
  | "PW1"
  | "PW2"
  | "PW3"
  | "PW4"
  | "PW5"
  | "PW6"
  | "PM1"
  | "PM2"
  | "PM3"
  | "PM4"
  | "PM5"
  | "TW1"
  | "TW2"
  | "TF1"
  | "TF2"
  | "TM1"
  | "EW1"
  | "EW2"
  | "EM1"
  | "EF1"
  | "BU1"
  | "BU2"
  | "BU3"
  | "BU4";
export const upgrades: Upgrade[] = [
  {
    phase: "preEvent",
    key: "PM1",
    type: "purchased",
    name: "Sell your stuff",
    description:
      "I should set up a Letsy account and pawn off some of my junk for steady income.",
    max: 50,
    costs: {
      junk: (level) => {
        return Math.pow(level, 3.5) + level * 10;
      },
    },
    effect: {
      type: "add",
      money: (level) => {
        return level * 5;
      },
    },
    flavorTexts: {},
    requirements: {},
    source: "letsy",
  },
  {
    phase: "preEvent",
    key: "PM2",
    type: "purchased",
    name: "Advertise your Letsy store",
    description: "Maybe I can get rid of these vintage Neil Breen DVDs.",
    max: 10,
    costs: {
      money: (level) => {
        return level * 50;
      },
    },
    effect: {
      type: "time",
      money: (level) => {
        return Math.pow(0.75, Math.log2(level) + 1);
      },
    },
    flavorTexts: {},
    requirements: {
      upgrade: { key: "PM1", level: 3 },
    },
    source: "letsy",
  },
  {
    phase: "preEvent",
    key: "PM5",
    type: "purchased",
    name: "Set up multiple accounts",
    description:
      "It's against their Terms of Service, but they probably won't notice.",
    max: 50,
    costs: {
      money: (level) => {
        return Math.pow(level, 3.5) + level * 200;
      },
    },
    effect: {
      type: "multiply",
      money: (level) => {
        return level * 1.1 + 1;
      },
    },
    flavorTexts: {},
    requirements: {
      upgrade: { key: "PM1", level: 5 },
    },
    source: "letsy",
  },
  {
    phase: "preEvent",
    key: "PM3",
    type: "purchased",
    name: "Sell some scrap art",
    description:
      "I've got a shed full of scrap metal I could weld together into art.",
    max: 50,
    costs: {
      junk: (level) => {
        return Math.pow(level, 2.5) + level * 10;
      },
    },
    effect: {
      type: "add",
      money: (level) => {
        return level * 5;
      },
    },
    flavorTexts: {},
    requirements: {
      money: 200,
    },
    source: "crafts",
  },
  {
    phase: "preEvent",
    key: "PM4",
    type: "purchased",
    name: "Sell furniture",
    description:
      "There's a market for industrial furniture. Might as well make some, for people who believe the world's just fine.",
    max: 50,
    costs: {
      junk: (level) => {
        return Math.pow(level, 3.5) + level * 10;
      },
    },
    effect: {
      type: "multiply",
      money: (level) => {
        return 1.15 ** level;
      },
    },
    flavorTexts: {},
    requirements: {
      upgrade: { key: "PM3", level: 3 },
    },
    source: "crafts",
  },
  {
    phase: "preEvent",
    key: "PJ1",
    type: "purchased",
    name: "Set up scrap delivery",
    description:
      "There's a local scrapyard I could pay for regular deliveries.",
    max: 50,
    costs: {
      money: (level) => {
        return Math.pow(level, 2) + level * 10;
      },
    },
    effect: {
      type: "add",
      junk: (level) => {
        return level * 5;
      },
    },
    flavorTexts: {},
    requirements: {
      money: 20,
    },
    source: "scrap",
  },
  {
    phase: "preEvent",
    key: "PJ2",
    type: "purchased",
    name: "Improve scrap quality",
    description:
      "Pay the scrapyard a bit more for less rust and more usable pieces.",
    max: 50,
    costs: {
      money: (level) => {
        return Math.pow(level, 3) + level * 100;
      },
    },
    effect: {
      type: "multiply",
      junk: (level) => {
        return 1.1 ** level;
      },
    },
    flavorTexts: {},
    requirements: {
      upgrade: { key: "PJ1", level: 5 },
    },
    source: "scrap",
  },
  {
    phase: "preEvent",
    key: "PF1",
    type: "purchased",
    name: "Canning supplies",
    description: "I could preserve food if I got some basic canning supplies.",
    max: 50,
    costs: {
      money: (level) => {
        return Math.pow(level, 3.5) + level * 10;
      },
    },
    effect: {
      type: "add",
      food: (level) => {
        return level * 4;
      },
    },
    flavorTexts: {},
    requirements: {
      money: 150,
    },
    source: "preserves",
  },
  {
    phase: "preEvent",
    key: "PF2",
    type: "purchased",
    name: "Gas burner",
    description: "Buy a big old propane gas burner to boil water much faster.",
    max: 50,
    costs: {
      money: (level) => {
        return Math.pow(level, 3.5) + level * 10;
      },
    },
    effect: {
      type: "multiply",
      food: (level) => {
        return 1.1 ** level;
      },
    },
    flavorTexts: {},
    requirements: {
      upgrade: { key: "PF1", level: 3 },
    },
    source: "preserves",
  },
  {
    phase: "preEvent",
    key: "PF6",
    type: "purchased",
    name: "Pressure canner",
    description:
      "A pressure canner would let me preserve more stuff without getting botulism.",
    max: 50,
    costs: {
      money: (level) => {
        return Math.pow(level, 3.5) + level * 10;
      },
    },
    effect: {
      type: "time",
      food: (level) => {
        return Math.pow(0.85, Math.log2(level) + 1);
      },
    },
    flavorTexts: {},
    requirements: {
      upgrade: { key: "PF1", level: 5 },
    },
    source: "preserves",
  },
  {
    phase: "preEvent",
    key: "PF3",
    type: "purchased",
    name: "Plant some fast-growing crops",
    description:
      "Looks like I'll be eating a lot of radishes and green onions.",
    max: 50,
    costs: {
      money: (level) => {
        return Math.pow(level, 3.5) + level * 10;
      },
    },
    effect: {
      type: "add",
      food: (level) => {
        return level * 4;
      },
    },
    flavorTexts: {},
    requirements: {
      food: 100,
    },
    source: "plants",
  },
  {
    phase: "preEvent",
    key: "PF4",
    type: "purchased",
    name: "Set up hydroponics",
    description:
      "I can get some plants to grow faster, and more variety would be nice.",
    max: 50,
    costs: {
      money: (level) => {
        return Math.pow(level, 3.4) + level * 10;
      },
    },
    effect: {
      type: "time",
      food: (level) => {
        return Math.pow(0.85, Math.log2(level) + 1);
      },
    },
    flavorTexts: {},
    requirements: {
      upgrade: { key: "PF3", level: 3 },
    },
    source: "plants",
  },
  {
    phase: "preEvent",
    key: "PF7",
    type: "purchased",
    name: "Buy grow lights",
    description: "More lights mean more plants, right?",
    max: 50,
    costs: {
      money: (level) => {
        return Math.pow(level, 3) + level * 100;
      },
    },
    effect: {
      type: "multiply",
      food: (level) => {
        return 1.1 ** level;
      },
    },
    flavorTexts: {},
    requirements: {
      upgrade: { key: "PF4", level: 5 },
    },
    source: "plants",
  },
  {
    phase: "preEvent",
    key: "PW5",
    type: "purchased",
    name: "Drill a deeper well",
    description:
      "My well's not going to collect enough water right now. I should get someone to drill deeper.",
    max: 50,
    costs: {
      money: (level) => {
        return Math.pow(level, 3) + level * 10;
      },
    },
    effect: {
      type: "add",
      water: (level) => {
        return level * 4;
      },
    },
    flavorTexts: {},
    requirements: {
      money: 300,
    },
    source: "well",
  },
  {
    phase: "preEvent",
    key: "PW6",
    type: "purchased",
    name: "Overcharge well",
    description: "",
    max: 50,
    costs: {
      money: (level) => {
        return Math.pow(level, 3) + level * 10;
      },
    },
    effect: {
      type: "multiply",
      water: (level) => {
        return 1.05 ** level;
      },
    },
    flavorTexts: {},
    requirements: {
      upgrade: { key: "PW5", level: 5 },
    },
    source: "well",
  },
  {
    phase: "preEvent",
    key: "PW1",
    type: "purchased",
    name: "Set up rainwater collection",
    description: "Buy and set up barrels and tarps for rainwater collection.",
    max: 50,
    costs: {
      money: (level) => {
        return Math.pow(level, 3.5) + level * 10;
      },
    },
    effect: {
      type: "add",
      water: (level) => {
        return level * 4;
      },
    },
    flavorTexts: {},
    requirements: {
      water: 100,
    },
    source: "rainfall",
  },
  {
    phase: "preEvent",
    key: "PW2",
    type: "purchased",
    name: "Buy a cistern",
    description: "Getting a big water container should make collection easier.",
    max: 10,
    costs: {
      money: (level) => {
        return Math.pow(level, 3.5) + level * 10;
      },
    },
    effect: {
      type: "time",
      water: (level) => {
        return Math.pow(0.75, Math.log2(level) + 1);
      },
    },
    flavorTexts: {},
    requirements: {
      upgrade: { key: "PW1", level: 3 },
    },
    source: "rainfall",
  },
  {
    phase: "preEvent",
    key: "PW3",
    type: "purchased",
    name: "Buy a water filter",
    description: "I can filter some water from the stream nearby.",
    max: 50,
    costs: {
      money: (level) => {
        return Math.pow(level, 3.5) + level * 10;
      },
    },
    effect: {
      type: "add",
      water: (level) => {
        return level * 4;
      },
    },
    flavorTexts: {},
    requirements: {
      water: 200,
    },
    source: "stream",
  },
  {
    phase: "preEvent",
    key: "PW4",
    type: "purchased",
    name: "Switch to an electric filter",
    description:
      "Manually cranking this filter is way too much work when I have electricity.",
    max: 10,
    costs: {
      money: (level) => {
        return Math.pow(level, 3.5) + level * 10;
      },
    },
    effect: {
      type: "time",
      water: (level) => {
        return Math.pow(0.7, Math.log2(level) + 1);
      },
    },
    flavorTexts: {},
    requirements: {
      upgrade: { key: "PW3", level: 3 },
    },
    source: "stream",
  },
  {
    phase: "postEvent",
    key: "TW1",
    type: "purchased",
    name: "Condensate Capture",
    description: "Pluck water out of the air instead of relying on rainfall.",
    max: 50,
    costs: {
      power: (level, distance) => {
        return Math.pow(level, 3.5) + distance * 10;
      },
    },
    effect: {
      type: "multiply",
      water: (level) => {
        return 1.1 ** level;
      },
    },
    flavorTexts: {},
    requirements: {
      exploration: "E19",
    },
    source: "rainfall",
  },
  {
    phase: "postEvent",
    key: "TM1",
    type: "purchased",
    name: "Mirror Letsy",
    description:
      "Mirror the entire Letsy site, but only make my shop accessible.",
    max: 50,
    costs: {
      power: (level, distance) => {
        return Math.pow(level, 3.5) + distance * 10;
      },
    },
    effect: {
      type: "multiply",
      money: (level) => {
        return 1.1 ** level;
      },
    },
    flavorTexts: {},
    requirements: {
      exploration: "F9",
    },
    source: "letsy",
  },
  {
    phase: "postEvent",
    key: "TW2",
    type: "purchased",
    name: "Carbon Nanotube Filter",
    description:
      "This thing could filter anything out of anything. Past Barry could have used this for that contamination problem.",
    max: 50,
    costs: {
      power: (level, distance) => {
        return Math.pow(level, 3.5) + distance * 10;
      },
    },
    effect: {
      type: "multiply",
      water: (level) => {
        return 1.1 ** level;
      },
    },
    flavorTexts: {},
    requirements: {
      exploration: "E12",
    },
    source: "stream",
  },
  {
    phase: "postEvent",
    key: "TF1",
    type: "purchased",
    name: "Food Compression",
    description:
      "Cram more food into a single jar. Canning supply shortages won't affect Past Barry!",
    max: 50,
    costs: {
      power: (level, distance) => {
        return Math.pow(level, 3.5) + distance * 10;
      },
    },
    effect: {
      type: "multiply",
      food: (level) => {
        return 1.1 ** level;
      },
    },
    flavorTexts: {},
    requirements: {
      exploration: "F5",
    },
    source: "preserves",
  },
  {
    phase: "postEvent",
    key: "TF2",
    type: "purchased",
    name: "Fluxed Phyto-Gro",
    description:
      "Forces plants to grow more quickly than they probably should.",
    max: 5,
    costs: {
      power: (level, distance) => {
        return Math.pow(level, 3.5) + distance * 15;
      },
    },
    effect: {
      type: "multiply",
      food: (level) => {
        return 1.1 ** level;
      },
    },
    flavorTexts: {},
    requirements: {
      exploration: "S5",
    },
    source: "plants",
  },
  {
    phase: "preEvent",
    key: "EW1",
    type: "event",
    name: "Rainfall stops",
    description:
      "The rain has stopped, so I'm not getting any water that way. I hope it starts up again soon.",
    max: 2,
    costs: {},
    effect: {
      type: "multiply",
      water: (level) => {
        return level - 1;
      },
    },
    flavorTexts: {
      1: "The rain has stopped, so I'm not getting any water that way. I hope it starts up again soon.",
    },
    requirements: {},
    source: "rainfall",
    negated: {
      upgrade: "TW1",
      message:
        "The rain has stopped. Luckily, not a problem for the condensate collector. Thanks, Future Barry!",
      postMessage:
        "Hey, I just got a condensate collector from Future Barry! No rainfall is no longer a problem.",
    },
  },
  {
    phase: "preEvent",
    key: "EW2",
    type: "event",
    name: "Stream contaminated",
    description:
      "The stream's started to smell like paint. I'm not sure what happened, but I'm not going to trust it now.",
    max: 50,
    costs: {},
    effect: {
      type: "multiply",
      water: (level) => {
        return level - 1;
      },
    },
    flavorTexts: {
      1: "The stream's started to smell like paint. I'm not sure what happened, but I'm not going to trust it now.",
    },
    requirements: {},
    source: "stream",
    negated: {
      upgrade: "TW2",
      message:
        "The stream's started to smell like paint, but that's not a problem for this filter. Nice thinking, Future Barry!",
      postMessage:
        "I just got a new filter from Future Barry which should be able to deal with the paint pollution.",
    },
  },
  {
    phase: "preEvent",
    key: "EM1",
    type: "event",
    name: "Letsy downtime",
    description:
      "Letsy just had an outage, and it's been flaky ever since. My income there has dropped in half.",
    max: 2,
    costs: {},
    effect: {
      type: "multiply",
      money: (level) => {
        return level === 1 ? 0.5 : 1;
      },
    },
    flavorTexts: {
      1: "Letsy just had an outage, and it's been flaky ever since. My income there has dropped in half.",
      2: "Letsy's going through an outage, but Future Barry taught me how to mirror their site. I don't know what's going on, but sales are better than ever!",
    },
    requirements: {},
    source: "letsy",
    negated: {
      upgrade: "TM1",
      message:
        "Letsy's going through an outage, but my site mirror's still going. I don't know what's going on, but thanks, Future Barry!",
      postMessage:
        "Future Barry taught me how to mirror Letsy's site. I don't know what's going on, but sales are better than ever!",
    },
  },
  {
    phase: "preEvent",
    key: "EF1",
    type: "event",
    name: "Jar shortage",
    description:
      "I'm having a tough time getting enough jars and lids. I can preserve maybe half as much food right now.",
    max: 50,
    costs: {},
    effect: {
      type: "multiply",
      food: (level) => {
        return level === 1 ? 0.5 : 1;
      },
    },
    flavorTexts: {
      1: "I'm having a tough time getting enough jars and lids. I can preserve maybe half as much food right now.",
    },
    requirements: {},
    source: "preserves",
    negated: {
      upgrade: "TF1",
      message:
        "There's a shortage on jars and lids, but Future Barry's food compression's working great!",
      postMessage:
        "Future Barry's food compressor's letting me stretch whatever jars and lids I can get.",
    },
  },
  // expand upgrades
  {
    phase: "expand",
    key: "BU1",
    type: "purchased",
    name: "Create more Barrys",
    description: "Throw Barrys into time holes to create more Barrys.",
    max: 200,
    costs: {
      barry: (level) => (level === 1 ? 0 : level * 5),
    },
    effect: {
      type: "add",
      barry: (level) => {
        return level * 5;
      },
    },
    flavorTexts: {},
    requirements: {},
    source: "copies",
  },
  {
    phase: "expand",
    key: "BU2",
    type: "purchased",
    name: "Fracture time",
    description:
      "Force time holes into other time holes to create more time holes. More time holes means more Barrys!",
    max: 100,
    costs: {
      barry: (level) => 5 ** level,
    },
    effect: {
      type: "multiply",
      barry: (level) => {
        return level ** 3.5;
      },
    },
    flavorTexts: {},
    requirements: {
      upgrade: {
        key: "BU1",
        level: 5,
      },
    },
    source: "copies",
  },
  {
    phase: "expand",
    key: "BU3",
    type: "purchased",
    name: "Hire Barrys",
    description: "Hire Barrys to shove Barrys into time holes.",
    max: 10,
    costs: {
      barry: (level) => {
        return Math.pow(level, 3.5) + level * 100;
      },
    },
    effect: {
      type: "time",
      barry: (level) => {
        return 0.7 ** level;
      },
    },
    flavorTexts: {},
    requirements: {
      upgrade: {
        key: "BU1",
        level: 10,
      },
    },
    source: "copies",
  },
  {
    phase: "expand",
    key: "BU4",
    type: "purchased",
    name: "Merge Director Barry",
    description:
      "Merge Barrys into a Director Barry to deal with all these other Barrys.",
    max: 1,
    costs: {
      barry: () => {
        return 1_000_000;
      },
    },
    effect: {
      type: "add",
      barry: () => 0,
    },
    flavorTexts: {},
    requirements: {
      upgrade: {
        key: "BU2",
        level: 6,
      },
    },
    source: "copies",
  },
];

export const findUpgrade = (key: UpgradeKey) => {
  const found = upgrades.find((upgrade) => upgrade.key === key);
  if (!found) {
    throw new Error(`Could not find an upgrade with key: ${key}`);
  }
  return found;
};

type CanPurchaseUpgrade = {
  phase: Phase;
  upgrade: Upgrade;
  resources: Resources;
  maxResources: Resources;
  distance: number;
  purchasedUpgrades: PurchasedUpgrades;
  timedUpgrades: PurchasedTimedUpgrades;
  playerExplorations: PlayerExplorations;
  level?: number;
};
export const canPurchaseUpgrade = ({
  phase,
  upgrade,
  resources,
  maxResources,
  distance,
  purchasedUpgrades,
  timedUpgrades,
  playerExplorations,
  level,
}: CanPurchaseUpgrade) => {
  const currentLevel =
    purchasedUpgrades[upgrade.key]?.level ?? timedUpgrades[upgrade.key]?.level;
  if (
    !canShowUpgrade({
      phase,
      upgrade,
      purchasedUpgrades,
      timedUpgrades,
      playerExplorations,
      resources,
      maxResources,
    })
  ) {
    return false;
  }

  const nextLevel = level ?? (currentLevel ?? 0) + 1;
  for (const costKey of Object.keys(upgrade.costs)) {
    const checker = upgrade.costs[costKey];
    if (checker && checker(nextLevel, distance) > resources[costKey]) {
      return false;
    }
  }

  return nextLevel <= upgrade.max;
};

type CanShowUpgrade = {
  phase: Phase;
  upgrade: Upgrade;
  purchasedUpgrades: PurchasedUpgrades;
  timedUpgrades: PurchasedTimedUpgrades;
  playerExplorations: PlayerExplorations;
  resources: Resources;
  maxResources: Resources;
};
export const canShowUpgrade = ({
  phase,
  upgrade,
  purchasedUpgrades,
  timedUpgrades,
  playerExplorations,
  maxResources,
}: CanShowUpgrade) => {
  if (
    upgrade.type === "event" ||
    (upgrade.phase !== phase &&
      !(upgrade.phase === "postEvent" && phase === "traveling"))
  ) {
    return false;
  }
  if (purchasedUpgrades[upgrade.key]?.level) {
    return true;
  }
  for (const [key, amount] of Object.entries(upgrade.requirements)) {
    if (
      (key === "food" || key === "water" || key === "money") &&
      maxResources[key] < (amount as number)
    ) {
      return false;
    }
  }
  if (
    upgrade.requirements.exploration &&
    playerExplorations[upgrade.requirements.exploration]?.progress !== 100
  ) {
    return false;
  }
  const requiredUpgrade = upgrade.requirements.upgrade;
  if (
    requiredUpgrade &&
    !(
      (purchasedUpgrades[requiredUpgrade.key]?.level ?? 0) >=
        requiredUpgrade.level ||
      (timedUpgrades[requiredUpgrade.key]?.level ?? 0) >= requiredUpgrade.level
    )
  ) {
    return false;
  }
  return true;
};

type UpgradeCost = {
  upgrade: Upgrade;
  resources: Resources;
  currentLevel: number | undefined;
  distance: number;
  level?: number;
};
export const upgradeCost = ({
  upgrade,
  currentLevel,
  distance,
  level,
}: UpgradeCost) => {
  const nextLevel = level ?? (currentLevel ?? 0) + 1;

  return Object.entries(upgrade.costs).map(([key, cost]) => {
    if (!cost) {
      return { key, cost: 0 };
    }
    return { key, cost: cost(nextLevel, distance) };
  });
};
