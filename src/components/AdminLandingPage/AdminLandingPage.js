import React, { Component } from "react";
import { connect } from "react-redux";
import { Message } from "semantic-ui-react";

import history from "history.js";
import * as actions from "actions";
import LanguageSelector from "components/LanguageSelector";
import AdminSignInForm from "./AdminSignInForm";
import AdminSignUpForm from "./AdminSignUpForm";

class AdminLandingPage extends Component {
  state = { allowSignup: false }

  handleSignin = async (formValues) => {
    await this.props.adminSignin(formValues);
    if (this.props.auth) {
      history.push("/admin/students");
    }
  }

  renderForm() {
    if(this.state.allowSignup === true ) {
      return <AdminSignUpForm adminSignup={this.props.adminSignup} />;
    }
    // need to pass onSubmit function to signin form
    return <AdminSignInForm handleSignin={this.handleSignin}/>
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

  render() {
    return (
      <div className="flex-container">
        <LanguageSelector position="language-selector-top" />
        <div className="box">
          <h1>My Internship Admin</h1>
          <div className="error-box">{this.renderError()}</div>
          {this.renderForm()}
        </div>
      </div>
    )
  }
}

const mapStatetoProps = (state) => {
  return {
    auth: state.auth,
    authMessage: state.authMessage
  };
};

export default connect(mapStatetoProps, actions)(AdminLandingPage);
