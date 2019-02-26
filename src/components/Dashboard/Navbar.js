import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { withTranslation } from 'react-i18next';

import LanguageSelector from "components/LanguageSelector";

class Navbar extends Component {
  renderWelcome() {
    const { t } = this.props;

    if(this.props.auth) {
      return `${t("dashboard.welcome")} ${this.props.auth.name}`
    }
  }
  render() {
    const { t } = this.props;

    return (
      <Menu fluid borderless className="navbar">
        <Menu.Item>
          <Link to="/dashboard">
            <h3>MyInternship</h3>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <LanguageSelector />
        </Menu.Item>
        <Menu.Item>
          <p>{this.renderWelcome()}</p>
        </Menu.Item>
        <Menu.Item position="right">
          <a href="/auth/logout">{t("dashboard.signout")}</a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withTranslation() (Navbar);
