import React, { Component } from "react";
import { Table } from "semantic-ui-react";

class StudentOutputTable extends Component {
  renderRows() {
    return this.props.students.map((student, index) => {
      return (
        <Table.Row key={`${index}-${student.name}`}>
          <Table.Cell>{student.name}</Table.Cell>
          <Table.Cell>{student.choices[0]}</Table.Cell>
        </Table.Row>
      );
    });
  }
  render() {
    return (
      <Table size="small" celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Student</Table.HeaderCell>
            <Table.HeaderCell>Outcome</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{this.renderRows()}</Table.Body>
      </Table>
    );
  }
}

export default StudentOutputTable;
