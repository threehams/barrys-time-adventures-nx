import { initialState } from "@barry/store";
import { sub } from "date-fns";
import { Updater } from "../types";
import {
  updateTime,
  updateAutoPurchase,
  updateResourceGain,
  updateMaxResources,
  updateMessages,
} from "../updaters";

const THE_EVENT_DATE = new Date(1997, 7, 29, 2, 14, 0);
const START_DATE = sub(THE_EVENT_DATE, { days: 30 });
const THE_EVENT_TIME = (THE_EVENT_DATE.valueOf() - START_DATE.valueOf()) / 1000;

export const updatePreEvent: Updater = (state, delta) => {
  const elapsedTime = Math.min(
    delta * state.multiplier,
    THE_EVENT_TIME - state.time,
  );

  updateTime(state, elapsedTime);
  if (state.unlocks.autoPurchase) {
    updateAutoPurchase(state, elapsedTime);
  }
  updateResourceGain(state, elapsedTime);
  updateMaxResources(state, elapsedTime);
  updateMessages(state, elapsedTime);

  if (state.time === THE_EVENT_TIME) {
    state.phase = "event";
    state.timers = { ...initialState.timers };
    state.multiplier = 2;
    state.messages = [
      {
        priority: "info",
        text: "That was strange. Where am I?",
        time: state.time,
      },
    ];
  }
};
