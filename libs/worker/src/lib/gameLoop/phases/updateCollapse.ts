import { Updater } from "../types";
import { updateTime, updateMessages } from "../updaters";

export const updateCollapse: Updater = (state, delta) => {
  const elapsedTime = Math.min(delta * state.multiplier);

  updateTime(state, elapsedTime);
  if (state.resources.barry <= 0.99) {
    state.resources.barry = 0;
    state.phase = "done";
    return;
  }

  // divide barrys by half every 10 seconds
  state.resources.barry -= (state.resources.barry * 0.5) / (8_000 / delta);
  updateMessages(state, elapsedTime);
};
