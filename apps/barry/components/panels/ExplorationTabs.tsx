import { UpgradeKey } from "@laundry/store";
import { Tab, Tabs } from "@laundry/ui";
import { Dispatch, SetStateAction } from "react";
import { Explorations } from "./Explorations";
import { Panel } from "../types/Panel";
import { Upgrades } from "./Upgrades";

type Props = {
  panel: Panel;
  setPanel: (panel: Panel) => void;
  selectedUpgrade: UpgradeKey | undefined;
  setSelectedUpgrade: Dispatch<SetStateAction<UpgradeKey | undefined>>;
};
export const ExplorationTabs = ({
  panel,
  setPanel,
  selectedUpgrade,
  setSelectedUpgrade,
}: Props) => {
  return (
    <div>
      <Tabs className="mb-2">
        <Tab
          active={panel === "explorations"}
          onClick={() => {
            setPanel("explorations");
          }}
        >
          Exploration
        </Tab>
        <Tab
          active={panel === "upgrades"}
          onClick={() => {
            setPanel("upgrades");
          }}
        >
          Send Upgrades
        </Tab>
      </Tabs>
      {panel === "upgrades" && (
        <Upgrades
          selectedUpgrade={selectedUpgrade}
          setSelectedUpgrade={setSelectedUpgrade}
        />
      )}
      {panel === "explorations" && <Explorations />}
    </div>
  );
};
