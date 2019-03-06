import React, { Component } from "react";
import { Table } from "semantic-ui-react";

class StudentTableRow extends Component {
  renderChoices() {
    const { student } = this.props;
    return student.choices.map((choice, index) => {
      return <Table.Cell key={index}>{choice}</Table.Cell>;
    });
  }

  renderEmptyCells() {
    const { student, longestChoicesArray } = this.props;
    if (student.choices.length < longestChoicesArray.length) {
      // create array of the same length as the required number of empty cells
      const array = longestChoicesArray.slice(0, longestChoicesArray.length - student.choices.length);
      // map over the array to insert empty cells
      return array.map((item, index) => <Table.Cell key={index} />);
    }
  }

  render() {
    const { t, student } = this.props;
    return (
      <Table.Row>
        <Table.Cell>{student.name}</Table.Cell>
        <Table.Cell>{student.studentid}</Table.Cell>
        <Table.Cell>{t(student.department)}</Table.Cell>
        {this.renderChoices()}
        {this.renderEmptyCells()}
      </Table.Row>
    );
  }
}

export default StudentTableRow;
