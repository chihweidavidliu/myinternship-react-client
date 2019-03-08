import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Message, Table, Button } from "semantic-ui-react";
import shortid from "shortid";

import TableRow from "./TableRow";

class AdminCompanyView extends Component {
  state = { companies: [], unsavedChanges: false };

  addChoice = () => {
    const updatedCompanies = [...this.state.companies];
    updatedCompanies.forEach((company) => {
      return company.choices.push("");
    });
    this.setState({ companies: updatedCompanies });
    this.setState({ unsavedChanges: true });
  };

  removeChoice = () => {
    const updatedCompanies = [...this.state.companies];
    updatedCompanies.forEach((company) => company.choices.pop());
    this.setState({ companies: updatedCompanies });
    this.setState({ unsavedChanges: true });
  };

  addRow = () => {
    const companies = [...this.state.companies];
    const emptyChoicesArr = [];
    const longestArray = this.getLongestChoicesArray();
    while (emptyChoicesArr.length < longestArray.length) {
      emptyChoicesArr.push("");
    }
    companies.splice(0, 0, { name: "", numberAccepted: "", choices: emptyChoicesArr });

    this.setState({ companies: companies });
    this.setState({ unsavedChanges: true });
  };

  handleDelete = (companyToDelete) => {
    const filtered = this.state.companies.filter((company) => company.name !== companyToDelete);
    this.setState({ companies: filtered });
    this.setState({ unsavedChanges: true });
  };

  // handle update cell text content on cell blur - pass this down to each row and to each editable cell
  handleCellUpdate = (companyName, categoryToEdit, newText, choiceIndex) => {
    const updated = this.state.companies.map((company) => {
      if (company.name === companyName) {
        // if dealing with a choice being edited, use the index of the cell within choices array to identify which cell to edit
        if (categoryToEdit === "choices") {
          // filter out empty values in choices to identify if we are editing a currently populated cell or not
          const filtered = company.choices.filter((choice) => choice !== "");
          if (!filtered[choiceIndex]) {
            // if the cell is not currently populated, add it to the end of the valid values by splicing it in
            company.choices.splice(filtered.length, 1, newText);
            return company;
          }
          // if the user is editing a currently populated cell, replace that cell specifically
          if (newText.trim() === "") {
            // if the new value is an empty string, shift every choice along to the left and add empty cell at the end
            company.choices.splice(choiceIndex, 1);
            company.choices.push("");
            return company;
          }
          // if the new value is a valid different value, replace the old value
          company.choices[choiceIndex] = newText;
          return company;
        }

        // if dealing with name or numberAccepted, no need for an index value to update the cell
        company[categoryToEdit] = newText;
        return company;
      }
      return company;
    });

    this.setState({ companies: updated });
    this.setState({ unsavedChanges: true });
  };

  async componentDidMount() {
    if (this.props.auth) {
      await this.setState({ companies: this.props.auth.companyChoices });
      const longestArray = this.getLongestChoicesArray();
      // pad out each choices array with empty strings to fill up each cell of the table
      const paddedCompanies = this.state.companies.map((company) => {
        if (company.choices.length < longestArray.length) {
          while (company.choices.length < longestArray.length) {
            company.choices.push("");
          }
          return company;
        }
        return company;
      });

      this.setState({ companies: paddedCompanies });
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
    // render tablerow for each company passing in the company as the row 'target'
    // pass down handleDelete and handleCellUpdate to handle table edit functionality for child components
    return this.state.companies.map((company, index) => {
      return (
        <TableRow
          key={shortid.generate()}
          for="company"
          target={company}
          t={this.props.t}
          handleDelete={this.handleDelete}
          handleCellUpdate={this.handleCellUpdate}
        />
      );
    });
  }

  renderSavePrompt() {
    const { t } = this.props;
    if(this.state.unsavedChanges === true) {
      return <p>{t("adminDashboard.companies.savePrompt")}</p>
    }
  }

  render() {
    const { t } = this.props;
    return (
      <div>
        <h2>{t("adminDashboard.companies.navbarHeader")}</h2>
        {this.renderSavePrompt()}
        {this.renderError()}
        <div className="actions-bar">
          <Button basic size="small" onClick={this.addRow}>
            {t("adminDashboard.tableActions.addRow")}
          </Button>
          <Button basic size="small" onClick={this.addChoice}>
            {t("adminDashboard.tableActions.addChoice")}
          </Button>
          <Button basic size="small" onClick={this.removeChoice}>
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
