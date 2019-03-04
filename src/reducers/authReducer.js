import {
  ADMIN_SIGNUP,
  UPDATE_STUDENT,
  STUDENT_SIGNUP,
  STUDENT_SIGNIN,
  FETCH_USER
} from "actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case STUDENT_SIGNUP:
      return action.payload;
    case STUDENT_SIGNIN:
      return action.payload;
    case FETCH_USER:
      return action.payload;
    case UPDATE_STUDENT:
      return action.payload;
    case ADMIN_SIGNUP:
      return action.payload;
    default:
      return state;
  }
};
