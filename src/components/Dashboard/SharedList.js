import uniqueId from "lodash/uniqueId";
import React from "react";
import { connect } from "react-redux";
import Sortable from "react-sortablejs";

// Functional Component
const SharedList = ({ items, listType, onChange, auth, type }) => {
  if (items && auth) {
    items = items.map((val) => {
      if (type === "options") {
        // only render companies that do not appear in student choices
        if (!auth.choices.includes(val)) {
          return (
            <li key={uniqueId()} data-id={val}>
              {val}
            </li>
          );
        }
      }
      // if dealing with student choices, render everything
      return (
        <li key={uniqueId()} data-id={val}>
          {val}
        </li>
      );
    });
  }
  return (
    <Sortable
      // See all Sortable options at https://github.com/RubaXa/Sortable#options
      options={{
        group: "shared"
      }}
      tag={listType}
      onChange={onChange}
    >
      {items}
    </Sortable>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};
export default connect(mapStateToProps)(SharedList);
