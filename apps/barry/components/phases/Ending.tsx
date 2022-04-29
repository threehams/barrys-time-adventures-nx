import clsx from "clsx";
import { useEffect, useState } from "react";
import { Reset } from "../panels/Reset";

export const Ending = () => {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setPhase((current) => current + 1);
    }, 2000);
  });

  return (
    <div className="flex items-center justify-center w-full h-screen bg-black text-gray-50">
      <div className="text-center">
        <h2
          className={clsx(
            "mb-1 text-5xl transition-opacity duration-[3s] opacity-0",
            phase > 0 && "opacity-100",
          )}
        >
          Barry&apos;s Time Adventures
        </h2>
        <p
          className={clsx(
            "mb-2 text-2xl opacity-0 transition-opacity duration-[3s]",
            phase > 1 && "opacity-100",
          )}
        >
          [A]ll out of barrys
        </p>
        <p
          className={clsx(
            "mb-5 opacity-0 text-1xl transition-opacity duration-[1s]",
            phase > 2 && "opacity-100",
          )}
        >
          Created by:{" "}
          <a
            target="_blank"
            className="underline"
            href="https://www.github.com/threehams/"
            rel="noreferrer"
          >
            ThreeHams
          </a>
        </p>
        <p
          className={clsx(
            "mb-5 opacity-0 text-1xl transition-opacity duration-[1s]",
            phase > 3 && "opacity-100",
          )}
        >
          Additional writing:{" "}
          <a
            target="_blank"
            className="underline"
            href="https://twitter.com/zbeeblebroxIV"
            rel="noreferrer"
          >
            Eugene
          </a>
        </p>
        <Reset className={clsx("opacity-0", phase > 4 && "opacity-100")} />
      </div>
    </div>
  );
};
