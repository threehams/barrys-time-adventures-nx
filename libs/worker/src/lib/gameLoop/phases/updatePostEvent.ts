import {
  findExploration,
  initialState,
  explorations,
  findUnlockFor,
} from "@barry/store";
import { Updater } from "../types";
import {
  updateTime,
  updateResourceGain,
  updateMaxResources,
} from "../updaters";

const RESOURCE_DRAIN_BASE_TIME = 1_000;

export const updatePostEvent: Updater = (state, delta) => {
  let explorationMultiplier = 1;
  if (state.exploration) {
    const exploration = findExploration(state.exploration);
    explorationMultiplier = exploration.timeMultiplier || 1;
  }
  const elapsedTime = delta * state.multiplier * explorationMultiplier * 15;
  if (!state.exploration) {
    return;
  }

  updateTime(state, elapsedTime);
  updateResourceGain(state, elapsedTime);
  updatePostResources(state, elapsedTime);
  updateStats(state, elapsedTime);
  updateExplore(state, elapsedTime);
  updateMaxResources(state, elapsedTime);
};

const updateExplore: Updater = (state, delta) => {
  if (state.resources.food <= 0 || state.resources.water <= 0) {
    state.phase = "traveling";
    state.exploration = undefined;
    state.multiplier = 1;
    state.timers = { ...initialState.timers };
    const resource = state.resources.food <= 0 ? "food" : "water";
    if (!state.unlocks.pastRestart) {
      state.stuck = true;
      state.messages.push({
        priority: "alert",
        time: state.time,
        text: "I'm completely unprepared for this. I feel like there's something I could have done differently in the past.",
      });
      return;
    }
    state.messages.push({
      priority: "alert",
      time: state.time,
      text: state.unlocks.loop
        ? `I'm out of ${resource}. I could help out Past Barry, or loop myself with Future Barry and keep exploring.`
        : `I'm out of ${resource}. I should go help out Past Barry so I can be better prepared.`,
    });
  }

  if (!state.exploration && state.unlocks.autoExplore) {
    const availableActions = explorations.filter((action) => {
      if (state.explorations[action.key]?.progress === 100) {
        return false;
      }
      if (
        action.removed &&
        state.explorations[action.removed]?.progress === 100
      ) {
        return false;
      }
      if (!action.requirements.action) {
        return true;
      }
      return state.explorations[action.requirements.action]?.progress === 100;
    });
    for (const available of availableActions) {
      if (state.autoExplore[available.key]) {
        state.exploration = available.key;
        break;
      }
    }
  }

  if (!state.exploration) {
    return;
  }
  const exploration = findExploration(state.exploration);
  const totalSkills = Object.entries(exploration.train).reduce(
    (acc, [key, multiplier]) => {
      if (!multiplier) {
        return acc;
      }
      const skill = state.skills[key];
      return (
        acc +
        Math.floor(skill.current) *
          multiplier *
          Math.floor(skill.permanent + skill.thisLoop) *
          multiplier
      );
    },
    0,
  );

  const totalTime = delta * Math.sqrt(totalSkills) ** 0.7;
  const progress = (100 / exploration.time) * totalTime;
  state.explorations[state.exploration] ??= { progress: 0 };
  state.explorations[state.exploration]!.progress = Math.min(
    (state.explorations[state.exploration]!.progress ?? 0) + progress,
    100,
  );

  if (exploration.generates) {
    if (exploration.generates.power) {
      const power = (totalTime * exploration.generates.power) / 10_000;
      state.resources.power += power;
      let resourceCost = power * 25;
      const resources = (["food", "water"] as ["food", "water"]).sort(
        (a, b) => {
          return state.resources[b] - state.resources[a];
        },
      );
      for (const resource of ["money", "junk", ...resources] as const) {
        const available = state.resources[resource];
        const toDeduct = Math.min(available, resourceCost);
        state.resources[resource] = state.resources[resource] - toDeduct;
        resourceCost -= toDeduct;
      }
    }
  }

  if (state.explorations[state.exploration]!.progress === 100) {
    const unlock = findUnlockFor({ exploration: exploration.key });
    state.exploration = undefined;
    if (unlock && !state.unlocks[unlock.key]) {
      state.unlocks[unlock.key] = true;
      state.messages.push({ ...unlock.message, time: state.time });
    }
    if (unlock?.key === "convergence") {
      state.phase = "convergence";
      state.expandStart = state.time;
    }
    if (exploration.message) {
      state.messages.push({
        priority: "info",
        text: exploration.message,
        time: state.time,
      });
    }
  }
};

const updateStats: Updater = (state, delta) => {
  if (!state.exploration) {
    return;
  }

  const exploration = findExploration(state.exploration);
  for (const [stat, rate] of Object.entries(exploration.train)) {
    if (rate) {
      state.skills[stat].current += (delta * rate) / 400000;
      state.skills[stat].thisLoop += (delta * rate) / (400000 * 3);
    }
  }
};

const updatePostResources: Updater = (state, delta) => {
  const { timers } = state;
  if (!state.exploration) {
    return;
  }

  timers.food += delta;
  const counts = Math.floor(timers.food / RESOURCE_DRAIN_BASE_TIME);

  if (counts) {
    for (const resource of ["food", "water"] as const) {
      const exploration = findExploration(state.exploration);
      timers[resource] = timers[resource] % RESOURCE_DRAIN_BASE_TIME;
      state.resources[resource] = Math.max(
        state.resources[resource] - counts * (exploration.drain[resource] ?? 1),
        0,
      );
    }
  }
};
