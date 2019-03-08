import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Message, Table, Button } from "semantic-ui-react";
import shortid from "shortid";

import TableRow from "./TableRow";

class AdminCompanyView extends Component {
  state = { companies: [] };

  addRow = () => {
    const updatedCompanies = this.state.companies.map(company => {
      company.choices.push(null);
      return company;
    });

    this.setState({ companies: updatedCompanies });
  }

  handleDelete = (companyToDelete) => {
    const filtered = this.state.companies.filter((company) => company.name !== companyToDelete);
    this.setState({ companies: filtered });
  };

  // handle update cell text content on cell blur - pass this down to each row and to each editable cell
  handleCellBlur = (companyName, categoryToEdit, newText, choiceIndex) => {
    const updated = this.state.companies.map((company) => {
      if (company.name === companyName) {
        // if dealing with a choice being edited, use the index of the cell within choices array to identify which cell to edit
        if(categoryToEdit === "choices" ) {
          // ignore empty strings submitted by clicking but not entering a value
          if(newText !== "") {
            company[categoryToEdit][choiceIndex] = newText;
            return company;
          }
          return company;
        }
        // if dealing with name or numberAccepted, no need for an index value to update the cell
        company[categoryToEdit] = newText;
        return company;
      }
      return company;
    });

    this.setState({ companies: updated });
  };

  componentDidMount() {
    if (this.props.auth) {
      this.setState({ companies: this.props.auth.companyChoices });
    }
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
    const { companies } = this.state;
    let longestArray = [];
    companies.forEach((company) => {
      if (company.choices.length > longestArray.length) {
        longestArray = company.choices;
      }
    });
    return longestArray;
  }

  renderTableHeaders() {
    const { t } = this.props;
    const { companies } = this.state;
    if (companies) {
      // find longest student choices array
      const longestArray = this.getLongestChoicesArray();

      return longestArray.map((choice, index) => {
        return <Table.HeaderCell key={index}>{`${t("adminDashboard.students.choice")} ${index + 1}`}</Table.HeaderCell>;
      });
    }
  }

  renderTableRows() {
    const longestArray = this.getLongestChoicesArray();
    // render tablerow for each company passing in the company as the row 'target' and the longest choices array
    // to ascertain how many columns are needed
    // pass down handleDelete and handleCellBlue to handle table edit functionality for child components
    return this.state.companies.map((company, index) => {
      return (
        <TableRow
          key={shortid.generate()}
          for="company"
          target={company}
          t={this.props.t}
          longestChoicesArray={longestArray}
          handleDelete={this.handleDelete}
          handleCellBlur={this.handleCellBlur}
        />
      );
    });
  }

  render() {
    console.log(this.state.companies)
    const { t } = this.props;
    return (
      <div>
        <h2>{t("adminDashboard.companies.navbarHeader")}</h2>
        {this.renderError()}
        <div className="actions-bar">
          <Button basic size="small" onClick={this.addRow}>
            {t("adminDashboard.tableActions.addRow")}
          </Button>
          <Button basic size="small">
            {t("adminDashboard.tableActions.removeRow")}
          </Button>
          <Button basic size="small">
            {t("adminDashboard.tableActions.addChoice")}
          </Button>
          <Button basic size="small">
            {t("adminDashboard.tableActions.removeChoice")}
          </Button>
          <Button basic size="small">
            {t("adminDashboard.tableActions.save")}
          </Button>
        </div>
        <div className="table-container">
          <Table size="small" celled striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell>{t("adminDashboard.companies.company")}</Table.HeaderCell>
                <Table.HeaderCell>{t("adminDashboard.companies.numberAccepted")}</Table.HeaderCell>
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
    authMessage: state.authMessage
  };
};

const wrapped = connect(mapStateToProps)(AdminCompanyView);
export default withTranslation()(wrapped);
