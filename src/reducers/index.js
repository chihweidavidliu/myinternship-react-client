import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import languageReducer from "reducers/languageReducer";
import authReducer from "reducers/authReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  language: languageReducer,
});
