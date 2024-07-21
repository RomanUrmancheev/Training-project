/* eslint-disable indent */
import { createAction, createSlice } from "@reduxjs/toolkit";
import userService from "../services/userService";
import authService from "../services/authService";
import localStorageService from "../services/localStorageService";
import getRandomInt from "../utils/getRandomInt";
import generateAuthError from "../services/generateAuthError";
import history from "../utils/history";

const initialState = localStorageService.getToken()
  ? {
      entities: null,
      isLoading: true,
      errors: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
      dataIsLoaded: false
    }
  : {
      entities: null,
      isLoading: false,
      errors: null,
      auth: null,
      isLoggedIn: false,
      dataIsLoaded: false
    };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    authRequested: (state) => {
      state.isLoading = true;
      state.errors = null;
    },
    updateRequested: (state) => {
      state.isLoading = true;
    },
    usersRecieved: (state, action) => {
      state.entities = action.payload;
      state.dataIsLoaded = true;
      state.isLoading = false;
    },
    usersRequestFailed: (state, action) => {
      state.errors = action.payload;
      state.isLoading = false;
    },
    authRequestFailed: (state, action) => {
      state.errors = action.payload;
      state.isLoading = false;
    },
    updateRequestFailed: (state, action) => {
      state.errors = action.payload;
      state.isLoading = false;
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    updateRequestSuccess: (state, action) => {
      state.entities[
        state.entities.findIndex((u) => u._id === action.payload._id)
      ] = action.payload;
      state.isLoading = false;
    },
    userCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    userLogedOut: (state) => {
      state.entities = null;
      state.isLoggedIn = false;
      state.auth = null;
      state.dataIsLoaded = false;
    }
  }
});

const userCreateRequested = createAction("users/userCreateRequested");
const userCreateFailed = createAction("users/userCreateFailed");

const { reducer: usersReducer, actions } = usersSlice;
const {
  usersRequested,
  usersRecieved,
  usersRequestFailed,
  authRequested,
  authRequestFailed,
  authRequestSuccess,
  userCreated,
  userLogedOut,
  updateRequested,
  updateRequestFailed,
  updateRequestSuccess
} = actions;

const createUser = (payload) => async (dispatch) => {
  dispatch(userCreateRequested());
  try {
    const { content } = await userService.create(payload);
    dispatch(userCreated(content));
    history.push("/users");
  } catch (error) {
    dispatch(userCreateFailed(error.message));
  }
};

export const signUp =
  ({ email, password, ...rest }) =>
  async (dispatch) => {
    dispatch(authRequested());
    try {
      const data = await authService.registration({ email, password });
      localStorageService.setToken(data);
      dispatch(authRequestSuccess({ userId: data.localId }));
      dispatch(
        createUser({
          _id: data.localId,
          email,
          rate: getRandomInt(1, 5),
          completedMeetings: getRandomInt(0, 200),
          ...rest
        })
      );
    } catch (error) {
      const { code, message } = error.response.data.error;
      if (code === 400) {
        dispatch(authRequestFailed(generateAuthError(message)));
      } else {
        dispatch(authRequestFailed(error.message));
      }
    }
  };

export const logIn =
  ({ payload, redirect }) =>
  async (dispatch) => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
      const data = await authService.login({ email, password });
      dispatch(authRequestSuccess({ userId: data.localId }));
      localStorageService.setToken(data);
      history.push(redirect);
      // currentHistory.push("/");
      // const history = getHistory();
      // console.log(history);
      // const redirect = history.location.state
      //   ? history.location.state.from.pathname
      //   : "/";
      // history.push(redirect);
    } catch (error) {
      const { code, message } = error.response.data.error;
      if (code === 400) {
        dispatch(authRequestFailed(generateAuthError(message)));
      } else {
        dispatch(authRequestFailed(error.message));
      }
    }
  };

export const userUpdate = (data) => async (dispatch) => {
  dispatch(updateRequested());
  try {
    const { content } = await userService.update(data);
    dispatch(updateRequestSuccess(content));
  } catch (error) {
    dispatch(updateRequestFailed(error.message));
  }
};

export const logOut = () => (dispatch) => {
  localStorageService.removeAuthToken();
  dispatch(userLogedOut());
};

export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested());
  try {
    const { content } = await userService.get();
    dispatch(usersRecieved(content));
  } catch (error) {
    dispatch(usersRequestFailed(error.message));
  }
};

export const getUserById = (id) => (state) => {
  if (state.users.entities) {
    return state.users.entities.find((user) => user._id === id);
  }
};
export const getUsers = () => (state) => state.users.entities;
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getDataStatus = () => (state) => state.users.dataIsLoaded;
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export const getCurrentUser = () => (state) => {
  return state.users.entities
    ? state.users.entities.find((u) => u._id === state.users.auth.userId)
    : null;
};
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getAuthError = () => (state) => state.users.errors;
export default usersReducer;
