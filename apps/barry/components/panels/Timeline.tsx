import {
  canPurchaseUpgrade,
  findResource,
  findUpgrade,
  StateAction,
  Upgrade,
  upgradeCost,
  UpgradeKey,
} from "@barry/store";
import { useDispatch, useSelector } from "../StateProvider";
import {
  format,
  hoursToMilliseconds,
  add,
  sub,
  hoursToSeconds,
} from "date-fns";
import { groupBy, range } from "lodash";
import { Button } from "@barry/ui";
import { Dispatch, SetStateAction, useState } from "react";
import clsx from "clsx";
import { isNonNullable } from "@barry/utils";

const ONE_DAY = hoursToMilliseconds(24) / 1000;
const THE_EVENT_DATE = new Date(1997, 7, 29, 2, 14, 0);
const START_DATE = sub(THE_EVENT_DATE, { days: 30 });

type TimelineProps = {
  selectedUpgradeKey?: UpgradeKey | undefined;
  setSelectedUpgrade?: Dispatch<SetStateAction<UpgradeKey | undefined>>;
  className?: string;
};
export const Timeline = ({
  selectedUpgradeKey,
  setSelectedUpgrade,
  className,
}: TimelineProps) => {
  const dispatch = useDispatch();
  const preEvents = useSelector((state) => state.timeline);
  const unlocks = useSelector((state) => state.unlocks);
  const timedUpgradeMap = useSelector((state) => state.timedUpgrades);
  const purchasedUpgrades = useSelector((state) => state.upgrades);
  const playerExplorations = useSelector((state) => state.explorations);
  const phase = useSelector((state) => state.phase);
  const resources = useSelector((state) => state.resources);
  const maxResources = useSelector((state) => state.maxResources);
  const currentDay = useSelector((state) =>
    Math.floor(state.time / hoursToSeconds(24)),
  );
  const [selectedDay, setSelectedDay] = useState<number | undefined>(undefined);
  const selectedUpgrade = selectedUpgradeKey
    ? findUpgrade(selectedUpgradeKey)
    : undefined;

  const timedUpgrades = Object.entries(timedUpgradeMap)
    .filter((entry) => isNonNullable(entry[1]))
    .filter((entry) => {
      if (!unlocks.timelineEvents && findUpgrade(entry[0]).type === "event") {
        return false;
      }
      return true;
    })
    .map(([key, value]): TimelineEvent => {
      const upgrade = findUpgrade(key);
      return {
        type: upgrade.type === "purchased" ? "permanent" : "event",
        time: value!.time,
        text: `${upgrade.type === "purchased" ? "Timed upgrade" : "Event"}: ${
          upgrade.name
        } (${timedUpgradeMap[upgrade.key]?.level ?? 1})`,
      };
    });
  const events = preEvents.map((event): TimelineEvent => {
    return {
      type: "upgrade",
      time: event.time,
      text: formatAction(event.action),
    };
  });
  const allEvents = [...timedUpgrades, ...events];
  const timeline = groupBy(allEvents, (event) =>
    Math.floor(event.time / ONE_DAY),
  );

  return (
    <div className={clsx("inline-block [grid-area:timeline]", className)}>
      <div className="relative flex items-center justify-between">
        <h2>Timeline</h2>
        {unlocks.loop && phase === "traveling" && (
          <Button
            variant="danger"
            onClick={() => {
              setSelectedDay(undefined);
              dispatch({ type: "LOOP" });
            }}
          >
            Loop
          </Button>
        )}
      </div>
      <ul className="flex flex-nowrap">
        {range(0, 30).map((day) => {
          const availableUpgrades = !!timeline[day]?.find(
            (event) => event.type === "upgrade",
          );
          const availablePermanent = !!timeline[day]?.find(
            (event) => event.type === "permanent",
          );
          const availableEvent = !!timeline[day]?.find(
            (event) => event.type === "event",
          );
          let muted;
          if (selectedUpgrade) {
            const currentLevel =
              timedUpgradeMap[selectedUpgrade.key]?.level ?? 0;
            const upgradeDay = Math.floor(
              (timedUpgradeMap[selectedUpgrade.key]?.time ??
                hoursToSeconds(24 * 30)) / hoursToSeconds(24),
            );
            muted =
              !canPurchaseUpgrade({
                phase,
                upgrade: selectedUpgrade,
                resources,
                maxResources,
                distance: 30 - day,
                purchasedUpgrades,
                timedUpgrades: timedUpgradeMap,
                playerExplorations,
                level: currentLevel ?? 1,
              }) || day >= upgradeDay;
          } else {
            muted =
              (phase === "traveling" &&
                selectedDay !== undefined &&
                selectedDay <= day) ||
              (phase === "preEvent" && day < currentDay);
          }
          return (
            <button
              className={clsx(
                "inline-grid relative border-2 border-gray-300 w-[32px] h-[32px] grid-cols-2 grid-rows-2 -ml-[2px]",
                muted && "border-opacity-20",
                day === selectedDay && "shadow-[0_0_0_3px_red] z-10",
              )}
              style={{
                gridTemplateAreas: `
                "upgrade permanent"
                "event ."
              `,
              }}
              onClick={() => {
                if (selectedDay === day) {
                  setSelectedDay(undefined);
                  return;
                }
                setSelectedDay(day);
              }}
              key={day}
            >
              {availableUpgrades && (
                <div
                  className={clsx(
                    "[grid-area:upgrade] aspect-[1/1] bg-blue-700",
                    phase === "traveling" &&
                      selectedDay !== undefined &&
                      selectedDay <= day &&
                      "opacity-20",
                  )}
                ></div>
              )}
              {availablePermanent && (
                <div className="[grid-area:permanent] aspect-[1/1] bg-green-500"></div>
              )}
              {availableEvent && (
                <div className="[grid-area:event] aspect-[1/1] bg-red-500"></div>
              )}
            </button>
          );
        })}
      </ul>
      {selectedDay !== undefined && (
        <DayDetail
          key={selectedDay}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          timeline={timeline}
          selectedUpgrade={selectedUpgrade}
          setSelectedUpgrade={setSelectedUpgrade}
        ></DayDetail>
      )}
    </div>
  );
};

