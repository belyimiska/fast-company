import { useState, useCallback, useEffect, FormEvent } from "react";
import API from "../../api";
import { Profession, ProfessionsType } from "../../api/fake.api/professions.api";
import { QualitiesType, Quality } from "../../api/fake.api/user.api";
import { validator } from "../../utils/validator";
import CheckboxField from "../common/form/CheckboxField";
import MultiSelectField, { MultiFieldOption } from "../common/form/MultiSelectField";
import RadioField from "../common/form/RadioField";
import SelectField from "../common/form/SelectField";
import TextField from "../common/form/TextField";

type RegData = {
  email: string;
  password: string;
  profession: string;
  qualities: MultiFieldOption[];
  sex: string;
  license: boolean;
};

type RegErrors = {
  email?: string;
  password?: string;
  profession?: string;
  qualities?: string;
  license?: string;
};

type QualitiesChange = {
  name: "qualities";
  value: MultiFieldOption[];
};

type StringFieldChange = {
  name: Exclude<keyof RegData, "qualities" | "license">;
  value: string;
};

type CheckboxChange = {
  name: "license";
  value: boolean;
};

type FieldChange = StringFieldChange | QualitiesChange | CheckboxChange;

const RegisterForm = () => {
  const [data, setData] = useState<RegData>({
    email: "",
    password: "",
    profession: "",
    qualities: [],
    sex: "male",
    license: false,
  });
  const [errors, setErrors] = useState<RegErrors>({});
  const [professions, setProfessions] = useState<ProfessionsType | null>(null);
  const [qualities, setQualities] = useState<QualitiesType | null>(null);

  useEffect(() => {
    API.professions.fetchAll().then((data) => setProfessions(data));
    API.qualities.fetchAll().then((data) => setQualities(data));
  }, []);

  const professionOptions = professions
    ? Object.values(professions).map((prof) => ({
        label: prof.name,
        value: prof._id,
      }))
    : null;

  const qualityOptions = qualities
    ? Object.values(qualities).map((qual) => ({
        label: qual.name,
        value: qual._id,
      }))
    : null;

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
    profession: {
      isRequired: {
        message: "Профессия обязательна для заполнения",
      },
    },
    qualities: {
      isRequired: {
        message: "Выберите хотя бы одно качество",
      },
    },
    license: {
      isRequired: {
        message: "Подтвердите соглашение",
      },
    },
  };

  const validate = useCallback(() => {
    const newErrors: RegErrors = validator(data, validatorConfig);
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
    console.log({
      ...data,
      profession: getProfessionById(data.profession),
      qualities: getQualities(data.qualities),
    });
  };

  const getProfessionById = (id: string): Profession | undefined => {
    if (professions) return Object.values(professions).find((prof) => prof._id === id);
  };

  const getQualities = (
    selectedOptions: MultiFieldOption[],
  ): (Quality | undefined)[] | undefined => {
    if (qualities) {
      const qualitiesArr = Object.values(qualities);
      return selectedOptions.map((option) =>
        qualitiesArr.find((qual) => qual._id === option.value),
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Почта"
        name="email"
        value={data.email}
        error={errors.email}
        autoComplete="email"
        onFieldChange={handleFieldChange}
      />
      <TextField
        label="Пароль"
        name="password"
        type="password"
        autoComplete="new-password"
        value={data.password}
        error={errors.password}
        onFieldChange={handleFieldChange}
      />
      <SelectField
        options={professionOptions}
        label="Профессия"
        value={data.profession}
        name="profession"
        defaultOption="Выберите профессию..."
        error={errors.profession}
        onFieldChange={handleFieldChange}
      />
      <RadioField
        options={[
          { name: "Мужской", value: "male" },
          { name: "Женский", value: "female" },
        ]}
        name="sex"
        value={data.sex}
        label="Выберите пол:"
        onFieldChange={handleFieldChange}
      />
      <MultiSelectField
        options={qualityOptions}
        value={data.qualities}
        error={errors.qualities}
        name="qualities"
        label="Выберите качества"
        onFieldChange={handleFieldChange}
      />
      <CheckboxField
        value={data.license}
        name="license"
        error={errors.license}
        onFieldChange={handleFieldChange}
      >
        Согласен с условиями
      </CheckboxField>
      <button disabled={!isValid} className="btn btn-primary w-100 mx-auto mb-4">
        Зарегистрироваться
      </button>
    </form>
  );
};

export default RegisterForm;
