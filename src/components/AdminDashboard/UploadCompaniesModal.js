import React, { Component } from "react";
import { Button, Header, Icon, Modal, Form } from "semantic-ui-react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { reduxForm, Field } from "redux-form";
import * as actions from "actions";

import UploadCompaniesInput from "./UploadCompaniesInput";

class UploadCompaniesModal extends Component {
  state = { open: false, errorMessage: [] };

  close = () => this.setState({ open: false });
  show = () => this.setState({ open: true });

  onSubmit = (formValues) => {
    console.log(formValues);
  };

  renderInput(formProps) {
    return <UploadCompaniesInput {...formProps.input} />;
  }

  render() {
    const { t } = this.props;
    const { open } = this.state;
    return (
      <Modal
        trigger={
          <Button name="Sign up" basic size="small" onClick={this.show}>
            Import Companies
          </Button>
        }
        open={open}
        onClose={this.close}
        style={{ width: "500px" }}
      >
        <Modal.Content>
          <Modal.Description>
            <Header>Import Companies</Header>
            <p>Please upload an Excel (.xlsx) file to import:</p>
          </Modal.Description>
          <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <Form.Field>
              <Field name="companyUpload" component={this.renderInput} />
            </Form.Field>
            <div className="modal-actions">
              <Button className="modal-button" color="red" onClick={this.close}>
                <Icon name="cancel" /> {t("studentForms.signupModal.cancel")}
              </Button>
              <Button className="modal-button" color="green" onClick={this.handleConfirm}>
                <Icon name="checkmark" /> Submit
              </Button>
            </div>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

const wrapped1 = connect(
  mapStateToProps,
  actions
)(UploadCompaniesModal);

const wrapped2 = reduxForm({ form: "uploadCompanies" })(wrapped1);
export default withTranslation()(wrapped2);