type TimelineEvent = {
  type: "upgrade" | "permanent" | "event";
  time: number;
  text: string;
};

type DayDetailProps = {
  selectedDay: number;
  setSelectedDay: (day: number | undefined) => void;
  selectedUpgrade: Upgrade | undefined;
  setSelectedUpgrade?: Dispatch<SetStateAction<UpgradeKey | undefined>>;
  timeline: {
    [key: number]: TimelineEvent[];
  };
};
const DayDetail = ({
  selectedDay,
  setSelectedDay,
  timeline,
  selectedUpgrade,
  setSelectedUpgrade,
}: DayDetailProps) => {
  const events = timeline[selectedDay];
  const phase = useSelector((state) => state.phase);
  const unlocks = useSelector((state) => state.unlocks);
  const timedUpgradeMap = useSelector((state) => state.timedUpgrades);
  const resources = useSelector((state) => state.resources);
  const dispatch = useDispatch();
  const [confirm, setConfirm] = useState(false);

  return (
    <div
      className="relative grid grid-cols-[1fr_50px] border p-2 border-t-0 rounded-b-md"
      style={{
        gridTemplateAreas: `
      "restart close"
      "events events"
    `,
      }}
    >
      <Button
        className="[grid-area:close]"
        onClick={() => {
          setSelectedDay(undefined);
        }}
      >
        X
      </Button>
      {selectedUpgrade && (
        <div className="[grid-area:restart]">
          <Button
            active
            disabled={
              Math.floor(
                (timedUpgradeMap[selectedUpgrade.key]?.time ??
                  hoursToSeconds(24 * 30)) / hoursToSeconds(24),
              ) <= selectedDay
            }
            onClick={() => {
              if (timedUpgradeMap[selectedUpgrade.key]?.level) {
                dispatch({
                  type: "MOVE_TIMED_UPGRADE",
                  payload: {
                    key: selectedUpgrade.key,
                    day: selectedDay,
                  },
                });
              } else {
                dispatch({
                  type: "BUY_TIMED_UPGRADE",
                  payload: {
                    key: selectedUpgrade.key,
                    day: selectedDay,
                  },
                });
              }
              setSelectedUpgrade?.(undefined);
            }}
          >
            Send Upgrade (
            {upgradeCost({
              upgrade: selectedUpgrade,
              resources,
              currentLevel: timedUpgradeMap[selectedUpgrade.key]?.level,
              level: timedUpgradeMap[selectedUpgrade.key]?.level
                ? timedUpgradeMap[selectedUpgrade.key]?.level
                : undefined,
              distance: 30 - selectedDay,
            })
              .map((resource) =>
                findResource(resource.key).formatWithType(resource.cost),
              )
              .join(",")}
            )
          </Button>
        </div>
      )}
      {selectedDay !== undefined && phase !== "preEvent" && !selectedUpgrade && (
        <div className="[grid-area:restart] mb-1">
          <Button
            className="mr-2"
            variant="danger"
            onClick={() => {
              if (!confirm) {
                setConfirm(true);
                return;
              }
              setConfirm(false);
              setSelectedDay(undefined);
              dispatch({
                type: "TRAVEL",
                payload: {
                  day: selectedDay,
                },
              });
            }}
          >
            {confirm ? "Confirm" : "Restart Here"}
          </Button>
          {confirm && (
            <>
              {unlocks.loop && phase === "traveling" && (
                <span className="text-red-400">
                  WARNING: You should loop before resetting to save any
                  permanent stat progress from this loop.
                </span>
              )}
              <div>
                <span>
                  This will reset your exploration progress, resources
                  (including power), and anything you&apos;ve done on the
                  selected day and after. You will keep all unlocks and Timed
                  Upgrades.
                </span>
                {phase === "postEvent" && (
                  <span className="block mt-1">
                    You may want to explore more before restarting.
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      )}
      {events !== undefined && (
        <ul
          className={clsx(
            "[grid-area:events]",
            selectedUpgrade && "opacity-30",
          )}
        >
          {events.map((event, index) => {
            return (
              <li key={index} className="flex items-center">
                <div
                  className={clsx(
                    "w-[14px] h-[14px] inline-block mr-1",
                    event.type === "upgrade"
                      ? "bg-blue-700"
                      : event.type === "event"
                      ? "bg-red-500"
                      : "bg-green-500",
                  )}
                />
                <span
                  className={clsx(
                    phase === "traveling" &&
                      event.type === "upgrade" &&
                      "text-gray-500",
                  )}
                >
                  {format(
                    add(START_DATE, { seconds: event.time * 1000 }),
                    "hh:mm bb",
                  )}{" "}
                  {event.text}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

const formatAction = (action: StateAction) => {
  switch (action.type) {
    case "BUY_UPGRADE":
      return `Buy upgrade: ${findUpgrade(action.payload.key).name}`;
    case "BUY_TIMED_UPGRADE": {
      const upgrade = findUpgrade(action.payload.key);
      if (upgrade.type === "purchased") {
        return `Timed upgrade: ${upgrade.name}`;
      }
      return `Event: ${upgrade.name}`;
    }
    default:
      throw new Error(`No text found for action: ${action.type}`);
  }
};
