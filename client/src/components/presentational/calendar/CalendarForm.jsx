import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import S from './style';
import CalendarCheckbox from './CalendarCheckbox';

const CalendarForm = ({
  calendarInfo,
  onClickPrev,
  onClickNext,
  onClickType,
  state,
  setState,
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
      <S.WeekDays>
        <S.WeekDay sunday={true}>Sun</S.WeekDay>
        <S.WeekDay>Mon</S.WeekDay>
        <S.WeekDay>Tue</S.WeekDay>
        <S.WeekDay>Wed</S.WeekDay>
        <S.WeekDay>Thu</S.WeekDay>
        <S.WeekDay>Fri</S.WeekDay>
        <S.WeekDay saturday={true}>Sat</S.WeekDay>
      </S.WeekDays>
    </>
  );
};

export default CalendarForm;
