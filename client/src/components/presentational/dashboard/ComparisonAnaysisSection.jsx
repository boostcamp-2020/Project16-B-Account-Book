import Category from './Category';
import 돈 from '@public/img/돈.jpeg';
import 지출 from '@public/img/지출.jpg';

const ComparisonAnaysisSection = ({ transactions }) => {
  let thisMonthTotalExpense = 0;
  let lastMonthTotalExpense = 0;
  const currentDate = new Date();
  const currentMonth = currentDate.getUTCMonth() + 1;
  const currentYear = currentDate.getUTCFullYear();

  transactions.forEach((transaction) => {
    if (transaction.type === '수입') {
      return;
    }
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

  const getComparisonText = () => {
    const difference = thisMonthTotalExpense - lastMonthTotalExpense;
    if (difference < 0) {
      return `지난 달에 비해 ${(
        (1 - thisMonthTotalExpense / lastMonthTotalExpense) *
        100
      ).toFixed(2)}% 적게 쓰고 있습니다`;
    }
    return `지난 달에 비해 ${(
      (thisMonthTotalExpense / lastMonthTotalExpense - 1) *
      100
    ).toFixed(2)}% 더 쓰고 있습니다`;
  };

  const comparisonText = getComparisonText();

  return (
    <>
      <Category image={지출} text={comparisonText} />
      <Category
        image={돈}
        text={`지난 달에는 ${lastMonthTotalExpense.toLocaleString()}원 썼습니다`}
      />
    </>
  );
};

export default ComparisonAnaysisSection;
