import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Message, Button } from "semantic-ui-react";

import * as actions from "actions";
import UploadCompaniesModal from "./UploadCompaniesModal";
import ChoicesTable from "./ChoicesTable";

class AdminCompanyView extends Component {
  state = { companies: [], unsavedChanges: false };

  addChoice = () => {
    const updatedCompanies = JSON.parse(JSON.stringify(this.state.companies));
    updatedCompanies.forEach((company) => {
      return company.choices.push("");
    });
    this.setState({ companies: updatedCompanies });
    this.setState({ unsavedChanges: true });
  };

  removeChoice = () => {
    const updatedCompanies = JSON.parse(JSON.stringify(this.state.companies));
    updatedCompanies.forEach((company) => company.choices.pop());
    this.setState({ companies: updatedCompanies });
    this.setState({ unsavedChanges: true });
  };

  addRow = () => {
    const companies = JSON.parse(JSON.stringify(this.state.companies));
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
    // make deep copy of companies
    const companies = JSON.parse(JSON.stringify(this.state.companies));;
    const updated = companies.map((company) => {
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

  saveChanges = async () => {
    // filter out empty strings in choices array
    const updatedCompanies = this.state.companies.map(company => {
      const filteredChoices = company.choices.filter(choice => {
        return choice !== ""
      });
      // replace each company's choices array with the filtered one (non-mutating)
      return {...company, choices: filteredChoices };
    });
    //update db
    await this.props.updateAdmin({ companyChoices: updatedCompanies });
    this.setState({ unsavedChanges: false });
  }

  async componentDidMount() {
    if (this.props.auth) {
      await this.setState({ companies: this.props.auth.companyChoices });
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

  renderSavePrompt() {
    const { t } = this.props;
    if(this.state.unsavedChanges === true) {
      return (
        <Message
          style={{ marginBottom: "15px", marginTop: "0px", width: "80%" }}
          content={t("adminDashboard.companies.savePrompt")}
          color="yellow"
        />
      )
    }
  }
  renderTable() {
    // get companies from state - need to put companies in state
    const { companies } = this.state;
    const { t } = this.props;

    if(companies.length > 0) {
      return (
        <ChoicesTable
          editable={true}
          group="companies"
          data={companies}
          fixedHeaders={[
            null,
            t("adminDashboard.companies.company"),
            t("adminDashboard.companies.numberAccepted")
          ]}
          handleDelete={this.handleDelete}
          handleCellUpdate={this.handleCellUpdate}
        />
      )
    }
  }
  render() {
    const { t } = this.props;
    return (
      <React.Fragment>
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
          <UploadCompaniesModal />
          <Button basic size="small" onClick={this.saveChanges} color={this.state.unsavedChanges ? "yellow" : null }>
            {t("adminDashboard.tableActions.save")}
          </Button>
        </div>
        <div className="table-container">
          {this.renderTable()}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    authMessage: state.authMessage
  };
};

const wrapped = connect(mapStateToProps, actions)(AdminCompanyView);
export default withTranslation()(wrapped);
