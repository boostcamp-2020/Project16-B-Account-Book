import Category from './Category';
import squirrel from '@public/img/squirrel.jpeg';

const ComparisonAnaysisSection = ({ transactions }) => {
  let thisMonthTotalExpense = 0;
  let lastMonthTotalExpense = 0;
  const currentDate = new Date();
  const currentMonth = currentDate.getUTCMonth() + 1;
  const currentYear = currentDate.getUTCFullYear();

  transactions.forEach((transaction) => {
    const [transactionYear, transactionMonth] = transaction?.date.split('-');
    const transactionYearNumberFormat = Number(transactionYear);
    const transactionMonthNumberFormat = Number(transactionMonth);
    if (
      transactionYearNumberFormat === currentYear &&
      transactionMonthNumberFormat === currentMonth
    ) {
      thisMonthTotalExpense += transaction.cost;
      return;
    }
    let comparedYear = currentYear;
    let comparedMonth = currentMonth - 1;
    if (currentMonth == 1) {
      comparedMonth = 12;
      comparedYear -= 1;
    }
    if (
      transactionYearNumberFormat === comparedYear &&
      transactionMonthNumberFormat === comparedMonth
    ) {
      lastMonthTotalExpense += transaction.cost;
    }
  });

  return (
    <>
      <Category
        image={squirrel}
        text={`지난 달에 비해 ${(
          thisMonthTotalExpense / lastMonthTotalExpense
        ).toFixed(2)}% 쓰고 있습니다`}
      />
      <Category
        image={squirrel}
        text={`지난 달에는 ${lastMonthTotalExpense}만원 썼습니다`}
      />
    </>
  );
};

export default ComparisonAnaysisSection;
