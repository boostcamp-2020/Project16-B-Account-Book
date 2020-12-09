import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import Overlay from './Overlay';

const AddForm = styled.div`
  position: absolute;
  top: 10rem;
  left: 0;
  right: 0;
  width: 25rem;
  height: 10.8rem;
  margin: auto;
  z-index: 3;
  background-color: white;
  border-radius: 5px;
`;

const CloseBtn = styled.div`
  position: absolute;
  transform: rotate(45deg);
  top: -6px;
  right: 2px;
  font-size: 24px;
  &:hover {
    cursor: pointer;
  }
`;

const Description = styled.div`
  margin-top: 2rem;
  font-size: 20px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
`;
const Input = styled.input`
  text-align: center;
  height: 1.5rem;
  margin-top: 1rem;
  border: none;
  border-bottom: 1px solid gray;
  outline: none;
`;
const SubmitBtn = styled.button`
  margin-top: 1rem;
  height: 2rem;
  border: none;
  border-radius: 5px;
  background-color: #ff7bac;
  color: white;
  transition: transform 250ms ease-in;
  &:hover {
    cursor: pointer;
    transform: scale(1.03);
  }
`;

const AddModal = ({ setModal, addAccountBook }) => {
  const [accountBookName, setAccountBookName] = useState('');
  const nameRef = useRef();
  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    addAccountBook(accountBookName);
    setAccountBookName('');
    setModal(false);
  };

  const onInputChange = (e) => {
    setAccountBookName(e.target.value);
  };

  return (
    <>
      <Overlay setModal={setModal} />
      <AddForm>
        <CloseBtn onClick={() => setModal(false)}>+</CloseBtn>
        <Form>
          <Description>가계부 이름을 정해주세요</Description>
          <Input
            placeholder="ex) 내 가계부"
            type="text"
            onChange={onInputChange}
            ref={nameRef}
          ></Input>
          <SubmitBtn onClick={onSubmit}>가계부 생성</SubmitBtn>
        </Form>
      </AddForm>
    </>
  );
};

export default AddModal;
