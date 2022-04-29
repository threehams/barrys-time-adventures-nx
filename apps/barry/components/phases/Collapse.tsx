import { Cheats } from "components/panels/Cheats";
import { Import } from "components/panels/Import";
import { Messages } from "components/panels/Messages";
import { Reset } from "components/panels/Reset";
import { Speedup } from "components/panels/Speedup";
import { Upgrades } from "components/panels/Upgrades";
import { WindowPane } from "components/panels/WindowPane";
import { Status } from "components/Status";

export const Collapse = () => {
  return (
    <>
      <main className="grid [grid-area:main] py-2 gap-2 grid-cols-[1fr_240px]">
        <div>
          <h2 className="mb-2">Upgrades</h2>
          <Upgrades />
        </div>
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
    </>
  );
};
