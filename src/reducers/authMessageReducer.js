import {
  ADD_ERROR_MESSAGE,
} from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case ADD_ERROR_MESSAGE:
      return action.payload;
    default:
      return state;
  }
};
