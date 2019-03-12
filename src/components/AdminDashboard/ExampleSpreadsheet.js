import React from "react";
import { Table } from "semantic-ui-react";
import { withTranslation } from "react-i18next";

const ExampleSpreadsheet = (props) => {
  const { t } = props;
  return (
    <Table size="small" celled striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>{t("adminDashboard.companies.company")}</Table.HeaderCell>
          <Table.HeaderCell>{t("adminDashboard.companies.numberAccepted")}</Table.HeaderCell>
          <Table.HeaderCell>{`${t("adminDashboard.students.choice")} 1`}</Table.HeaderCell>
          <Table.HeaderCell>{`${t("adminDashboard.students.choice")} 2`}</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>Google</Table.Cell>
          <Table.Cell>2</Table.Cell>
          <Table.Cell>Sam</Table.Cell>
          <Table.Cell>Paul</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}

export default withTranslation()(ExampleSpreadsheet);
