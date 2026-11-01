import { ChangeEvent } from "react";

type TextAreaFieldProps<Name extends string> = {
  label: string;
  rows?: number;
  error?: string;
  name: Name;
  value: string;

  onFieldChange: (field: { name: Name; value: string }) => void;
};

const TextAreaField = <Name extends string>({
  label,
  value,
  name,
  error,
  rows = 3,
  onFieldChange,
}: TextAreaFieldProps<Name>) => {
  const handleTextAreaChange = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    onFieldChange({ name, value: target.value });
  };

  const getAreaClasses = () => {
    return "form-control" + (error ? " is-invalid" : "");
  };

  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      <textarea
        className={getAreaClasses()}
        value={value}
        id={name}
        name={name}
        onChange={handleTextAreaChange}
        rows={rows}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default TextAreaField;
