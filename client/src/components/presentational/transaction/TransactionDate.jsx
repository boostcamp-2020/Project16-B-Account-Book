import styled from 'styled-components';

const StyledDiv = styled.div``;

const TransactionDate = ({ date, updateDateHandler }) => {
  const handleClick = (type, amount) => {
    const newDate = calculateDate(date, type, amount);
    updateDateHandler({ date: newDate });
  };

  const calculateDate = (currentDate, type, difference) => {
    let month = currentDate.month;
    let year = currentDate.year;
    if (type === 'year') {
      year += difference;
    }

    if (type === 'month') {
      if (month + difference === 13) {
        month = 1;
        year += 1;
      }
      if (month + difference === 0) {
        month = 12;
        year -= 1;
      }
      if (year === currentDate.year) {
        month += difference;
      }
    }

    return { ...currentDate, year, month };
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
