import Select from "react-select";

export type MultiFieldOption = {
  value: string;
  label: string;
};

type MultiSelectFieldProps<Name extends string> = {
  options: MultiFieldOption[] | Record<string, MultiFieldOption> | null;
  name: Name;
  label: string;
  error?: string;
  onFieldChange: (field: { name: Name; value: MultiFieldOption[] }) => void;
};

const MultiSelectField = <Name extends string>({
  options,
  name,
  label,
  error,
  onFieldChange,
}: MultiSelectFieldProps<Name>) => {
  const isLoading = options === null;
  const optionsArray = Array.isArray(options) ? options : Object.values(options ?? {});

  const handleSelectionChange = (data: readonly MultiFieldOption[]) => {
    onFieldChange({ name, value: [...data] });
  };

  return (
    <fieldset className="mb-4">
      <legend className="fs-5">{label}</legend>
      <Select
        isMulti
        name={name}
        options={optionsArray}
        closeMenuOnSelect={false}
        className="basic-multi-select"
        classNamePrefix="select"
        isLoading={isLoading}
        isDisabled={isLoading}
        placeholder={isLoading ? "Загрузка качеств..." : "Выберите качества"}
        onChange={handleSelectionChange}
      />
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </fieldset>
  );
};

export default MultiSelectField;
