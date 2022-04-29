import { State } from "@barry/store";
import { Draft } from "immer";

export type Updater = (
  state: Draft<State>,
  delta: number,
) => Draft<State> | void;
