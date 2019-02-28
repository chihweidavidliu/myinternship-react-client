import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import requireStudentAuth from "requireStudentAuth";
import Navbar from "./Navbar";
import SharedList from "./SharedList";

class Dashboard extends Component {
  state = {
    choices: [],
    options: [
      "Apple",
      "Google",
      "AirBnb",
      "Uber",
      "Huawei",
      "Deliveroo",
      "Amazon",
      "Microsoft",
      "Dropbox",
      "Samsung",
      "LG",
      "Gigabyte",
      "FitBit",
      "TaskMaster",
      "Facebook",
      "Siemens",
      "Oneplus",
      "Razer",
      "ENS",
      "Acer",
      "Asus",
      "BenQ",
      "Boeing",
      "Nike",
      "Airbus"
    ]
  };
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
                <SharedList
                  items={this.state.choices}
                  onChange={(order, sortable, evt) => {
                    this.setState({ choices: order });
                  }}
                  listType="ol"
                />
              </div>
              <div id="options">
                <h2>{t("dashboard.options")}</h2>
                <p>{t("dashboard.optionsPrompt")}</p>
                <SharedList
                  items={this.state.options}
                  onChange={(order, sortable, evt) => {
                    this.setState({ options: order });
                  }}
                  listType="ul"
                />
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
