import styled from 'styled-components';

const ButtonStyle = styled.button`
  background-color: #3fc1c9;
  color: white;
  cursor: pointer;
  padding: 0.7em;
  flex: 1 1 100%;
  font-size: 1.05rem;
  outline: none;
  border-left: none;

  &:hover {
    opacity: 0.8;
  }
`;

const Button = ({ name, onClick }) => {
  return <ButtonStyle onClick={onClick}>{name}</ButtonStyle>;
};

export default Button;
