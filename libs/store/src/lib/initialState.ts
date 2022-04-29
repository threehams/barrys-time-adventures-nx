import { hoursToSeconds } from "date-fns";
import { State } from "./State";

const STARTING_JUNK = 200;

export const initialState: State = {
  replay: false,
  phase: "preEvent",
  exploration: undefined,
  time: 0,
  messages: [],
  upgrades: {},
  timedUpgrades: {
    EW1: {
      time: hoursToSeconds(12 * 24 + 2),
      level: 1,
    },
    EW2: {
      time: hoursToSeconds(17 * 24 + 8),
      level: 1,
    },
    EF1: {
      time: hoursToSeconds(15 * 24 + 5),
      level: 1,
    },
    EM1: {
      time: hoursToSeconds(9 * 24 + 4),
      level: 1,
    },
  },
  timeline: [],
  resources: {
    barry: 0,
    money: 0,
    water: 0,
    food: 0,
    junk: STARTING_JUNK,
    power: 0,
  },
  maxResources: {
    barry: 0,
    money: 0,
    water: 0,
    food: 0,
    junk: STARTING_JUNK,
    power: 0,
  },
  skills: {
    perception: {
      current: 1,
      permanent: 1,
      thisLoop: 0,
    },
    endurance: {
      current: 1,
      permanent: 1,
      thisLoop: 0,
    },
    patience: {
      current: 1,
      permanent: 1,
      thisLoop: 0,
    },
    strength: {
      current: 1,
      permanent: 1,
      thisLoop: 0,
    },
    tech: {
      current: 1,
      permanent: 1,
      thisLoop: 0,
    },
  },
  explorations: {},
  multiplier: 2,
  timers: {
    copies: 0,
    convergence: 0,
    barry: 0,
    autoPurchase: 0,
    scrap: 0,
    action: 0,
    event: 0,
    letsy: 0,
    crafts: 0,
    shopping: 0,
    plants: 0,
    preserves: 0,
    rainfall: 0,
    stream: 0,
    well: 0,
    food: 0,
    junk: 0,
    money: 0,
    power: 0,
    water: 0,
  },
  loops: 0,
  unlocks: {},
  autoUpgrade: {},
  autoUpgradeLevels: {},
  expandStart: undefined,
  collapseStart: undefined,
  autoExplore: {},
  stuck: false,
};
