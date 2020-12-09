import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import S from '@presentational/calendar/style';
import { setCalendarInfo, loadCalendarTransactions } from '@slice';
import { nowDateMap } from '@presentational/calendar/CalendarUtil';
import CalendarForm from '@presentational/calendar/CalendarForm';
import makeTemplate from '@presentational/calendar/MakeTemplate';

const CalendarContainer = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.calendarTransactions);
  const calendarInfo = useSelector((state) => state.calendarInfo);

  const daysRef = useRef();
  const [date, setDate] = useState(new Date());
  const [state, setState] = useState({
    income: true,
    expenditure: true,
  });

  const updateData = () => {
    setDate(date);
    dispatch(
      loadCalendarTransactions(date.getUTCFullYear(), date.getUTCMonth() + 1)
    );
    dispatch(setCalendarInfo(nowDateMap(date)));
  };

  const onClickPrev = () => {
    date.setUTCMonth(date.getUTCMonth() - 1);
    updateData();
  };

  const onClickNext = () => {
    date.setUTCMonth(date.getUTCMonth() + 1);
    updateData();
  };

  const onClickType = (type) => {
    makeTemplate({ type, calendarInfo, daysRef, transactions });
  };

  useEffect(() => {
    updateData();
  }, []);

  useEffect(() => {
    setState({
      income: true,
      expenditure: true,
    });
    makeTemplate({ calendarInfo, daysRef, transactions });
  }, [transactions]);

  return (
    <S.Main>
      <S.Container>
        <S.Calendar>
          <CalendarForm
            calendarInfo={calendarInfo}
            onClickPrev={onClickPrev}
            onClickNext={onClickNext}
            onClickType={onClickType}
            state={state}
            setState={setState}
          />
          <S.Days ref={daysRef} />
        </S.Calendar>
      </S.Container>
    </S.Main>
  );
};

export default CalendarContainer;
