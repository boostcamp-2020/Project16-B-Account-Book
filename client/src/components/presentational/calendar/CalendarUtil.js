const Variable = ({ calendarInfo }) => {
  const lastDay = new Date(calendarInfo.year, calendarInfo.month, 0).getDate();
  const firstDayIndex = calendarInfo.day;
  const prevLastDay = new Date(
    calendarInfo.year,
    calendarInfo.month - 1,
    0
  ).getDate();
  const lastDayIndex = new Date(
    calendarInfo.year,
    calendarInfo.month,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  return {
    lastDay,
    firstDayIndex,
    prevLastDay,
    nextDays,
  };
};

const nowDateMap = (date) => {
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    date: date.getUTCDate(),
    day: date.getUTCDay(),
  };
};

export { Variable, nowDateMap };
