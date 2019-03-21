import React from "react";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";
import UploadCompaniesModal from "./UploadCompaniesModal";
import * as actions from "actions";

const TableToolbar = (props) => {
  const { addRow, addChoice, removeChoice, saveChanges, t, companies } = props;
  return (
    <div className="actions-bar">
      <Button basic size="small" onClick={() => addRow(companies)}>
        {t("adminDashboard.tableActions.addRow")}
      </Button>
      <Button basic size="small" onClick={addChoice}>
        {t("adminDashboard.tableActions.addChoice")}
      </Button>
      <Button basic size="small" onClick={removeChoice}>
        {t("adminDashboard.tableActions.removeChoice")}
      </Button>
      <UploadCompaniesModal />
      <Button basic size="small" onClick={saveChanges} color={props.unsavedChanges ? "yellow" : null}>
        {t("adminDashboard.tableActions.save")}
      </Button>
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    unsavedChanges: state.unsavedChanges,
    companies: state.companies
  }
}
export default connect(mapStateToProps, actions)(TableToolbar);