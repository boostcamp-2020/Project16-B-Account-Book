import React, { useRef } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import { errorFormat, successFormat } from '@service/swalFormat';

const Modal = styled.div`
  z-index: 10;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
`;

const ModalWrapper = styled.div`
  width: 480px;
  height: 225px;
  background-color: white;
  position: relative;
  box-sizing: border-box;
  margin: 50px auto;
  padding: 20px;
  padding-top: 10px;
  background: #fff;
  border-radius: 10px;

  @media (max-width: 767px) {
    width: 90%;
  }
`;

const Close = styled.div`
  float: right;
  font-size: 30px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const ModalContents = styled.div`
  margin: 0 auto;
  width: 100%;
  position: relative;
  padding: 0 20px 32px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Input = styled.input`
  margin-top: 10px;
  border-radius: 2px;
  width: 100%;
  height: 40px;
  border: 1px solid #e5e5e5;
  padding: 9px 12px;
  outline: none;
  box-sizing: border-box;
`;

const AddBtn = styled.button`
  height: 40px;
  font-size: 14px;
  padding: 13px 30px;
  cursor: pointer;
  background-color: #02aacf;
  color: white;
  line-height: 1px;
  margin-top: 20px;
  margin-bottom: 12px;
  border-radius: 3px;
  border-style: none;
`;

const SubTitle = styled.span`
  color: black;
`;

const PaymentModal = ({ isOpen, close, AddCard, payments }) => {
  const inputRef = useRef();

  const handleAdd = () => {
    const newCardName = inputRef.current.value;
    const existCardName = payments.filter(
      (item) => item.payment == newCardName
    );

    if (existCardName.length === 1) {
      Swal.fire(
        errorFormat({
          position: 'top',
          title: '이미 존재하는 카드입니다 😥',
          text: `카드 명을 다시 입력해주세요`,
        })
      );

      return;
    }
    if (newCardName === '') {
      Swal.fire(
        errorFormat({
          position: 'top',
          text: `카드 명을 입력해주세요`,
        })
      );

      return;
    }
    Swal.fire(
      successFormat({
        position: 'center',
        title: '카드 등록이 완료되었습니다.',
      })
    );
    AddCard(newCardName);
    close();
  };

  const onClick = () => {
    handleAdd();
  };

  const onKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <>
      {isOpen ? (
        <Modal>
          <ModalWrapper>
            <Close onClick={close}>&times;</Close>

            <ModalContents>
              <SubTitle>💳 카드 명: </SubTitle>
              <Input
                ref={inputRef}
                type="text"
                placeholder="ex) 카카오 체크카드"
                onKeyPress={(event) => onKeyPress(event)}
              />
              <AddBtn type="submit" onClick={onClick}>
                카드 등록
              </AddBtn>
            </ModalContents>
          </ModalWrapper>
        </Modal>
      ) : null}
    </>
  );
};

export default PaymentModal;
