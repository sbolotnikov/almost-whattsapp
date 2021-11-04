import { useRef, useState } from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { auth } from "../firebase";
function Signup(props) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    if (passwordRef.current.value.length < 6) {
      return setError("Passwords should be at least 6 symbols long");
    }
    try {
      setError("");
      setLoading(true);
      auth.createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      );
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <InputContainer onSubmit={handleSubmit}>
      {error && <ErrorLabel>{error}</ErrorLabel>}
      <label>Email </label>
      <InputStyled id="email" type="email" ref={emailRef} required />

      <label>Password </label>
      <InputStyled id="password" type="password" ref={passwordRef} required />
      <label>Password Confirmation</label>
      <InputStyled
        id="password-confirm"
        type="password"
        ref={passwordConfirmRef}
        required
      />

      <StyleButton disabled={loading} type="submit">
        Sign Up
      </StyleButton>

      <label> Already have an account? </label>
      <StyleButton onClick={()=>{props.onChange()}}>Log in</StyleButton>
    </InputContainer>
  );
}

export default Signup;
const ErrorLabel = styled.label`
text-align: center; 
color:red;
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
