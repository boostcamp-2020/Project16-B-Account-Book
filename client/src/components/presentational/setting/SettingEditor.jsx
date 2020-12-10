import styled from 'styled-components';

const Editor = styled.section`
  flex-basis: 50%;
  /* background-color: #eaffd0; */
  border-right: 1px solid lightgray;
`;

const Title = styled.h1`
  width: 100%;
  text-align: center;
  margin-bottom: 1em;
`;

const SettingEditor = ({ usersInfo }) => {
  return (
    <Editor>
      <Title>내 정보 🔥</Title>
    </Editor>
  );
};

export default SettingEditor;
