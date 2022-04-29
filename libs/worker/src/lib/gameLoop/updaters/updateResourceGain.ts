import {
  getAllUpgrades,
  getSourceAmount,
  getSourceTime,
  sources,
} from "@barry/store";
import { groupBy } from "lodash";
import { Updater } from "../types";

export const updateResourceGain: Updater = (state, delta) => {
  const { timers } = state;

  const allUpgrades = getAllUpgrades(state);
  const upgradesBySource = groupBy(
    allUpgrades,
    (value) => value.upgrade.source,
  );

  for (const source of sources) {
    const sourceUpgrades = upgradesBySource[source.key];
    if (!sourceUpgrades) {
      continue;
    }

    timers[source.key] += delta;
    const time = getSourceTime(sourceUpgrades, source);

    // apply upgrades to time
    const counts = Math.floor(timers[source.key] / time);

    if (counts) {
      const perCount = getSourceAmount(sourceUpgrades, source);

      timers[source.key] = timers[source.key] % time;
      state.resources[source.resource] += Math.floor(counts * perCount);
      if (
        state.resources[source.resource] === null ||
        state.resources[source.resource] === Infinity
      ) {
        debugger;
      }
    }
  }
};
