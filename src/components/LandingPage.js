import React, { Component } from "react";
import { Button, Form, Dropdown, Message } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";

import history from "history.js";
import LanguageSelector from "components/LanguageSelector";

class LandingPage extends Component {
  state = {
    signup: false,
    departments: {
      English: [
        { key: "m", text: "Mathematics", value: "Mathematics" },
        { key: "l", text: "Law", value: "Law" },
        { key: "b", text: "Business", value: "Business" },
        { key: "p", text: "Psychology", value: "Psychology" }
      ],
      Chinese: [{ key: "m", text: "Chinese", value: "Chinese" }]
    }
  };

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
    return (
      <React.Fragment>
        <Dropdown
          {...formProps.input}
          onChange={(e, { value }) => formProps.input.onChange(value)}
          placeholder={formProps.placeholder}
          className="ui fluid selection dropdown"
          options={this.state.departments[this.props.language]}
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
    return (
      <div className="flex-container">
        <LanguageSelector />
        <div className="box">
          <h1>My Internship</h1>
          <Form onSubmit={this.props.handleSubmit(this.onSubmit)} error>
            <Form.Field>
              <Field
                name="studentid"
                placeholder={
                  this.props.language === "English" ? "Studentid (without initial s)" : "請輸入學號 (不要加 s)"
                }
                component={this.renderInput}
              />
            </Form.Field>
            <Form.Field>
              <Field
                name="name"
                placeholder={this.props.language === "English" ? "Name" : "請輸入姓名"}
                component={this.renderInput}
              />
            </Form.Field>
            <Form.Field>
              <Field
                name="password"
                placeholder={this.props.language === "English" ? "Password" : "請自訂密碼 (6位數字)"}
                component={this.renderInput}
              />
            </Form.Field>

            <Form.Field>
              <Field
                name="department"
                placeholder={this.props.language === "English" ? "Department" : "請選擇系別"}
                component={this.renderSelect}
              />
            </Form.Field>

            <Button type="submit">{this.props.language === "English" ? "Submit" : "報名"}</Button>
          </Form>
        </div>
      </div>
    );
  }
}

// validate function that returns any errors as an object - connect it with reduxForm and these errors will appear on the formProps.meta object of the component
const validate = (formValues, props) => {
  const errors = {};
  if (!formValues.studentid) {
    props.language === "English" ? (errors.studentid = "A studentid is required") : (errors.studentid = "請輸入學號");
  } else if (formValues.studentid.split("")[0] === "s") {
    props.language === "English"
      ? (errors.studentid = "Studentid should not include initial s")
      : (errors.studentid = "學號不要加 s");
  }

  if (!formValues.name) {
    props.language === "English" ? (errors.name = "A name is required") : (errors.name = "請輸入姓名");
  }

  if (!formValues.password) {
    props.language === "English" ? (errors.password = "A password is required") : (errors.password = "請輸入密碼");
  } else if (formValues.password.length < 6) {
    errors.password = "Password must be at least 6 characters long";
  }

  if (!formValues.department) {
    props.language === "English"
      ? (errors.department = "A department is required")
      : (errors.department = "請選擇系別");
  }

  return errors;
};

export default reduxForm({ form: "studentLogin", validate: validate })(LandingPage);
