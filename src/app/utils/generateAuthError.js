function generateAuthError(message) {
    switch (message) {
        case "EMAIL_NOT_FOUND":
            return "Пользователя с таким Email не существует";
        case "INVALID_PASSWORD":
            return "Пароль введен неверно";
        case "EMAIL_EXISTS":
            return "Пользователь с таким Email уже существует";

        default:
            return "Превышено количество попыток входа. Попробуйте позже";
    }
}

export default generateAuthError;
