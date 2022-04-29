import React from "react";
import { useWorker } from "@barry/worker";
import { DispatchProvider, StateProvider } from "./StateProvider";
import { Game } from "./Game";
import { useRouter } from "next/router";
import { ErrorBoundary } from "react-error-boundary";
import { Reset } from "./panels/Reset";

const children = <Game />;

export const GameProvider = () => {
  const { state, dispatch } = useWorker();
  const router = useRouter();

  if (!state) {
    return (
      <div className="flex items-center justify-center min-w-full min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <StateProvider value={state}>
      <DispatchProvider value={dispatch}>
        <ErrorBoundary FallbackComponent={ErrorReset}>{children}</ErrorBoundary>
      </DispatchProvider>
      {router.query.debug !== undefined && (
        <pre>{JSON.stringify(state, null, 2)}</pre>
      )}
    </StateProvider>
  );
};

const ErrorReset = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-1 text-center">
      Game crashed, likely an out-of-date save game. Save game migration is not
      yet in place. Reset your game for now, then reload the page.
      <Reset />
    </div>
  );
};
