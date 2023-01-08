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
    const [selectedOptions, setSelectedOptions] = useState<TOption>({
      label: "",
      value: 0,
    });
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
      if (!options) {
        return [{ label: "Geen opties gevonden", value: 0 }];
      }
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
      debounce(queryChangeHandler, 200),
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
          >
            <Typography
              variant="base"
              component="label"
              htmlFor={autoCompleteId}
              className={classNames(
                errorMessage ? "text-red-500/80" : "text-gray-100",
                "font-bold"
              )}
            >
              {label}
            </Typography>
            <div
              className={classNames(
                "flex w-full rounded-lg bg-white bg-opacity-20 py-2 px-3 text-base text-gray-100 outline-none duration-150 placeholder:text-gray-300 hover:ring-1 focus:shadow-sm focus:ring-2  active:shadow-sm active:ring-2 ",
                errorMessage
                  ? "border border-red-500/80  !text-red-500/80 hover:ring-red-500/50  focus:ring-red-500/80 active:focus:ring-red-500/80"
                  : " hover:ring-gray-100 focus:ring-gray-100 active:ring-gray-100"
              )}
            >
              <Combobox.Input
                id={autoCompleteId}
                placeholder="Type hier om te zoeken"
                className={classNames(
                  "w-full rounded-lg bg-transparent text-base text-gray-100 outline-none duration-150 placeholder:text-gray-300 ",
                  errorMessage
                    ? "border-red-500/80  !text-red-500/80 hover:ring-red-500/50  focus:ring-red-500/80 active:focus:ring-red-500/80"
                    : " hover:ring-gray-100 focus:ring-gray-100 active:ring-gray-100"
                )}
                displayValue={() => selectedOptions.label}
                onChange={debouncedChangeHandler}
              />
              <Combobox.Button className="flex items-center bg-transparent">
                <ChevronUpDownIcon
                  className={classNames(
                    errorMessage ? "text-red-500/80" : "text-gray-300",
                    "h-5 w-5"
                  )}
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
            {errorMessage ? (
              <Typography className="m-1 !text-red-500/80">
                {errorMessage}
              </Typography>
            ) : null}
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setFilter("")}
            >
              <Combobox.Options className="no-scrollbar absolute z-50 mt-1 max-h-60 w-full max-w-xs overflow-auto rounded-lg bg-gray-100 py-1 text-sm shadow-sm ring-1 ring-gray-900 ring-opacity-5 focus:outline-none sm:w-full lg:max-w-sm xl:max-w-md ">
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
                        active ? "bg-gray-900 bg-opacity-20 " : "text-gray-900",
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
                              active
                                ? "text-gray-900"
                                : "text-[hsl(280,100%,70%)]",
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
