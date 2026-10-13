type ValidationRule = {
  message: string;
  value?: number;
};
type FieldRules = Record<string, ValidationRule>;
type ValidatorConfig<T> = Record<keyof T, FieldRules>;
type ValidationErrors<T> = Partial<Record<keyof T, string>>;

export function validator<T extends Record<string, string>>(data: T, config: ValidatorConfig<T>) {
  const errors: ValidationErrors<T> = {};
  function validate(method: string, value: string, rule: ValidationRule): string | undefined {
    let statusValidate;
    switch (method) {
      case "isRequired":
        statusValidate = value.trim() === "";
        break;
      case "isEmail": {
        const emailRegExp = /^\S+@\S+\.\S+$/g;
        statusValidate = !emailRegExp.test(value);
        break;
      }
      case "isCapitalSymbol": {
        const capitalRegExp = /[A-Z]+/g;
        statusValidate = !capitalRegExp.test(value);
        break;
      }
      case "isContainDigit": {
        const digitRegExp = /\d+/g;
        statusValidate = !digitRegExp.test(value);
        break;
      }
      case "minLength": {
        if (rule.value !== undefined) {
          statusValidate = value.length < rule.value;
        }
        break;
      }
      default:
        break;
    }
    if (statusValidate) return rule.message;
  }

  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(validateMethod, data[fieldName], config[fieldName][validateMethod]);
      if (error) {
        errors[fieldName] = error;
        break;
      }
    }
  }

  return errors;
}
