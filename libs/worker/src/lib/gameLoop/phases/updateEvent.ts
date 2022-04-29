import { Updater } from "../types";

export const updateEvent: Updater = (state, delta) => {
  state.timers.event += delta;
  if (state.timers.event > 1000) {
    state.timers.event = 0;
    state.phase = "postEvent";
  }
};
