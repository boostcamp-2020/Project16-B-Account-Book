const Variable = ({ calendarInfo }) => {
  const lastDay = new Date(calendarInfo.year, calendarInfo.month, 0).getDate();
  const firstDayIndex = new Date(
    `${calendarInfo.year}-${calendarInfo.month}-01`
  ).getDay();

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
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
    day: date.getDay(),
  };
};

export { Variable, nowDateMap };
