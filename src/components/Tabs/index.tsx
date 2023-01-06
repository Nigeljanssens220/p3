import * as TabsPrimitive from "@radix-ui/react-tabs";
import React from "react";
import { api } from "../../utils/api";
import classNames from "../../utils/styling";
import Button from "../Button";
import TextField from "../TextField";

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
    title: "Wedstrijdoverzicht",
    value: "tab2",
  },

  {
    title: "Speler toevoegen",
    value: "tab3",
  },
];

const Tabs: React.FC = () => {
  const createPlayer = api.player.create.useMutation();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const createPlayerHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (inputRef.current?.value === "" || inputRef.current?.value === undefined)
      return;
    createPlayer.mutate({ name: inputRef?.current?.value as string });
    inputRef.current.value = "";
  };

  const keyEnterHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      createPlayerHandler(e as any);
    }
  };

  return (
    <TabsPrimitive.Root>
      <TabsPrimitive.List
        className={classNames(
          "mb-2 flex h-full w-full justify-evenly space-x-1 rounded-lg bg-[hsl(280,100%,60%)] py-4 px-1"
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
            "h-full w-full rounded-lg border border-gray-100 bg-white bg-opacity-10 bg-clip-padding p-4 backdrop-blur-3xl backdrop-filter"
          }
        >
          <div className="flex items-end justify-center space-x-4">
            <TextField
              ref={inputRef}
              label="Naam"
              onKeyDown={keyEnterHandler}
            />
            <Button variant="primary" onClick={createPlayerHandler}>
              Toevoegen
            </Button>
          </div>
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  );
};

export default Tabs;
