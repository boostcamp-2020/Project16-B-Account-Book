import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import AccountBookList from '@presentational/accountbook/AccountBookList';
import AddModal from '@presentational/accountbook/AddModal';
import {
  loadAccountBooks,
  loadAccountBook,
  addAccountBook,
  removeAccountBook,
  changeAccountBook,
} from '@slice';
import icon from '@public/icon';
import { setCookie } from '@util/cookie';
import { confirmFormat } from '@service/swalFormat';

const AddAccountBookBtn = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: row-reverse;
  cursor: pointer;
  border: none;
  outline: none;
  position: absolute;
  top: 5%;
  right: 6%;
  transition: transform 250ms ease-in;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
  z-index: 3;
`;

const AccountBookContainerWrapper = styled.div`
  min-height: 100vh;
  height: auto;
  background-color: #f5f6fa;
`;

const AccountBookContainer = () => {
  const [addModal, setAddModal] = useState(false);
  const dispatch = useDispatch();
  const accountBooks = useSelector((state) => state.default.accountBooks);

  useEffect(() => {
    dispatch(loadAccountBooks());
  }, []);

  const handleAddAccountBook = (accountBook) => {
    dispatch(addAccountBook(accountBook));
  };

  const handleRemoveAccountBook = (accountBookId) => {
    Swal.fire(
      confirmFormat({
        position: 'top',
      })
    ).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeAccountBook(accountBookId));
        Swal.fire({
          text: `가계부 삭제가 완료되었습니다.`,
        });
      }
    });
  };

  const handleSelectAccountBook = (accountBookId) => {
    setCookie('accountBookId', accountBookId);
    dispatch(loadAccountBook(accountBookId));
  };

  const handleUpdateAccountBook = (accountBookId, newTitle) => {
    dispatch(changeAccountBook(accountBookId, newTitle));
  };

  const handleAddModal = () => {
    setAddModal(!addModal);
  };

  return (
    <>
      <AccountBookContainerWrapper>
        <AddAccountBookBtn onClick={handleAddModal}>
          {icon.largeAddBtn}
        </AddAccountBookBtn>
        {addModal && (
          <AddModal
            setModal={setAddModal}
            addAccountBook={handleAddAccountBook}
          />
        )}
        <AccountBookList
          accountBooks={accountBooks}
          onClickDelete={handleRemoveAccountBook}
          onClickAccountBook={handleSelectAccountBook}
          onClickSaveTitle={handleUpdateAccountBook}
        />
      </AccountBookContainerWrapper>
    </>
  );
};

export default AccountBookContainer;
