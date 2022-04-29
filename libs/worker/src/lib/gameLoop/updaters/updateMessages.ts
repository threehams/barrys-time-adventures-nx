import { findUpgrade } from "@barry/store";
import { news } from "@barry/store";
import { Updater } from "../types";

export const updateMessages: Updater = (state, delta) => {
  for (const [key, value] of Object.entries(state.timedUpgrades)) {
    const upgrade = findUpgrade(key);
    if (!value || upgrade.type !== "event" || state.replay) {
      continue;
    }

    if (value.time <= state.time && value.time > state.time - delta) {
      let text = upgrade.description;
      if (upgrade.negated) {
        const negation = upgrade.negated.upgrade;
        if (
          state.upgrades[negation]?.level ||
          state.timedUpgrades[negation]?.level
        ) {
          text = upgrade.negated.message;
        }
      }

      if (text) {
        state.messages.push({ priority: "alert", text, time: state.time });
      }
    }
  }

  for (const newsMessage of news.filter(
    (message) => message.phase === state.phase,
  )) {
    if (state.replay) {
      continue;
    }
    let timePassed;
    if (newsMessage.phase === "expand") {
      timePassed =
        newsMessage.time &&
        newsMessage.time + state.expandStart! <= state.time &&
        newsMessage.time + state.expandStart! > state.time - delta;
    } else if (newsMessage.phase === "collapse") {
      timePassed =
        newsMessage.time &&
        newsMessage.time + state.collapseStart! <= state.time &&
        newsMessage.time + state.collapseStart! > state.time - delta;
    } else {
      timePassed =
        newsMessage.time &&
        newsMessage.time <= state.time &&
        newsMessage.time > state.time - delta;
    }

    if (timePassed) {
      state.messages.push({
        priority: newsMessage.level ?? "news",
        text: newsMessage.text,
        time: state.time,
      });
    }
  }
};
