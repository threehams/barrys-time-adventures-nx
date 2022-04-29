import { initialState, UnlockKey } from "@barry/store";
import { Button } from "@barry/ui";
import { useDispatch, useSelector } from "../StateProvider";

export const Speedup = () => {
  const unlocks = useSelector((state) => state.unlocks);
  const phase = useSelector((state) => state.phase);
  const dispatch = useDispatch();

  const multipliers = Object.entries(unlocks)
    .filter(([key, value]) => {
      return value && !!speeds[key];
    })
    .map(([key]) => {
      return speeds[key] as number;
    });

  if (!multipliers.length || phase !== "preEvent") {
    return null;
  }

  return (
    <ul>
      <li>
        <Button
          onClick={() => {
            dispatch({
              type: "SET_MULTIPLIER",
              payload: {
                multiplier: 1,
              },
            });
          }}
        >
          1X
        </Button>
        {multipliers.map((multiplier) => {
          return (
            <Button
              key={multiplier}
              onClick={() => {
                dispatch({
                  type: "SET_MULTIPLIER",
                  payload: {
                    multiplier: multiplier * initialState.multiplier,
                  },
                });
              }}
            >
              X{multiplier}
            </Button>
          );
        })}
      </li>
    </ul>
  );
};

const speeds: { [Key in UnlockKey]?: number } = {
  pastSpeed5x: 5,
  pastSpeed10x: 10,
};
