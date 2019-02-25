import React, { Component } from "react";
import { Button, Form, Dropdown, Message } from "semantic-ui-react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import * as actions from "actions";

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
      <Dropdown
        {...formProps.input}
        onChange={(e, { value }) => formProps.input.onChange(value)}
        placeholder={formProps.placeholder}
        className="ui fluid selection dropdown"
        options={this.state.departments[this.props.language]}
      />
    );
  };

  onSubmit = (formValues) => {
    console.log(formValues);
    this.props.studentSignup(formValues);
  };

  render() {
    return (
      <div className="flex-container">
        <div className="box">
          <h1>My Internship</h1>
          <Form onSubmit={this.props.handleSubmit(this.onSubmit)} error>
            <Form.Field>
              <Field name="studentid" placeholder="Studentid" component={this.renderInput} />
            </Form.Field>
            <Form.Field>
              <Field name="name" placeholder="Name" component={this.renderInput} />
            </Form.Field>
            <Form.Field>
              <Field name="password" placeholder="Password" component={this.renderInput} />
            </Form.Field>

            <Form.Field>
              <Field name="department" placeholder="Department" component={this.renderSelect} />
            </Form.Field>

            <Button type="submit">Submit</Button>
          </Form>
        </div>
      </div>
    );
  }
}

// validate function that returns any errors as an object - connect it with reduxForm and these errors will appear on the formProps.meta object of the component
const validate = (formValues) => {
  const errors = {};
  if (!formValues.studentid) {
    errors.studentid = "A studentid is required";
  } else if (formValues.studentid.split("")[0] === "s") {
    errors.studentid = "Studentid should not include initial s";
  }

  if (!formValues.name) {
    errors.name = "A name is required";
  }

  if (!formValues.password) {
    errors.password = "A password is required";
  }

  if (!formValues.department) {
    errors.department = "A department is required";
  }

  return errors;
};

const mapStateToProps = (state) => {
  return {
    language: state.language
  };
};

const wrapped = reduxForm({ form: "studentLogin", validate: validate })(LandingPage);
export default connect(
  mapStateToProps,
  actions
)(wrapped);
