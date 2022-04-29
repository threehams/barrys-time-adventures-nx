import { MessageLevel, Phase, Resource } from ".";

export type NewsMessage = {
  phase: Phase;
  level?: MessageLevel;
  text: string;
  time?: number;
  resources?: { [Key in Resource]?: number };
};
