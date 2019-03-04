import history from "history.js";

// external submit function to be passed to SignUpForm and called by external redux form 'submit'
const submitAdminSignup = async (values, dispatch, props) => {
  // await action creator to sign up adminForms
  await props.adminSignup(values);
  history.push("/admin/students");
};

export default submitAdminSignup;
