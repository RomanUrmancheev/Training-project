import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import PropTypes from "prop-types";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import * as yup from "yup";
import BackHistoryButton from "../../common/backButton";
import { useDispatch, useSelector } from "react-redux";
import {
  getQualitiesList,
  getQualitiesLoadingStatus
} from "../../../store/qualities";
import {
  getProfessions,
  getProfessionsLoadingStatus
} from "../../../store/professions";
import { getCurrentUser, userUpdate } from "../../../store/users";

const EditUserPage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser());
  const [data, setData] = useState();
  const [errors, setErrors] = useState({});
  const professions = useSelector(getProfessions());
  const professionsLoading = useSelector(getProfessionsLoadingStatus());
  const qualities = useSelector(getQualitiesList());
  const qualitiesLoading = useSelector(getQualitiesLoadingStatus());
  const [isLoading, setIsLoading] = useState(true);
  const qualitiesList = qualities.map((q) => ({
    label: q.name,
    value: q._id
  }));
  const history = useHistory();

  useEffect(() => {
    if (!professionsLoading && !qualitiesLoading && currentUser && !data) {
      setData({
        ...currentUser,
        qualities: getTransformedQualities(currentUser.qualities)
      });
    }
  }, [professionsLoading, qualitiesLoading, data, currentUser]);

  useEffect(() => {
    if (data && isLoading) {
      setIsLoading(false);
    }
  }, [data]);

  function getTransformedQualities() {
    const qualitiesArray = [];
    for (const quality of currentUser.qualities) {
      for (const qual of qualities) {
        if (qual._id === quality) {
          qualitiesArray.push({ label: qual.name, value: qual._id });
          break;
        }
      }
    }
    return qualitiesArray;
  }

  const handleChange = useCallback(
    (target) => {
      setData((prevState) => ({
        ...prevState,
        [target.name]: target.value
      }));
    },
    [setData]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const { qualities } = data;
    const newData = {
      ...data,
      qualities: getQualities(qualities)
    };
    dispatch(userUpdate(newData));
    history.push(`/users/${data._id}`);
  };

  const getQualities = (elements) => {
    const qualitiesArray = [];
    for (const element of elements) {
      qualitiesArray.push(element.value);
    }
    return qualitiesArray;
  };

  const validateScheme = yup.object().shape({
    email: yup
      .string()
      .required("Электронный адрес обязателен для заполнения")
      .matches(/^\S+@\S+\.\S+$/, "Электронный адрес указан неверно"),
    name: yup.string().required("Обязательно нужно указать имя")
  });

  const validate = () => {
    validateScheme
      .validate(data)
      .then(() => setErrors({}))
      .catch((err) => setErrors({ [err.path]: err.message }));
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    if (data) {
      validate();
    }
  }, [data]);

  return (
    <div className="container mt-5">
      <BackHistoryButton />
      <div className="row ">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {!isLoading && Object.keys(professions).length > 0 ? (
            <form onSubmit={handleSubmit}>
              <TextField
                name="name"
                value={data.name}
                onChange={handleChange}
                label="Имя"
                error={errors.name}
                autoFocus
              />
              <TextField
                name="email"
                value={data.email}
                onChange={handleChange}
                label="Email"
                error={errors.email}
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
                label="Выберите ваши качества"
                defaultValue={data.qualities}
                options={qualitiesList}
                onChange={handleChange}
                name="qualities"
              />

              <button
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
              >
                Edit
              </button>
            </form>
          ) : (
            "Loading..."
          )}
        </div>
      </div>
    </div>
  );
};

EditUserPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default EditUserPage;
