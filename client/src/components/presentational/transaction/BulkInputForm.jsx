import { Fragment } from 'react';

import styled from 'styled-components';
import currencyExchange from '@util/currencyExchange';

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-gap: 2%;
`;

const transactionInputFormObject = {
  date: '날짜',
  time: '시간',
  category: '분류',
  paymentMethod: '결제수단',
  cost: '가격',
  currency: '화폐',
  type: '수입/지출',
  description: '추가 설명',
};
const formKeys = Object.keys(transactionInputFormObject);
const formValues = Object.values(transactionInputFormObject);

const BulkInputForm = ({
  bulkInsert,
  setBulkInsert,
  bulkInsertTransactionHandler,
  setOpenModalStatus,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    bulkInsertTransactionHandler({
      transactions: bulkInsert.map((transaction) => {
        const { cost, currency } = transaction;
        return { ...transaction, cost: currencyExchange(cost, currency) };
      }),
    });

    setBulkInsert(false);
    setOpenModalStatus(false);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <StyledDiv>
          {formValues.map((key, formIndex) => {
            return <div key={`formkey${formIndex}`}>{key}</div>;
          })}
          {bulkInsert.map((dataObject, i) => {
            return (
              <Fragment key={`dataObj-${i}`}>
                {formKeys.map((key, index) => {
                  return (
                    <Fragment key={`keys-${index}`}>
                      <div>{` ${dataObject[key] || 'x'}`} </div>
                    </Fragment>
                  );
                })}
              </Fragment>
            );
          })}
          <button type="submit">submit</button>
        </StyledDiv>
      </form>
    </>
  );
};

export default BulkInputForm;
