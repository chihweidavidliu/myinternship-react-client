import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import languageReducer from "reducers/languageReducer";
import authReducer from "reducers/authReducer";
import authMessageReducer from "reducers/authMessageReducer";

export default combineReducers({
  auth: authReducer,
  authMessage: authMessageReducer,
  form: formReducer,
  language: languageReducer,
});
