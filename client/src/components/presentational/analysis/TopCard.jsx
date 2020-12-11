import styled from 'styled-components';

import color from '@public/color';
import icon from '@public/icon';

const TopCardWrapper = styled.div`
  flex: 1 0 auto;
  height: 150px;
  border: 1.5px solid ${color.line};
  background-color: white;
  padding: 0.8rem 1.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;

  &:first-child {
    margin-right: 0.5rem;
  }
  &:last-child {
    margin-left: 0.5rem;
  }
  @media (max-width: 767px) {
    &:first-child {
      margin-right: 0;
    }
    &:last-child {
      margin-top: 0;
      margin-left: 0;
    }
  }
`;

const Content = styled.div``;

const Title = styled.div`
  color: #353535;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Item = styled.div`
  display: grid;
  grid-template-columns: 0.3fr 1.5fr 0.4fr 1fr;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  svg {
    margin-top: 4px;
  }
  &:not(:last-child) {
    border-bottom: 1px solid ${color.line};
  }
`;

const Div = styled.div`
  color: #808080;
`;

const Cost = styled.div`
  color: #808080;
  text-align: right;
`;

const shorten = (description) => {
  if (description.length <= 8) return description;

  return description.substring(0, 8) + '...';
};

const renderData = (transactions) => {
  if (!transactions) return;
  return transactions.map((transaction, index) => {
    const iconNames = ['one', 'two', 'three'];
    return (
      <Item key={'top3' + index}>
        {icon[iconNames[index]]}
        <Div>{shorten(transaction.description)}</Div>
        <Div>{transaction.count + ' 건'}</Div>
        <Cost>{transaction.cost.toLocaleString() + ' 원'}</Cost>
      </Item>
    );
  });
};

const TopCard = ({ title, transactions }) => {
  const list = renderData(transactions);
  return (
    <>
      <TopCardWrapper>
        <Title>{title}</Title>
        <Content>{list}</Content>
      </TopCardWrapper>
    </>
  );
};

export default TopCard;
