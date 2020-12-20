import Styled from './style';

const dayOfWeeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarWeekTemplate = (DaysArr) => {
  return DaysArr.map((day, index) => {
    if (day === 'Sun') {
      return (
        <Styled.WeekDay key={'day' + index} sunday={true}>
          {day}
        </Styled.WeekDay>
      );
    }

    if (day === 'Sat') {
      return (
        <Styled.WeekDay key={'day' + index} saturday={true}>
          {day}
        </Styled.WeekDay>
      );
    }

    return <Styled.WeekDay key={'day' + index}>{day}</Styled.WeekDay>;
  });
};

const CalendarWeekDays = ({ userInfo }) => {
  const startDayOfWeek = userInfo.startDayOfWeek;
  const IndexOfStartDay = dayOfWeeks.indexOf(startDayOfWeek);

  const firstWeekDaysArr = dayOfWeeks.slice(IndexOfStartDay);
  const lastWeekDaysArr = dayOfWeeks.slice(0, IndexOfStartDay);

  const firstWeekDays = CalendarWeekTemplate(firstWeekDaysArr);
  const lastWeekDays = CalendarWeekTemplate(lastWeekDaysArr);

  return (
    <Styled.WeekDays>
      {firstWeekDays}
      {lastWeekDays}
    </Styled.WeekDays>
  );
};

export default CalendarWeekDays;
