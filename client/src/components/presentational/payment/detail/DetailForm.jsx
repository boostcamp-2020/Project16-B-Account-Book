import styled from 'styled-components';
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

const Paper = styled.div`
  border: 1px solid #eeeeef;
  padding: 5px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
`;

const PaymentDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50vw;

  @media (max-width: 767px) {
    width: auto;
  }
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

  @media (max-width: 767px) {
    margin-left: 0;
    width: auto;
  }
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
