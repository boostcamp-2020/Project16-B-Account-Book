import styled from 'styled-components';

import AccountBookCard from './AccountBookCard';
import { generateRandomColor, getContrastYIQ } from '@util/color';

const AccountBookWrapper = styled.div`
  width: 100%;
  float: right;
  position: relative;
  left: -50%;
`;

const AccountBookUl = styled.ul`
  list-style-type: none;
  position: relative;
  left: 50%;
`;

const AccountBookList = ({
  accountBooks,
  onClickAccountBook,
  onClickDelete,
}) => {
  const colors = generateRandomColor(accountBooks.length);

  const list = accountBooks.map((accountBook, index) => {
    return (
      <AccountBookCard
        key={'accountBook' + index}
        title={accountBook.title}
        accountBookId={accountBook._id}
        users={accountBook.authorizedUsers}
        cards={accountBook.paymentMethod}
        backgroundColor={colors[index]}
        fontColor={getContrastYIQ(colors[index])}
        onClickAccountBook={onClickAccountBook}
        onClickDelete={onClickDelete}
      />
    );
  });

  return (
    <>
      <AccountBookWrapper>
        <AccountBookUl>{list}</AccountBookUl>
      </AccountBookWrapper>
    </>
  );
};

export default AccountBookList;
