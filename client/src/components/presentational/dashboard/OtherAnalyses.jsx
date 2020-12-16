import styled from 'styled-components';

import CategorySection from './CategorySection';
import ComparisonAnaysisSection from './ComparisonAnaysisSection';

const Section = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 90vw;

  @media (max-width: 967px) {
    transform: translate(-0vw, 8%);
  }
  @media (max-width: 768px) {
    transform: scale(0.5) translate(-25vw, -36%);
  }
`;
const OtherAnalyses = ({ transactions, transactionByCategory }) => {
  return (
    <>
      <Section>
        <ComparisonAnaysisSection transactions={transactions} />
        <CategorySection transactions={transactionByCategory} />
      </Section>
    </>
  );
};

export default OtherAnalyses;
