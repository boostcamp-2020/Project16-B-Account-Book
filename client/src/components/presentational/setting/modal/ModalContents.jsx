import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import ModalForm from './ModalForm';
import DeleteModalForm from './DeleteModalForm';

const ModalContent = styled.div`
  margin: 0 auto;
  width: 100%;
  position: relative;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const SubContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex: 1;
`;

const AddBtn = styled.button`
  flex-basis: 50%;
  height: 40px;
  font-size: 1rem;
  padding: 13px 30px;
  cursor: pointer;
  background-color: ${(props) => props.color || '#3fc1c9'};
  color: white;
  line-height: 1px;
  margin-right: 12px;
  margin-bottom: 12px;
  border-style: none;
  box-shadow: 6px 6px 8px 0px rgba(226, 226, 226, 1);
`;

const SubTitle = styled.span`
  color: black;
  font-size: 1.2rem;
  font-weight: 500;
`;

const UserMap = styled.div`
  margin-bottom: 25px;
`;

const ModalContents = ({ inviteUserList, usersInfo, onChangeUser, close }) => {
  const inMemberRef = useRef();
  const outMemberRef = useRef();

  const [newMember, setNewMember] = useState([]);
  const [deleteMember, setDeleteMember] = useState([]);

  const onClick = () => {
    const newMemberArray = [];
    const deleteMemberArray = [];

    newMember.forEach((member) => {
      newMemberArray.push(JSON.parse(member)._id);
    });

    deleteMember.forEach((member) => {
      deleteMemberArray.push(JSON.parse(member)._id);
    });

    onChangeUser(newMemberArray, deleteMemberArray);
    close();
  };

  const handleNewMemberCheck = (event) => {
    if (event.checked) {
      setNewMember([...newMember, event.value]);
    }

    if (!event.checked) {
      const deleteIndex = newMember.findIndex((item) => {
        return item._id === event.value._id;
      });

      let copyMember = Object.assign([], newMember);
      copyMember.splice(deleteIndex, 1);
      setNewMember(copyMember);
    }
  };

  const handleDeleteMemberCheck = (event) => {
    if (event.checked) {
      setDeleteMember([...deleteMember, event.value]);
    }

    if (!event.checked) {
      const deleteIndex = deleteMember.findIndex((item) => {
        return item._id === event.value._id;
      });

      let copyMember = Object.assign([], deleteMember);
      copyMember.splice(deleteIndex, 1);
      setDeleteMember(deleteMember);
    }
  };

  return (
    <ModalContent>
      <SubTitle>
        💌 <mark>초대</mark> 가능한 Member List{' '}
      </SubTitle>
      <UserMap ref={inMemberRef}>
        {inviteUserList.map((user, index) => (
          <ModalForm
            key={'inviteUser' + index}
            user={user}
            handleNewMemberCheck={handleNewMemberCheck}
          />
        ))}
      </UserMap>
      <SubTitle>
        💌 <mark>내보내기</mark> 가능한 Member List{' '}
      </SubTitle>
      <UserMap ref={outMemberRef}>
        {usersInfo.map((user, index) => (
          <DeleteModalForm
            key={'goodByeUser' + index}
            user={user}
            handleDeleteMemberCheck={handleDeleteMemberCheck}
          />
        ))}
      </UserMap>
      <SubContainer>
        <AddBtn type="button" onClick={(e) => onClick(e)}>
          Member 변경
        </AddBtn>
        <AddBtn type="button" onClick={close} color="#333333">
          취소
        </AddBtn>
      </SubContainer>
    </ModalContent>
  );
};

export default ModalContents;
