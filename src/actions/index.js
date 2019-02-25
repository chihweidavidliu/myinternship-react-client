import axios from "axios";

import { STUDENT_SIGNUP, FETCH_USER } from "actions/types";

export const studentSignup = (formData) => async (dispatch) => {
  try {
    const response = await axios.post("/auth/signup", formData);
    dispatch({ type: STUDENT_SIGNUP, payload: response.data });
  } catch (err) {
    dispatch({ type: STUDENT_SIGNUP, payload: false });
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
