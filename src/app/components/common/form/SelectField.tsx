import { ChangeEvent } from "react";

type SourceOption = {
  value: string;
  label: string;
};

type SelectFieldProps<Name extends string> = {
  options: SourceOption[] | Record<string, SourceOption> | null;
  label: string;
  defaultOption: string;
  error?: string;
  name: Name;
  value: string;
  onFieldChange: (field: { name: Name; value: string }) => void;
};

const SelectField = <Name extends string>({
  options,
  label,
  name,
  value,
  defaultOption,
  error,
  onFieldChange,
}: SelectFieldProps<Name>) => {
  const optionsArray = Array.isArray(options) ? options : Object.values(options ?? {});

  const handleSelectChange = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    onFieldChange({ name, value: target.value });
  };

  const getSelectClasses = () => {
    return "form-select" + (error ? " is-invalid" : "");
  };
  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        value={value}
        name={name}
        onChange={handleSelectChange}
        className={getSelectClasses()}
        id={name}
      >
        <option disabled value="">
          {defaultOption}
        </option>
        {optionsArray &&
          optionsArray.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default SelectField;
