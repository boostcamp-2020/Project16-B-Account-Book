import styled from 'styled-components';

import ModalContents from './ModalContents';

const Modal = styled.form`
  z-index: 10;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: auto;
  background: rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  position: relative;
  top: 50px;
  width: 480px;
  overflow-y: auto;
  background-color: white;
  box-sizing: border-box;
  margin: 50px auto;
  margin-bottom: 0;
  padding: 15px;
  background: #fff;
  border-radius: 10px 10px 0 0;
  border-bottom: 1px solid lightgray;
`;

const ModalWrapper = styled.div`
  position: relative;
  top: 50px;
  width: 480px;
  max-height: 60vh;
  overflow-y: auto;
  background-color: white;
  box-sizing: border-box;
  margin: 50px auto;
  margin-top: 0;
  margin-bottom: 0;
  padding: 15px;
  background: #fff;
`;

const ModalFooter = styled.div`
  position: relative;
  top: 50px;
  width: 480px;
  background-color: white;
  box-sizing: border-box;
  margin: 50px auto;
  margin-bottom: 0;
  margin-top: 0;
  padding: 15px;
  background: #fff;
  border-radius: 0 0 10px 10px;
`;

const Close = styled.div`
  float: right;
  font-size: 20px;
  cursor: pointer;
`;

const ModalTitle = styled.div`
  float: left;
  font-size: 20px;
`;

const InviteModal = ({
  isOpen,
  close,
  onChangeUser,
  inviteUserList,
  usersInfo,
}) => {
  return (
    <>
      {isOpen ? (
        <Modal>
          <ModalHeader>
            <ModalTitle>Member List</ModalTitle>
            <Close onClick={close}>&times;</Close>
          </ModalHeader>
          <ModalWrapper>
            <ModalContents
              inviteUserList={inviteUserList}
              usersInfo={usersInfo}
              onChangeUser={onChangeUser}
              close={close}
            />
          </ModalWrapper>
          <ModalFooter />
        </Modal>
      ) : null}
    </>
  );
};

export default InviteModal;
