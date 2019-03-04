import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import languageReducer from "reducers/languageReducer";
import authReducer from "reducers/authReducer";
import authMessageReducer from "reducers/authMessageReducer";
import companiesReducer from "reducers/companiesReducer";
import signupAuthReducer from "reducers/signupAuthReducer";
import numberOfAdminsReducer from "reducers/numberOfAdminsReducer";

export default combineReducers({
  auth: authReducer,
  authMessage: authMessageReducer,
  form: formReducer,
  language: languageReducer,
  companies: companiesReducer,
  signupAuth: signupAuthReducer,
  numberOfAdmins: numberOfAdminsReducer
});
