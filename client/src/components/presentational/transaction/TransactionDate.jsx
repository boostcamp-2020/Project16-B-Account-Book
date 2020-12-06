import styled from 'styled-components';

const StyledDiv = styled.div``;

const TransactionDate = ({ date, updateDateHandler }) => {
  const handleClick = (type, amount) => {
    const newDate = Date.now();
    updateDateHandler({ date: newDate });
  };

  return (
    <>
      <StyledDiv>
        <button onClick={() => handleClick('year', -1)}> {`<`} </button>
        year {date.year}
        <button onClick={() => handleClick('year', 1)}> {`>`} </button>
      </StyledDiv>
      <StyledDiv>
        <button onClick={() => handleClick('month', -1)}> {`<`} </button>
        month {date.month}
        <button onClick={() => handleClick('month', 1)}> {`>`} </button>
      </StyledDiv>
    </>
  );
};

export default TransactionDate;
