import styled from 'styled-components';

const Info = styled.div`
  margin-top: 10px;
  width: 100%;

  * {
    margin: 0;
    margin-bottom: 0.2em;
  }
`;

const Name = styled.div`
  display: flex;
  font-size: 1rem;
`;

const Checkbox = styled.input`
  margin-top: 4px;
  margin-left: 40px;
  margin-right: 10px;
  width: 20px;
  height: 20px;
`;

const ModalForm = ({ user, handleNewMemberCheck }) => {
  const { email, name } = user;

  const handleClick = (event) => {
    handleNewMemberCheck(event);
  };
  return (
    <Info>
      <Name>
        <Checkbox
          type="checkbox"
          onChange={(e) => handleClick(e.target)}
          value={JSON.stringify(user)}
        />
        {name} {email ? `(${email})` : null}
      </Name>
    </Info>
  );
};

export default ModalForm;
