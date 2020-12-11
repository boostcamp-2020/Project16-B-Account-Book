const TypeTemplate = (type, expenditure, income) => {
  let days = '';

  switch (type) {
    case 'all':
      if (expenditure === 0) days += `<div class="no-expenditure">`;
      else days += `<div class="expenditure">`;
      days += `- ${expenditure.toLocaleString()}원</div>`;

      if (income === 0) days += `<div class="no-income">`;
      else days += `<div class="income">`;
      days += `+ ${income.toLocaleString()}원</div>`;

      days += `</div>`;
      break;
    case '수입':
      if (income === 0) days += `<div class="no-income">`;
      else days += `<div class="income">`;
      days += `+ ${income.toLocaleString()}원</div>`;

      days += `<div class="no-expenditure">`;
      days += `- ${expenditure.toLocaleString()}원</div>`;

      days += `</div>`;
      break;
    case '지출':
      if (expenditure === 0) days += `<div class="no-expenditure">`;
      else days += `<div class="expenditure">`;
      days += `- ${expenditure.toLocaleString()}원</div>`;

      days += `<div class="no-income">`;
      days += `+ ${income.toLocaleString()}원</div>`;

      days += `</div>`;
      break;
    case 'nothing':
      days += `<div class="no-expenditure">`;
      days += `- ${expenditure.toLocaleString()}원</div>`;
      days += `<div class="no-income">`;
      days += `+ ${income.toLocaleString()}원</div>`;
      days += `</div>`;
      break;
  }

  return days;
};

export default TypeTemplate;
