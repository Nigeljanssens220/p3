import { Switch } from "@headlessui/react";
import { useId, useState } from "react";
import Typography from "../../Typography";

interface ToggleProps {
  label: string;
  onChange: (isRanked: boolean) => void;
}

const FormToggle: React.FC<ToggleProps> = ({ label, onChange }) => {
  const [checked, setChecked] = useState(false);
  const toggleId = useId();

  return (
    <>
      <Typography
        variant="base"
        component="label"
        htmlFor={toggleId}
        className="mr-2 font-bold text-gray-100"
      >
        {label}
      </Typography>
      <Switch
        id={toggleId}
        checked={checked}
        onChange={(value) => (onChange(value), setChecked((prev) => !prev))}
        className={`${
          checked ? "bg-[hsl(280,100%,70%)]" : "bg-gray-200"
        } relative inline-flex h-6 w-11 items-center rounded-full`}
      >
        <span
          className={`${
            checked ? "translate-x-6" : "translate-x-1"
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
        />
      </Switch>
    </>
  );
};

export default FormToggle;
