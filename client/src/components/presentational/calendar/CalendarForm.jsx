import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCalendarInfo, loadCalendarTransactions } from '@slice';
import { findDate } from '@presentational/calendar/CalendarUtil';

import styled from 'styled-components';
import * as FaIcons from 'react-icons/fa';

import makeTemplate from './MakeTemplate';

const Main = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
  }

  html {
    font-size: 62.5%;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 60rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Calendar = styled.div`
  width: 45rem;
  height: 52rem;
  background-color: #fbfbfb;
  border-left: 0.3px solid rgba(0, 0, 0, 0.05);
  border-bottom: 0.3px solid rgba(0, 0, 0, 0.05);
  color: #393e46;
  box-shadow: 0.8rem 0.8rem rgba(0, 0, 0, 0.2);
`;

const Month = styled.div`
  width: 100%;
  height: 12rem;
  background-color: #00adb5;
  color: #eeeeee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  text-align: center;
  text-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.2);
`;

const Prev = styled.div`
  font-size: 2.5rem;
  cursor: pointer;
`;

const DateDiv = styled.div`
  h1 {
    font-size: 3rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
  }
`;

const WeekDays = styled.div`
  width: 100%;
  height: 5rem;
  padding: 0 0.4rem;
  display: flex;
  align-items: center;

  div {
    font-size: 1.5rem;
    font-weight: 500;
    letter-spacing: 0.1rem;
    width: calc(44.2rem / 7);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .sunday {
    color: #ff616a;
  }

  .saturday {
    color: #4a74fb;
  }
`;

const Days = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 0.2rem;

  div {
    font-size: 1.4rem;
    margin: 0.3rem;
    padding-bottom: 50px;
    width: calc(40.2rem / 7);
    height: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    transition: background-color 0.2s;
  }

  .transaction {
    display: flex;
    flex-direction: column;
    padding: 0;
  }

  .today {
    background-color: #eeeeee;
    color: #00adb5;
    font-weight: 500;
  }

  .prev-date,
  .next-date {
    opacity: 0.3;
  }

  .income,
  .expenditure,
  .no-income,
  .no-expenditure {
    font-size: 0.8rem;
    margin: 0;
    padding: 0;
  }

  .no-income,
  .no-expenditure {
    visibility: hidden;
  }

  .income {
    color: #ff616a;
  }

  .expenditure {
    color: #4a74fb;
  }

  .transaction:hover:not(.today) {
    border: 0.1rem solid #bbbbbb;
    cursor: pointer;
  }
`;

const Next = styled.div`
  font-size: 2.5rem;
  cursor: pointer;
`;

const CalendarForm = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.calendarTransactions);
  const calendarInfo = useSelector((state) => state.calendarInfo);

  const [nowYear, setYear] = useState(new Date().getUTCFullYear());
  const [nowMonth, setMonth] = useState(new Date().getUTCMonth() + 1);

  const onClickPrev = (nowYear, nowMonth) => {
    const { year, month } = findDate({ type: 'before', nowYear, nowMonth });
    setYear(year);
    setMonth(month);

    const prev = new Date(year, month);
    console.log(prev);

    const map = {
      year,
      month,
      date: prev.getUTCDate(),
      day: prev.getUTCDay(),
    };

    dispatch(loadCalendarTransactions(year, month));
    dispatch(setCalendarInfo(map));
    makeTemplate({ calendarInfo, daysRef, transactions });
  };

  const onClickNext = (nowYear, nowMonth) => {
    const { year, month } = findDate({ type: 'next', nowYear, nowMonth });
    setYear(year);
    setMonth(month);

    const next = new Date(year, month);
    console.log(next);

    const map = {
      year: next.getUTCFullYear(),
      month: next.getUTCMonth() + 1,
      date: next.getUTCDate(),
      day: next.getUTCDay(),
    };

    dispatch(loadCalendarTransactions(year, month));
    dispatch(setCalendarInfo(map));
    makeTemplate({ calendarInfo, daysRef, transactions });
  };

  useEffect(() => {
    dispatch(loadCalendarTransactions(nowYear, nowMonth));
    makeTemplate({ calendarInfo, daysRef, transactions });
  }, []);

  useEffect(() => {
    makeTemplate({ calendarInfo, daysRef, transactions });
  }, [transactions, calendarInfo]); // 2020 12

  const daysRef = useRef();

  return (
    <Main>
      <Container>
        <Calendar>
          <Month>
            <Prev
              onClick={() => {
                onClickPrev(calendarInfo.year, calendarInfo.month);
              }}
            >
              <FaIcons.FaAngleLeft size={30} />
            </Prev>
            <DateDiv>
              <h1>{calendarInfo.month}월</h1>
              <p>
                - {calendarInfo.year}년 {calendarInfo.month}월 -
              </p>
            </DateDiv>
            <Next
              onClick={() => {
                onClickNext(calendarInfo.year, calendarInfo.month);
              }}
            >
              <FaIcons.FaAngleRight size={30} />
            </Next>
          </Month>
          <WeekDays>
            <div className="sunday">Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div className="saturday">Sat</div>
          </WeekDays>

          <Days ref={daysRef}></Days>
        </Calendar>
      </Container>
    </Main>
  );
};

export default CalendarForm;
