import * as TabsPrimitive from "@radix-ui/react-tabs";
import { forwardRef } from "react";
import classNames from "../../utils/styling";

const Tabs = TabsPrimitive.Root;

const TabsList = forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={classNames(
      className,
      "mb-2 flex h-full justify-evenly space-x-1 rounded-lg bg-[hsl(280,100%,60%)] py-4 px-1 md:max-w-sm"
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    {...props}
    className={classNames("", className)}
  >
    <span
      className={classNames(
        "text-md rounded-lg bg-[hsl(280,100%,70%)] p-4 font-semibold hover:bg-gray-200/50 dark:text-gray-100"
      )}
    >
      {children}
    </span>
  </TabsPrimitive.Trigger>
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    className={classNames(
      "mt-2 rounded-md border border-slate-200 p-6 dark:border-slate-700",
      className
    )}
    {...props}
    ref={ref}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
