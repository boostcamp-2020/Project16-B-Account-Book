const dayOfWeeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Variable = ({ calendarInfo, userInfo }) => {
  const daysPerWeek = 7;
  const startDayOfWeek = userInfo.startDayOfWeek;
  const IndexOfStartDay = dayOfWeeks.indexOf(startDayOfWeek);

  const lastDay = new Date(calendarInfo.year, calendarInfo.month, 0).getDate();

  let firstDayIndex =
    new Date(`${calendarInfo.year}-${calendarInfo.month}-01`).getDay() -
    IndexOfStartDay;

  if (firstDayIndex < 0) {
    firstDayIndex += Number(daysPerWeek);
  }

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

  const nextDays = 7 - lastDayIndex + (IndexOfStartDay - 1);

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
