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
          handleCellUpdate={this.props.handleCellUpdate}
        />
      );
    });


  }

  renderEmptyCells() {
    // only needed for students as company rows automatically filled with empty string values in CompanyView state (to facilitate table editing)
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
        </Table.Row>
      );
    }

    return (
      <Table.Row>
        <Table.Cell style={{ textAlign: "center", width: "15px" }}>
          <Icon
            className="deleteButton"
            name="close"
            title={`${t("adminDashboard.companies.delete")} "${target.name}"`}
            onClick={() => this.props.handleDelete(target.name)}
          />
        </Table.Cell>
        <EditableTableCell
          target={target}
          category="name"
          content={target.name}
          handleCellUpdate={this.props.handleCellUpdate}
        />
        <EditableTableCell
          target={target}
          category="numberAccepted"
          content={target.numberAccepted}
          handleCellUpdate={this.props.handleCellUpdate}
        />
        {this.renderChoices()}
      </Table.Row>
    );
  }
}

export default TableRow;
