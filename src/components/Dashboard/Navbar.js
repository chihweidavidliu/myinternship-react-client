import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  renderWelcome() {
    if(this.props.auth) {
      return `Welcome ${this.props.auth.name}`
    }
  }
  render() {
    return (
      <Menu fluid borderless className="navbar">
        <Menu.Item>
          <Link to="/dashboard">
            <h3>MyInternship</h3>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <p>{this.renderWelcome()}</p>
        </Menu.Item>
        <Menu.Item position="right">
          <a href="/auth/logout">Sign out</a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default Navbar;
