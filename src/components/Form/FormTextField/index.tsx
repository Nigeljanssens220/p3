import _ from "lodash";
import { useEffect, useId } from "react";
import { useFormContext } from "react-hook-form";
import classNames from "../../../utils/styling";
import Typography from "../../Typography";

interface FormTextFieldProps extends React.HTMLProps<HTMLInputElement> {
  name: string;
  id?: string;
  className?: string;
  value?: string;
  label?: string;
  placeholder?: string;
}

const FormTextField: React.FC<FormTextFieldProps> = ({
  name,
  id = "",
  className,
  value,
  label,
  placeholder,
  ...rest
}) => {
  const textFieldId = useId();
  const {
    register,
    unregister,
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
    <div className="flex flex-col items-start">
      <Typography
        variant="base"
        component="label"
        htmlFor={id + textFieldId}
        className={classNames(
          errorMessage ? "text-red-500/100" : "text-gray-100",
          "font-bold"
        )}
      >
        {label}
      </Typography>
      <input
        {...register(name)}
        {...rest}
        id={id + textFieldId}
        type="text"
        placeholder={placeholder}
        className={classNames(
          className,
          "w-full rounded-lg bg-white bg-opacity-20 py-2 px-3 text-base text-gray-100 outline-none duration-150 placeholder:text-gray-300 hover:ring-1 focus:shadow-sm focus:ring-2  active:shadow-sm active:ring-2 ",
          errorMessage
            ? "border-red-500/80  !text-red-500/80 hover:ring-red-500/50  focus:ring-red-500/80 active:focus:ring-red-500/80"
            : " hover:ring-gray-100 focus:ring-gray-100 active:ring-gray-100"
        )}
        value={value}
      />
      {errorMessage ? (
        <Typography className="m-1 !text-red-500/80">{errorMessage}</Typography>
      ) : null}
    </div>
  );
};

export default FormTextField;
