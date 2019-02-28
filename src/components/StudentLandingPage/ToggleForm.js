import React from "react";
import { Button } from "semantic-ui-react";

const ToggleForm = (props) => {
  return (
    <div className="toggleForm">
      <p>{props.prompt}</p>
      <Button onClick={props.onClick} basic inverted compact >{props.message}</Button>
    </div>
  )
}

export default ToggleForm;
