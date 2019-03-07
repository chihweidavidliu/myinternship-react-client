import React, { Component } from "react";
import { Table, Icon } from "semantic-ui-react";

class TableRow extends Component {
  renderChoices() {
    const { target } = this.props;
    return target.choices.map((choice, index) => {
      return <Table.Cell key={index}>{choice}</Table.Cell>;
    });
  }

  renderEmptyCells() {
    const { target, longestChoicesArray } = this.props;
    if (target.choices.length < longestChoicesArray.length) {
      // create array of the same length as the required number of empty cells
      const array = longestChoicesArray.slice(0, longestChoicesArray.length - target.choices.length);
      // map over the array to insert empty cells
      return array.map((item, index) => <Table.Cell key={index} />);
    }
  }

  render() {
    const { t, target } = this.props;
    if (this.props.for === "student") {
      return (
        <Table.Row>
          <Table.Cell>{target.name}</Table.Cell>
          <Table.Cell>{target.studentid}</Table.Cell>
          <Table.Cell>{t(target.department)}</Table.Cell>
          {this.renderChoices()}
          {this.renderEmptyCells()}
        </Table.Row>
      );
    }

    return (
      <Table.Row>
        <Table.Cell style={{ textAlign: "center", width: "15px" }}>
          <Icon className="deleteButton" name="close" title={`Delete "${target.name}"`} onClick={() => this.props.handleDelete(target.name)}/>
        </Table.Cell>
        <Table.Cell>{target.name}</Table.Cell>
        <Table.Cell>{target.numberAccepted}</Table.Cell>
        {this.renderChoices()}
        {this.renderEmptyCells()}
      </Table.Row>
    );
  }
}

export default TableRow;
