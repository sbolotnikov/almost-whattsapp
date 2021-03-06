import styled from "styled-components"; 
import { Avatar } from "@material-ui/core";
import getRecipientEmail from "../utils/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter} from "next/router";
import moment from "moment";
import { useEffect, useContext } from "react";
import { CallContext } from "../callContext";

function Chat({id, users, title }) {
    const router = useRouter();
    const { setNewCall, setRoom, setCallerImg, setGroupCall, setCallerName} = useContext(CallContext);
    const [user] = useAuthState(auth);
    const [recipientSnapshot] = useCollection(
        db.collection("users").where("email", "==", getRecipientEmail(users,user))
    );
    const [lastMessageSnapshot]=useCollection(
        db.collection("chats").doc(id).collection("messages").orderBy("timestamp", "desc").limit(1)
    );

    const enterChat = () => {
        router.push(`/chat/${id}`);
    }
    
    
    const recipient = recipientSnapshot?.docs?.[0]?.data();
    console.log(recipient?.displayName);
    var chatTitle=(title.length>0)?title:recipient?.displayName
    const lastMessage = lastMessageSnapshot?.docs?.[0]?.data();
    useEffect(() => {
        if (!!lastMessage) if(lastMessage.filetype=="link"){
         if(new Date(Date.now()).getTime()-lastMessage.timestamp.toDate().getTime()<60000){
             setCallerName(chatTitle);
             setGroupCall((title.length>0)?true:false);
             setCallerImg((title.length>0)?recipientEmail[0]:recipient?.photoURL);
             setRoom(lastMessage.url)
             setNewCall(true);
            }else console.log("old")
            
        }
    },[lastMessage]);
    const recipientEmail = getRecipientEmail(users, user);
    return (
        <Container onClick={enterChat}>
            {recipient ? (
                <UserAvatar src={recipient?.photoURL} />
            ) : (
                <UserAvatar>{recipientEmail[0]}</UserAvatar>
            )}
            
            <MessageElement>
            <p>{chatTitle}</p>
            <p>{!!lastMessage ? lastMessage.url.length>0? lastMessage.filetype!=="link"? "FILE ATTACHED ":"PHONE CALL": "": "" }{!!lastMessage ? lastMessage.message : "..."}</p>
            <Timestamp>
            {!!lastMessage &&(lastMessage.timestamp!=null) ? moment(lastMessage.timestamp.toDate().getTime()).format('LLL') : "..."}
            </Timestamp>
            </MessageElement>
            
            
        </Container>
    );
}

export default Chat

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;

  :hover {
      background-color: #e9eaeb;
  }
`;
const UserAvatar = styled(Avatar)`
   margin: 5px;
   margin-right: 15px;
`;
const Timestamp = styled.span`
  color: gray;
  align-items:right;
  font-size: 9px;
  text-align: right;
  right: 0;
  position: absolute;
`;
const MessageElement = styled.p`
  width: fit-content;
  padding: 5px;
  margin: 5px;
  min-width: 160px;
  padding-bottom: 6px;
  position: relative;
  text-align: left;
`;