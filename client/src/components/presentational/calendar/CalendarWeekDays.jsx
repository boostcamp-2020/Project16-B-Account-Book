import S from './style';

const DayArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const makeArr = (DaysArr) => {
  return DaysArr.map((day, index) => {
    if (day === 'Sun') {
      return (
        <S.WeekDay key={'day' + index} sunday={true}>
          {day}
        </S.WeekDay>
      );
    }

    if (day === 'Sat') {
      return (
        <S.WeekDay key={'day' + index} saturday={true}>
          {day}
        </S.WeekDay>
      );
    }

    return <S.WeekDay key={'day' + index}>{day}</S.WeekDay>;
  });
};

const CalendarWeekDays = ({ userInfo }) => {
  const startDayOfWeek = userInfo.startDayOfWeek;
  const IndexOfStartDay = DayArr.indexOf(startDayOfWeek);

  const firstWeekDaysArr = DayArr.slice(IndexOfStartDay);
  const lastWeekDaysArr = DayArr.slice(0, IndexOfStartDay);

  const firstWeekDays = makeArr(firstWeekDaysArr);
  const lastWeekDays = makeArr(lastWeekDaysArr);

  return (
    <S.WeekDays>
      {firstWeekDays}
      {lastWeekDays}
    </S.WeekDays>
  );
};

export default CalendarWeekDays;
