import Head from "next/head";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { auth, signInWithGoogle } from "../firebase";
import { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import "firebase/compat/auth";
import Signup from "../components/Signup";
import PasswordReset from "../components/PasswordReset";
function Login() {
  // login page using the AuthContext trying to login and then redirect to root
  const emailRef = useRef();
  const passwordRef = useRef();
  // const {  login } = useAuth()
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [signupVis, setSignupVis] = useState(false);
  const [passResetVis, setPassResetVis] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await auth.signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      );
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }
  return (
    <Container>
      <LoginContainer>
        <Head>
          <title>
            {signupVis ? "Sign up" : passResetVis ? "Reset Password" : "Login"}
          </title>
        </Head>

        <Logo src="/images/logo.jpg" />
        <HeaderTitle>
          {signupVis ? "Sign up" : passResetVis ? "Reset Password" : "Login"}
        </HeaderTitle>
        {signupVis ? (
          <Signup
            onChange={(t) => {
              setSignupVis(false);
            }}
          />
        ) : passResetVis ? (
          <PasswordReset
            onChange={(t) => {
              setPassResetVis(false);
              if (t.to == "Signup") setSignupVis(true);
              console.log(t.to);
            }}
          />
        ) : (
          <InputContainer onSubmit={handleSubmit}>
            <label>Email</label>
              <InputStyled id="email" type="email" ref={emailRef} required />
            
            <label>Password</label>
              <InputStyled
                id="password"
                type="password"
                ref={passwordRef}
                required
              />
            
            <StyleButton disabled={loading} type="submit">
              Log In
            </StyleButton>

            <StyleButton onClick={signInWithGoogle}>
              Sign in with Google
            </StyleButton>
            <StyleButton
              onClick={() => {
                setSignupVis(true);
              }}
            >
              Signup for Account
            </StyleButton>
            <StyleButton
              onClick={() => {
                setPassResetVis(true);
              }}
            >
              Reset Password
            </StyleButton>
          </InputContainer>
        )}
      </LoginContainer>
    </Container>
  );
}

export default Login;
const HeaderTitle = styled.h4`
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  text-transform: uppercase;
  font-weight: 600;
  line-height: 2;
  letter-spacing: 0.02857em;
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
const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`;

const LoginContainer = styled.div`
  padding: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
`;

const Logo = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 20px;
`;
