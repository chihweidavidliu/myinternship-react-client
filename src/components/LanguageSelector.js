import React, { Component } from "react";
import { Flag } from "semantic-ui-react";
import { withTranslation } from 'react-i18next';

class LanguageSelector extends Component {
  handleClick = (language) => {
    const { i18n } = this.props;
    i18n.changeLanguage(language)
  }

  render() {
    return (
      <div className="language-selector">
        <Flag name="taiwan" className="country" onClick={() => this.handleClick("ch")}/>
        <Flag name="uk" className="country" onClick={() => this.handleClick("en")}/>
      </div>
    )
  }
}

export default withTranslation()(LanguageSelector);
