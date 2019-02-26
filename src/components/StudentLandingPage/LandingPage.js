import React, { Component } from "react";
import { connect } from "react-redux";

import history from "history.js"
import * as actions from "actions";
import LanguageSelector from "components/LanguageSelector";
import SignUpForm from "components/StudentLandingPage/SignUpForm";
import SigninForm from "components/StudentLandingPage/SigninForm";

class LandingPage extends Component {
  state = { signUp: false }

  handleForm = async (type, formValues) => {
    if(type === "signup") {
      await this.props.studentSignup(formValues);
      history.push("/dashboard");
    } else {
      await this.props.studentSignin(formValues);
      history.push("/dashboard");
    }
  }

  renderForm() {
    if(this.state.signUp === true ) {
      return <SignUpForm handleForm={this.handleForm} />
    } else {
      return <SigninForm handleForm={this.handleForm} />
    }
  }

  render() {
    return (
      <div className="flex-container">
        <LanguageSelector />
        <div className="box">
          <h1>My Internship</h1>
          {this.renderForm()}
        </div>
      </div>
    );
  }
}

export default connect(null, actions) (LandingPage);
