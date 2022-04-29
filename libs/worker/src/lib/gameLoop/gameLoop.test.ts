import { initialState, State } from "@laundry/store";
import { updateGame } from "./gameLoop";
import { describe, expect, it } from "@jest/globals";
import produce from "immer";

describe("gameLoop", () => {
  describe("preEvent resources", () => {
    it("counts food generated with base upgrades", () => {
      const nextState = produce(initialState, (draft) => {
        draft.upgrades.PF1 = { level: 1 };
        updateGame(draft, 21_000);
      });
      expect(nextState.timers.preserves).toEqual(1_000);
      expect(nextState.resources.food).toEqual(4);
    });

    it("counts food generated with addition upgrades", () => {
      const state: State = {
        ...initialState,
        upgrades: {
          ...initialState.upgrades,
          PF1: {
            level: 4,
          },
        },
      };
      const nextState = produce(state, (draft) => {
        updateGame(draft, 21_000);
      });
      expect(nextState.resources.food).toEqual(16);
    });

    it("counts food generated with multiply upgrades", () => {
      const state: State = {
        ...initialState,
        upgrades: {
          ...initialState.upgrades,
          PF1: {
            level: 2,
          },
          PF2: {
            level: 1,
          },
        },
      };
      const nextState = produce(state, (draft) => {
        updateGame(draft, 21_000);
      });
      expect(nextState.resources.food).toEqual(16);
    });

    it("counts food generated with time upgrades", () => {
      const state: State = {
        ...initialState,
        upgrades: {
          ...initialState.upgrades,
          PF1: {
            level: 2,
          },
          PF2: {
            level: 1,
          },
          PF6: {
            level: 1,
          },
        },
      };
      const nextState = produce(state, (draft) => {
        updateGame(draft, 19_000);
      });
      expect(nextState.timers.preserves).toEqual(3_000);
      expect(nextState.resources.food).toEqual(16);
    });

    it("applies timed upgrades", () => {
      const state: State = {
        ...initialState,
        upgrades: {
          ...initialState.upgrades,
          PW1: {
            level: 2,
          },
        },
        timedUpgrades: {
          TW1: {
            level: 1,
            time: 40_000,
          },
        },
      };
      const nextState = produce(state, (draft) => {
        updateGame(draft, 20_000);
      });
      expect(nextState.timers.rainfall).toEqual(0);
      expect(nextState.resources.water).toEqual(8);
      const nextState2 = produce(nextState, (draft) => {
        updateGame(draft, 20_000);
      });
      expect(nextState2.timers.rainfall).toEqual(0);
      expect(nextState2.resources.water).toEqual(24);
    });
  });
});
