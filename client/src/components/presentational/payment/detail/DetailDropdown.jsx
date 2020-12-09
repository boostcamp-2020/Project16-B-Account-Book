import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import setDateList from './SetDateList';

const DateList = setDateList();

const PaymentApp = styled.div`
  display: flex;
  width: 50vw;
  justify-content: center;
  margin-bottom: 15px;
  font-family: 'Noto Sans KR', sans-serif;
`;

const DetailDropdown = ({ setYear, setMonth }) => {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 140,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const classes = useStyles();
  const [date, setDate] = React.useState('');

  const handleChange = (event) => {
    setDate(event.target.value);
    setYear(event.target.value.year);
    setMonth(event.target.value.month);
  };

  return (
    <PaymentApp>
      <FormControl className={classes.formControl}>
        <InputLabel id="select-autowidth-label">카드 사용 년/월</InputLabel>
        <Select
          labelId="select-autowidth-label"
          id="select-autowidth"
          value={date}
          onChange={handleChange}
          autoWidth
        >
          {DateList.map((item) => {
            return (
              <MenuItem key={uuid()} value={item}>
                {item.title}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </PaymentApp>
  );
};

export default DetailDropdown;
