import clsx from "clsx";

type Props = {
  progress: number;
  variant?: "secondary" | "primary";
};
export const Progress = ({ progress, variant = "secondary" }: Props) => {
  return (
    <div
      className={clsx(
        "w-full h-1 origin-left",
        variant === "secondary" ? "bg-blue-700" : "bg-yellow-400",
      )}
      style={{ transform: `scaleX(${progress}%)` }}
    />
  );
};
