import { ChangeEvent, useState } from "react";

type TextFieldProps<Name extends string> = {
  label: string;
  type?: string;
  error?: string;
  name: Name;
  value: string;
  autoComplete?: string;
  onFieldChange: (field: { name: Name; value: string }) => void;
};

const TextField = <Name extends string>({
  type = "text",
  autoComplete = "off",
  label,
  name,
  value,
  error,
  onFieldChange,
}: TextFieldProps<Name>) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const getInputClasses = () => {
    return "form-control" + (error ? " is-invalid" : "");
  };

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    onFieldChange({ name, value: target.value });
  };

  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      <div className="input-group has-validation">
        <input
          type={showPassword ? "text" : type}
          id={name}
          name={name}
          value={value}
          autoComplete={autoComplete}
          onChange={handleInputChange}
          className={getInputClasses()}
        />
        {type === "password" && (
          <button type="button" onClick={toggleShowPassword} className="btn btn-outline-secondary">
            <i className={"bi bi-eye" + (showPassword ? "-slash" : "")}></i>
          </button>
        )}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

export default TextField;
