import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useRef } from "react";
import * as EmailValidator from "email-validator";
function EmailInput(props) {
  const [editable, setEditable] = useState(true);
  const inputRef = useRef();
  const regex = "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/";
  return (
    <InputContainer>
      <input
        ref={inputRef}
        defaultValue={props.email}
        type="email"
        pattern={regex}
        required
        disabled={editable}
        onBlur={(e) => {
          setEditable(true);
          let inputEmail = e.target.value;
          if (EmailValidator.validate(inputEmail)) {
            console.log("match");
            if (props.enteredEmailArray.indexOf(inputEmail) > -1) {
              e.target.value = props.email;
              alert(
                "Email you provided match your address or it is already entered!"
              );
            } else props.onEdit({ email: inputEmail, num: props.i });
          } else {
            e.target.value = props.email;
            alert("Please enter valid email address!");
          }
        }}
      />
      <ModeEditIcon
        style={{ color: "blue" }}
        onClick={(e) => {
          e.preventDefault();
          setEditable(false);
          inputRef.current.focus();
        }}
      />
      <IconButton
        onClick={(e) => {
          e.preventDefault();
          props.onDel({ record: props.i });
        }}
      >
        <DeleteIcon style={{ color: "red" }} />
      </IconButton>
    </InputContainer>
  );
}

export default EmailInput;
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  bottom: 0;
  background-color: white;
  z-index: 120;
`;
