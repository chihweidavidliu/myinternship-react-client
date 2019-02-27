import {
  ADD_ERROR_MESSAGE,
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
    case ADD_ERROR_MESSAGE:
      return false;
    default:
      return state;
  }
};
