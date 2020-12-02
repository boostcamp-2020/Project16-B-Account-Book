import {
  PieChart,
  Pie,
  Legend,
  Cell,
  Label,
  ResponsiveContainer,
} from 'recharts';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import styled from 'styled-components';

const colors = scaleOrdinal(schemeCategory10).range();

const renderLabelContent = (props) => {
  const { value, x, y, midAngle } = props;
  const newValue = Number(value).toLocaleString() || value;
  return (
    <g
      transform={`translate(${x}, ${y})`}
      textAnchor={midAngle < -90 || midAngle >= 90 ? 'end' : 'start'}
    >
      <text>{`${props.name}`}</text>
      <text x={0} y={20}>{`가격: ${newValue}`}</text>
    </g>
  );
};

const parseData = (transactions) => {
  return transactions
    .reduce((acc, cur) => {
      const index = acc.findIndex((item) => item.name === cur.category);
      if (acc[index]) {
        acc[index].value += cur.cost;
        return acc;
      }
      return [...acc, { name: cur.category, value: cur.cost }];
    }, [])
    .sort((a, b) => {
      if (a.cost > b.cost) {
        return 1;
      }
      if (a.cost < b.cost) {
        return -1;
      }
      return 1;
    });
};

const Box = styled.div`
  width: 45vw;
  height: 45vw;
  min-width: 250px;
  min-height: 250px;

  .recharts-legend-wrapper {
    bottom: 10vw !important;
  }
  .recharts-legend-item {
    font-size: 2.5vw;
  }
`;

const DashboardPieChart = ({ transactions }) => {
  const data = parseData(transactions);
  return (
    <Box>
      <ResponsiveContainer>
        <PieChart>
          <Legend paylodUniqBy />
          <Pie
            data={data}
            dataKey="value"
            cy="40%"
            startAngle={180}
            endAngle={-180}
            innerRadius="45%"
            outerRadius="55%"
            label={renderLabelContent}
            paddingAngle={5}
            isAnimationActive={true}
          >
            {data.map((entry, index) => (
              <Cell key={`slice-${index}`} fill={colors[index % 10]} />
            ))}
            <Label width={50} fontSize="4vw" position="center">
              지출
            </Label>
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default DashboardPieChart;
