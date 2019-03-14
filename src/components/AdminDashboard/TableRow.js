import React, { Component } from "react";
import { Table, Icon } from "semantic-ui-react";

import EditableTableCell from "./EditableTableCell";

class TableRow extends Component {
  renderChoices() {
    // target is the object item within the array of data that contains data about the member of the group
    // e.g. for a student - { name: "David", studentid: "12345", choices: []}
    const { target, group, editable } = this.props;
    if (group === "companies" && editable === true) {
      // if dealing with companies that are editable
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

    return target.choices.map((choice, index) => {
      return <Table.Cell key={index}>{choice}</Table.Cell>;
    });
  }

  // render cells that have data other than choice data
  renderOtherCells() {
    const { target, group, editable, t } = this.props;

    // get the data names from target and remove choices
    const arr = Object.keys(target);
    const filtered = arr.filter((dataValue) => dataValue !== "choices");

    if (group === "companies" && editable === true) {
      return filtered.map((dataValue) => {
        return (
          <EditableTableCell
            key={dataValue}
            target={target}
            category={dataValue}
            content={target[dataValue]}
            handleCellUpdate={this.props.handleCellUpdate}
          />
        );
      });
    }

    return filtered.map((dataValue) => {
      if (dataValue === "department") {
        // translate department
        return <Table.Cell key={dataValue}>{t(target[dataValue])}</Table.Cell>;
      }
      return <Table.Cell key={dataValue}>{target[dataValue]}</Table.Cell>;
    });
  }

  render() {
    const { t, target, group, editable } = this.props;

    if (group === "companies" && editable === true) {
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
          {this.renderOtherCells()}
          {this.renderChoices()}
        </Table.Row>
      );
    }

    return (
      <Table.Row>
        {this.renderOtherCells()}
        {this.renderChoices()}
      </Table.Row>
    );
  }
}

export default TableRow;
