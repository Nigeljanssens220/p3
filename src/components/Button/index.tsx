import React, { ReactNode, useId } from "react";
import classNames from "../../utils/styling";

type ButtonVariant = "primary" | "secondary";

enum Variants {
  primary = "rounded-lg bg-[hsl(280,100%,70%)] py-3 px-5 text-sm text-white font-bold duration-150 hover:bg-[hsl(280,100%,78%)] active:bg-[hsl(280,100%,78%)]",
  secondary = "rounded-lg border border-gray-700 bg-white py-2 px-5 text-[14px] font-bold text-gray-700 duration-150 hover:border-orange-700 hover:text-orange-700 active:border-orange-700 active:text-orange-700",
}

const buttonMap = new Map<ButtonVariant, Variants>([
  ["primary", Variants.primary],
  ["secondary", Variants.secondary],
]);

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  id?: string;
  variant: ButtonVariant;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  id = "",
  className,
  children,
  variant,
  startIcon,
  endIcon,
  ...rest
}) => {
  const buttonId = useId();
  return (
    <button
      id={id + buttonId}
      {...rest}
      className={classNames(className, buttonMap.get(variant))}
    >
      {startIcon && startIcon}
      {children}
      {endIcon && endIcon}
    </button>
  );
};

Button.displayName = "Button";

export default Button;
