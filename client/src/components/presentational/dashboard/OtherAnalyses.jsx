import styled from 'styled-components';

import CategorySection from './CategorySection';
import ComparisonAnaysisSection from './ComparisonAnaysisSection';

const Section = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 90vw;
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
