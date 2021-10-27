import styled from "styled-components";
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart';

function EmojiShow(props) {

  return (
    <Container>
      <EmojiContainer>
      <Picker onClick={( emojiObject, event) => {
    props.onChange(emojiObject.native);
  }} />
      </EmojiContainer>
    </Container>
  );
}

export default EmojiShow;
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

const EmojiContainer = styled.div`
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
