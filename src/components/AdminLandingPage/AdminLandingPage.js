import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "actions";
import LanguageSelector from "components/LanguageSelector";
import AdminSignInForm from "./AdminSignInForm";
import AdminSignUpForm from "./AdminSignUpForm";

class AdminLandingPage extends Component {
  state = { allowSignup: true }

  renderForm() {
    if(this.state.allowSignup === true ) {
      return <AdminSignUpForm adminSignup={this.props.adminSignup} />;
    }
    // need to pass onSubmit function to signin form
    return <AdminSignInForm />
  }

  render() {
    return (
      <div className="flex-container">
        <LanguageSelector position="language-selector-top" />
        <div className="box">
          <h1>My Internship Admin</h1>
          <div className="error-box"></div>
          {this.renderForm()}
        </div>
      </div>
    )
  }
}

export default connect(null, actions)(AdminLandingPage);
