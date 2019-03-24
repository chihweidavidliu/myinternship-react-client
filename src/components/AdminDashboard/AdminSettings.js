import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Message, Radio } from "semantic-ui-react";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";

import * as actions from "actions";

export class AdminSettings extends Component {
  onToggle = (target) => {
    const { auth, updateAdmin } = this.props;
    const object = {};
    if (auth[target] === true) {
      object[target] = false;
      return updateAdmin(object);
    }
    object[target] = true;
    updateAdmin(object);
  };

  renderError() {
    const { authMessage, t } = this.props;
    if (authMessage) {
      return (
        <Message
          style={{ marginBottom: "15px", width: "80%" }}
          error
          header={t("studentForms.formErrors.errorHeader")}
          content={authMessage}
        />
      );
    }
  }
  render() {
    const { t, auth } = this.props;
    return (
      <Fragment>
        <h2>{t("adminDashboard.settings.header")}</h2>
        {this.renderError()}
        <div className="options-container">
          <div className="options-box">
            <p>{t("adminDashboard.settings.allowStudentSignup")}</p>
            <Radio
              for="allowStudentSignup"
              defaultChecked={auth.allowStudentSignup === true ? true : false}
              toggle
              onClick={() => this.onToggle("allowStudentSignup")}
              label={
                auth.allowStudentSignup === true
                  ? t("adminDashboard.settings.enabled")
                  : t("adminDashboard.settings.disabled")
              }
            />
          </div>
          <div className="options-box">
            <p>{t("adminDashboard.settings.allowStudentChoices")}</p>
            <Radio
              for="allowStudentChoices"
              defaultChecked={auth.allowStudentChoices === true ? true : false}
              toggle
              onClick={() => this.onToggle("allowStudentChoices")}
              label={
                auth.allowStudentChoices === true
                  ? t("adminDashboard.settings.enabled")
                  : t("adminDashboard.settings.disabled")
              }
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

AdminSettings.propTypes = {
  t: PropTypes.func,
  auth: PropTypes.object,
  authMessage: PropTypes.string,
  updateAdmin: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    authMessage: state.authMessage
  };
};

const wrapped = connect(
  mapStateToProps,
  actions
)(AdminSettings);
export default withTranslation()(wrapped);
