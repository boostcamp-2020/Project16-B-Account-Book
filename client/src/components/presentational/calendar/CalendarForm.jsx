import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

import * as FaIcons from 'react-icons/fa';

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
  background-color: #eeeeee;
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
    font-weight: 400;
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
    font-weight: 400;
    letter-spacing: 0.1rem;
    width: calc(44.2rem / 7);
    display: flex;
    justify-content: center;
    align-items: center;
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
    margin-bottom: 20px;
    width: calc(40.2rem / 7);
    height: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;

    transition: background-color 0.2s;
  }

  .today {
    color: #00adb5;
    font-weight: 600;
  }

  .prev-date,
  .next-date {
    opacity: 0.3;
  }

  div:hover:not(.today) {
    border: 0.1rem solid #bbbbbb;
    cursor: pointer;
  }
`;

const Next = styled.div`
  font-size: 2.5rem;
  cursor: pointer;
`;

const makeTemplate = ({ calendarInfo, daysRef }) => {
  const lastDay = new Date(calendarInfo.year, calendarInfo.month, 0).getDate();
  const firstDayIndex = calendarInfo.day;
  const prevLastDay = new Date(
    calendarInfo.year,
    calendarInfo.month - 1,
    0
  ).getDate();
  const lastDayIndex = new Date(
    calendarInfo.year,
    calendarInfo.month,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  let days = '';

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      calendarInfo.date === i &&
      calendarInfo.month === new Date().getMonth() + 1
    ) {
      days += `<div class="today">${i}</div>`;

      continue;
    }
    days += `<div>${i}</div>`;
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
  }

  daysRef.current.innerHTML = days;
};

const CalendarForm = ({ calendarInfo }) => {
  const daysRef = useRef();

  useEffect(() => {
    makeTemplate({ calendarInfo, daysRef });
  }, [calendarInfo]);

  const onClickPrev = () => {
    // TODO: 이전 달로 넘어가게 이벤트 구현
    alert('이전 달!');
  };

  const onClickNext = () => {
    // TODO: 다음 달로 넘어가게 이벤트 구현
    alert('다음 달!');
  };

  return (
    <Main>
      <Container>
        <Calendar>
          <Month>
            <Prev onClick={onClickPrev}>
              <FaIcons.FaAngleLeft size={30} />
            </Prev>
            <DateDiv>
              <h1>{calendarInfo.month}월</h1>
              <p>
                - {calendarInfo.year}년 {calendarInfo.month}월{' '}
                {calendarInfo.date}일 -
              </p>
            </DateDiv>
            <Next onClick={onClickNext}>
              <FaIcons.FaAngleRight size={30} />
            </Next>
          </Month>
          <WeekDays>
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </WeekDays>

          <Days ref={daysRef}></Days>
        </Calendar>
      </Container>
    </Main>
  );
};

export default CalendarForm;
