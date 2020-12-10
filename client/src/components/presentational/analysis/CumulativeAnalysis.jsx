import styled from 'styled-components';

const calctotalExpenditure = (transactions) => {
  if (!transactions.length) return 0;

  const total = transactions.reduce((acc, cur) => ({
    cost: acc.cost + cur.cost,
  }));

  return total.cost;
};

const CumulativeAnalysis = ({ date, transactions }) => {
  const month = date.getUTCMonth() + 1;
  const totalExpenditure = calctotalExpenditure(transactions);
  const averagePerCase =
    totalExpenditure > 0
      ? Math.floor(totalExpenditure / transactions.length / 100) * 100
      : 0;

  return (
    <>
      <div>
        {month}월 총 지출액: {totalExpenditure}
      </div>
      <div>
        {month}월 건별 평균 결제액 : {averagePerCase}
      </div>
    </>
  );
};

export default CumulativeAnalysis;
