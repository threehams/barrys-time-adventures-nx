import React from "react";
import clsx from "clsx";

type TabsProps = {
  children: React.ReactNode;
  className?: string;
};
export const Tabs = React.memo(
  ({ children, className, ...rest }: TabsProps) => {
    return (
      <div className={clsx(className)} {...rest}>
        {children}
      </div>
    );
  },
);

type TabProps = {
  children: React.ReactNode;
  active?: boolean;
  onClick?: React.MouseEventHandler;
  className?: string;
};
export const Tab = React.memo(
  ({ children, className, active, onClick, ...rest }: TabProps) => {
    return (
      <button
        onClick={(event) => {
          if (!active) {
            onClick?.(event);
          }
        }}
        className={clsx(
          "cursor-pointer px-3 py-1 border-b-2 border-opacity-0 border-blue-600",
          active && "border-opacity-100",
          className,
        )}
        {...rest}
      >
        {children}
      </button>
    );
  },
);
