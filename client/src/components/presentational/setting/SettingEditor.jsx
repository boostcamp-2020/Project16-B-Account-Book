import styled from 'styled-components';
import CardEditForm from './form/CardEditForm';

const Editor = styled.section`
  flex-basis: 50%;
  border-right: 1px solid lightgray;
  padding: 0.5em 2em;
`;

const Title = styled.h1`
  width: 100%;
  text-align: center;
  margin-bottom: 1em;
`;

const SettingEditor = ({ userInfo, updateUserInfo, onChange }) => {
  return (
    <Editor>
      <Title>내 정보 💗</Title>
      {userInfo !== [] ? (
        <CardEditForm
          userInfo={userInfo}
          updateUserInfo={updateUserInfo}
          onChange={onChange}
        />
      ) : (
        <></>
      )}
    </Editor>
  );
};

export default SettingEditor;
