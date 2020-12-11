import styled from 'styled-components';
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
} from 'recharts';

import color from '@public/color';

const ChartWrapper = styled.div`
  border: 1.5px solid ${color.line};
  background-color: white;
  padding: 0.6rem 1rem;
  width: 38rem;
  height: fit-content;
`;

const ChartTitle = styled.div`
  color: #353535;
  font-size: 1rem;
  font-weight: bold;
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
`;

const parseTransactions = (transactions) => {
  if (!transactions.length) return [];

  const data = [];
  const sorted = transactions.sort(
    (a, b) => a.parsedDate.date - b.parsedDate.date
  );

  let prevDate = 0;
  let prevCost = 0;
  sorted.forEach((t) => {
    if (t.parsedDate.date === prevDate) {
      data[data.length - 1].cost += t.cost;
      prevCost = data[data.length - 1].cost;
      return;
    }
    data.push({
      date: t.parsedDate.date,
      cost: t.cost + prevCost,
    });
    prevDate = t.parsedDate.date;
    prevCost = data[data.length - 1].cost;
  });

  return data.map((t) => ({ ...t, cost: t.cost / 10000, date: t.date + '일' }));
};

const CumulativeExpenditure = ({ transactions }) => {
  const data = parseTransactions(transactions);

  return (
    <>
      <ChartWrapper>
        <ChartTitle>일별 누적 지출</ChartTitle>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#84a6d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#84a6d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis unit="만원" tick={{ fontSize: 10 }} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="cost"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorCost)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartWrapper>
    </>
  );
};

export default CumulativeExpenditure;
