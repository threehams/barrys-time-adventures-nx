import { UpgradeKey } from "@laundry/store";
import { Cheats } from "components/panels/Cheats";
import { ExplorationTabs } from "components/panels/ExplorationTabs";
import { Import } from "components/panels/Import";
import { Messages } from "components/panels/Messages";
import { Reset } from "components/panels/Reset";
import { Speedup } from "components/panels/Speedup";
import { Timeline } from "components/panels/Timeline";
import { WindowPane } from "components/panels/WindowPane";
import { useSelector } from "components/StateProvider";
import { Status } from "components/Status";
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
