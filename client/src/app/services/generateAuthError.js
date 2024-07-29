const generateAuthError = (message) => {
  switch (message) {
    case "INVALID_LOGIN_CREDENTIALS":
      return "Email или пароль указаны не верно";
    case "EMAIL_EXIST":
      return "Данный электронный адрес уже зарегистрирован";
    default:
      return "Слишкои много попыток входа";
  }
};
export default generateAuthError;
