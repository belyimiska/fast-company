import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import TextField from "../components/TextField";
import { validator } from "../utils/validator";

type LoginData = {
  email: string;
  password: string;
};

type LoginErrors = {
  email?: string;
  password?: string;
};

const Login = () => {
  const [data, setData] = useState<LoginData>({ email: "", password: "" });
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

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log(data);
  };

  return (
    <div className="container pt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <h3 className="mb-3">Login Form</h3>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Почта"
              name="email"
              value={data.email}
              error={errors.email}
              onChange={handleChange}
            />
            <TextField
              label="Пароль"
              name="password"
              type="password"
              value={data.password}
              error={errors.password}
              onChange={handleChange}
            />
            <button disabled={!isValid} className="btn btn-primary w-100 mx-auto">
              Войти
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
