import {
  updatePreEvent,
  updateEvent,
  updatePostEvent,
  updateConvergence,
  updateExpand,
  updateCollapse,
} from "./phases";
import { Updater } from "./types/Updater";

export const updateGame: Updater = (state, delta) => {
  switch (state.phase) {
    case "preEvent":
      updatePreEvent(state, delta);
      break;
    case "event":
      updateEvent(state, delta);
      break;
    case "postEvent":
      updatePostEvent(state, delta);
      break;
    case "traveling":
      break;
    case "convergence":
      updateConvergence(state, delta);
      break;
    case "expand":
      updateExpand(state, delta);
      break;
    case "collapse":
      updateCollapse(state, delta);
      break;
    case "done":
      break;
    default:
      throw new Error(`no updater found for phase: ${state.phase}`);
  }
};
