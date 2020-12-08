import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import AccountBookList from '@presentational/accountbook/AccountBookList';
import {
  loadAccountBooks,
  loadAccountBook,
  addAccountBook,
  removeAccountBook,
} from '@slice';
import icon from '@public/icon';
import { setCookie } from '@util/cookie';

const AddAccountBookBtn = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: row-reverse;
  cursor: pointer;
  border: none;
  outline: none;
  position: absolute;
  top: 20px;
  right: 30px;
  transition: transform 250ms ease-in;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`;

const AccountBookContainerWrapper = styled.div`
  height: 100vh;
  background-color: #fdfdfe;
`;

const AccountBookContainer = () => {
  const dispatch = useDispatch();
  const accountBooks = useSelector((state) => state.accountBooks);

  useEffect(() => {
    dispatch(loadAccountBooks());
  }, []);

  const handleAddAccountBook = (accountBook) => {
    dispatch(addAccountBook({ accountBook }));
  };

  const handleRemoveAccountBook = (accountBookId) => {
    console.log('delete');
    //dispatch(removeAccountBook({ accountBookId }));
  };

  const handleSelectAccountBook = (accountBookId) => {
    setCookie('accountBookId', accountBookId);
    dispatch(loadAccountBook(accountBookId));
  };

  return (
    <>
      <AccountBookContainerWrapper>
        <AddAccountBookBtn onClick={null}>{icon.largeAddBtn}</AddAccountBookBtn>
        <AccountBookList
          accountBooks={accountBooks}
          onClickDelete={handleRemoveAccountBook}
          onClickAccountBook={handleSelectAccountBook}
        />
      </AccountBookContainerWrapper>
    </>
  );
};

export default AccountBookContainer;
