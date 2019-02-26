import React, { Component } from "react";
import { Button, Form, Dropdown, Message } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { withTranslation } from 'react-i18next';

import history from "history.js";

class SignUpForm extends Component {
  renderError = (meta) => {
    // meta object passed via the renderInput function and its formProps
    if (meta.touched === true && meta.error) {
      return <Message error content={meta.error} />;
    }
  };

  renderInput = (formProps) => {
    const error = formProps.meta.error && formProps.meta.touched ? true : false;
    return (
      <React.Fragment>
        <Form.Input {...formProps.input} autoComplete="off" placeholder={formProps.placeholder} error={error} />
        {this.renderError(formProps.meta)}
      </React.Fragment>
    );
  };

  renderSelect = (formProps) => {
    const { t } = this.props;
    const departments = [
      { key: "1", text: t("studentForms.departments.Business"), value: t("studentForms.departments.Business") },
      { key: "2", text: t("studentForms.departments.Trade"), value: t("studentForms.departments.Trade") },
      { key: "3", text: t("studentForms.departments.Finance"), value: t("studentForms.departments.Finance") },
      { key: "4", text: t("studentForms.departments.Management"), value: t("studentForms.departments.Management") },
      { key: "5", text: t("studentForms.departments.Systems"), value: t("studentForms.departments.Systems") }
    ];

    return (
      <React.Fragment>
        <Dropdown
          {...formProps.input}
          onChange={(e, { value }) => formProps.input.onChange(value)}
          placeholder={formProps.placeholder}
          className="ui fluid selection dropdown"
          options={departments}
        />
        {this.renderError(formProps.meta)}
      </React.Fragment>
    );
  };

  onSubmit = async (formValues) => {
    await this.props.studentSignup(formValues);
    history.push("/dashboard");
  };

  render() {
    const { t } = this.props;
    return (
      <Form onSubmit={this.props.handleSubmit(this.onSubmit)} error>
        <Form.Field>
          <Field
            name="studentid"
            placeholder={t("studentForms.placeholders.studentid")}
            component={this.renderInput}
          />
        </Form.Field>
        <Form.Field>
          <Field
            name="name"
            placeholder={t("studentForms.placeholders.name")}
            component={this.renderInput}
          />
        </Form.Field>
        <Form.Field>
          <Field
            name="password"
            placeholder={t("studentForms.placeholders.password")}
            component={this.renderInput}
          />
        </Form.Field>

        <Form.Field>
          <Field
            name="department"
            placeholder={t("studentForms.placeholders.department")}
            component={this.renderSelect}
          />
        </Form.Field>

        <Button type="submit">{t("studentForms.placeholders.submit")}</Button>
      </Form>
    )
  }
}

// validate function that returns any errors as an object - connect it with reduxForm and these errors will appear on the formProps.meta object of the component
const validate = (formValues, props) => {
  const { t } = props;
  const errors = {};

  if (!formValues.studentid) {
    errors.studentid = t("studentForms.formErrors.studentid.missing");
  } else if (formValues.studentid.split("")[0] === "s") {
    errors.studentid = t("studentForms.formErrors.studentid.initialS");
  }

  if (!formValues.name) {
    errors.name = t("studentForms.formErrors.name.missing");
  }

  if (!formValues.password) {
    errors.password = t("studentForms.formErrors.password.missing");
  } else if (formValues.password.length < 6) {
    errors.password = t("studentForms.formErrors.password.tooShort");
  }

  if (!formValues.department) {
    errors.department = t("studentForms.formErrors.department.missing");
  }

  return errors;
};

const wrapped =  reduxForm({ form: "studentLogin", validate: validate })(SignUpForm);
export default withTranslation()(wrapped)