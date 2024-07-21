import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuthError, logIn } from "../../store/users";

const LoginForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    stayOn: false
  });
  const [errors, setErrors] = useState({});
  const [submitTryes, setTryes] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();
  const enterError = useSelector(getAuthError());

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
    password: {
      isRequired: {
        message: "Пароль обязателен для заполнения"
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

  // const handleRedirect = () => {
  //   if (enterError === null) {
  //     history.push(
  //       history.location.state ? history.location.state.from.pathname : "/"
  //     );
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTryes(1);
    const isValid = validate();
    if (!isValid) return;
    const redirect = history.location.state
      ? history.location.state.from.pathname
      : "/";
    dispatch(logIn({ payload: data, redirect }));
    // handleRedirect();
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
      <CheckBoxField name="stayOn" onChange={handleChange} value={data.stayOn}>
        Оставаться в системе
      </CheckBoxField>
      {enterError && <p className="text-danger">{enterError}</p>}
      <button disabled={!isValid} className="btn btn-primary w-100 mx-auto">
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
