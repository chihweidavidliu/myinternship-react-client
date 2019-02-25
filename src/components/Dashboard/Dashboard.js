import React, { Component } from "react";
import { connect } from "react-redux";

import requireStudentAuth from "requireStudentAuth";

class Dashboard extends Component {

  renderWelcome() {
    if(this.props.auth) {
      return `Welcome ${this.props.auth.name}`
    }
  }
  render() {
    return (
      <div>
        Dashboard
        <p>{this.renderWelcome()}</p>
        <a href="/auth/logout">Log Out</a>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}
export default connect(mapStateToProps) (requireStudentAuth(Dashboard));
