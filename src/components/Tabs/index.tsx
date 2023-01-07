import * as TabsPrimitive from "@radix-ui/react-tabs";
import React from "react";
import classNames from "../../utils/styling";
import Invoer from "./Panels/Invoer";

interface Tab {
  title: string;
  value: string;
}

const tabs: Tab[] = [
  {
    title: "Stand",
    value: "tab1",
  },
  {
    title: "Wedstrijden",
    value: "tab2",
  },

  {
    title: "Invoer",
    value: "tab3",
  },
];

const Tabs: React.FC = () => {
  return (
    <TabsPrimitive.Root className="flex w-full flex-col items-center">
      <TabsPrimitive.List
        className={classNames(
          "mb-2 flex h-full w-full justify-evenly rounded-lg bg-[hsl(280,100%,60%)] py-4 px-1 md:max-w-sm"
        )}
      >
        {tabs.map(({ title, value }) => (
          <TabsPrimitive.Trigger
            key={`tab-trigger-${value}`}
            value={value}
            className=""
          >
            <span
              className={classNames(
                "text-md rounded-lg bg-[hsl(280,100%,70%)] p-4 font-semibold hover:bg-gray-200/50 dark:text-gray-100"
              )}
            >
              {title}
            </span>
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
      {tabs.map(({ value }) => (
        <TabsPrimitive.Content
          key={`tab-content-${value}`}
          value={value}
          className={
            "h-full w-full max-w-sm rounded-lg bg-white bg-opacity-10 bg-clip-padding p-4 backdrop-blur-3xl backdrop-filter"
          }
        >
          <Invoer />
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  );
};

export default Tabs;
