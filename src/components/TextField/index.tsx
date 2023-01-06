import React, { forwardRef, useId } from "react";
import classNames from "../../utils/styling";

interface TextFieldProps extends React.HTMLProps<HTMLInputElement> {
  id?: string;
  className?: string;
  value?: string;
  label?: string;
  placeholder?: string;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ id = "", className, value, label, placeholder, ...rest }, ref) => {
    const textFieldId = useId();

    return (
      <div className="flex flex-col items-start">
        <label htmlFor={id + textFieldId} className="font-bold text-white">
          {label}
        </label>
        <div className="flex w-full items-center justify-center">
          <input
            {...rest}
            ref={ref}
            id={id + textFieldId}
            type="text"
            placeholder={placeholder}
            className={classNames(
              className,
              "w-full rounded-lg border border-[hsl(280,100%,70%)] bg-gray-100 py-2 px-3 text-base text-gray-900 outline-none duration-150 placeholder:text-gray-600 hover:ring-1 hover:ring-[hsl(280,100%,70%)] focus:shadow-sm focus:ring-2  focus:ring-[hsl(280,100%,70%)]  active:shadow-sm active:ring-2 active:ring-[hsl(280,100%,70%)]"
            )}
            value={value}
          />
        </div>
      </div>
    );
  }
);

TextField.displayName = "TextField";

export default TextField;
