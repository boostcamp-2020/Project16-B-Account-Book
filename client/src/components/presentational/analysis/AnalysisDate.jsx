import styled from 'styled-components';

const AnalysisDateWrapper = styled.div`
  display: flex;
`;

const SetMonthBtn = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const Date = styled.div``;

const AnalysisDate = ({ date, setDate }) => {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;

  const onClickPrevMonth = () => {
    setDate(new window.Date(year, month - 1));
  };

  const onClickNextMonth = () => {
    setDate(new window.Date(year, month + 1));
  };

  return (
    <>
      <AnalysisDateWrapper>
        <SetMonthBtn onClick={onClickPrevMonth}>&lt;</SetMonthBtn>
        <Date>
          {year}년 {month}월
        </Date>
        <SetMonthBtn onClick={onClickNextMonth}>&gt;</SetMonthBtn>
      </AnalysisDateWrapper>
    </>
  );
};

export default AnalysisDate;
