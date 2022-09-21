import React, { useState, useEffect } from "react";
import api from "../../../api";
import SelectField from "../form/selectField";
import TextAreaField from "../form/textAreaField";
import PropTypes from "prop-types";
import { validator } from "../../../utils/validator";

const CommentForm = ({ onSubmit }) => {
    const [user, setUser] = useState([]);
    const [data, setData] = useState({ userId: "", content: "" });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        api.users.fetchAll().then((data) =>
            setUser(
                data.map((item) => ({
                    value: item._id,
                    label: item.name
                }))
            )
        );
    }, []);

    const handleChange = (elem) => {
        setData((prevState) => ({ ...prevState, [elem.name]: elem.value }));
    };

    const validatorConfig = {
        userId: {
            isRequired: {
                message: "Выберите пользователя"
            }
        },
        content: {
            isRequired: {
                message: "Поле не может быть пустым"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const clearForm = () => {
        setData({ userId: "", content: "" });
        setErrors({});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearForm();
    };

    return (
        <div>
            <h2>New comment</h2>
            <form onSubmit={handleSubmit}>
                <SelectField
                    value={data.userId}
                    name="userId"
                    onChange={handleChange}
                    options={user}
                    defaultOption="Выберите пользователя"
                    error={errors.userId}
                />
                <TextAreaField
                    label="Сообщение"
                    name="content"
                    value={data.content}
                    onChange={handleChange}
                    error={errors.content}
                />
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary">Опубликовать</button>
                </div>
            </form>
        </div>
    );
};

CommentForm.propTypes = {
    onSubmit: PropTypes.func
};

export default CommentForm;
