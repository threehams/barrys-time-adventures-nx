import { useDispatch, useSelector } from "../StateProvider";
import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import {
  canPurchaseUpgrade,
  canShowUpgrade,
  findResource,
  Resource,
  sources,
  Upgrade,
  UpgradeKey,
  upgrades,
} from "@laundry/store";
import { Button } from "@laundry/ui";
import clsx from "clsx";
import { hoursToSeconds } from "date-fns";
import { EffectText } from "../EffectText";

type Props = {
  className?: string;
  selectedUpgrade?: UpgradeKey | undefined;
  setSelectedUpgrade?: Dispatch<SetStateAction<UpgradeKey | undefined>>;
};
export const Upgrades = ({
  className,
  selectedUpgrade,
  setSelectedUpgrade,
}: Props) => {
  const resources = useSelector((state) => state.resources);
  const unlocks = useSelector((state) => state.unlocks);
  const autoUpgrade = useSelector((state) => state.autoUpgrade);
  const maxResources = useSelector((state) => state.maxResources);
  const phase = useSelector((state) => state.phase);
  const purchasedUpgrades = useSelector((state) => state.upgrades);
  const timedUpgradeMap = useSelector((state) => state.timedUpgrades);
  const playerExplorations = useSelector((state) => state.explorations);
  const dispatch = useDispatch();
  const [maxLevels, setMaxLevels] = useState<{ [Key in UpgradeKey]?: number }>(
    {},
  );

  const sourceUpgrades = useMemo(() => {
    return sources.map((source) => {
      const available = upgrades.filter((upgrade) => {
        if (upgrade.source !== source.key) {
          return false;
        }
        if (
          !canShowUpgrade({
            upgrade,
            phase,
            playerExplorations,
            purchasedUpgrades,
            timedUpgrades: timedUpgradeMap,
            resources,
            maxResources,
          })
        ) {
          return false;
        }
        return true;
      });
      return { source, available };
    });
  }, [
    maxResources,
    phase,
    playerExplorations,
    purchasedUpgrades,
    resources,
    timedUpgradeMap,
  ]);

  return (
    <ul className={clsx("flex flex-col gap-2", className)}>
      {sourceUpgrades.map((value) => {
        const resourceGroup = findResource(value.source.resource);
        if (
          !value.available.length &&
          !(unlocks.autoPurchase && phase === "preEvent")
        ) {
          return null;
        }
        const autoEnabled =
          (unlocks.autoPurchase && phase === "preEvent") ||
          (unlocks.autoPurchaseExpand &&
            (phase === "expand" || phase === "collapse"));

        return (
          <li key={value.source.key}>
            <div className="flex items-center gap-2 mb-1">
              {autoEnabled && (
                <Button
                  active={autoUpgrade[value.source.key]}
                  onClick={() => {
                    dispatch({
                      type: "SET_AUTO_PURCHASE",
                      payload: {
                        key: value.source.key,
                        enabled: !autoUpgrade[value.source.key],
                      },
                    });
                  }}
                >
                  Auto
                </Button>
              )}
              <h2>
                {resourceGroup.name}: {value.source.name}
              </h2>
            </div>

            <ul className={clsx("flex flex-col gap-2", className)}>
              {value.available.map((upgrade) => {
                const level =
                  purchasedUpgrades[upgrade.key]?.level ??
                  timedUpgradeMap[upgrade.key]?.level ??
                  0;
                const distance =
                  upgrade.phase === "postEvent"
                    ? Math.floor(
                        30 -
                          (timedUpgradeMap[upgrade.key]?.time ?? 0) /
                            hoursToSeconds(24),
                      ) ?? 1
                    : 0;
                const flavorText = upgrade.flavorTexts[level];
                const costs = Object.entries(upgrade.costs)
                  .map(([key, calc]) => {
                    if (!calc) {
                      return null;
                    }
                    const resource = findResource(key);
                    return resource.formatWithType(calc(level + 1, distance));
                  })
                  .filter(Boolean)
                  .join(", ");

                const currentDistance =
                  30 -
                  Math.floor(
                    (timedUpgradeMap[upgrade.key]?.time ?? 0) /
                      hoursToSeconds(24),
                  );

                return (
                  <li
                    className="flex flex-col p-2 border rounded-sm gap-x-2"
                    key={upgrade.key}
                  >
                    <div className="flex flex-row gap-2">
                      {(upgrade.phase === "preEvent" ||
                        upgrade.phase === "expand") && (
                        <Button
                          className={clsx(
                            selectedUpgrade === upgrade.key && "z-20",
                          )}
                          disabled={
                            !canPurchaseUpgrade({
                              upgrade,
                              phase,
                              playerExplorations,
                              purchasedUpgrades,
                              timedUpgrades: timedUpgradeMap,
                              distance: 0,
                              resources,
                              maxResources,
                            })
                          }
                          aria-label={`Buy ${upgrade.name}`}
                          active={selectedUpgrade === upgrade.key}
                          onClick={() => {
                            dispatch({
                              type: "BUY_UPGRADE",
                              payload: { key: upgrade.key },
                            });
                          }}
                        >
                          Buy{" "}
                          {level > 0
                            ? `(${level === upgrade.max ? "MAX" : level})`
                            : ""}
                        </Button>
                      )}
                      {upgrade.phase === "postEvent" && level === 0 && (
                        <Button
                          className={clsx(
                            selectedUpgrade === upgrade.key && "z-20",
                          )}
                          disabled={
                            !canPurchaseUpgrade({
                              upgrade,
                              phase,
                              playerExplorations,
                              purchasedUpgrades,
                              timedUpgrades: timedUpgradeMap,
                              distance: 0,
                              resources,
                              maxResources,
                            })
                          }
                          active={selectedUpgrade === upgrade.key}
                          onClick={() => {
                            setSelectedUpgrade?.((current) =>
                              current === upgrade.key ? undefined : upgrade.key,
                            );
                            return;
                          }}
                        >
                          Buy
                        </Button>
                      )}
                      {upgrade.phase === "postEvent" && level > 0 && (
                        <>
                          <Button
                            className={clsx(
                              selectedUpgrade === upgrade.key && "z-20",
                            )}
                            disabled={
                              !canPurchaseUpgrade({
                                upgrade,
                                phase,
                                playerExplorations,
                                purchasedUpgrades,
                                timedUpgrades: timedUpgradeMap,
                                distance: currentDistance + 1,
                                resources,
                                maxResources,
                                level,
                              }) || distance === 30
                            }
                            active={selectedUpgrade === upgrade.key}
                            onClick={() => {
                              setSelectedUpgrade?.((current) =>
                                current === upgrade.key
                                  ? undefined
                                  : upgrade.key,
                              );
                              return;
                            }}
                          >
                            Move Upgrade
                          </Button>
                          <Button
                            disabled={
                              !canPurchaseUpgrade({
                                upgrade,
                                phase,
                                playerExplorations,
                                purchasedUpgrades,
                                timedUpgrades: timedUpgradeMap,
                                distance: currentDistance,
                                resources,
                                maxResources,
                              })
                            }
                            onClick={() => {
                              dispatch({
                                type: "UPGRADE_TIMED_UPGRADE",
                                payload: {
                                  key: upgrade.key,
                                },
                              });
                            }}
                          >
                            Buy Level
                          </Button>
                        </>
                      )}
                      <div>
                        {upgrade.name} {level !== upgrade.max && `(${costs})`}
                      </div>
                    </div>
                    {level !== upgrade.max && (
                      <>
                        {autoEnabled && (
                          <label>
                            Max Auto Level{" "}
                            <input
                              className="mt-1 text-gray-900"
                              size={5}
                              value={maxLevels[upgrade.key] ?? ""}
                              onChange={(event) => {
                                setMaxLevels({
                                  ...maxLevels,
                                  [upgrade.key]: event.target.value,
                                });
                              }}
                              onBlur={() => {
                                dispatch({
                                  type: "SET_AUTO_MAX_LEVEL",
                                  payload: {
                                    key: upgrade.key,
                                    maxLevel:
                                      maxLevels[upgrade.key] || undefined,
                                  },
                                });
                              }}
                            />
                          </label>
                        )}{" "}
                        <p>{upgradeEffect(upgrade, level)}</p>
                        <EffectText>{upgrade.description}</EffectText>
                      </>
                    )}
                    {flavorText && <p className="col-start-2">{flavorText}</p>}
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
};

const upgradeEffect = (upgrade: Upgrade, currentLevel: number) => {
  if (currentLevel + 1 > upgrade.max) {
    return "";
  }
  const [resourceKey, resourceFunc] = Object.entries(upgrade.effect).find(
    ([key, func]) => {
      return key !== "type" && !!func;
    },
  )! as [Resource, (level: number) => number];
  const resource = findResource(resourceKey);
  const diff =
    currentLevel === 0
      ? resourceFunc(currentLevel + 1)
      : resourceFunc(currentLevel + 1) - resourceFunc(currentLevel);
  if (upgrade.effect.type === "add") {
    return `+${Math.floor(diff)} ${resource.name} gain`;
  } else if (upgrade.effect.type === "multiply") {
    return `+${diff.toFixed(2)}x ${resource.name} gain`;
  } else {
    return `+${Math.abs(diff).toFixed(2)}x ${resource.name} speed`;
  }
};
