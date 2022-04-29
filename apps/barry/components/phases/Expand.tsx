import { Cheats } from "../panels/Cheats";
import { Import } from "../panels/Import";
import { Messages } from "../panels/Messages";
import { Reset } from "../panels/Reset";
import { Speedup } from "../panels/Speedup";
import { Upgrades } from "../panels/Upgrades";
import { WindowPane } from "../panels/WindowPane";
import { Status } from "../Status";

export const Expand = () => {
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
