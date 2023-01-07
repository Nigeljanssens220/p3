import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import _ from "lodash";
import debounce from "lodash.debounce";
import {
  forwardRef,
  Fragment,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState,
} from "react";
import { Controller, useFormContext } from "react-hook-form";
import classNames from "../../../utils/styling";
import Typography from "../../Typography";

type TOption = {
  label: string;
  value: number;
};

interface FormAutoCompleteProps {
  options: TOption[];
  label: string;
  name: string;
}

// forward the ref to the underlying select element so that we can reference it in React Hook Form
const FormAutoComplete = forwardRef<HTMLInputElement, FormAutoCompleteProps>(
  ({ options, label, name }, ref) => {
    const [selectedOptions, setSelectedOptions] = useState<TOption[]>([]);
    const [filter, setFilter] = useState("");
    const autoCompleteId = useId();
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

    const filteredOptions = useMemo(() => {
      const newOptions =
        filter === ""
          ? options
          : options.filter((option) =>
              option.label
                .toLowerCase()
                .replace(/\s+/g, "")
                .includes(filter.toLowerCase().replace(/\s+/g, ""))
            );

      // only display first 100 options to increase performance
      return newOptions.length > 100 ? newOptions.slice(0, 100) : newOptions;
    }, [filter, options]);

    const queryChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFilter(event.target.value);
    };

    // use debounce to prevent the search from happening on every keystroke, because the operation is very expensive
    const debouncedChangeHandler = useCallback(
      debounce(queryChangeHandler, 1000),
      []
    );

    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Combobox
            defaultValue={field.value}
            onChange={(value) => {
              field.onChange(value);
              setSelectedOptions(value);
            }}
            refName={field.name}
            value={selectedOptions}
            as="div"
            multiple
          >
            <Typography
              variant="base"
              component="label"
              htmlFor={autoCompleteId}
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
              <Combobox.Input
                id={autoCompleteId}
                placeholder="Type hier om te zoeken"
                className={classNames(
                  errorMessage ? "text-red-500/80" : "text-gray-700",
                  "w-full bg-transparent py-2 px-3 text-gray-700 outline-none placeholder:text-gray-600"
                )}
                displayValue={() =>
                  selectedOptions
                    ?.map((option: TOption) => option.label)
                    .join(", ")
                }
                onChange={debouncedChangeHandler}
              />
              <Combobox.Button className="flex items-center bg-transparent">
                <ChevronUpDownIcon
                  className={classNames(
                    errorMessage ? "text-red-500/80" : "text-gray-700",
                    "mr-2 h-5 w-5"
                  )}
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setFilter("")}
            >
              <Combobox.Options className="no-scrollbar absolute z-50 mt-1 max-h-60 w-[436px] overflow-auto rounded-sm border border-gray-800 bg-white py-1 text-sm shadow-sm ring-1 ring-gray-900 ring-opacity-5 focus:outline-none sm:w-full sm:max-w-[42.9rem] md:w-[331px] lg:w-[436px]">
                {filteredOptions?.length === 0 && filter !== "" && (
                  <Typography
                    className="cursor-default select-none py-1 pl-3 text-sm text-gray-900"
                    component="span"
                  >
                    Er is niets gevonden. Probeer het opnieuw.
                  </Typography>
                )}
                {filteredOptions.map((option) => (
                  <Combobox.Option
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
                          {/* regex to capitalize first letter of the label */}
                          {option.label.replace(/^\w/, (c) => c.toUpperCase())}
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
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </Transition>
          </Combobox>
        )}
      />
    );
  }
);

FormAutoComplete.displayName = "FormAutoComplete";

export default FormAutoComplete;
