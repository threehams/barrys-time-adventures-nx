import { Phase } from "@laundry/store";
import clsx from "clsx";
import React from "react";
import { useSelector } from "./StateProvider";

type Props = {
  children?: React.ReactNode;
};
export const Layout = ({ children }: Props) => {
  const phase = useSelector((state) => state.phase);

  return (
    <div className={clsx("relative min-h-screen", backgroundFor(phase))}>
      <div
        className={clsx(
          "px-4 grid mx-auto min-w-[1080px] max-w-[1680px] gap-3 items-start",
          "grid-rows-[auto_1fr]",
          "grid-cols-[400px_1fr_240px_auto]",
          "lg:grid-cols-[400px_1fr_240px_auto]",
        )}
        style={{
          gridTemplateAreas: `
      "timeline timeline timeline window"
      "messages main main window"
    `,
        }}
      >
        {children}
      </div>
    </div>
  );
};

const backgroundFor = (phase: Phase) => {
  if (phase === "preEvent") {
    return "bg-gray-900 text-gray-100";
  }
  return "bg-stone-900 text-stone-100";
};
