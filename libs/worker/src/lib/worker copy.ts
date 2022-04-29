import { initialState, State, StateAction } from "@laundry/store";
import produce, { enablePatches, produceWithPatches } from "immer";
import localForage from "localforage";
import { eventHandler, updateGame } from "./gameLoop";

const VERSION = 2;
const databaseName = "barry";
const savedGameKey = "saved_game";

localForage.config({
  version: VERSION,
  name: databaseName,
  storeName: databaseName,
});

enablePatches();
const worker = self as unknown as Worker;

const main = async () => {
  const getSavedGame = async (): Promise<State> => {
    const savedGame = (await localForage.getItem(savedGameKey)) as State;
    if (!savedGame) {
      return initialState;
    }
    return produce(savedGame, (draft) => {
      draft.timers.autoPurchase ??= 0;
      draft.autoUpgrade ??= {};
      draft.autoExplore ??= {};
    });
  };

  let state = await getSavedGame();
  worker.postMessage({ type: "INITIAL", payload: state });

  setInterval(() => {
    localForage.setItem(savedGameKey, state);
  }, 5000);

  worker.addEventListener("message", (message: { data: StateAction }) => {
    const action = message.data;

    const [nextState, patches] = produceWithPatches(state, (draft) => {
      if (action.type === "IMPORT_GAME") {
        localForage.setItem(savedGameKey, JSON.parse(action.payload.value));
        return;
      }
      if (action.type === "RESET_GAME") {
        localForage.removeItem(savedGameKey);
        return initialState;
      }
      return eventHandler(draft, action);
    });

    state = nextState;
    if (patches.length) {
      worker.postMessage({ type: "UPDATE", payload: patches });
    }
  });

  let previous: number | undefined = undefined;

  const loop = () => {
    const time = new Date().valueOf();
    if (previous === undefined) {
      previous = time;
    }
    // limit offline progress to 1 minute so people don't get stuck
    const delta = Math.min(time - previous, 60_000);
    const [nextState, patches] = produceWithPatches(state, (draft) => {
      updateGame(draft, delta);
    });

    state = nextState;
    if (patches.length) {
      worker.postMessage({ type: "UPDATE", payload: patches });
    }

    previous = time;
    setTimeout(loop, 16);
  };

  loop();
};

main();
