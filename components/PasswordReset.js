import { useRef, useState } from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { auth } from "../firebase";
function PasswordReset(props) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await auth.sendPasswordResetEmail(emailRef.current.value)
      setMessage("Check your inbox for further instructions")
    } catch {
      setError("Failed to reset password")
    }

    setLoading(false)
  }


  return (
    <InputContainer onSubmit={handleSubmit}>
      {error && <ErrorLabel>{error}</ErrorLabel>}
      {message &&<label className='successStyle'>{message}</label> }
      <label>Email </label>
      <InputStyled id="email" type="email" ref={emailRef} required />

      <StyleButton disabled={loading} type="submit">
      Reset Password
      </StyleButton>

      <label> Already have an account? </label>
      <StyleButton onClick={()=>{props.onChange({"to":"Login"})}}>Log in</StyleButton>
      <StyleButton onClick={()=>{props.onChange({"to":"Signup"})}}>
              Signup for Account
            </StyleButton>
    </InputContainer>
  );
}

export default PasswordReset;
const ErrorLabel = styled.label`
text-align: center; 
color:red;
font-style: oblique;
`;
const MessageLabel = styled.label`
text-align: center; 
color:green;
font-style: oblique;
`;
const InputStyled = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 10px;
  background-color: whitesmoke;
  padding: 10px;
  margin-left: 10px;
  margin-right: 10px;
`;
const InputContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
`;
const StyleButton = styled(Button)`
  width: 100%;
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;