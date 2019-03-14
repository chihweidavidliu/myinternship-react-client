import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "actions";

class EditableTableCell extends Component {
  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // if user hits enter, prevent new paragraph and deblur todo
      e.preventDefault();
      e.target.blur();
    }
  };

  render() {
    return (
      <Table.Cell
        contentEditable={true}
        suppressContentEditableWarning={true}
        onBlur={(e) =>
          this.props.updateCell(this.props.target._id, this.props.category, e.target.innerText, this.props.index)
        }
        onKeyPress={this.handleKeyPress}
      >
        {this.props.content}
      </Table.Cell>
    );
  }
}

export default connect(null, actions)(EditableTableCell);
