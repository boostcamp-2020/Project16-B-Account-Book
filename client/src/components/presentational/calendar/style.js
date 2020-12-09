import styled, { css } from 'styled-components';

export default {
  Main: styled.div`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Noto Sans KR', sans-serif;
    }

    html {
      font-size: 62.5%;
    }
  `,

  Container: styled.div`
    width: 100%;
    height: 60rem;
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  Calendar: styled.div`
    width: 45rem;
    height: 58rem;
    background-color: #fbfbfb;
    border: 0.5px solid rgba(0, 0, 0, 0.05);
    color: #393e46;
    box-shadow: 15px 15px 2px 1px rgba(236, 236, 236, 1);
  `,

  Month: styled.div`
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
  `,

  Prev: styled.div`
    font-size: 2.5rem;
    cursor: pointer;
  `,

  DateDiv: styled.div`
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
  `,

  MonthTitle: styled.div`
    font-size: 3rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    margin-bottom: 1rem;

    p {
      font-size: 1.2rem;
    }
  `,

  MonthSubTitle: styled.div`
    font-size: 1.2rem;
  `,

  WeekDays: styled.div`
    width: 100%;
    height: 4rem;
    padding: 0 0.4rem;
    display: flex;
    align-items: center;
    margin-top: 0;
  `,

  WeekDay: styled.div`
    font-size: 1.5rem;
    font-weight: 500;
    letter-spacing: 0.1rem;
    width: calc(44.2rem / 7);
    display: flex;
    justify-content: center;
    align-items: center;

    ${(props) => {
      if (props.sunday) {
        return css`
          color: #ff616a;
        `;
      }

      if (props.saturday) {
        return css`
          color: #4a74fb;
        `;
      }
    }}
  `,

  Days: styled.div`
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
      color: #4a74fb;
    }

    .expenditure {
      color: #ff616a;
    }

    .transaction:hover:not(.today) {
      border: 0.1rem solid #bbbbbb;
      cursor: pointer;
    }
  `,

  Next: styled.div`
    font-size: 2.5rem;
    cursor: pointer;
  `,
};
