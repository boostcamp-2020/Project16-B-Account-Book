import styled from 'styled-components';

import AccountBookCard from './AccountBookCard';
import { generateRandomColor, getContrastYIQ } from '@util/color';

const AccountBookWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  position: relative;
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 50%;
  font-size: 3rem;
  font-family: 'Noto Sans KR', sans-serif;
  text-align: center;
`;

const AccountBookUl = styled.ul`
  list-style-type: none;
  margin-left: 5rem;
  position: relative;
`;

const AccountBookList = ({
  accountBooks,
  onClickAccountBook,
  onClickDelete,
  onClickSaveTitle,
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
        onClickSaveTitle={onClickSaveTitle}
      />
    );
  });

  return (
    <>
      <AccountBookWrapper>
        <Header>가계부를 선택해주세요📚</Header>
        <AccountBookUl>{list}</AccountBookUl>
      </AccountBookWrapper>
    </>
  );
};

export default AccountBookList;
