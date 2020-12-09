import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

import DetailButton from './DetailButton';
import DetailDropdown from './DetailDropdown';

const PaymentDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50vw;
  font-family: 'Noto Sans KR', sans-serif;
`;

const NoContents = styled.div`
  display: flex;
  width: 50vw;
  justify-content: center;
  font-size: 1rem;
  margin-top: 20px;
`;

const GraphDetail = styled.div`
  margin-left: 10%;
  width: 40vw;
`;

const DetailForm = ({
  color,
  title,
  transactions,
  showAll,
  showIncome,
  showExpenditure,
  setYear,
  setMonth,
}) => {
  return (
    <PaymentDetail>
      <DetailDropdown setYear={setYear} setMonth={setMonth} />
      <DetailButton
        showAll={showAll}
        showIncome={showIncome}
        showExpenditure={showExpenditure}
      />

      {transactions.length === 1 ? (
        <NoContents>요청하신 카드의 사용 내역이 존재하지 않습니다.</NoContents>
      ) : (
        <GraphDetail>
          <Paper>
            <Chart data={transactions}>
              <ArgumentAxis />
              <ValueAxis max={20} />
              <BarSeries
                valueField="cost"
                argumentField="_id"
                color={color}
                barWidth="0.3"
              />
              <Title text={title} />
              <Animation />
            </Chart>
          </Paper>
        </GraphDetail>
      )}
    </PaymentDetail>
  );
};

export default DetailForm;
