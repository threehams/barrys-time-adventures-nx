import { ExplorationKey } from "./data/explorations";
import { UnlockKey } from "./data/unlocks";
import { UpgradeKey } from "./data/upgrades";
import { Resource, Resources, SourceKey } from "./Resources";
import { Skills } from "./Skills";
import { StateAction } from "./StateAction";

export type Phase =
  | "preEvent"
  | "event"
  | "postEvent"
  | "traveling"
  | "convergence"
  | "expand"
  | "collapse"
  | "done";
export type PurchasedUpgrades = {
  [Key in UpgradeKey]?: { level: number };
};
export type PurchasedTimedUpgrades = {
  [Key in UpgradeKey]?: { level: number; time: number };
};
export type PlayerExplorations = {
  [Key in ExplorationKey]?: {
    progress: number;
  };
};
export type Unlocks = {
  [Key in UnlockKey]?: boolean;
};
export type MessageLevel = "info" | "news" | "alert";
export type Message = { text: string; priority: MessageLevel };
export type MessageState = {
  text: string;
  priority: MessageLevel;
  time: number;
};
export type State = {
  stuck: boolean;
  replay: boolean;
  unlocks: Unlocks;
  phase: Phase;
  exploration: ExplorationKey | undefined;
  time: number;
  messages: ReadonlyArray<MessageState>;
  resources: Resources;
  maxResources: Resources;
  skills: Skills;
  explorations: PlayerExplorations;
  upgrades: PurchasedUpgrades;
  timedUpgrades: PurchasedTimedUpgrades;
  timeline: ReadonlyArray<{
    time: number;
    action: StateAction;
  }>;
  multiplier: number;
  timers: {
    [Key in
      | SourceKey
      | "event"
      | "action"
      | "convergence"
      | Resource
      | "autoPurchase"]: number;
  };
  loops: number;
  autoUpgrade: {
    [Key in SourceKey]?: boolean;
  };
  autoUpgradeLevels: {
    [Key in UpgradeKey]?: number;
  };
  autoExplore: {
    [Key in ExplorationKey]?: boolean;
  };
  expandStart: number | undefined;
  collapseStart: number | undefined;
};
