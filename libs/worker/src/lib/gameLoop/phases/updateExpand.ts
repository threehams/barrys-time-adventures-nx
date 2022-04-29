import { Updater } from "../types";
import {
  updateTime,
  updateAutoPurchase,
  updateResourceGain,
  updateMaxResources,
  updateMessages,
} from "../updaters";

export const updateExpand: Updater = (state, delta) => {
  const elapsedTime = Math.min(delta * state.multiplier);
  updateTime(state, elapsedTime);
  if (state.unlocks.autoPurchaseExpand) {
    updateAutoPurchase(state, elapsedTime);
  }
  updateResourceGain(state, elapsedTime);
  updateMaxResources(state, elapsedTime);
  updateMessages(state, elapsedTime);

  if (state.resources.barry >= 6_000_000_000) {
    state.collapseStart = state.time;
    state.phase = "collapse";
  }
};
