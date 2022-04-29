import { useSelector } from "./StateProvider";
import { addMilliseconds, format, hoursToSeconds, sub } from "date-fns";
import { Progress } from "@laundry/ui";
import {
  findResource,
  findSkill,
  findSource,
  getAllUpgrades,
  getSourceAmount,
  getSourceTime,
  sources,
} from "@laundry/store";
import { groupBy } from "lodash";

const THE_EVENT_DATE = new Date(1997, 7, 29, 2, 14, 0).valueOf();
const START_DATE = sub(THE_EVENT_DATE, { days: 30 }).valueOf();
const POST_EVENT_START_DATE = new Date(2978, 1, 23, 1, 14, 0);

type Props = {
  className?: string;
};
export const Status = ({ className }: Props) => {
  const time = useSelector((state) => state.time);
  const resources = useSelector((state) => state.resources);
  const maxResources = useSelector((state) => state.maxResources);
  const phase = useSelector((state) => state.phase);
  const skills = useSelector((state) => state.skills);
  const upgrades = useSelector((state) => state.upgrades);
  const timedUpgrades = useSelector((state) => state.timedUpgrades);
  const unlocks = useSelector((state) => state.unlocks);
  const allUpgrades = getAllUpgrades({ upgrades, time, timedUpgrades });
  const timers = useSelector((state) => state.timers);
  const upgradesBySource = groupBy(
    allUpgrades,
    (value) => value.upgrade.source,
  );

  const startDate =
    phase === "postEvent" || phase === "traveling"
      ? POST_EVENT_START_DATE
      : START_DATE;

  const timeOfDay = format(
    addMilliseconds(startDate, time * 1000),
    "MMMM d, yyyy HH'h'",
  );
  let phaseResources =
    phase === "expand" || phase === "collapse"
      ? (["barry"] as const)
      : (["junk", "money", "food", "water", "power"] as const);

  return (
    <div className={className}>
      <div className="mb-2">
        <div className="mb-2">It is {timeOfDay}.</div>
        <h2 className="mb-1 font-bold">Inventory</h2>
        <ul className="space-y-2">
          {phaseResources.map((key) => {
            if (maxResources[key] === 0) {
              return null;
            }
            const resource = findResource(key);
            return (
              <li key={key} className="p-2 border rounded-md">
                <div className="flex justify-between mb-1 font-semibold">
                  <span>{resource.name}</span>
                  <span>{resource.format(resources[key])}</span>
                </div>
                {(phase === "expand" || phase === "collapse") && (
                  <Progress
                    progress={
                      (timers.copies /
                        getSourceTime(
                          upgradesBySource?.copies ?? [],
                          findSource("copies"),
                        )) *
                      100
                    }
                  />
                )}

                {phase === "preEvent" && (
                  <ul>
                    {sources
                      .filter((source) => source.resource === key)
                      .map((source) => {
                        const oneDay = hoursToSeconds(24);
                        if (!upgradesBySource[source.key]) {
                          return null;
                        }
                        const sourceAmount = getSourceAmount(
                          upgradesBySource[source.key],
                          source,
                        );
                        const sourceTime = getSourceTime(
                          upgradesBySource[source.key],
                          source,
                        );
                        const perDay = sourceAmount * (oneDay / sourceTime);

                        return (
                          <li key={source.key}>
                            <div className="flex justify-between">
                              <span>{source.name}</span>
                              <span>
                                {resource.format(Math.floor(perDay))}
                                /day
                              </span>
                            </div>
                            <Progress
                              progress={
                                sourceAmount === 0
                                  ? 0
                                  : (timers[source.key] / sourceTime) * 100
                              }
                            />
                          </li>
                        );
                      })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      {!!(phase === "postEvent" || phase === "traveling") && (
        <div>
          <h2 className="font-bold">Skills</h2>
          <ul>
            {Object.entries(skills).map(([skill, value]) => {
              return (
                <li key={skill}>
                  <div className="flex justify-between">
                    <span>{findSkill(skill).name}</span>
                    <span>
                      {Math.floor(value.current)}{" "}
                      {unlocks.loop &&
                        `/ ${Math.floor(value.permanent + value.thisLoop)}`}
                    </span>
                  </div>

                  <Progress progress={(value.current * 100) % 100} />
                  {unlocks.loop && (
                    <Progress
                      variant="primary"
                      progress={
                        ((value.permanent + value.thisLoop) * 100) % 100
                      }
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
