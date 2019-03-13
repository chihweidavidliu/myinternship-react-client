import React, { Component } from "react";
import { Table } from "semantic-ui-react";

class CompanyOutputTable extends Component {
  renderChoices(choicesArray) {
    return choicesArray.map((choice, index) => {
      return <Table.Cell key={index}>{choice}</Table.Cell>;
    });
  }

  renderEmptyCells(choicesArray) {
    const longestArray = this.getLongestChoicesArray();
    if(choicesArray.length < longestArray.length) {
      // create array of the same length as the required number of empty cells
      const array = longestArray.slice(0, longestArray.length - choicesArray.length);
      // map over the array to insert empty cells
      return array.map((item, index) => <Table.Cell key={index} />);
    }
  }

  renderRows() {
    const { companyChoices } = this.props;
    const companyNames = Object.keys(this.props.companyChoices);
    return companyNames.map((company, index) => {
      return (
        <Table.Row key={index}>
          <Table.Cell>{company}</Table.Cell>
          {this.renderChoices(companyChoices[company])}
          {this.renderEmptyCells(companyChoices[company])}
        </Table.Row>
      );
    });
  }

  renderHeaders() {
    // get longest array of choices to work out how many choice headers are needed
    const longestArray = this.getLongestChoicesArray();
    return longestArray.map((item, index) => {
      return <Table.HeaderCell key={index}>{`Choice ${index + 1}`}</Table.HeaderCell>;
    });
  }

  getLongestChoicesArray() {
    const { companyChoices } = this.props;
    let longestArray = [];
    for (let company in companyChoices) {
      if (companyChoices[company].length > longestArray) {
        longestArray = companyChoices[company];
      }
    }
    return longestArray;
  }
  render() {
    return (
      <Table size="small" celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Company</Table.HeaderCell>
            {this.renderHeaders()}
          </Table.Row>
        </Table.Header>
        <Table.Body>{this.renderRows()}</Table.Body>
      </Table>
    );
  }
}

export default CompanyOutputTable;
