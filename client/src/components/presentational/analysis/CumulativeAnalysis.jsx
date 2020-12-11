import styled from 'styled-components';

import color from '@public/color';

const CumulativeAnalysisWrapper = styled.div`
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
  color: #1cda90;
  font-size: 1.5rem;
`;
const Unit = styled.span`
  color: #1cda90;
  font-size: 1rem;
`;

const calcTotalExpenditure = (transactions) => {
  if (!transactions.length) return 0;

  const total = transactions.reduce((acc, cur) => ({
    cost: acc.cost + cur.cost,
  }));

  return total.cost;
};

const CumulativeAnalysis = ({ date, transactions }) => {
  const month = date.getUTCMonth() + 1;
  const totalExpenditure = calcTotalExpenditure(transactions);
  const averagePerCase =
    totalExpenditure > 0
      ? Math.floor(totalExpenditure / transactions.length / 100) * 100
      : 0;

  return (
    <>
      <CumulativeAnalysisWrapper>
        <Title>일별 누적 분석</Title>
        <Content>
          <Item>
            <Category>{month}월 총 지출액:</Category>
            <Data>
              {totalExpenditure.toLocaleString()}
              <Unit> 원</Unit>
            </Data>
          </Item>
          <Item>
            <Category>건별 평균 결제액 :</Category>
            <Data>
              {averagePerCase.toLocaleString()}
              <Unit> 원</Unit>
            </Data>
          </Item>
          <Item>
            <Category>결제 건수:</Category>
            <Data>
              {transactions.length}
              <Unit> 건</Unit>
            </Data>
          </Item>
        </Content>
      </CumulativeAnalysisWrapper>
    </>
  );
};

export default CumulativeAnalysis;
