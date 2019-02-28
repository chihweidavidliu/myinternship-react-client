import React from "react";
import { Button } from "semantic-ui-react";

const ToggleForm = (props) => {
  return (
    <div className="toggleForm">
      <p>Already registered?</p>
      <Button onClick={props.onClick} compact >{props.message}</Button>
    </div>
  )
}

export default ToggleForm;
