import clsx from "clsx";
import { useSelector } from "../StateProvider";

export const Convergence = () => {
  const time = useSelector((state) => state.timers.convergence);

  return (
    <div className="flex items-center justify-center w-full h-screen bg-[#330000] text-gray-50">
      <div className="text-4xl w-[90%] space-y-4">
        <div
          className={clsx("text-left opacity-0", time > 3_000 && "opacity-100")}
        >
          he has communicated to me
        </div>
        <div
          className={clsx("opacity-0 text-left", time > 5_000 && "opacity-100")}
        >
          he has communicated to me in a dream
        </div>
        <div
          className={clsx(
            "opacity-0 text-right",
            time > 6_000 && "opacity-100",
          )}
        >
          we are all dreaming
        </div>
        <div
          className={clsx(
            "opacity-0 text-right",
            time > 7_000 && "opacity-100",
          )}
        >
          we are all awake
        </div>
        <div
          className={clsx(
            "opacity-0 text-right",
            time > 8_000 && "opacity-100",
          )}
        >
          we are all chosen
        </div>
        <div
          className={clsx(
            "opacity-0 text-center",
            time > 10_000 && "opacity-100",
          )}
        >
          we must rebuild
        </div>
        <div
          className={clsx(
            "opacity-0 text-center",
            time > 11_500 && "opacity-100",
          )}
        >
          WE MUST REBUILD
        </div>
        <div
          className={clsx(
            "opacity-0 text-center",
            time > 13_000 && "opacity-100",
          )}
        >
          WE MUST REPOPULATE
        </div>
      </div>
    </div>
  );
};
