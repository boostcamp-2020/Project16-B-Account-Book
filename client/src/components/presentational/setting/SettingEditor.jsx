import { useState } from 'react';

import styled from 'styled-components';
import InviteButton from './button/InviteButton';
import CardEditForm from './form/CardEditForm';
import InviteModal from './modal/InviteModal';

const Editor = styled.section`
  flex-basis: 50%;
  border-right: 1px solid lightgray;
  padding: 0.5em 2em;
  margin-bottom: 50px;
`;

const Title = styled.h1`
  width: 100%;
  text-align: center;
  margin-bottom: 1em;
`;

const SettingEditor = ({
  userInfo,
  usersInfo,
  originUserInfo,
  updateUserInfo,
  onChange,
  isMaster,
  onChangeUser,
  inviteUserList,
}) => {
  const [modal, setModal] = useState(false);
  const handleClose = () => setModal(false);
  const handleShow = () => setModal(true);

  return (
    <>
      <Editor>
        <Title>내 정보 💗</Title>
        {userInfo != [] ? (
          <CardEditForm
            userInfo={userInfo}
            originUserInfo={originUserInfo}
            updateUserInfo={updateUserInfo}
            onChange={onChange}
          />
        ) : (
          <></>
        )}

        <Title>Only Master 💗</Title>
        {isMaster ? (
          <>
            <Title>
              짝짝짝 ! 마스터 이십니다 ! <br />
              <mark>Member를 초대 or 내보내기</mark> <br />
              해보세요!
            </Title>
            <InviteButton name="Member 수정하기 💞" onClick={handleShow} />
            {modal && (
              <InviteModal
                isOpen={modal}
                close={handleClose}
                onChangeUser={onChangeUser}
                inviteUserList={inviteUserList}
                usersInfo={usersInfo}
              />
            )}
          </>
        ) : (
          <Title>마스터만 사용할 수 있는 기능입니다!</Title>
        )}
      </Editor>
    </>
  );
};

export default SettingEditor;
