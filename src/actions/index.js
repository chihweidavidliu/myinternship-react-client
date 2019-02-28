import axios from "axios";
import { submit } from "redux-form";
import i18n from "i18n";

import { ADD_ERROR_MESSAGE, STUDENT_SIGNUP, STUDENT_SIGNIN, FETCH_USER, TOGGLE_LANGUAGE } from "actions/types";

export const studentSignup = (formData) => async (dispatch) => {
  try {
    const response = await axios.post("/auth/signup", formData);
    dispatch({ type: STUDENT_SIGNUP, payload: response.data });
  } catch (err) {
    if(err.response.data.message === "studentid is in use") {
      return dispatch({ type: ADD_ERROR_MESSAGE, payload: i18n.t("studentForms.formErrors.studentid.duplicateId") });
    }
    return dispatch({ type: ADD_ERROR_MESSAGE, payload: i18n.t("studentForms.formErrors.signupFailure") })
  }
};

export const studentSignin = (formData) => async (dispatch) => {
  try {
    const response = await axios.post("/auth/signin", formData);
    dispatch({ type: STUDENT_SIGNIN, payload: response.data });
  } catch (err) {
    dispatch({ type: ADD_ERROR_MESSAGE, payload: i18n.t("studentForms.formErrors.signinFailure") });
  }
};

export const addErrorMesssage = (message) => {
  return {
    type: ADD_ERROR_MESSAGE,
    payload: message
  }
}

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

export const submitReduxForm = (formName) => async (dispatch) => {
  await dispatch(submit(formName));
}
