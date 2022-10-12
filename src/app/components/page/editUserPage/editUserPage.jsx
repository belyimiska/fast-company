import React, { useState, useEffect } from "react";
import api from "../../../api";
import PropTypes from "prop-types";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import MultiSelectField from "../../common/form/multiSelectField";
import RadioField from "../../common/form/radioField";
import { useHistory } from "react-router-dom";
import { validator } from "../../../utils/validator";
// import { useUser } from "../../../hooks/useUsers";

const EditUserPage = ({ id }) => {
    // const { getUserById } = useUser();
    // const user = getUserById(id);
    // console.log(user);

    const history = useHistory();

    const [data, setData] = useState({});

    const [professions, setProfession] = useState([]);
    const [qualities, setQualities] = useState([]);
    const [errors, setErrors] = useState({});

    // useEffect(() => {
    //     setData({
    //         name: user.name,
    //         email: user.email,
    //         profession: user.profession,
    //         sex: user.sex,
    //         qualities: user.qualities.map((q) => ({
    //             label: q,
    //             value: q
    //         }))
    //     });
    // }, []);

    useEffect(() => {
        api.users.getById(id).then((data) =>
            setData({
                name: data.name,
                email: data.email,
                profession: data.profession._id,
                sex: data.sex,
                qualities: data.qualities.map((quality) => ({
                    label: quality.name,
                    value: quality._id
                }))
            })
        );
    }, []);

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return null;
        const { profession, qualities } = data;
        api.users
            .update(id, {
                ...data,
                profession: getProfessionById(profession),
                qualities: getQualities(qualities)
            })
            .then((data) => {
                history.push(`/users/${data._id}`);
                console.log(data);
            });
    };

    const handleClick = () => {
        history.push(`/users/${id}`);
    };

    return (
        <>
            {Object.keys(data).length > 0 ? (
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
                                    options={professions}
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
                                    options={qualities}
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

EditUserPage.propTypes = {
    id: PropTypes.string.isRequired
};

export default EditUserPage;
