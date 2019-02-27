import React, { Component } from "react";
import { connect } from "react-redux";

import history from "history.js"
import * as actions from "actions";
import LanguageSelector from "components/LanguageSelector";
import SignUpForm from "components/StudentLandingPage/SignUpForm";
import SigninForm from "components/StudentLandingPage/SigninForm";

class LandingPage extends Component {
  state = { signUp: true }

  componentDidMount() {
    // need some action creator that checks if signUp is available
  }

  handleSignin = async (formValues) => {
    await this.props.studentSignin(formValues);
    history.push("/dashboard");
  }

  renderForm() {
    if(this.state.signUp === true ) {
      return <SignUpForm studentSignup={this.props.studentSignup}/>
    } else {
      return <SigninForm handleSignin={this.handleSignin} />
    }
  }

  render() {
    return (
      <div className="flex-container">
        <LanguageSelector position="language-selector-top" />
        <div className="box">
          <h1>My Internship</h1>
          {this.renderForm()}
        </div>
      </div>
    );
  }
}

export default connect(null, actions) (LandingPage);
