import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CalendarForm from '@presentational/calendar/CalendarForm';
import { loadPayment } from '@slice';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const CalendarContainer = () => {
  const dispatch = useDispatch();
  const calendarInfo = useSelector((state) => state.calendarInfo);

  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <>
      <CalendarForm calendarInfo={calendarInfo} />
    </>
  );
};

export default CalendarContainer;
