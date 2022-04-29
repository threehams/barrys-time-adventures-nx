import { Button } from "@laundry/ui";
import { useState } from "react";
import { useDispatch } from "../StateProvider";

export const Import = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  return (
    <div>
      <label>
        Import
        <input
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
        />
      </label>
      <Button
        onClick={() => {
          dispatch({
            type: "IMPORT_GAME",
            payload: {
              value,
            },
          });
        }}
      >
        Import Game
      </Button>
    </div>
  );
};
