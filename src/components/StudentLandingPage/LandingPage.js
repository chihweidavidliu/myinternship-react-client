import React, { Component } from "react";
import { connect } from "react-redux";
import { Message } from "semantic-ui-react";
import { withTranslation } from "react-i18next";

import history from "history.js";
import * as actions from "actions";
import LanguageSelector from "components/LanguageSelector";
import SignUpForm from "components/StudentLandingPage/SignUpForm";
import SigninForm from "components/StudentLandingPage/SigninForm";
import ToggleForm from "components/StudentLandingPage/ToggleForm";

class LandingPage extends Component {
  state = { signUp: false, currentForm: "signUp" };

  async componentDidMount() {
    await this.props.checkSignupAuth();
    await this.setState({ signUp: this.props.signupAuth });

    if (this.state.signUp === false) {
      this.setState({ currentForm: "signIn" });
    }
  }

  handleSignin = async (formValues) => {
    await this.props.studentSignin(formValues);
    if (this.props.auth) {
      history.push("/dashboard");
    }
  };

  toggleForm = () => {
    if (this.state.signUp === false) {
      return;
    }
    if (this.state.currentForm === "signUp") {
      // clear error messages
      this.props.addErrorMesssage(null);
      return this.setState({ currentForm: "signIn" });
    }
    // clear error messages
    this.props.addErrorMesssage(null);
    return this.setState({ currentForm: "signUp" });
  };

  renderForm() {
    if (this.state.signUp === false) {
      return <SigninForm handleSignin={this.handleSignin} />;
    }
    if (this.state.currentForm === "signUp") {
      return <SignUpForm studentSignup={this.props.studentSignup} auth={this.props.auth} />;
    } else if (this.state.currentForm === "signIn") {
      return <SigninForm handleSignin={this.handleSignin} />;
    }
  }

  renderError() {
    const { authMessage, t } = this.props;
    if (authMessage) {
      return (
        <Message
          style={{ marginBottom: "15px" }}
          error
          header={t("studentForms.formErrors.errorHeader")}
          content={authMessage}
        />
      );
    }
  }

  renderToggleButton() {
    if (this.state.signUp === false) {
      return;
    }
    if (this.state.currentForm === "signUp") {
      return <ToggleForm message="Click to sign-in" prompt="Already registered?" onClick={this.toggleForm} />;
    }
    return <ToggleForm message="Click to sign-up" prompt="Not registered?" onClick={this.toggleForm} />;
  }

  render() {
    return (
      <div className="flex-container">
        <LanguageSelector position="language-selector-top" />
        <div className="box">
          <h1>My Internship</h1>
          <div className="error-box">{this.renderError()}</div>
          {this.renderForm()}
          {this.renderToggleButton()}
        </div>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    auth: state.auth,
    authMessage: state.authMessage,
    signupAuth: state.signupAuth
  };
};
const wrapped = connect(
  mapStatetoProps,
  actions
)(LandingPage);

export default withTranslation()(wrapped);
