import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import _ from "lodash";
import { Fragment, useEffect, useId, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import classNames from "../../../utils/styling";
import Typography from "../../Typography";

interface FormListBoxProps {
  name: string;
  label: string;
  options: TOption[];
}

export type TOption = {
  label: string;
  value: any;
};

const FormListBox: React.FC<FormListBoxProps> = ({ name, label, options }) => {
  const [selected, setSelected] = useState<TOption[]>([]);
  const listboxId = useId();
  const {
    unregister,
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = _.get(errors, `${name}.message`) as React.ReactNode;

  // Unregister on unmount
  useEffect(() => {
    return () => {
      unregister(name);
    };
  }, [name, unregister]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <>
          <Listbox
            defaultValue={field.value}
            value={selected}
            refName={field.name}
            onChange={(value) => {
              field.onChange(value);
              setSelected(value);
            }}
            multiple
            as="div"
          >
            <Typography
              variant="base"
              component="label"
              htmlFor={listboxId}
              className={classNames(
                errorMessage ? "text-red-500/80" : "text-gray-700",
                "font-bold"
              )}
            >
              {label}
            </Typography>
            <div
              className={classNames(
                "flex w-full rounded-sm border bg-white text-base text-gray-900 outline-none duration-150 placeholder:text-gray-600 hover:ring-1 focus:shadow-sm focus:ring-1 active:shadow-sm",
                errorMessage
                  ? "border-red-500/80  !text-red-500/80 hover:ring-red-500/80  focus:ring-red-500/80 active:focus:ring-red-500/80"
                  : "border-gray-700  hover:ring-gray-800  focus:ring-gray-800  active:ring-gray-800"
              )}
            >
              <Listbox.Button className="relative flex w-full cursor-default items-center justify-between rounded-lg bg-white py-2 pl-3 text-left shadow-sm focus:outline-none">
                <Typography
                  component="span"
                  className="block truncate text-gray-700"
                >
                  {selected?.map((option: TOption) => option.label).join(", ")}
                </Typography>
                <ChevronUpDownIcon
                  className="mx-2 h-5 w-5 text-gray-700"
                  aria-hidden="true"
                />
              </Listbox.Button>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="no-scrollbar absolute z-50 mt-1 max-h-60 w-[436px] overflow-auto rounded-sm border border-gray-800 bg-white py-1 text-sm shadow-sm ring-1 ring-gray-900 ring-opacity-5 focus:outline-none sm:w-full sm:max-w-[42.9rem] md:w-[331px] lg:w-[436px]">
                {options.map((option, idx) => (
                  <Listbox.Option
                    key={option.label}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-gray-400 " : "text-gray-700",
                        "relative cursor-default select-none py-2 pl-10 pr-4"
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <Typography
                          component="span"
                          className={classNames(
                            selected && "font-semibold",
                            "block truncate"
                          )}
                        >
                          {option.label}
                        </Typography>
                        {selected && (
                          <Typography
                            className={classNames(
                              active ? "text-gray-900" : "text-orange-500",
                              "absolute inset-y-0 left-0 flex items-center pl-3"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </Typography>
                        )}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </Listbox>
        </>
      )}
    />
  );
};

export default FormListBox;
