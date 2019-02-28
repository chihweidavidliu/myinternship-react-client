import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import requireStudentAuth from "requireStudentAuth";
import Navbar from "./Navbar";


class Dashboard extends Component {
  componentDidMount() {
    // need some action creator that checks if students are allowed to make their choices yet
  }
  render() {
    const { t } = this.props;

    return (
      <div className="dashboard-container">
        <Navbar auth={this.props.auth} />
        <div className="dashboard-flex-box">
          <div className="main-box">
            <h1>{t("dashboard.header")}</h1>
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

const wrapped = connect(mapStateToProps) (requireStudentAuth(Dashboard));
export default withTranslation()(wrapped);
