import { Fragment } from 'react';

import styled from 'styled-components';

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
`;

const BulkInputForm = ({
  bulkInsert,
  setBulkInsert,
  bulkInsertTransactionHandler,
  setOpenModalStatus,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    bulkInsertTransactionHandler({ transactions: bulkInsert });
    setOpenModalStatus(false);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        {bulkInsert.map((dataObject, i) => {
          const keys = Object.keys(dataObject);
          const values = Object.values(dataObject);

          return (
            <Fragment key={`dataObj-${i}`}>
              <StyledDiv>
                {keys.map((key, index) => {
                  return (
                    <Fragment key={`keys-${index}`}>
                      {/* {key}: <input type="text" value={values[index]}></input> */}
                      <div>
                        {key}: {values[index]}
                      </div>
                    </Fragment>
                  );
                })}
              </StyledDiv>
            </Fragment>
          );
        })}
        <button type="submit">submit</button>
      </form>
    </>
  );
};

export default BulkInputForm;
