import { State } from "@laundry/store";
import { Patch } from "immer";

export type Message =
  | {
      type: "INITIAL";
      payload: State;
    }
  | {
      type: "UPDATE";
      payload: Patch[];
    };
