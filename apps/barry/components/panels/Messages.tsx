import clsx from "clsx";
import { useSelector } from "../StateProvider";
import { EffectText } from "../EffectText";
import { MessageLevel } from "@barry/store";

export const Messages = () => {
  const messages = useSelector((state) => state.messages)
    .slice()
    .reverse();

  return (
    <div className="w-full space-y-2">
      {messages.map((message, index) => {
        return (
          <p
            key={message.text}
            className={clsx("relative", textColor(message.priority, index))}
          >
            <span
              className={clsx(
                "absolute top-[0] bottom-[0] left-[0] w-1",
                message.priority === "alert"
                  ? "bg-red-400"
                  : message.priority === "news"
                  ? "bg-blue-500"
                  : "bg-gray-600",
              )}
            ></span>
            <EffectText className="block pl-3">{message.text}</EffectText>
          </p>
        );
      })}
    </div>
  );
};

const textColor = (priority: MessageLevel, index: number) => {
  if (priority === "alert") {
    return index > 0 ? "text-red-500" : "text-red-400";
  }
  return index > 0 && "text-gray-400";
};
