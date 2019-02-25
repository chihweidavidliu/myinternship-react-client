import React, { Component } from "react";
import { Flag } from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "actions";

class LanguageSelector extends Component {
  handleClick = (language) => {
    this.props.toggleLanguage(language);
  }

  render() {
    return (
      <div className="language-selector">
        <Flag name="taiwan" className="country" onClick={() => this.handleClick("Chinese")}/>
        <Flag name="uk" className="country" onClick={() => this.handleClick("English")}/>
      </div>
    )
  }
}

export default connect (null, actions) (LanguageSelector);
