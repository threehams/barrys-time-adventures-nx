import { Updater } from "../types";

export const updateConvergence: Updater = (state, delta) => {
  if (state.phase !== "convergence") {
    return;
  }
  state.timers.convergence += delta;
  if (state.timers.convergence > 14500) {
    state.timers.convergence = 0;
    state.phase = "expand";
    state.resources.barry = state.loops;
    state.multiplier = 2;
  }
};
