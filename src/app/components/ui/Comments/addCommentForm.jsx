import React, { useState, useEffect } from "react";
import * as yup from "yup";
import PropTypes from "prop-types";
import TextAreaField from "../../common/form/textAreaField";

const AddcontentForm = ({ onSubmit }) => {
  const [data, setData] = useState({ content: "" });
  const [errors, setErrors] = useState({});
  const [submitTryes, setTryes] = useState(0);

  useEffect(() => {
    if (submitTryes > 0) {
      validate();
    }
  }, [data]);

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const validateScheme = yup.object().shape({
    content: yup.string().min(1, "Поле комментария не должно быть пустым")
  });

  const validate = () => {
    validateScheme
      .validate(data)
      .then(() => setErrors({}))
      .catch((err) => setErrors({ [err.path]: err.message }));
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTryes(1);
    const isValid = validate();
    if (!isValid || data.content === "") return;
    onSubmit(data);
    clearForm();
    setTryes(0);
  };

  function clearForm() {
    setData({ content: "" });
  }

  return (
    <div>
      <h2>New comment</h2>
      <form onSubmit={handleSubmit}>
        <TextAreaField
          name="content"
          value={data.content || ""}
          onChange={handleChange}
          label="Комментарий"
          error={errors.content}
        />

        <button disabled={!isValid} className="btn btn-primary w-100 mx-auto">
          Post a content
        </button>
      </form>
    </div>
  );
};

AddcontentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default AddcontentForm;
