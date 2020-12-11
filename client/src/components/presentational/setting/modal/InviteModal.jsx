import styled from 'styled-components';
import Swal from 'sweetalert2';

import { successFormat } from '@service/swalFormat';
import ModalContents from './ModalContents';

const Modal = styled.form`
  z-index: 10;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
`;

const ModalWrapper = styled.div`
  position: relative;
  top: 200px;
  width: 480px;
  max-height: 100vh;
  background-color: white;
  position: relative;
  box-sizing: border-box;
  margin: 50px auto;
  margin-top: 10px;
  padding: 15px;
  background: #fff;
  border-radius: 10px;
`;

const Close = styled.div`
  float: right;
  font-size: 25px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const InviteModal = ({ isOpen, close, addUser, inviteUserList, usersInfo }) => {
  return (
    <>
      {isOpen ? (
        <Modal>
          <ModalWrapper>
            <Close onClick={close}>&times;</Close>
            <ModalContents
              inviteUserList={inviteUserList}
              usersInfo={usersInfo}
            />
          </ModalWrapper>
        </Modal>
      ) : null}
    </>
  );
};

export default InviteModal;
