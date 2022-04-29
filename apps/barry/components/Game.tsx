import React, { useMemo } from "react";
import { useSelector } from "./StateProvider";
import { Event } from "./phases/Event";
import { Ending } from "./phases/Ending";
import { Convergence } from "./phases/Convergence";
import { PreEvent } from "./phases/PreEvent";
import { PostEvent } from "./phases/PostEvent";
import { Layout } from "./Layout";
import { Collapse, Expand } from "./phases";

export const Game = () => {
  const phase = useSelector((state) => state.phase);

  const layout = useMemo(() => {
    if (phase === "done") {
      return <Ending />;
    }
    if (phase === "convergence") {
      return <Convergence />;
    }
    if (phase === "event") {
      return <Event />;
    }

    const getComponent = () => {
      switch (phase) {
        case "preEvent":
          return <PreEvent />;
        case "postEvent":
        case "traveling":
          return <PostEvent />;
        case "expand":
          return <Expand />;
        case "collapse":
          return <Collapse />;
        default:
          throw new Error(`No component found for phase: ${phase}`);
      }
    };
    return <Layout>{getComponent()}</Layout>;
  }, [phase]);

  return <>{layout}</>;
};
