import { Updater } from "../types";

export const updateTime: Updater = (state, delta) => {
  state.time = state.time + delta;
};
