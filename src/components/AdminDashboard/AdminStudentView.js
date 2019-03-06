import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Message, Table } from "semantic-ui-react";
import { connect } from "react-redux";

import * as actions from "actions";
import requireAdminAuth from "requireAdminAuth";
import StudentTableRow from "./StudentTableRow";

class AdminStudentView extends Component {
  async componentDidMount() {
    // clear error message
    await this.props.removeErrorMessage();
    // action creator that fetches all Students
    this.props.fetchStudents();
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
    let longestArray = [];
    this.props.students.forEach((student) => {
      if (student.choices.length > longestArray.length) {
        longestArray = student.choices;
      }
    });
    return longestArray;
  }

  renderTableHeaders() {
    if (this.props.students) {
      // find longest student choices array
      const longestArray = this.getLongestChoicesArray();

      return longestArray.map((choice, index) => {
        return <Table.HeaderCell key={index}>{`Choice ${index + 1}`}</Table.HeaderCell>;
      });
    }
  }

  renderTableRows() {
    const { t } = this.props;
    const longestArray = this.getLongestChoicesArray();

    if (this.props.students) {
      return this.props.students.map((student, index) => {
        return <StudentTableRow key={index} student={student} t={t} longestChoicesArray={longestArray} />;
      });
    }
  }

  render() {
    const { t } = this.props;

    return (
      <div>
        <h2>{t("adminDashboard.students.header")}</h2>
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
