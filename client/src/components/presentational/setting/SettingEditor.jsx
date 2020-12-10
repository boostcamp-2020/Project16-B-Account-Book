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

const SettingEditor = ({ userInfo, updateUserInfo, onChange, isMaster }) => {
  return (
    <>
      <Editor>
        <Title>내 정보 💗</Title>
        {userInfo != [] ? (
          <CardEditForm
            userInfo={userInfo}
            updateUserInfo={updateUserInfo}
            onChange={onChange}
          />
        ) : (
          <></>
        )}

        <Title>Only Master 💗</Title>
        {isMaster ? (
          <Title>
            짝짝짝 ! 마스터 이십니다 ! <br />
            추후 <mark>user 권한 추가 & 삭제</mark>가 가능하도록 <br />
            기능을 추가할 예정입니다.
          </Title>
        ) : (
          <Title>마스터만 사용할 수 있는 기능입니다!</Title>
        )}
      </Editor>
    </>
  );
};

export default SettingEditor;
