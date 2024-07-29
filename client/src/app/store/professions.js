import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/professionService";

const professionsSlice = createSlice({
  name: "professions",
  initialState: {
    entities: null,
    isLoading: true,
    errors: null,
    lastFetch: null
  },
  reducers: {
    professionsRequested: (state) => {
      state.isLoading = true;
    },
    professionsRecieved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
      state.lastFetch = Date.now();
    },
    professionsRequestFailed: (state, action) => {
      state.errors = action.payload;
      state.isLoading = false;
    }
  }
});

const { reducer: professionsReducer, actions } = professionsSlice;
const { professionsRequested, professionsRecieved, professionsRequestFailed } =
  actions;

const isOutDated = (date) => {
  if (Date.now() - date > 10 * 60 * 1000) {
    return true;
  } else {
    return false;
  }
};

export const loadProfessionsList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().professions;
  if (isOutDated(lastFetch)) {
    dispatch(professionsRequested());
    try {
      const { content } = await professionService.get();
      dispatch(professionsRecieved(content));
    } catch (error) {
      dispatch(professionsRequestFailed());
    }
  }
};

export const getProfessions = () => (state) => state.professions.entities;
export const getProfessionById = (id) => (state) => {
  if (state.professions.entities) {
    const profession = state.professions.entities.find(
      (prof) => prof._id === id
    );
    return profession;
  }
};
export const getProfessionsLoadingStatus = () => (state) =>
  state.professions.isLoading;

export default professionsReducer;
