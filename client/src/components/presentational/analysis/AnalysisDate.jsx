import styled from 'styled-components';

import icon from '@public/icon';

const AnalysisDateWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 30px;
  line-height: 30px;
  margin-bottom: 2rem;
  svg {
    width: 30px;
    height: 30px;
  }
`;

const SetMonthBtn = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const Date = styled.div`
  font-size: 30px;
  margin: 0 2rem;
`;

const AnalysisDate = ({ date, setDate }) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  const onClickPrevMonth = () => {
    setDate(new window.Date(year, month - 2));
  };

  const onClickNextMonth = () => {
    setDate(new window.Date(year, month));
  };

  return (
    <>
      <AnalysisDateWrapper>
        <SetMonthBtn onClick={onClickPrevMonth}>{icon.leftArrow}</SetMonthBtn>
        <Date>
          {year}년 {month}월
        </Date>
        <SetMonthBtn onClick={onClickNextMonth}>{icon.rightArrow}</SetMonthBtn>
      </AnalysisDateWrapper>
    </>
  );
};

export default AnalysisDate;
