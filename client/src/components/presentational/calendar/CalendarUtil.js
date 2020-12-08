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

const findDate = ({ type, nowYear, nowMonth }) => {
  if (type === 'before') {
    if (nowMonth - 1 === 0) {
      return { year: nowYear - 1, month: 12 };
    }
    return { year: nowYear, month: nowMonth - 1 };
  }

  if (type === 'next') {
    if (nowMonth + 1 === 13) {
      return { year: nowYear + 1, month: 1 };
    }
    return { year: nowYear, month: nowMonth + 1 };
  }
};

export { Variable, findDate };
