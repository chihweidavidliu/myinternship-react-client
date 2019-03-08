import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Message, Table } from "semantic-ui-react";
import { connect } from "react-redux";

import * as actions from "actions";
import requireAdminAuth from "requireAdminAuth";
import TableRow from "./TableRow";

class AdminStudentView extends Component {
  state = { students: [] };

  async componentDidMount() {
    // clear error message
    await this.props.removeErrorMessage();
    // action creator that fetches all Students
    await this.props.fetchStudents();
    // set students in state ready to be padded with empty strings for the table
    await this.setState({ students: this.props.students });

    const longestArray = this.getLongestChoicesArray();
    // pad out each choices array with empty strings to fill up each cell of the table
    const paddedStudents = this.state.students.map((student) => {
      if (student.choices.length < longestArray.length) {
        while (student.choices.length < longestArray.length) {
          student.choices.push("");
        }
        return student;
      }
      return student;
    });

    this.setState({ students: paddedStudents });
  }

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

  getLongestChoicesArray() {
    const { students } = this.state;
    let longestArray = [];
    students.forEach((student) => {
      if (student.choices.length > longestArray.length) {
        longestArray = student.choices;
      }
    });
    return longestArray;
  }

  renderTableHeaders() {
    const { students } = this.state;
    const { t } = this.props;
    if (students) {
      // find longest student choices array
      const longestArray = this.getLongestChoicesArray();

      return longestArray.map((choice, index) => {
        return <Table.HeaderCell key={index}>{`${t("adminDashboard.students.choice")} ${index + 1}`}</Table.HeaderCell>;
      });
    }
  }

  renderTableRows() {
    const { students } = this.state;
    const { t } = this.props;
    if (students) {
      return students.map((student, index) => {
        return <TableRow key={index} for="student" target={student} t={t} />;
      });
    }
  }

  render() {
    const { t, auth } = this.props;

    return (
      <div>
        <h2>{t("adminDashboard.students.header")}</h2>
        <p>
          {auth.allowStudentChoices
            ? t("adminDashboard.students.choicesEnabled")
            : t("adminDashboard.students.choicesDisabled")}
        </p>
        {this.renderError()}
        <div className="table-container">
          <Table size="small" celled striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>{t("studentForms.placeholders.name")}</Table.HeaderCell>
                <Table.HeaderCell>{t("studentForms.placeholders.studentid")}</Table.HeaderCell>
                <Table.HeaderCell>{t("studentForms.placeholders.department")}</Table.HeaderCell>
                {this.renderTableHeaders()}
              </Table.Row>
            </Table.Header>

            <Table.Body>{this.renderTableRows()}</Table.Body>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    students: state.students,
    authMessage: state.authMessage
  };
};

const wrapped = connect(
  mapStateToProps,
  actions
)(requireAdminAuth(AdminStudentView));
export default withTranslation()(wrapped);
