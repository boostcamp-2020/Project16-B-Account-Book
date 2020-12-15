import styled from 'styled-components';
import {
  ResponsiveContainer,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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
const AnnualExpenditure = ({ title, transactions }) => {
  return (
    <>
      <ChartWrapper>
        <ChartTitle>{title}</ChartTitle>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={transactions}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis unit="월" dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis unit="만 원" tick={{ fontSize: 10 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="월별" fill="#FFC41F" />
          </BarChart>
        </ResponsiveContainer>
      </ChartWrapper>
    </>
  );
};

export default AnnualExpenditure;
