import { FormEvent, useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import API from "../../../api";
import { Profession, ProfessionsType } from "../../../api/fake.api/professions.api";
import { QualitiesType, Quality, UserType } from "../../../api/fake.api/user.api";
import { validator } from "../../../utils/validator";
import MultiSelectField, { MultiFieldOption } from "../../common/form/MultiSelectField";
import RadioField from "../../common/form/RadioField";
import SelectField from "../../common/form/SelectField";
import TextField from "../../common/form/TextField";

type EditData = {
  name: string;
  email: string;
  profession: string;
  sex: UserType["sex"];
  qualities: MultiFieldOption[];
};

type EditErrors = {
  email?: string;
  name?: string;
  qualities?: string;
};

type QualitiesChange = {
  name: "qualities";
  value: MultiFieldOption[];
};

type StringFieldChange = {
  name: Exclude<keyof EditData, "qualities" | "sex">;
  value: string;
};

type RadioChange = {
  name: "sex";
  value: UserType["sex"];
};

type FieldChange = StringFieldChange | QualitiesChange | RadioChange;

const EditUserPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const history = useHistory();

  const [user, setUser] = useState<UserType | undefined>(undefined);
  const [data, setData] = useState<EditData>({
    name: "",
    email: "",
    profession: "",
    sex: "male",
    qualities: [],
  });

  const [professions, setProfessions] = useState<ProfessionsType | null>(null);
  const [qualities, setQualities] = useState<QualitiesType | null>(null);
  const [errors, setErrors] = useState<EditErrors>({});
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    API.professions.fetchAll().then((data) => setProfessions(data));
    API.qualities.fetchAll().then((data) => setQualities(data));
  }, []);

  useEffect(() => {
    setIsUserLoading(true);
    setUser(undefined);
    let isActual = true;
    const res = API.users.getById(userId);
    res
      .then((loadedUser) => {
        if (!isActual) return;
        if (!loadedUser) return;
        setUser(loadedUser);
        const dataFields: EditData = {
          name: loadedUser.name,
          email: loadedUser.email,
          sex: loadedUser.sex,
          profession: loadedUser.profession._id,
          qualities: loadedUser.qualities.map((qual) => ({ value: qual._id, label: qual.name })),
        };
        setData(dataFields);
      })
      .finally(() => {
        if (isActual) setIsUserLoading(false);
      });

    return () => {
      isActual = false;
    };
  }, [userId]);

  const isLoading = isUserLoading || professions === null || qualities === null;

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
    name: {
      isRequired: {
        message: "Имя обязательно для заполнения",
      },
    },
    email: {
      isRequired: {
        message: "Почта обязательна для заполнения",
      },
      isEmail: {
        message: "Почта введена некорректно",
      },
    },
    qualities: {
      isRequired: {
        message: "Выберите хотя бы одно качество",
      },
    },
  };

  const validate = useCallback(() => {
    const newErrors: EditErrors = validator(data, validatorConfig);
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
    setSaveError(null);
    const isValid = validate();
    if (!isValid) return;

    const selectedProfession = getProfessionById(data.profession);
    const selectedQualities = getQualities(data.qualities);
    if (!selectedProfession || !selectedQualities) return;

    const updatedUser = {
      ...data,
      profession: selectedProfession,
      qualities: selectedQualities,
    };
    API.users
      .update(userId, updatedUser)
      .then((user) => {
        if (!user) {
          setSaveError("Ошибка обновления");
          return;
        }
        history.replace(`/users/${user._id}`);
      })
      .catch(() => setSaveError("Не удалось сохранить изменения. Попробуйте ещё раз"));
  };

  const getProfessionById = (id: string): Profession | undefined => {
    if (professions) return Object.values(professions).find((prof) => prof._id === id);
  };

  const getQualities = (selectedOptions: MultiFieldOption[]): Quality[] | undefined => {
    if (qualities) {
      const qualitiesArr = Object.values(qualities);
      const selectedQualities: Quality[] = [];
      for (const option of selectedOptions) {
        const requiredQuality = qualitiesArr.find((qual) => qual._id === option.value);
        if (!requiredQuality) return undefined;
        selectedQualities.push(requiredQuality);
      }
      return selectedQualities;
    }
  };

  return (
    <div className="container pt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {isLoading && <h4>Loading...</h4>}
          {!isLoading && !user && <h4>Пользователь не найден</h4>}
          {!isLoading && user && (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Имя"
                name="name"
                value={data.name}
                error={errors.name}
                onFieldChange={handleFieldChange}
              />
              <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                error={errors.email}
                autoComplete="email"
                onFieldChange={handleFieldChange}
              />
              <SelectField
                options={professionOptions}
                label="Выберите свою профессию"
                value={data.profession}
                name="profession"
                defaultOption="Выберите профессию..."
                onFieldChange={handleFieldChange}
              />
              <RadioField
                options={[
                  { name: "Мужской", value: "male" },
                  { name: "Женский", value: "female" },
                ]}
                name="sex"
                value={data.sex}
                label="Выберите ваш пол:"
                onFieldChange={handleFieldChange}
              />
              <MultiSelectField
                options={qualityOptions}
                value={data.qualities}
                name="qualities"
                label="Выберите ваши качества"
                error={errors.qualities}
                onFieldChange={handleFieldChange}
              />
              <button disabled={!isValid} className="btn btn-primary w-100 mx-auto mb-4">
                Обновить
              </button>
              {saveError && <div className="invalid-feedback d-block">{saveError}</div>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditUserPage;
