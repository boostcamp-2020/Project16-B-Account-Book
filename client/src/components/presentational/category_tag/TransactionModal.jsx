import styled from 'styled-components';

import Overlay from '../accountbook/Overlay';
import color from '@public/color';

const ModalWrapper = styled.div`
  position: fixed;
  top: 8rem;
  left: 10rem;
  right: 0;
  width: 30rem;
  min-height: 10rem;
  max-height: 20rem;
  margin: auto;
  z-index: 13;
  background-color: white;
  padding: 2rem;
  overflow-y: scroll;
  color: ${color.fontLightBold};

  box-shadow: ${color.boxShadow};
`;

const Title = styled.div`
  font-size: 20px;
  margin-bottom: 1rem;
  border-radius: 200px;
  background-color: salmon;
  width: fit-content;
  padding: 0 0.7rem;
  color: white;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 1fr 0.5fr;
  border-bottom: 1px solid ${color.line};
  div {
    font-weight: bold;
  }
`;

const TransactionItem = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 1fr 0.5fr;
  &:not(:last-child) {
    border-bottom: 1px solid ${color.line};
  }
  padding: 0.2rem 0;
`;
const Description = styled.div``;
const Cost = styled.div``;
const Date = styled.div``;

const TransactionModal = ({ filterOption, setTransactionModal, list }) => {
  const renderedList = list.map((transaction, index) => {
    return (
      <TransactionItem key={'transaction' + index}>
        <Description>
          {transaction.description || transaction.category}
        </Description>
        <Cost>{transaction.cost.toLocaleString()} 원</Cost>
        <Date>{transaction.date.split('T')[0]}</Date>
      </TransactionItem>
    );
  });

  return (
    <>
      <Overlay setModal={setTransactionModal} />
      <ModalWrapper>
        <Title>{filterOption}</Title>
        <Header>
          <div>항목</div>
          <div>비용</div>
          <div>날짜</div>
        </Header>
        {renderedList}
      </ModalWrapper>
    </>
  );
};

export default TransactionModal;
