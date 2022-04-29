import useStateMachine from "@cassiozen/usestatemachine";
import { Button } from "@barry/ui";
import React from "react";
import { useDispatch } from "../StateProvider";

type Props = {
  className?: string;
  buttonText?: string;
  message?: string;
};
export const Reset = ({ className, message, buttonText }: Props) => {
  const dispatch = useDispatch();
  const [resetState, send] = useStateMachine()({
    initial: "inactive",
    states: {
      inactive: {
        on: {
          RESET: "requiresConfirmation",
        },
      },
      requiresConfirmation: {
        on: {
          CONFIRM: "reset",
          CANCEL: "inactive",
        },
      },
      reset: {
        on: {
          INACTIVE: "inactive",
        },
        effect: (sendEvent) => {
          dispatch({ type: "RESET_GAME" });
          sendEvent("INACTIVE");
        },
      },
    },
  });

  return (
    <div className={className}>
      {resetState.value === "inactive" && (
        <Button
          variant="danger"
          onClick={() => {
            send("RESET");
          }}
        >
          {buttonText || "Hard Reset"}
        </Button>
      )}
      {resetState.value === "requiresConfirmation" && (
        <>
          <div>
            {message ||
              "This will completely reset your game. Do this only if you're stuck or want to start over."}
          </div>
          <Button
            variant="danger"
            onClick={() => {
              send("CONFIRM");
            }}
          >
            Confirm Reset
          </Button>
          <Button
            onClick={() => {
              send("CANCEL");
            }}
          >
            Cancel
          </Button>
        </>
      )}
    </div>
  );
};
