import styled from 'styled-components';
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
} from 'recharts';

const parseTransactions = (transactions) => {
  if (!transactions.length) return;

  const data = [];
  const sorted = transactions.sort(
    (a, b) => a.parsedDate.date - b.parsedDate.date
  );

  let prevDate = 0;
  let prevCost = 0;
  sorted.forEach((t) => {
    if (t.parsedDate.date === prevDate) {
      data[data.length - 1].uv += t.cost;
      prevCost = data[data.length - 1].uv;
      return;
    }
    data.push({
      name: t.parsedDate.date,
      uv: t.cost + prevCost,
    });
    prevDate = t.parsedDate.date;
    prevCost = data[data.length - 1].uv;
  });

  return data;
};

const CumulativeExpenditure = ({ transactions }) => {
  const data = parseTransactions(transactions);

  return (
    <>
      <AreaChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="uv"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </>
  );
};

export default CumulativeExpenditure;
