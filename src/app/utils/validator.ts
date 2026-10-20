type FormValue = string | unknown[] | boolean;

type ValidationRule = {
  message: string;
  value?: number;
};
type FieldRules = Record<string, ValidationRule>;
type ValidatorConfig<T> = Partial<Record<keyof T, FieldRules>>;
type ValidationErrors<T> = Partial<Record<keyof T, string>>;

export function validator<T extends Record<string, FormValue>>(
  data: T,
  config: ValidatorConfig<T>,
) {
  const errors: ValidationErrors<T> = {};
  function validate(method: string, value: FormValue, rule: ValidationRule): string | undefined {
    let statusValidate;
    switch (method) {
      case "isRequired":
        if (Array.isArray(value)) {
          statusValidate = value.length === 0;
        } else if (typeof value === "string") {
          statusValidate = value.trim() === "";
        } else if (typeof value === "boolean") {
          statusValidate = !value;
        }
        break;
      case "isEmail": {
        if (typeof value === "string") {
          const emailRegExp = /^\S+@\S+\.\S+$/g;
          statusValidate = !emailRegExp.test(value);
        }
        break;
      }
      case "isCapitalSymbol": {
        if (typeof value === "string") {
          const capitalRegExp = /[A-Z]+/g;
          statusValidate = !capitalRegExp.test(value);
        }
        break;
      }
      case "isContainDigit": {
        if (typeof value === "string") {
          const digitRegExp = /\d+/g;
          statusValidate = !digitRegExp.test(value);
        }
        break;
      }
      case "minLength": {
        if (rule.value !== undefined && typeof value === "string") {
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
    const rules = config[fieldName];
    if (!rules) continue;
    for (const validateMethod in rules) {
      const error = validate(validateMethod, data[fieldName], rules[validateMethod]);
      if (error) {
        errors[fieldName] = error;
        break;
      }
    }
  }

  return errors;
}
