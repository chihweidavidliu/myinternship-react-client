import {
  STUDENT_SIGNUP,
  FETCH_USER
} from "actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case STUDENT_SIGNUP:
      return action.payload;
    case FETCH_USER:
      return action.payload;
    default:
      return state;
  }
};
