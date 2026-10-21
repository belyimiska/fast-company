type RadioFieldProps<Name extends string, Value extends string> = {
  options: { name: string; value: Value }[];
  name: Name;
  value: Value;
  label: string;
  onFieldChange: (field: { name: Name; value: Value }) => void;
};

const RadioField = <Name extends string, Value extends string>({
  options,
  name,
  label,
  value,
  onFieldChange,
}: RadioFieldProps<Name, Value>) => {
  const handleRadioChange = (selectedValue: Value) => {
    onFieldChange({ name, value: selectedValue });
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
            onChange={() => handleRadioChange(option.value)}
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
