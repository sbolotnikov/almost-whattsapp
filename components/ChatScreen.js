import styled from "styled-components";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { Avatar } from "@material-ui/core";

function ChatScreen({ chat, messages }) {
    const [user] = useAuthState(auth);
    const router = useRouter();
    return (
        <Container>
            <Header>
             <Avatar />
             <HeaderInformation>
                 <h3>Rec Email</h3>
                 <p>Last seen ...</p>
             </HeaderInformation>
            <HeaderIcons></HeaderIcons>
            </Header>
        </Container>
    )
}

export default ChatScreen

const Container = styled.div`
  display: flex;
  `;
const Header = styled.div``;

const HeaderInformation = styled.div``;

const HeaderIcons = styled.div``;
