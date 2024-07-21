import { createSlice } from "@reduxjs/toolkit";
import qualityService from "../services/qualityService";

const qualitiesSlice = createSlice({
  name: "qualities",
  initialState: {
    entities: null,
    isLoading: true,
    errors: null,
    lastFetch: null
  },
  reducers: {
    qualitiesRequsted: (state) => {
      state.isLoading = true;
    },
    qualitiesRecieved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
      state.lastFetch = Date.now();
    },
    qualitiesRequestFailed: (state, action) => {
      state.errors = action.payload;
      state.isLoading = false;
    }
  }
});

const { reducer: qualitiesReducer, actions } = qualitiesSlice;
const { qualitiesRequsted, qualitiesRecieved, qualitiesRequestFailed } =
  actions;

const isOutDated = (date) => {
  if (Date.now() - date > 10 * 60 * 1000) {
    return true;
  } else {
    return false;
  }
};

export const loadQualitiesList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().qualities;
  if (isOutDated(lastFetch)) {
    dispatch(qualitiesRequsted());
    try {
      const { content } = await qualityService.get();
      dispatch(qualitiesRecieved(content));
    } catch (error) {
      dispatch(qualitiesRequestFailed(error.message));
    }
  }
};

export const getQualitiesList = () => (state) => state.qualities.entities;

export const getQualitiesLoadingStatus = () => (state) =>
  state.qualities.isLoading;

export default qualitiesReducer;
