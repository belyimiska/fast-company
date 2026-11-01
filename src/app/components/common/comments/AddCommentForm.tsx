import { FormEvent, useState } from "react";
import SelectField, { SourceOption } from "../form/SelectField";
import TextAreaField from "../form/TextAreaField";
import { validator } from "../../../utils/validator";

type AddCommentFormProps = {
  users: SourceOption[] | null;
  onSubmit: (data: CommentData) => Promise<boolean>;
};

export type CommentData = {
  userId: string;
  content: string;
};

type CommentErrors = {
  userId?: string;
  content?: string;
};

type FieldChange = {
  name: "userId" | "content";
  value: string;
};

const validatorConfig = {
  userId: {
    isRequired: {
      message: "Выберите пользователя",
    },
  },
  content: {
    isRequired: {
      message: "Введите сообщение",
    },
  },
};

const initialData: CommentData = { userId: "", content: "" };

const AddCommentForm = ({ users, onSubmit }: AddCommentFormProps) => {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState<CommentErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleFieldChange = (field: FieldChange) => {
    setData((prev) => ({ ...prev, [field.name]: field.value }));
  };

  const validate = () => {
    const newErrors: CommentErrors = validator(data, validatorConfig);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setSubmitError(null);
    const isValid = validate();
    if (!isValid) return;

    setIsSubmitting(true);

    onSubmit(data)
      .then((isSuccess) => {
        if (!isSuccess)
          return setSubmitError("Не удалось опубликовать комментарий. Попробуйте ещё раз");
        setData(initialData);
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <form onSubmit={handleSubmit}>
      <SelectField
        options={users}
        value={data.userId}
        error={errors.userId}
        defaultOption="Выберите пользователя"
        name="userId"
        onFieldChange={handleFieldChange}
      />
      <TextAreaField
        label="Сообщение"
        value={data.content}
        error={errors.content}
        name="content"
        rows={3}
        onFieldChange={handleFieldChange}
      />
      {submitError && <div className="text-danger mb-3">{submitError}</div>}
      <div className="d-flex justify-content-end">
        <button disabled={isSubmitting} className="btn btn-primary">
          {isSubmitting ? "Публикация..." : "Опубликовать"}
        </button>
      </div>
    </form>
  );
};

export default AddCommentForm;
