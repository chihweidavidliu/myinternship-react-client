import React, { Component } from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import { withTranslation } from 'react-i18next';

class ConfirmDetailsModal extends Component {
  state = { open: false, errorMessage: [] };

  close = () => this.setState({ open: false });
  show = () => this.setState({ open: true });

  handleClick = async (e) => {
    e.preventDefault();
    await this.validate() // validate the form
    this.show();
  }

  validate() {
    const { signUpForm } = this.props;
    const { t } = this.props;
    const errorMessage = [];
    if(signUpForm && signUpForm.values) {
      if(!signUpForm.values.studentid) {
        errorMessage.push(t("studentForms.formErrors.studentid.missing"));
      }

      if(!signUpForm.values.name) {
        errorMessage.push(t("studentForms.formErrors.name.missing"));
      }

      if(!signUpForm.values.password) {
        errorMessage.push(t("studentForms.formErrors.password.missing"));
      } else if (signUpForm.values.password.length < 6) {
        errorMessage.push(t("studentForms.formErrors.password.tooShort"));
      }

      if(!signUpForm.values.department) {
        errorMessage.push(t("studentForms.formErrors.department.missing"));
      }
      this.setState({ errorMessage: errorMessage});
    } else if(signUpForm && !signUpForm.values) {
      errorMessage.push("Please enter some values");
      this.setState({ errorMessage: errorMessage});
    }
  }

  renderDetails() {
    const { signUpForm, t } = this.props;

    if(signUpForm && !signUpForm.values) {
      return (
        this.state.errorMessage.map((error, index) => {
          return <p key={index}>{error}</p>
        })
      )
    } else if(signUpForm && signUpForm.values) {
      if(this.state.errorMessage.length > 0) {
        return (
          this.state.errorMessage.map((error, index) => {
            return <p key={index}>{error}</p>
          })
        )
      }
      return (
        <div>
          <p>Please confirm the following details:</p>
          <p><strong>{t("studentForms.placeholders.studentid")}:</strong> {this.props.signUpForm.values.studentid}</p>
          <p><strong>{t("studentForms.placeholders.name")}:</strong> {this.props.signUpForm.values.name}</p>
          <p><strong>{t("studentForms.placeholders.password")}:</strong> {this.props.signUpForm.values.password}</p>
          <p><strong>{t("studentForms.placeholders.department")}:</strong> {this.props.signUpForm.values.department}</p>
        </div>
      )
    }
  }

  renderActions() {
    if(this.state.errorMessage.length > 0) {
      return (
        <Modal.Actions>
          <Button color="red" onClick={this.close}>
            <Icon name="cancel" /> Back
          </Button>
        </Modal.Actions>
      )
    }
    return (
      <Modal.Actions>
        <Button color="red" onClick={this.close}>
          <Icon name="cancel" /> Back
        </Button>
        <Button color="green" onClick={this.handleConfirm}>
          <Icon name="checkmark" /> Confirm
        </Button>
      </Modal.Actions>
    )
  }

  handleConfirm = () => {
    this.props.handleSubmit(this.props.onSubmit);
  }

  render() {
    const { t } = this.props;
    const { open } = this.state;

    return (
      <Modal
        trigger={<Button name="Sign up" onClick={this.handleClick}>{t("studentForms.placeholders.signup")}</Button>}
        open={open}
        onClose={this.close}
        style={{width: "500px"}}
      >
        <Modal.Content>
          <Modal.Description>
            <Header>Confirm Details</Header>
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
    signUpForm: state.form.studentSignup
  }
}
const wrapped = connect(mapStateToProps) (ConfirmDetailsModal);
export default withTranslation()(wrapped);
