import { Updater } from "../types";

export const updateMaxResources: Updater = (state) => {
  for (const resource of Object.keys(state.resources)) {
    state.maxResources[resource] = Math.max(
      state.maxResources[resource],
      state.resources[resource],
    );
  }
};
