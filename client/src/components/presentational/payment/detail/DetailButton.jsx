import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const PaymentApp = styled.div`
  display: flex;
  width: 50vw;
  justify-content: center;
  margin-bottom: 15px;
`;

const DetailButton = ({ showAll, showIncome, showExpenditure }) => {
  const classes = useStyles();

  return (
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
  );
};

export default DetailButton;
