import React, { Component } from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import * as actions from "actions";

class ConfirmDetailsModal extends Component {
  state = { open: false, errorMessage: [] };

  close = () => this.setState({ open: false });
  show = () => this.setState({ open: true });

  handleTriggerClick = async (e) => {
    e.preventDefault(); // prevent form submit
    await this.validate(); // validate the form on modal open
    this.show();
  };

  handleConfirm = async () => {
    // dispatches custom action creator that dispatches redux-form submit method with the relevant form name
    // the submit method will then call the external submit function 'submitSignup' to call the signup action creator with the form values
    await this.props.submitReduxForm("studentSignup");
  };

  validate() {
    const { signUpForm } = this.props;
    const { t } = this.props;
    const errorMessage = [];
    if (signUpForm && signUpForm.values) {
      if (!signUpForm.values.studentid) {
        errorMessage.push(t("studentForms.formErrors.studentid.missing"));
      } else if(signUpForm.values.studentid.split("")[0] === "s" || signUpForm.values.studentid.split("")[0] === "S") {
        errorMessage.push(t("studentForms.formErrors.studentid.initialS"))
      }

      if (!signUpForm.values.name) {
        errorMessage.push(t("studentForms.formErrors.name.missing"));
      }

      if (!signUpForm.values.password) {
        errorMessage.push(t("studentForms.formErrors.password.missing"));
      } else if (signUpForm.values.password.length < 6) {
        errorMessage.push(t("studentForms.formErrors.password.tooShort"));
      }

      if (!signUpForm.values.department) {
        errorMessage.push(t("studentForms.formErrors.department.missing"));
      }
      this.setState({ errorMessage: errorMessage });
    } else if (signUpForm && !signUpForm.values) {
      errorMessage.push("Please enter some values");
      this.setState({ errorMessage: errorMessage });
    }
  }

  renderDetails() {
    const { signUpForm, t } = this.props;

    if (signUpForm && !signUpForm.values) {
      return this.state.errorMessage.map((error, index) => {
        return <p key={index}>{error}</p>;
      });
    } else if (signUpForm && signUpForm.values) {
      if (this.state.errorMessage.length > 0) {
        return this.state.errorMessage.map((error, index) => {
          return <p key={index}>{error}</p>;
        });
      }

      return (
        <div>
          <p>
            <strong>{t("studentForms.placeholders.studentid")} :</strong> {this.props.signUpForm.values.studentid}
          </p>
          <p>
            <strong>{t("studentForms.placeholders.name")} :</strong> {this.props.signUpForm.values.name}
          </p>
          <p>
            <strong>{t("studentForms.placeholders.password")} :</strong> {this.props.signUpForm.values.password}
          </p>
          <p>
            <strong>{t("studentForms.placeholders.department")} :</strong> {this.props.signUpForm.values.department}
          </p>
        </div>
      );
    }
  }

  renderActions() {
    const { t } = this.props;

    if (this.state.errorMessage.length > 0) {
      return (
        <Modal.Actions>
          <Button color="red" onClick={this.close}>
            <Icon name="cancel" /> {t("studentForms.signupModal.dismiss")}
          </Button>
        </Modal.Actions>
      );
    }
    return (
      <Modal.Actions>
        <Button color="red" onClick={this.close}>
          <Icon name="cancel" /> {t("studentForms.signupModal.cancel")}
        </Button>
        <Button color="green" onClick={this.handleConfirm}>
          <Icon name="checkmark" /> {t("studentForms.signupModal.confirm")}
        </Button>
      </Modal.Actions>
    );
  }

  render() {
    const { t } = this.props;
    const { open } = this.state;
    return (
      <Modal
        trigger={
          <Button name="Sign up" onClick={this.handleTriggerClick}>
            {t("studentForms.placeholders.signup")}
          </Button>
        }
        open={open}
        onClose={this.close}
        style={{ width: "500px" }}
      >
        <Modal.Content>
          <Modal.Description>
            <Header>
              {this.state.errorMessage.length === 0
                ? t("studentForms.signupModal.title")
                : t("studentForms.signupModal.errorTitle")}
            </Header>
            {this.renderDetails()}
          </Modal.Description>
        </Modal.Content>

        {this.renderActions()}
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    signUpForm: state.form.studentSignup,
    auth: state.auth
  };
};
const wrapped = connect(
  mapStateToProps,
  actions
)(ConfirmDetailsModal);

export default withTranslation()(wrapped);
