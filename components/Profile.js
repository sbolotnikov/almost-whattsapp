import { useRef, useState } from "react";
import CloudinaryButton from "./CloudinaryButton";
import styled from "styled-components";
import { Avatar, Button, IconButton } from "@material-ui/core";
import "firebase/compat/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import CancelIcon from "@mui/icons-material/Cancel";
function Profile(props) {
  const [user] = useAuthState(auth);
  const emailRef = useRef();
  const passwordRef = useRef();
  const userNameRef = useRef();
  const passwordConfirmRef = useRef();
  // const { currentUser, updatePassword, updateEmail, updateUser } = useAuth()
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userURL, setUserURL] = useState(user.photoURL);
  const getImgUrl = (url) => {
    // update URL of the profile picture
    document.querySelector("#userURL").value = url;
    setUserURL(url);
    console.log(userURL);
  };
  function handleSubmit(e) {
    // submitting profile updated information
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== user.email) {
      promises.push(user.updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(user.updatePassword(passwordRef.current.value));
    }
    if (
      userNameRef.current.value !== user.displayName ||
      userURL !== user.photoURL
    ) {
      promises.push(
        user
          .updateProfile({
            displayName: userNameRef.current.value,
            photoURL: userURL,
          })
          .then(function () {
            // Update successful.
          })
          .catch(function (error) {
            setError("error on Profile update"); // An error happened.
          })
      );
    }
    Promise.all(promises)
      .then(() => {
        //   setToRoot(true);
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <Container>
      <ProfileContainer>
        <ExitButton
          onClick={(e) => {
            props.onClose({});
          }}
        >
          <CancelIcon />
        </ExitButton>
        <HeaderTitle>Update Profile</HeaderTitle>
        {userURL != null && <UserAvatar src={userURL} alt="avatar simple" />}
        {error && <label className="alertStyle">{error}</label>}
        <FormContainer onSubmit={handleSubmit}>
          <label>User's Name </label>
          <InputStyled
            id="userName"
            type="text"
            ref={userNameRef}
            defaultValue={user.displayName}
            placeholder="Leave blank to keep the same"
          />
          <label>Email</label>
          <InputStyled
            id="email"
            type="email"
            ref={emailRef}
            required
            defaultValue={user.email}
          />
          <label>Password </label>
          <InputStyled
            id="password"
            type="password"
            ref={passwordRef}
            placeholder="Leave blank to keep the same"
          />
          <label className="headerStyle">Password Confirmation</label>
          <InputStyled
            id="password-confirm"
            type="password"
            ref={passwordConfirmRef}
            placeholder="Leave blank to keep the same"
          />
          <label >User's picture link</label>
          <InputStyled id="userURL"
            type="text"
            onChange={(e) => {
              setUserURL(e.target.value);
            }}
            defaultValue={userURL}
          />
          <CloudinaryButton getImgUrl={getImgUrl} />
          <StyleButton disabled={loading} type="submit">
            Update
          </StyleButton>
          <StyleButton
            onClick={() => {
              auth.signOut();
            }}
          >
            Log out
          </StyleButton>
        </FormContainer>
      </ProfileContainer>
    </Container>
  );
}

export default Profile;
const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100vw;

  z-index: 200;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: whitesmoke;
    filter: opacity(60%);
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
  filter: none;
`;
const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
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
const StyleButton = styled(Button)`
  width: 100%;
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;
const ExitButton = styled(IconButton)`
  align-self: end;
`;
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
`;
const HeaderTitle = styled.h4`
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  text-transform: uppercase;
  font-weight: 600;
  line-height: 2;
  letter-spacing: 0.02857em;
`;
