import React, { Component } from "react";
import { Table, Icon } from "semantic-ui-react";

import EditableTableCell from "./EditableTableCell";

class TableRow extends Component {
  renderChoices() {
    const { target } = this.props;
    if (this.props.for === "student") {
      return target.choices.map((choice, index) => {
        return (
          <Table.Cell key={index} >
            {choice}
          </Table.Cell>
        );
      });
    }
    // if dealing with companies
    return target.choices.map((choice, index) => {
      return (
        <EditableTableCell
          key={index}
          target={target}
          category="choices"
          index={index}
          content={choice}
          handleCellBlur={this.props.handleCellBlur}
        />
      );
    });


  }

  renderEmptyCells() {
    const { target, longestChoicesArray } = this.props;
    if (target.choices.length < longestChoicesArray.length) {
      // create array of the same length as the required number of empty cells
      const array = longestChoicesArray.slice(0, longestChoicesArray.length - target.choices.length);
      if (this.props.for === "student") {
        // map over the array to insert empty cells
        return array.map((item, index) => <Table.Cell key={index} />);
      }

      return array.map((item, index) => {
        // make only the empty cell adjacent to the last value editable
          return (
            <EditableTableCell
              key={index}
              target={target}
              category="choices"
              index={index + target.choices.length}
              content={""}
              handleCellBlur={this.props.handleCellBlur}
            />
          )
      });
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
          <Icon
            className="deleteButton"
            name="close"
            title={`Delete "${target.name}"`}
            onClick={() => this.props.handleDelete(target.name)}
          />
        </Table.Cell>
        <EditableTableCell
          target={target}
          category="name"
          content={target.name}
          handleCellBlur={this.props.handleCellBlur}
        />
        <EditableTableCell
          target={target}
          category="numberAccepted"
          content={target.numberAccepted}
          handleCellBlur={this.props.handleCellBlur}
        />
        {this.renderChoices()}
        {this.renderEmptyCells()}
      </Table.Row>
    );
  }
}

export default TableRow;
