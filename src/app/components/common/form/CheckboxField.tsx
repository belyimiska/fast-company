import { ReactNode } from "react";

type CheckboxFieldProps<Name extends string> = {
  name: Name;
  value: boolean;
  children: ReactNode;
  error?: string;
  onFieldChange: (field: { name: Name; value: boolean }) => void;
};

const CheckboxField = <Name extends string>({
  name,
  value,
  error,
  children,
  onFieldChange,
}: CheckboxFieldProps<Name>) => {
  const handleCheckboxChange = () => {
    onFieldChange({ name, value: !value });
  };

  const getInputClasses = () => {
    return "form-check-input" + (error ? " is-invalid" : "");
  };

  return (
    <div className="mb-4">
      <div className="form-check">
        <input
          className={getInputClasses()}
          type="checkbox"
          name={name}
          id={name}
          checked={value}
          onChange={handleCheckboxChange}
        />
        <label className="form-check-label" htmlFor={name}>
          {children}
        </label>
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

export default CheckboxField;
