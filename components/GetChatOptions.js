import styled from "styled-components";
import { useState, useEffect } from "react";
import { Button, IconButton } from "@material-ui/core";
import * as EmailValidator from "email-validator";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CancelIcon from "@mui/icons-material/Cancel";
import { useCollection } from "react-firebase-hooks/firestore";
import EmailInput from "./EmailInput";
import Switch from "react-switch";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
function GetChatOptions(props) {
  const [inputEmails, setInput] = useState([]);
  const [updateChat, setUpdate] = useState(false);
  const [inputChatName, setInputChatName] = useState("");
  const [user] = useAuthState(auth);
  const [checkbox, setCheckbox] = useState(false);


  const addEmail = (e) => {
    e.preventDefault();
    let newEmail = e.target.children[0].value;
    if (newEmail == user.email) {
      alert("Do not add yourself");
      return;
    }
    if (inputEmails.indexOf(newEmail) > -1) {
      alert("Already exist");
      return;
    }
    if (!EmailValidator.validate(newEmail)) {
      alert("Please enter a valid email");
      return;
    }
    let arr = [...inputEmails, newEmail];
    console.log(arr);
    setInput(arr);
    e.target.children[0].value = "";
  };


  function deleteEmail(num) {
    let arr = [...inputEmails];
    arr.splice(num.record, 1);
    setInput(arr);
    console.log(arr, num.record);
  }
  function editEmail(res) {
    let arr = [...inputEmails];
    arr[res.num] = res.email;
    setInput(arr);
    console.log(arr);
  }

  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email)
    .where("participants", "==", 2);
  const [chatsSnapshot] = useCollection(userChatRef);

  const createChat = () => {
    if (inputEmails.length === 0) return null;

    console.log(inputChatName);
    if (updateChat) {
      db.collection("chats")
        .doc(props.chat)
        .set({
          users: [user.email, ...inputEmails],
          participants: inputEmails.length + 1,
          header: inputChatName,
        });
    } else {
      if (!chatAlreadyExists(inputEmails[0])) {
        db.collection("chats").add({
          users: [user.email, ...inputEmails],
          participants: inputEmails.length + 1,
          header: inputChatName,
        });
      } else {
        alert("Chat already exist");
      }
    }
    props.onClose({});
  };

  const chatAlreadyExists = (recipientEmail) =>
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );
  useEffect(() => {
    if (props.chat > "") {
      setUpdate(true);
      db.collection("chats")
        .doc(props.chat)
        .get()
        .then((doc) => {
          let emailsArray = doc.data().users;
          emailsArray.splice(emailsArray.indexOf(user.email), 1);
          setInput(emailsArray);
          setInputChatName(doc.data().header);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
  }, []);
  return (
    <Container>
      <ChatContainer>
        <ExitButton
          onClick={(e) => {
            props.onClose({});
          }}
        >
          <CancelIcon />
        </ExitButton>   
        <Switch uncheckedIcon={<PersonAddIcon/>} checkedIcon={<GroupAddIcon/>}
        onChange={()=>{setCheckbox(!checkbox); if (inputEmails.length>1) setInput(inputEmails[0])}} onColor={"#3CBC28"} checked={checkbox} />
        <h2 style={{ margin: "5px" }}>{checkbox?"Group":"Chat"} details</h2>
        <br />
        {checkbox &&
            <div>
            <h5 style={{ margin: "5px" }}>Enter Group Name</h5>
        <input
          type="text"
          defaultValue={inputChatName}
          onChange={(e) => {
            setInputChatName(e.target.value);
          }}
        />
        </div>
        }
        <br />

        <h5 style={{ margin: 0 }}>{checkbox ? "Enter Group participants emails":"Enter recipient email"}:</h5>
        <InputContainer onSubmit={addEmail}>
          <input
            type="email"
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            required
            disabled={(!checkbox) && (inputEmails.length==1)?true:false}
          />
          <IconButton type="submit" disabled={(!checkbox) && !!(inputEmails.length==1)?true:false}>
            <AddBoxIcon style={{ color: "#3CBC28" }} />
          </IconButton>
        </InputContainer>
        {inputEmails.map((email, i) => (
          <EmailInput
            email={email}
            enteredEmailArray={[user.email, ...inputEmails]}
            i={i}
            onDel={(num) => {
              deleteEmail(num);
            }}
            onEdit={(res) => editEmail(res)}
          />
        ))}
        <SidebarButton
          onClick={() => {
            createChat();
          }}
        >
          {!updateChat ? "create " : "update "}{checkbox?"Group":"Chat"}
        </SidebarButton>
      </ChatContainer>
    </Container>
  );
}

export default GetChatOptions;
const SidebarButton = styled(Button)`
  width: 100%;
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;
const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 110;
  display: grid;
  place-items: center;
  height: 100%;
  width: 100%;
  background-color: rgba(250, 250, 250, 0.6);
`;

const ChatContainer = styled.div`
  max-width: 350px;
  width: fit-content;
  z-index: 150;
  margin: 10%;
  padding: 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;

  border-radius: 5px;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
`;
const ExitButton = styled(IconButton)`
  align-self: end;
`;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  bottom: 0;
  background-color: white;
  z-index: 120;
`;
