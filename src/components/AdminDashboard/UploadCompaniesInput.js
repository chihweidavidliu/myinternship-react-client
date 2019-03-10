import React, { Component } from "react";
import { Input } from "semantic-ui-react";

class UploadCompaniesInput extends Component {
  onChange = (e) => {
    e.preventDefault();
    // manually pass the uploaded file to the reduxForm onChange function
    const file = e.target.files[0];
    this.props.onChange(file);
  };

  render() {
    return <Input type="file" accept=".xlsx, .xls" onChange={this.onChange} className="upload-input" />;
  }
}

export default UploadCompaniesInput;
