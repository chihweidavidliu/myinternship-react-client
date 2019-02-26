import axios from "axios";

import { STUDENT_SIGNUP, STUDENT_SIGNIN, FETCH_USER, TOGGLE_LANGUAGE } from "actions/types";

export const studentSignup = (formData) => async (dispatch) => {
  try {
    const response = await axios.post("/auth/signup", formData);
    dispatch({ type: STUDENT_SIGNUP, payload: response.data });
  } catch (err) {
    dispatch({ type: STUDENT_SIGNUP, payload: false });
  }
};

export const studentSignin = (formData) => async (dispatch) => {
  try {
    const response = await axios.post("/auth/signin", formData);
    dispatch({ type: STUDENT_SIGNIN, payload: response.data });
  } catch (err) {
    dispatch({ type: STUDENT_SIGNIN, payload: false });
  }
};

export const fetchUser = () => async (dispatch, getState) => {
  try {
    const response = await axios.get("/api/current_user");
    dispatch({ type: FETCH_USER, payload: response.data });
  } catch (err) {
    dispatch({ type: FETCH_USER, payload: false });
  }
};

export const toggleLanguage = (language) => {
  return {
    type: TOGGLE_LANGUAGE,
    payload: language,
  }
}
