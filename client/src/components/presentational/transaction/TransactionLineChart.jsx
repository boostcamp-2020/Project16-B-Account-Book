import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';

const changeTransaction = (transactions) => {
  const transactionWithDateKey = transactions.map((transaction) => {
    return {
      ...transaction,
      day: new Date(Date.parse(transaction.date)).getDate(),
    };
  });

  const transactionLogByDate = new Array(31).fill(0).map((_, i) => i + 1);

  return transactionLogByDate
    .map((date) => {
      const filteredTransaction = transactionWithDateKey.filter(
        (transaction) => transaction.day === date
      );
      if (filteredTransaction[0]) {
        return filteredTransaction.reduce(
          (acc, cur) => {
            if (!acc.name) {
              return { ...acc, name: cur.day, [cur.type]: cur.cost };
            }
            return { ...acc, [cur.type]: acc[cur.type] + cur.cost };
          },
          { 수입: 0, 지출: 0 }
        );
      }
      return 0;
    })
    .filter((e) => e);
};

const TransactionLineChart = ({ currentDateTransactions }) => {
  const transactions = changeTransaction(currentDateTransactions);
  return (
    <LineChart
      width={600}
      height={300}
      data={transactions}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="지출"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="수입" stroke="#82ca9d" />
    </LineChart>
  );
};

export default TransactionLineChart;
