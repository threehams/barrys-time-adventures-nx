import { UpgradeKey } from "@barry/store";
import { Cheats } from "../panels/Cheats";
import { ExplorationTabs } from "../panels/ExplorationTabs";
import { Import } from "../panels/Import";
import { Messages } from "../panels/Messages";
import { Reset } from "../panels/Reset";
import { Speedup } from "../panels/Speedup";
import { Timeline } from "../panels/Timeline";
import { WindowPane } from "../panels/WindowPane";
import { useSelector } from "../StateProvider";
import { Status } from "../Status";
import { useState } from "react";

type Panel = "explorations" | "upgrades";

export const PostEvent = () => {
  const [selectedUpgrade, setSelectedUpgrade] = useState<
    UpgradeKey | undefined
  >();
  const [panel, setPanel] = useState<Panel>("explorations");
  const pastRestart = useSelector((state) => state.unlocks.pastRestart);

  return (
    <>
      {selectedUpgrade && (
        <div className="fixed z-10 w-screen h-screen bg-gray-900 opacity-70"></div>
      )}
      <main className="grid [grid-area:main] py-2 gap-2 grid-cols-[1fr_240px]">
        <ExplorationTabs
          panel={panel}
          setPanel={setPanel}
          selectedUpgrade={selectedUpgrade}
          setSelectedUpgrade={setSelectedUpgrade}
        />
        <aside className="sticky top-[0px] py-2">
          <Cheats />
          <Speedup />
          <Status className="mb-3" />
          <Reset />
          <Import />
        </aside>
      </main>
      <WindowPane />
      <div className="[grid-area:messages] sticky top-[0px] py-2">
        <Messages />
      </div>

      {pastRestart && (
        <Timeline
          className="relative z-20"
          selectedUpgradeKey={selectedUpgrade}
          setSelectedUpgrade={setSelectedUpgrade}
        />
      )}
    </>
  );
};
