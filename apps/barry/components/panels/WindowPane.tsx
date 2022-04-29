import { CSSProperties } from "react";
import clsx from "clsx";
import lerp from "@sunify/lerp-color";
import { hoursToSeconds } from "date-fns";
import { useSelector } from "../StateProvider";

type Props = {
  className?: string;
};
export const WindowPane = ({ className }: Props) => {
  return (
    <div
      className={clsx(
        "[grid-area:window] py-2 h-[calc(100vh-20px)] self-stretch sticky top-[0px] w-[80px] overflow-hidden rounded-md",
        className,
      )}
    >
      <Sky className="absolute top-0 left-0 w-full h-full" />
      <Sun className="absolute top-0 left-0 w-full h-full" />
    </div>
  );
};

type SunProps = {
  className?: string;
  style?: CSSProperties;
};
const Sun = ({ className }: SunProps) => {
  const time = useSelector((state) => state.time);
  const phase = useSelector((state) => state.phase);
  const sunPhase = phase === "preEvent" ? "pre" : "post";
  const currentHour = (time % hoursToSeconds(24)) / hoursToSeconds(1);
  const progress = (currentHour - 6) / 6;
  const yTransform = -(progress * 120 - 60);

  return (
    <div
      className={clsx("flex items-center justify-center", className)}
      style={{ transform: `translate(25%, ${yTransform}%)` }}
    >
      <div
        className={clsx(
          "w-8 h-8 bg-yellow-300 rounded-full filter blur-md",
          sunPhase === "post" && "opacity-20",
        )}
      />
    </div>
  );
};

type SkyProps = {
  children?: React.ReactNode;
  className?: string;
};
const Sky = ({ children, className }: SkyProps) => {
  const time = useSelector((state) => state.time);
  const phase = useSelector((state) => state.phase);
  const [start, end] = findColors(time, phase === "preEvent" ? "pre" : "post");
  return (
    <div
      className={clsx("flex items-center justify-center", className)}
      style={{ background: `linear-gradient(${end}, ${start})` }}
    >
      {children}
    </div>
  );
};

const findColors = (time: number, phase: "pre" | "post") => {
  const currentHour = (time % hoursToSeconds(24)) / hoursToSeconds(1);
  const colors = phase === "pre" ? SKY_COLORS : FUTURE_SKY_COLORS;

  const found = colors.findIndex((color) => {
    return color.time > currentHour;
  })!;
  const firstIndex = Math.max(found - 1, 0);
  const secondIndex = Math.min(firstIndex + 1, colors.length - 1);
  const firstColor = colors[firstIndex];
  const secondColor = colors[secondIndex];

  let progress;
  if (secondColor.time === firstColor.time) {
    progress = 0;
  } else {
    const high = secondColor.time - firstColor.time;
    progress = (currentHour - firstColor.time) / high;
  }
  return [
    lerp(firstColor.low, secondColor.low, progress),
    lerp(firstColor.high, secondColor.high, progress),
  ];
};

const SKY_COLORS = [
  { time: 0, low: "#111827", high: "#111827" },
  { time: 5, low: "#111827", high: "#111827" },
  { time: 6, low: "#E67B09", high: "#112044" },
  { time: 7, low: "#E79617", high: "#536875" },
  { time: 8, low: "#FADA77", high: "#343E56" },
  { time: 9, low: "#E2D7A9", high: "#343E61" },
  { time: 10, low: "#ABC3BF", high: "#314C87" },
  { time: 12, low: "#8DBACD", high: "#3A6DAE" },
  { time: 18, low: "#6FACC7", high: "#085997" },
  { time: 19, low: "#B59A6D", high: "#6C778A" },
  { time: 20, low: "#42677B", high: "#3372A1" },
  { time: 21, low: "#13203C", high: "#111827" },
  { time: 22, low: "#111827", high: "#111827" },
  { time: 24, low: "#111827", high: "#111827" },
];

const FUTURE_SKY_COLORS = [
  { time: 0, low: "#111827", high: "#111827" },
  { time: 0, low: "#111827", high: "#111827" },
];
