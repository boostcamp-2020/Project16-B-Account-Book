import styled from 'styled-components';

import color from '@public/color';

const MonthlyAnalysisWrapper = styled.div`
  border: 1.5px solid ${color.line};
  background-color: white;
  padding-top: 0.6rem;
  padding-left: 1rem;
  margin-left: 1rem;
  flex-grow: 100;
  @media (max-width: 767px) {
    max-width: 18rem;
    margin-top: 1rem;
    margin-left: 0;
    margin-right: 1rem;
  }
`;
const Title = styled.div`
  color: #353535;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;
const Content = styled.div``;
const Item = styled.div`
  margin-bottom: 1rem;
`;
const Category = styled.div`
  color: #808080;
`;
const Data = styled.span`
  color: #ffc41f;
  font-size: 1.5rem;
`;
const Unit = styled.span`
  color: #ffc41f;
  font-size: 1rem;
`;

const getLastNElements = (arr, n) => arr.slice(arr.length - n);

const getCostAvg = (transactions, months) => {
  return (
    Math.floor(
      transactions.reduce((acc, cur) => {
        return acc + cur['월별'];
      }, 0) /
        months /
        1000
    ) * 1000
  );
};

const MonthlyAnalysis = ({ title, transactions }) => {
  const last3Months = getLastNElements(transactions, 3);
  const last6Months = getLastNElements(transactions, 6);
  const last12Months = getLastNElements(transactions, 12);

  return (
    <>
      <MonthlyAnalysisWrapper>
        <Title>{title}</Title>
        <Content>
          <Item>
            <Category>3개월 평균 지출:</Category>
            <Data>
              {getCostAvg(last3Months, 3).toLocaleString()}
              <Unit> 원</Unit>
            </Data>
          </Item>
          <Item>
            <Category>6개월 평균 지출 :</Category>
            <Data>
              {getCostAvg(last6Months, 6).toLocaleString()}
              <Unit> 원</Unit>
            </Data>
          </Item>
          <Item>
            <Category>12개월 평균 지출:</Category>
            <Data>
              {getCostAvg(last12Months, 12).toLocaleString()}
              <Unit> 원</Unit>
            </Data>
          </Item>
        </Content>
      </MonthlyAnalysisWrapper>
    </>
  );
};

export default MonthlyAnalysis;
