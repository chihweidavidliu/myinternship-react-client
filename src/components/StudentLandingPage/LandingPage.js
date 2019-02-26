import React, { Component } from "react";

import LanguageSelector from "components/LanguageSelector";
import SignUpForm from "components/StudentLandingPage/SignUpForm";

class LandingPage extends Component {
  state = { signUp: true }

  renderForm() {
    if(this.state.signUp === true ) {
      return <SignUpForm language={this.props.language} />
    }
    // else return signin form
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

export default LandingPage;
