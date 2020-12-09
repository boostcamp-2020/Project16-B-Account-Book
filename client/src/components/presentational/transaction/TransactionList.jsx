import { Fragment, useState } from 'react';
import styled, { css } from 'styled-components';

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border: 1px solid rgba(var(--b6a, 219, 219, 219), 1);
  border-top: none;
  width: 65vw;
  background: #f5f5f7;
  padding: 1% 2%;
`;

const StyledCheckbox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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

const DeleteOverview = styled.div`
  background: pink;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 1%;
  margin: 0;
  left: 0;
  z-index: 10;
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  & > * {
    width: 25%;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledButton = styled.button`
  &:hover {
    cursor: pointer;
  }
  ${(props) => {
    if (props.isCancel) {
      return css`
        background-color: pink;
        color: white;
        border: none;
        margin-right: 15%;
      `;
    }
    return css`
      margin-right: 5%;
      padding: 1% 5%;
    `;
  }}
`;

const TransactionList = ({
  transactions,
  deleteTransactionHandler,
  deleteStatus,
  setDeleteStatus,
  setEditIdStatus,
  setOpenModalStatus,
}) => {
  const [dataSets, setDataSets] = useState([]);
  const handleClick = (transaction) => {
    setOpenModalStatus(true);
    setEditIdStatus(transaction);
  };

  const cancelDeleteHandler = () => {
    setDeleteStatus(false);
    setDataSets([]);
  };

  const deleteHandler = () => {
    deleteTransactionHandler(dataSets);
    setDeleteStatus(false);
    setDataSets([]);
  };

  const handleDeleteClick = (e) => {
    if (e.target.checked) {
      setDataSets([...dataSets, e.target.dataset.id]);
    }
    if (!e.target.checked) {
      setDataSets(dataSets.filter((data) => data !== e.target.dataset.id));
    }
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
                <>
                  <StyledCheckbox>
                    <>
                      {deleteStatus && (
                        <input
                          type="checkbox"
                          data-id={transaction._id}
                          onClick={(e) => handleDeleteClick(e)}
                        />
                      )}
                      <Fragment key={`transactionDay${i}`}>
                        <StyledDiv onClick={() => handleClick(transaction)}>
                          <div>{transaction.time}</div>
                          <div>{transaction.category}</div>
                          <div>{transaction.description}</div>
                          <Cost>
                            {transaction.type === '수입' ? '+' : '-'}
                            {transaction.cost}
                          </Cost>
                        </StyledDiv>
                      </Fragment>
                    </>
                  </StyledCheckbox>
                </>
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
      {deleteStatus && (
        <DeleteOverview>
          <span>삭제할 내역을 선택해 주세요. ({dataSets.length}개 선택됨)</span>
          <ButtonGroup>
            <StyledButton isCancel={true} onClick={cancelDeleteHandler}>
              취소
            </StyledButton>
            <StyledButton isCancel={false} onClick={deleteHandler}>
              확인
            </StyledButton>
          </ButtonGroup>
        </DeleteOverview>
      )}
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
