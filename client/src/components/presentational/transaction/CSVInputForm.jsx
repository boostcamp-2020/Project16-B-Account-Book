import { Fragment } from 'react';

import styled from 'styled-components';
import currencyExchange from '@util/currencyExchange';
import { useSelector } from 'react-redux';
import { transactionValidationFormatter } from '@util/formatter';

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
`;

const Button = styled.button`
  margin-top: 10px;
  z-index: 100;
  display: inline-block;
  padding: 0 16px;
  min-width: 100px;
  border-radius: 2px;
  text-align: center;
  font-size: 14px;
  line-height: 34px;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.258824) 0 2px 2px 0;
  transition: all 0.3s ease 0s;
  border: 0;
  background: #ffffff;
  color: #111;
  border: 1px #ffc0cb solid;
  &:hover {
    background: #ffc0cb;
  }
`;

const transactionInputFormObject = {
  날짜: '날짜',
  시간: '시간',
  분류: '분류',
  결제수단: '결제수단',
  가격: '가격',
  화폐: '화폐',
  '수입/지출': '수입/지출',
  '추가 설명': '추가 설명',
};

const transactionKeyName = {
  날짜: 'date',
  시간: 'time',
  분류: 'category',
  결제수단: 'paymentMethod',
  가격: 'cost',
  화폐: 'currency',
  '수입/지출': 'type',
  '추가 설명': 'description',
};

const formKeys = Object.keys(transactionInputFormObject);
const formValues = Object.values(transactionInputFormObject);

const Item = styled.div`
  border: 1px solid black;
  display: flex;
  justify-content: center;
`;

const CSVInputForm = ({ bulkInsertTransactionHandler, handleClose }) => {
  const bulkInsert = useSelector((state) => state.transaction.bulkInsert);

  const handleSubmit = (e) => {
    e.preventDefault();

    bulkInsertTransactionHandler({
      transactions: bulkInsert.map((transaction) => {
        const newTransaction = Object.keys(transaction).reduce((acc, cur) => {
          const formattedInput = transactionValidationFormatter(
            transactionKeyName[cur],
            transaction[cur]
          );
          return { ...acc, [transactionKeyName[cur]]: formattedInput };
        }, {});
        const { cost, currency } = newTransaction;
        return { ...newTransaction, cost: currencyExchange(cost, currency) };
      }),
    });
    handleClose();
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <StyledDiv>
          {formValues.map((key, formIndex) => {
            return <Item key={`formkey${formIndex}`}>{key}</Item>;
          })}
          {bulkInsert.map((dataObject, i) => {
            return (
              <Fragment key={`dataObj-${i}`}>
                {formKeys.map((key, index) => {
                  return (
                    <Item key={`keys-${index}`}>
                      <div>{` ${dataObject[key] || 'x'}`} </div>
                    </Item>
                  );
                })}
              </Fragment>
            );
          })}
          <Button type="submit">추가 하기</Button>
        </StyledDiv>
      </form>
    </>
  );
};

export default CSVInputForm;
