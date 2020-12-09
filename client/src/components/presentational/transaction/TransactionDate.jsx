import styled from 'styled-components';
import icon from '@public/icon';

const DateSelectSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2vh;
`;

const StyledDiv = styled.div``;
const StyledButton = styled.button`
  border: none;
  background: none;
  outline: none;
  :hover {
    cursor: pointer;
  }
`;

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
      <DateSelectSection>
        <StyledDiv>
          <StyledButton onClick={() => handleClick('year', -1)}>
            {' '}
            {icon.leftArrow}{' '}
          </StyledButton>
          year {date.year}
          <StyledButton onClick={() => handleClick('year', 1)}>
            {' '}
            {icon.rightArrow}{' '}
          </StyledButton>
        </StyledDiv>
        <StyledDiv>
          <StyledButton onClick={() => handleClick('month', -1)}>
            {' '}
            {icon.leftArrow}{' '}
          </StyledButton>
          month {date.month}
          <StyledButton onClick={() => handleClick('month', 1)}>
            {' '}
            {icon.rightArrow}{' '}
          </StyledButton>
        </StyledDiv>
      </DateSelectSection>
    </>
  );
};

export default TransactionDate;
