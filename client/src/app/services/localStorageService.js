export function setToken({ idToken, refreshToken, localId, expiresIn = 3600 }) {
  const expiresDate = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem("jwt-token", idToken);
  localStorage.setItem("jwt-refresh-token", refreshToken);
  localStorage.setItem("jwt-expires", expiresDate);
  localStorage.setItem("user-local-id", localId);
}
export function getToken() {
  return localStorage.getItem("jwt-token");
}

export function getRefreshToken() {
  return localStorage.getItem("jwt-refresh-token");
}

export function removeAuthToken() {
  localStorage.removeItem("jwt-token");
  localStorage.removeItem("jwt-refresh-token");
  localStorage.removeItem("jwt-expires");
  localStorage.removeItem("user-local-id");
}

export function getTokenExpiresDate() {
  return localStorage.getItem("jwt-expires");
}

export function getUserId() {
  return localStorage.getItem("user-local-id");
}

const localStorageService = {
  setToken,
  getToken,
  getRefreshToken,
  getTokenExpiresDate,
  removeAuthToken,
  getUserId
};
export default localStorageService;
