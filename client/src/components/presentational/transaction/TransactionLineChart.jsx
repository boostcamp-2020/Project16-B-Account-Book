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

const parseTransaction = (transactions) => {
  return transactions.reduce((acc, cur) => {
    const state = acc.find((ac) => ac.name === cur.userId);
    const day = cur.date.split(/-|T/)[2];
    if (state) {
      const existingDate = state.data.find((date) => date.category == day);
      if (existingDate) {
        existingDate.value += cur.cost;
        return acc;
      }
      state.data = [...state.data, { ...cur, category: day, value: cur.cost }];
      return acc;
    }
    return [
      ...acc,
      { name: cur.userId, data: [{ ...cur, category: day, value: cur.cost }] },
    ];
  }, []);
};

const TransactionLineChart = ({ currentDateTransactions }) => {
  const formattedTransaction = parseTransaction(currentDateTransactions);
  return (
    <div className="line-charts">
      <div className="line-chart-wrapper">
        <LineChart width={600} height={300}>
          <XAxis
            dataKey="category"
            type="category"
            allowDuplicatedCategory={false}
          />
          <YAxis dataKey="value" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          {formattedTransaction.map((s) => (
            <Line dataKey="value" data={s.data} name={s.name} key={s.name} />
          ))}
        </LineChart>
      </div>
    </div>
  );
};

export default TransactionLineChart;
