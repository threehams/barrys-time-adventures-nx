import { ExplorationKey, UpgradeKey } from ".";
import { Message } from "..";

export type UnlockKey =
  | "pastRestart"
  | "loop"
  | "pastSpeed5x"
  | "pastSpeed10x"
  | "autoPurchase"
  | "convergence"
  | "timelineEvents"
  | "autoPurchaseExpand"
  | "autoExplore";
export type Unlock = {
  key: UnlockKey;
  requirements: {
    upgrade?: UpgradeKey;
    exploration?: ExplorationKey;
  };
  message: Message;
};

export const unlocks: Unlock[] = [
  {
    key: "pastRestart",
    requirements: {
      exploration: "T2",
    },
    message: {
      priority: "alert",
      text: 'Unlocked: You can change decisions you made in the past. Click a day on the timeline, then "Restart Here."',
    },
  },
  {
    key: "pastSpeed5x",
    requirements: {
      exploration: "T3",
    },
    message: {
      priority: "alert",
      text: "Unlocked: Speed up time for Past Barry up to 5X.",
    },
  },
  {
    key: "pastSpeed10x",
    requirements: {},
    message: {
      priority: "alert",
      text: "Unlocked: Speed up time for Past Barry up to 2X.",
    },
  },
  {
    key: "loop",
    requirements: {
      exploration: "T4",
    },
    message: {
      priority: "alert",
      text: "Unlocked: Restart after the timeskip, but keep some of your stats and knowledge, by clicking the Loop button above the timeline. This is only available after running out of resources. This may have consequences.",
    },
  },
  {
    key: "autoPurchase",
    requirements: {
      exploration: "F4",
    },
    message: {
      priority: "alert",
      text: "Unlocked: Automatically purchase upgrades in the past! Click 'Auto' to enable for each source.",
    },
  },
  {
    key: "autoExplore",
    requirements: {
      exploration: "T7",
    },
    message: {
      priority: "alert",
      text: "Unlocked: Set explorations to run automatically.",
    },
  },
  {
    key: "timelineEvents",
    requirements: {
      exploration: "T5",
    },
    message: {
      priority: "alert",
      text: "Unlocked: Negative effects now appear on the timeline.",
    },
  },
  {
    key: "convergence",
    requirements: {
      exploration: "T6",
    },
    message: {
      priority: "alert",
      text: "Unlocked: All Barrys are in one place. Barry wants to repopulate the Earth.",
    },
  },
  {
    key: "autoPurchaseExpand",
    requirements: {
      upgrade: "BU4",
    },
    message: {
      priority: "alert",
      text: "Unlocked: Manager Barry will deal with creating more Barrys. I'll just direct him.",
    },
  },
];

export const findUnlock = (key: UnlockKey) => {
  const found = unlocks.find((upgrade) => upgrade.key === key);
  if (!found) {
    throw new Error(`Could not find an unlock with key: ${key}`);
  }
  return found;
};

export const findUnlockFor = (thing: {
  upgrade?: UpgradeKey;
  exploration?: ExplorationKey;
}): Unlock | undefined => {
  for (const unlock of unlocks) {
    if (
      thing.exploration &&
      unlock.requirements.exploration === thing.exploration
    ) {
      return unlock;
    }
    if (thing.upgrade && unlock.requirements.upgrade === thing.upgrade) {
      return unlock;
    }
  }
};
