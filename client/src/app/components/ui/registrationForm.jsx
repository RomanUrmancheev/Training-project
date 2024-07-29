import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import { useDispatch, useSelector } from "react-redux";
import { getQualitiesList } from "../../store/qualities";
import { getProfessions } from "../../store/professions";
import { signUp } from "../../store/users";
// import { useHistory } from "react-router-dom/cjs/react-router-dom";
const RegistrationForm = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    profession: "",
    sex: "male",
    qualities: [],
    licence: false
  });
  const [errors, setErrors] = useState({});
  const [submitTryes, setTryes] = useState(0);
  const professions = useSelector(getProfessions());
  const qualities = useSelector(getQualitiesList());
  const qualitiesList = qualities.map((q) => ({
    label: q.name,
    value: q._id
  }));
  // const history = useHistory();

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронный адрес обязателен для заполнения"
      },
      isEmail: {
        message: "Электронный адрес указан неверно"
      }
    },
    name: {
      isRequired: {
        message: "Имя обязательно для заполнения"
      }
    },
    password: {
      isRequired: {
        message: "Пароль обязателен для заполнения"
      },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотя бы одну заглавную букву"
      },
      isDigitSymbol: {
        message: "Пароль должен содержать хотя бы одну цифру"
      },
      passwordLength: {
        message: `Пароль должен быть не менее 8 символов`,
        value: 8
      }
    },
    profession: {
      isRequired: {
        message: "Поле профессия обязательно для заполнения"
      }
    },
    licence: {
      isRequired: {
        message: "Необходимо подтвердить согласие с лицензионным соглашением"
      }
    }
  };

  useEffect(() => {
    if (submitTryes > 0) {
      validate();
    }
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTryes(1);
    const isValid = validate();
    if (!isValid) return;
    const newData = {
      ...data,
      qualities: data.qualities.map((q) => q.value)
    };
    dispatch(signUp(newData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="email"
        value={data.email}
        onChange={handleChange}
        label="Email"
        error={errors.email}
      />
      <TextField
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        label="Password"
        error={errors.password}
      />
      <TextField
        name="name"
        value={data.name}
        onChange={handleChange}
        label="Name"
        error={errors.name}
      />
      <SelectField
        label="Профессия"
        onChange={handleChange}
        name="profession"
        value={data.profession}
        defaultOption="Выберите профессию"
        options={professions}
        error={errors.profession}
      />
      <RadioField
        label="Пол"
        name="sex"
        value={data.sex}
        onChange={handleChange}
        options={[
          { name: "male", value: "male" },
          { name: "female", value: "female" }
        ]}
      />
      <MultiSelectField
        label="Ваши качества"
        options={qualitiesList}
        defaultValue={data.qualities}
        onChange={handleChange}
        name="qualities"
      />
      <CheckBoxField
        name="licence"
        onChange={handleChange}
        value={data.licence}
        error={errors.licence}
      >
        Подтвердить <a>лицензионное соглашение</a>
      </CheckBoxField>

      <button disabled={!isValid} className="btn btn-primary w-100 mx-auto">
        Submit
      </button>
    </form>
  );
};

export default RegistrationForm;
