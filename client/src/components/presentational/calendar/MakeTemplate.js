import { Variable } from './CalendarUtil';
import TypeTemplate from './TypeTemplate';

const makeTemplate = ({
  type = 'all',
  calendarInfo,
  daysRef,
  transactions,
}) => {
  const { lastDay, firstDayIndex, prevLastDay, nextDays } = Variable({
    calendarInfo,
  });
  let days = '';

  for (let x = firstDayIndex - 1; x >= 0; x--) {
    days += `<div class="transaction"><div class="prev-date">${
      prevLastDay - x
    }</div>`;
    days += `<div class="no-expenditure"></div>`;
    days += `<div class="no-income"></div>`;
    days += `</div>`;
  }

  for (let day = 1; day <= lastDay; day++) {
    let income = 0;
    let expenditure = 0;

    if (
      calendarInfo.date === day &&
      calendarInfo.month === new Date().getUTCMonth() + 1 &&
      calendarInfo.year === new Date().getUTCFullYear()
    ) {
      days += `<div class="transaction today"><div>${day}</div>`;
    } else {
      days += `<div class="transaction"><div>${day}</div>`;
    }

    transactions.map((item) => {
      if (item.day === day) {
        if (item.type === '수입') income += item.cost;
        else expenditure += item.cost;
      }
    });

    days += TypeTemplate(type, expenditure, income);
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="transaction"><div class="next-date">${j}</div>`;
    days += `<div class="no-expenditure"></div>`;
    days += `<div class="no-income"></div>`;
    days += `</div>`;
  }

  daysRef.current.innerHTML = days;
};

export default makeTemplate;
