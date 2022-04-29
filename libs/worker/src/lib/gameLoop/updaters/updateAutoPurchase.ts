import { canPurchaseUpgrade, canShowUpgrade, upgrades } from "@laundry/store";
import { Updater } from "../types/Updater";

const AUTO_PURCHASE_TIME = 10_000;

export const updateAutoPurchase: Updater = (state, delta) => {
  state.timers.autoPurchase += delta;
  if (state.timers.autoPurchase > AUTO_PURCHASE_TIME) {
    const allUpgrades = upgrades.filter((upgrade) => {
      return (
        upgrade.phase === state.phase &&
        state.autoUpgrade[upgrade.source] &&
        canShowUpgrade({
          upgrade,
          maxResources: state.maxResources,
          phase: state.phase,
          playerExplorations: state.explorations,
          purchasedUpgrades: state.upgrades,
          resources: state.resources,
          timedUpgrades: state.timedUpgrades,
        })
      );
    });

    for (const upgrade of allUpgrades) {
      if (
        canPurchaseUpgrade({
          distance: 0,
          maxResources: state.maxResources,
          phase: state.phase,
          playerExplorations: state.explorations,
          purchasedUpgrades: state.upgrades,
          resources: state.resources,
          timedUpgrades: state.timedUpgrades,
          upgrade,
        }) &&
        (state.upgrades[upgrade.key]?.level ?? 0) <
          (state.autoUpgradeLevels[upgrade.key] ?? Infinity)
      ) {
        const currentLevel = state.upgrades[upgrade.key]?.level ?? 0;
        const nextLevel = currentLevel + 1;

        for (const costKey of Object.keys(upgrade.costs)) {
          state.resources[costKey] -=
            upgrade.costs[costKey]?.(nextLevel, 0) ?? 0;
        }
        state.upgrades[upgrade.key] = { level: nextLevel };
        if (state.phase === "preEvent") {
          state.timeline.push({
            time: state.time,
            action: {
              type: "BUY_UPGRADE",
              payload: {
                key: upgrade.key,
              },
            },
          });
        }
      }
    }
  }
};
