import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import requireStudentAuth from "requireStudentAuth";
import Navbar from "./Navbar";
import SharedList from "./SharedList";

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
            <div id="company-choices">
              <div id="choices">
                <h2>{t("dashboard.choices")}</h2>
                <p>{t("dashboard.choicesPrompt")}</p>
                <SharedList items={["Apple", "Google", "AirBnb", "Uber"]} listType="ol" />
              </div>
              <div id="options">
                <h2>{t("dashboard.options")}</h2>
                <p>{t("dashboard.optionsPrompt")}</p>
                <SharedList items={["Deliveroo", "Amazon", "Microsoft", "Dropbox"]} listType="ul" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

const wrapped = connect(mapStateToProps)(requireStudentAuth(Dashboard));
export default withTranslation()(wrapped);
