import React, { useState, useEffect } from "react";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import MultiSelectField from "../../common/form/multiSelectField";
import RadioField from "../../common/form/radioField";
import { useHistory } from "react-router-dom";
import { validator } from "../../../utils/validator";
import { useProfessions } from "../../../hooks/useProfession";
import { useQualities } from "../../../hooks/useQuality";
import { useAuth } from "../../../hooks/useAuth";

const EditUserPage = () => {
    const history = useHistory();
    const { currentUser, updateUser } = useAuth();
    const [data, setData] = useState();
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const { professions, isLoading: professionLoading } = useProfessions();
    const professionsList = professions.map((prof) => ({
        label: prof.name,
        value: prof._id
    }));

    const {
        qualities,
        isLoading: qualitiesLoading,
        getQuality
    } = useQualities();
    const qualitiesList = qualities.map((qual) => ({
        label: qual.name,
        value: qual._id
    }));

    const getQualitiesListByIds = (qualIds) => {
        return qualIds.map((q) => getQuality(q));
    };

    const transformData = (data) => {
        return getQualitiesListByIds(data).map((qual) => ({
            label: qual.name,
            value: qual._id
        }));
    };

    useEffect(() => {
        if (!professionLoading && !qualitiesLoading && currentUser && !data) {
            setData({
                ...currentUser,
                qualities: transformData(currentUser.qualities)
            });
        }
    }, [professionLoading, qualitiesLoading, currentUser, data]);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return null;
        const newData = {
            ...data,
            qualities: data.qualities.map((q) => q.value)
        };

        try {
            await updateUser(newData);
            history.push(`/users/${currentUser._id}`);
        } catch (error) {
            setErrors(error);
        }
    };

    const handleClick = () => {
        history.push(`/users/${currentUser._id}`);
    };

    return (
        <>
            {!isLoading && Object.keys(data).length > 0 ? (
                <div className="container mt-5">
                    <button className="btn btn-primary" onClick={handleClick}>
                        <i className="bi bi-caret-left">Назад</i>
                    </button>
                    <div className="row">
                        <div className="col-md-6 offset-md-3 shadow p-4">
                            <h3 className="mb-4">
                                Редактирование пользователя
                            </h3>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Имя"
                                    name="name"
                                    value={data.name}
                                    error={errors.name}
                                    onChange={handleChange}
                                />
                                <TextField
                                    label="Электронная почта"
                                    name="email"
                                    value={data.email}
                                    error={errors.email}
                                    onChange={handleChange}
                                />
                                <SelectField
                                    onChange={handleChange}
                                    options={professionsList}
                                    defaultOption="Choose..."
                                    error=""
                                    value={data.profession}
                                    label="Выбери свою профессию"
                                    name="profession"
                                />
                                <RadioField
                                    options={[
                                        { name: "Male", value: "male" },
                                        { name: "Female", value: "female" },
                                        { name: "Other", value: "other" }
                                    ]}
                                    value={data.sex}
                                    name="sex"
                                    onChange={handleChange}
                                    label="Выберите ваш пол:"
                                />
                                <MultiSelectField
                                    options={qualitiesList}
                                    onChange={handleChange}
                                    name="qualities"
                                    label="Выберите ваши качества"
                                    defaultValue={data.qualities}
                                />
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 mx-auto"
                                    disabled={!isValid}
                                >
                                    Обновить
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            ) : (
                <h3>Loading...</h3>
            )}
        </>
    );
};

export default EditUserPage;
