import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER,
  GET_PROFILES,
  CLEAR_ERRORS
} from "./types";
export const getCurrentUser = () => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(setProfileLoading());
    axios
      .get("/api/profile")
      .then(res => {
        dispatch({ type: GET_PROFILE, payload: res.data });
        resolve();
      })
      .catch(err => {
        dispatch({ type: GET_PROFILE, payload: {} });
        reject();
      });
  });
export const setProfileLoading = () => ({
  type: PROFILE_LOADING
});
export const clearCurrentProfile = () => ({
  type: CLEAR_CURRENT_PROFILE
});
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(res => history.push("/dashboard"))
    .then(() => dispatch({ type: CLEAR_ERRORS }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
export const deleteProfile = () => dispatch => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    axios
      .delete("/api/profile")
      .then(res => dispatch({ type: SET_CURRENT_USER, payload: {} }))
      .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
  }
};
export const addExperience = (data, history) => dispatch => {
  axios
    .post("/api/profile/experience", data)
    .then(res => history.push("/dashboard"))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
export const addEducation = (data, history) => dispatch => {
  axios
    .post("/api/profile/education", data)
    .then(res => history.push("/dashboard"))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
export const deleteExperience = id => dispatch => {
  axios
    .delete(`/api/profile/experience/${id}`)
    .then(res => dispatch(getCurrentUser()))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
export const deleteEducation = id => dispatch => {
  axios
    .delete(`/api/profile/education/${id}`)
    .then(res => dispatch(getCurrentUser()))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/all")
    .then(res => dispatch({ type: GET_PROFILES, payload: res.data }))
    .catch(err => dispatch({ type: GET_PROFILES, payload: null }));
};
export const getProfileByHandle = handle => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(setProfileLoading());
    axios
      .get(`/api/profile/handle/${handle}`)
      .then(res => {
        dispatch({ type: GET_PROFILE, payload: res.data });
        resolve();
      })
      .catch(err => {
        dispatch({ type: GET_PROFILE, payload: null });
        reject();
      });
  });
