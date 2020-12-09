import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import S from '@presentational/calendar/style';
import * as FaIcons from 'react-icons/fa';

import { setCalendarInfo, loadCalendarTransactions } from '@slice';
import { nowDateMap } from '@presentational/calendar/CalendarUtil';
import makeTemplate from '@presentational/calendar/MakeTemplate';

const CalendarContainer = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.calendarTransactions);
  const calendarInfo = useSelector((state) => state.calendarInfo);

  const daysRef = useRef();
  const [date, setDate] = useState(new Date());

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

  useEffect(() => {
    updateData();
  }, []);

  useEffect(() => {
    makeTemplate({ calendarInfo, daysRef, transactions });
  }, [transactions]);

  return (
    <S.Main>
      <S.Container>
        <S.Calendar>
          <S.Month>
            <S.Prev
              onClick={() => {
                onClickPrev();
              }}
            >
              <FaIcons.FaAngleLeft size={50} />
            </S.Prev>
            <S.DateDiv>
              <S.MonthTitle>{calendarInfo.month}월</S.MonthTitle>
              <S.MonthSubTitle>
                - {calendarInfo.year}년 {calendarInfo.month}월 -
              </S.MonthSubTitle>
            </S.DateDiv>
            <S.Next
              onClick={() => {
                onClickNext();
              }}
            >
              <FaIcons.FaAngleRight size={50} />
            </S.Next>
          </S.Month>
          <S.WeekDays>
            <S.WeekDay sunday={true}>Sun</S.WeekDay>
            <S.WeekDay>Mon</S.WeekDay>
            <S.WeekDay>Tue</S.WeekDay>
            <S.WeekDay>Wed</S.WeekDay>
            <S.WeekDay>Thu</S.WeekDay>
            <S.WeekDay>Fri</S.WeekDay>
            <S.WeekDay saturday={true}>Sat</S.WeekDay>
          </S.WeekDays>
          <S.Days ref={daysRef} />
        </S.Calendar>
      </S.Container>
    </S.Main>
  );
};

export default CalendarContainer;
