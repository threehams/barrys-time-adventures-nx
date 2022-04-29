import { initialState } from "@laundry/store";
import { hoursToSeconds } from "date-fns";
import produce from "immer";
import { eventHandler } from "./eventHandler";
import { describe, expect, it } from "@jest/globals";

describe("eventHandler", () => {
  describe("TRAVEL", () => {
    it("replays the game up to the specified day", () => {
      const state = produce(initialState, (draft) => {
        draft.phase = "traveling";
        draft.upgrades = {
          PM1: { level: 2 },
        };
        draft.timeline = [
          {
            time: 1000,
            action: {
              type: "BUY_UPGRADE",
              payload: {
                key: "PM1",
              },
            },
          },
          {
            time: 1001,
            action: {
              type: "BUY_UPGRADE",
              payload: {
                key: "PM1",
              },
            },
          },
        ];
        eventHandler(draft, {
          type: "TRAVEL",
          payload: {
            day: 1,
          },
        });
      });
      expect(state.time).toEqual(hoursToSeconds(24));
      expect(state.upgrades).toEqual({
        PM1: { level: 2 },
      });
      expect(state.timeline).toEqual([
        {
          time: 1000,
          action: {
            type: "BUY_UPGRADE",
            payload: {
              key: "PM1",
            },
          },
        },
        {
          time: 1001,
          action: {
            type: "BUY_UPGRADE",
            payload: {
              key: "PM1",
            },
          },
        },
      ]);
    });

    it("resets upgrades on and after the specified day", () => {
      const state = produce(initialState, (draft) => {
        draft.upgrades = {
          PM1: { level: 2 },
        };
        draft.timeline = [
          {
            time: 1000,
            action: {
              type: "BUY_UPGRADE",
              payload: {
                key: "PM1",
              },
            },
          },
          {
            time: hoursToSeconds(25),
            action: {
              type: "BUY_UPGRADE",
              payload: {
                key: "PM1",
              },
            },
          },
        ];
        eventHandler(draft, {
          type: "TRAVEL",
          payload: {
            day: 1,
          },
        });
      });
      expect(state.time).toEqual(hoursToSeconds(24));
      expect(state.upgrades).toEqual({
        ...initialState.upgrades,
        PM1: { level: 1 },
      });
      expect(state.timeline).toEqual([
        {
          time: 1000,
          action: {
            type: "BUY_UPGRADE",
            payload: {
              key: "PM1",
            },
          },
        },
      ]);
    });
  });
});
