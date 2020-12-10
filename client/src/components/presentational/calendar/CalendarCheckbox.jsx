import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { blue, pink } from '@material-ui/core/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import styled from 'styled-components';

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-right: 1.3rem;
  margin-top: 0.7rem;
  margin-bottom: 0;
`;

const BlueCheckbox = withStyles({
  root: {
    color: blue[400],
    '&$checked': {
      color: '#4a74fb',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const PinkCheckbox = withStyles({
  root: {
    color: pink[400],
    '&$checked': {
      color: '#ff616a',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const CalendarCheckbox = ({ onClickType, state, setState }) => {
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  useEffect(() => {
    if (state.income && state.expenditure) onClickType('all');
    if (!state.income && !state.expenditure) onClickType('nothing');
    if (state.income && !state.expenditure) onClickType('수입');
    if (!state.income && state.expenditure) onClickType('지출');
  }, [state]);

  return (
    <CheckboxContainer>
      <FormControlLabel
        control={
          <BlueCheckbox
            checked={state.income}
            onChange={handleChange}
            name="income"
          />
        }
        label="수입"
      />
      <FormControlLabel
        control={
          <PinkCheckbox
            checked={state.expenditure}
            onChange={handleChange}
            name="expenditure"
          />
        }
        label="지출"
      />
    </CheckboxContainer>
  );
};

export default CalendarCheckbox;
