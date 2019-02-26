import React, { Component } from "react";
import { connect } from "react-redux";

import requireStudentAuth from "requireStudentAuth";
import Navbar from "./Navbar";

class Dashboard extends Component {
  renderWelcome() {
    if(this.props.auth) {
      return `Welcome ${this.props.auth.name}`
    }
  }
  render() {
    return (
      <div className="dashboard-container">
        <Navbar auth={this.props.auth} />
        <div className="dashboard-flex-box">
          <div className="main-box">
          
          </div>
        </div>
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
