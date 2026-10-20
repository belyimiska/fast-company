import { FormEvent, useCallback, useEffect, useState } from "react";
import TextField from "../common/form/TextField";
import { validator } from "../../utils/validator";
import CheckboxField from "../common/form/CheckboxField";

type LoginData = {
  email: string;
  password: string;
  stayOn: boolean;
};

type LoginErrors = {
  email?: string;
  password?: string;
};

type CheckboxChange = {
  name: "stayOn";
  value: boolean;
};

type StringFieldChange = {
  name: Exclude<keyof LoginData, "stayOn">;
  value: string;
};

type FieldChange = StringFieldChange | CheckboxChange;

const LoginForm = () => {
  const [data, setData] = useState<LoginData>({ email: "", password: "", stayOn: false });
  const [errors, setErrors] = useState<LoginErrors>({});

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Почта обязательна для заполнения",
      },
      isEmail: {
        message: "Почта введена некорректно",
      },
    },
    password: {
      isRequired: {
        message: "Пароль обязателен для заполнения",
      },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотя бы одну заглавную букву",
      },
      isContainDigit: {
        message: "Пароль должен содержать хотя бы одну цифру",
      },
      minLength: {
        message: "Пароль должен состоять минимум из 8 символов",
        value: 8,
      },
    },
  };

  const validate = useCallback(() => {
    const newErrors: LoginErrors = validator(data, validatorConfig);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [data]);

  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    validate();
  }, [validate]);

  const handleFieldChange = (field: FieldChange) => {
    setData((prev) => ({ ...prev, [field.name]: field.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Почта"
        name="email"
        autoComplete="email"
        value={data.email}
        error={errors.email}
        onFieldChange={handleFieldChange}
      />
      <TextField
        label="Пароль"
        name="password"
        type="password"
        autoComplete="current-password"
        value={data.password}
        error={errors.password}
        onFieldChange={handleFieldChange}
      />
      <CheckboxField value={data.stayOn} name="stayOn" onFieldChange={handleFieldChange}>
        Оставаться в системе
      </CheckboxField>
      <button disabled={!isValid} className="btn btn-primary w-100 mx-auto mb-4">
        Войти
      </button>
    </form>
  );
};

export default LoginForm;
