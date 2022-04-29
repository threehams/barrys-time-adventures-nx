import React from "react";
import clsx from "clsx";

const NON_BREAK_SPACE = "\u00A0";

type ButtonProps = {
  active?: boolean;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: React.MouseEventHandler;
  className?: string;
  variant?: "primary" | "secondary" | "danger";
};
export const Button = React.memo(
  ({
    active,
    children,
    className,
    disabled,
    onClick,
    variant = "secondary",
    ...rest
  }: ButtonProps) => {
    return (
      <button
        disabled={disabled}
        onClick={(event) => {
          if (!disabled) {
            onClick?.(event);
          }
        }}
        className={clsx(
          "border border-gray-700 border-solid cursor-pointer px-2",
          active && "bg-blue-700 text-white",
          variant === "primary" && "bg-blue-700 text-white",
          variant === "danger" && "bg-red-900 text-white",
          disabled && "opacity-50",
          className,
        )}
        {...rest}
      >
        {children ?? NON_BREAK_SPACE}
      </button>
    );
  },
);
