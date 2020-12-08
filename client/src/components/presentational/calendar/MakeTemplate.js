import { Variable } from './CalendarUtil';

const makeTemplate = ({ calendarInfo, daysRef, transactions }) => {
  const { lastDay, firstDayIndex, prevLastDay, nextDays } = Variable({
    calendarInfo,
  });
  let days = '';

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="transaction"><div class="prev-date">${
      prevLastDay - x + 1
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

    if (expenditure === 0) days += `<div class="no-expenditure">`;
    else days += `<div class="expenditure">`;
    days += `- ${expenditure.toLocaleString()}원</div>`;

    if (income === 0) days += `<div class="no-income">`;
    else days += `<div class="income">`;
    days += `+ ${income.toLocaleString()}원</div>`;

    days += `</div>`;
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
