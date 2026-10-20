import { ChangeEvent } from "react";

type RadioFieldProps<Name extends string> = {
  options: { name: string; value: string }[];
  name: Name;
  value: string;
  label: string;
  onFieldChange: (field: { name: Name; value: string }) => void;
};

const RadioField = <Name extends string>({
  options,
  name,
  label,
  value,
  onFieldChange,
}: RadioFieldProps<Name>) => {
  const handleRadioChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    onFieldChange({ name, value: target.value });
  };

  return (
    <fieldset className="mb-4">
      <legend className="fs-5">{label}</legend>
      {options.map((option) => (
        <div key={option.name + "_" + option.value} className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name={name}
            checked={option.value === value}
            id={option.name + "_" + option.value}
            value={option.value}
            onChange={handleRadioChange}
          />
          <label className="form-check-label" htmlFor={option.name + "_" + option.value}>
            {option.name}
          </label>
        </div>
      ))}
    </fieldset>
  );
};

export default RadioField;
