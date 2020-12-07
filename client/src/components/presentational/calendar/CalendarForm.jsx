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
  background-color: #12121f;
  color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Calendar = styled.div`
  width: 45rem;
  height: 52rem;
  background-color: #222227;
  box-shadow: 0.5rem 3rem rgba(0, 0, 0, 0.4);
`;

const Month = styled.div`
  width: 100%;
  height: 12rem;
  background-color: #167e56;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  text-align: center;
  text-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.5); // 글씨 그림자
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
    width: calc(44.2rem / 7); // 요일 간격
    display: flex;
    justify-content: center;
    align-items: center;
    text-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.5);
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
    width: calc(40.2rem / 7);
    height: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.5);
    transition: background-color 0.2s;
  }

  div:hover:not(Today) {
    // 회색 네모
    background-color: #262626;
    border: 0.2rem solid #777;
    cursor: pointer;
  }

  today {
    background-color: #167e56;
  }
`;

const PrevDate = styled.div`
  opacity: 0.5;
`;

const NextDate = styled.div`
  opacity: 0.5;
`;

const Today = styled.div`
  background-color: #167e56;
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

  for (let x = firstDayIndex + 1; x > 0; x--) {
    days += `<div>${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      calendarInfo.date === i &&
      calendarInfo.month === new Date().getMonth() + 1
    ) {
      days += `<div today="today">${i}</div>`;
      continue;
    }
    days += `<div>${i}</div>`;
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div>${j}</div>`;
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
                🙈 {calendarInfo.year}년 {calendarInfo.month}월{' '}
                {calendarInfo.date}일 🙈
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
