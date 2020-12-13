import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import ModalForm from './ModalForm';

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

const AddBtn = styled.button`
  height: 40px;
  font-size: 1rem;
  padding: 13px 30px;
  cursor: pointer;
  background-color: #3fc1c9;
  color: white;
  line-height: 1px;
  margin-bottom: 12px;
  border-radius: 3px;
  border-style: none;
`;

const SubTitle = styled.span`
  color: black;
  font-size: 1.2rem;
  font-weight: 500;
`;

const UserMap = styled.div`
  margin-bottom: 25px;
`;

const ModalContents = ({ inviteUserList, usersInfo, addUser }) => {
  const inMemberRef = useRef();
  const outMemberRef = useRef();

  const [newMember, setNewMember] = useState([]);

  const onClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log('클릭!', newMember);
    // handleAdd();
    // addUser

    // onChange={(e) => handleAllCheck(e.target.checked)}
  };

  const handleNewMemberCheck = (event) => {
    if (event.checked) {
      setNewMember([...newMember, event.value]);
    }

    if (!event.checked) {
      const deleteMember = newMember.filter((member) => {
        member != event.value;
      });
      console.log(deleteMember);
      setNewMember([deleteMember]);
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
          <ModalForm key={'goodByeUser' + index} user={user} />
        ))}
      </UserMap>
      <AddBtn type="submit" onClick={(e) => onClick(e)}>
        Member 변경
      </AddBtn>
    </ModalContent>
  );
};

export default ModalContents;
