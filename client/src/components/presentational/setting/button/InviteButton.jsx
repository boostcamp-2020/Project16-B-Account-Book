import styled from 'styled-components';

const Container = styled.header`
  width: 100%;
  text-align: center;
  position: relative;
`;

const ButtonStyle = styled.button`
  text-align: center;
  background-color: #3fc1c9;
  color: white;
  cursor: pointer;
  padding: 1em;
  font-size: 1rem;
  border: none;
  outline: none;
  box-shadow: 6px 6px 8px 0px rgba(226, 226, 226, 1);

  &:hover {
    opacity: 0.8;
  }
`;

const InviteButton = ({ name, onClick }) => {
  return (
    <Container>
      <ButtonStyle onClick={onClick}>{name}</ButtonStyle>
    </Container>
  );
};

export default InviteButton;
