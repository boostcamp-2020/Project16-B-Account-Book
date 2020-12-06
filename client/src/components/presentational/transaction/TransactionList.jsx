import { Fragment } from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border: 1px solid rgba(var(--b6a, 219, 219, 219), 1);
  border-top: none;
  width: 65vw;
  background: #f5f5f7;
  padding: 1% 2%;
`;

const StyledDate = styled.div`
  background: #fafafc;
  border: 1px solid rgba(var(--b6a, 219, 219, 219), 1);
  margin-top: 2%;
  padding: 1% 2%;
  width: 65vw;
`;

const Cost = styled.div`
  margin-left: auto;
  padding-right: 5%;
`;

const StyledTransactionList = styled.div`
  margin-top: 10%;
`;

const TransactionList = ({
  transactions,
  deleteTransactionHandler,
  categoryInput,
  paymentMethodInput,
  costInput,
  dateInput,
  timeInput,
  descriptionInput,
  tagInput,
  ImageURLInput,
  setEditIdStatus,
}) => {
  const handleClick = (transaction) => {
    categoryInput.current.value = transaction.category || '';
    paymentMethodInput.current.value = transaction.paymentMethod || '';
    costInput.current.value = transaction.cost || '';
    dateInput.current.value =
      `${transaction.year}-${transaction.month}-${transaction.day}` || '';
    timeInput.current.value = transaction.time || '';
    descriptionInput.current.value = transaction.description || '';
    tagInput.current.value = transaction?.tag || '';
    ImageURLInput.current.value = transaction.imageURL || '';
    setEditIdStatus(transaction._id);
  };

  const parseDate = (date) => {
    const [weekDay, month, day, year, time] = new Date(date)
      .toString()
      .split(' ');
    return {
      weekDay,
      month: monthByNumber[month],
      day,
      year,
      time,
    };
  };

  const transactionByDay = (transaction) => {
    return { [transaction.day]: [transaction] };
  };

  const addDay = (currentTransactions, newTransactions) => {
    currentTransactions[newTransactions.day] = [
      ...currentTransactions[newTransactions.day],
      newTransactions,
    ];
    return currentTransactions;
  };

  const transactionByDate = transactions.reduce((acc, cur) => {
    const dateObj = parseDate(cur.date);
    const newCur = { ...cur, ...dateObj };
    if (acc[dateObj.month] && acc[dateObj.month][dateObj.day]) {
      acc[dateObj.month] = { ...addDay(acc[dateObj.month], newCur) };
    }
    if (acc[dateObj.month] && !acc[dateObj.month][dateObj.day]) {
      acc[dateObj.month][dateObj.day] = [newCur];
    }
    if (!acc[dateObj.month]) {
      acc[dateObj.month] = transactionByDay(newCur);
    }
    return acc;
  }, {});

  const transactionTemplate = () => {
    const months = Object.keys(transactionByDate).sort((a, b) => b - a);
    const template = months.map((month) => {
      const days = Object.keys(transactionByDate[month]).sort((a, b) => b - a);
      return days.map((day, i) => {
        return (
          <Fragment key={`transactionMonth${i}`}>
            <StyledDate>
              {month}/{day}
            </StyledDate>
            {transactionByDate[month][day].map((transaction, i) => {
              return (
                <Fragment key={`transactionDay${i}`}>
                  <StyledDiv onClick={() => handleClick(transaction._id)}>
                    <div>{transaction.time}</div>
                    <div>{transaction.category}</div>
                    <div>{transaction.description}</div>
                    <Cost>{transaction.cost}</Cost>
                  </StyledDiv>
                  <button onClick={() => handleClick(transaction)}>수정</button>
                  <button
                    onClick={() => deleteTransactionHandler(transaction._id)}
                  >
                    삭제
                  </button>
                </Fragment>
              );
            })}
          </Fragment>
        );
      });
    });
    return template;
  };

  const template = transactionTemplate();

  return (
    <>
      <StyledTransactionList>{template}</StyledTransactionList>
    </>
  );
};

export default TransactionList;

const monthByNumber = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12,
};
