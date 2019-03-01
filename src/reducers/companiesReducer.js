import {
  FETCH_COMPANIES
} from "actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_COMPANIES:
      return action.payload;
    default:
      return state;
  }
};
