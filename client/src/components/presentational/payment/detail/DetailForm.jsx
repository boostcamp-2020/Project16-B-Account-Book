import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';

import { Animation } from '@devexpress/dx-react-chart';

const PaymentApp = styled.div`
  display: flex;
  justify-content: center;
  width: 55vw;
  margin-bottom: 15px;
`;

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const DetailForm = ({
  title,
  transactions,
  showAll,
  showIncome,
  showExpenditure,
}) => {
  const classes = useStyles();

  return (
    <>
      <PaymentApp>
        <Button
          variant="outlined"
          color="default"
          className={classes.margin}
          onClick={() => {
            showAll();
          }}
        >
          ALL
        </Button>

        <Button
          variant="outlined"
          color="primary"
          className={classes.margin}
          onClick={() => {
            showIncome();
          }}
        >
          수입
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          className={classes.margin}
          onClick={() => {
            showExpenditure();
          }}
        >
          지출
        </Button>
      </PaymentApp>

      <Paper>
        <Chart data={transactions}>
          <ArgumentAxis />
          <ValueAxis max={20} />

          <BarSeries
            valueField="cost"
            argumentField="category"
            color="#f50057"
          />
          <Title text={title} />
          <Animation />
        </Chart>
      </Paper>
    </>
  );
};

export default DetailForm;
