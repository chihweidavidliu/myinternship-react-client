import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

import LanguageSelector from "components/LanguageSelector";

class AdminNavbar extends Component {
  render() {
    const { t } = this.props;

    return (
      <Menu fluid borderless stackable inverted className="navbar">
        <Menu.Item>
          <Link to="/admin/students">
            <h3>MyInternship Admin</h3>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <LanguageSelector />
        </Menu.Item>
        <Menu.Item>
          <Link to="/admin/dashboard">
            <p>{t("adminDashboard.students")}</p>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/admin/dashboard/companies">
            <p>{t("adminDashboard.companies")}</p>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/admin/dashboard/sorter">
            <p>{t("adminDashboard.sorter")}</p>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/admin/dashboard/settings">
            <p>{t("adminDashboard.settings")}</p>
          </Link>
        </Menu.Item>
        <Menu.Item position="right">
          <a href="/auth/logout">{t("dashboard.signout")}</a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withTranslation()(AdminNavbar);
