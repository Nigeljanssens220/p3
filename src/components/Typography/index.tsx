import React, { forwardRef } from "react";
import classNames from "../../utils/styling";

type TypographyVariant = "h1" | "h2" | "h3" | "p" | "lead" | "base" | "small";

const Variants = {
  h1: "text-5xl font-light text-gray-700",
  h2: "text-4xl lfont-regular text-gray-100",
  h3: "text-2xl font-semibold text-gray-100",
  p: "text-base my-8 font-regular text-gray-700",
  lead: "text-lg leading-6 my-8 font-regular text-gray-700",
  base: "font-regular ",
  small: "text-sm font-regular",
};

const variantsMap = new Map<TypographyVariant, string>([
  ["h1", Variants.h1],
  ["h2", Variants.h2],
  ["h3", Variants.h3],
  ["p", Variants.p],
  ["lead", Variants.lead],
  ["base", Variants.base],
  ["small", Variants.small],
]);

export interface TypographyProps
  extends React.AllHTMLAttributes<React.ReactHTML> {
  variant?: TypographyVariant;
  component?: keyof React.ReactHTML;
  className?: string;
  children?: React.ReactNode;
}

const Typography: React.FC<TypographyProps> = forwardRef(
  (
    {
      variant = "base",
      component = "span",
      className = "",
      children = [],
      ...rest
    },
    ref
  ) => {
    return React.createElement(
      component,
      {
        className: classNames(className, variantsMap.get(variant)),
        ...rest,
        ref,
      },
      children
    );
  }
);

Typography.displayName = "Typography";

export default Typography;
