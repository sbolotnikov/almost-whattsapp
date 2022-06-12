import styled from 'styled-components';
function Item(props) {
    return (
        <Span2 className={"n"}>{props.charItem}</Span2>
    );
  }
  export default Item;
  const Span2 = styled.span`
  position: absolute;
  height:5rem;
`