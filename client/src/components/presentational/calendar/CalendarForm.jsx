import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import S from './style';
import CalendarCheckbox from './CalendarCheckbox';
import CalendarWeekDays from './CalendarWeekDays';

const CalendarForm = ({
  calendarInfo,
  onClickPrev,
  onClickNext,
  onClickType,
  state,
  setState,
  userInfo,
}) => {
  return (
    <>
      <S.Month>
        <S.Prev
          onClick={() => {
            onClickPrev();
          }}
        >
          <FaAngleLeft size={50} />
        </S.Prev>
        <S.DateDiv>
          <S.MonthTitle>{calendarInfo.month}월</S.MonthTitle>
          <S.MonthSubTitle>
            - {calendarInfo.year}년 {calendarInfo.month}월 -
          </S.MonthSubTitle>
        </S.DateDiv>
        <S.Next
          onClick={() => {
            onClickNext();
          }}
        >
          <FaAngleRight size={50} />
        </S.Next>
      </S.Month>
      <CalendarCheckbox
        onClickType={onClickType}
        state={state}
        setState={setState}
      />
      <CalendarWeekDays userInfo={userInfo} />
    </>
  );
};

export default CalendarForm;
