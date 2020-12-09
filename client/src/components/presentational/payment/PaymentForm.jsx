import styled from 'styled-components';

import PaymentItem from '@presentational/payment/PaymentItem';
import AddButton from '@presentational/payment/AddButton';

const PaymentApp = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'Noto Sans KR', sans-serif;
`;

const PaymentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100rem;
`;

const Payments = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  list-style: none;
`;

const PaymentForm = ({ payments, addClick, cardDelete, cardUpdate }) => {
  return (
    <PaymentApp>
      <PaymentWrapper>
        <AddButton payments={payments} addClick={addClick} />

        {payments !== 'error' && (
          <Payments>
            {payments.map((item, index) => (
              <PaymentItem
                key={'payment' + index}
                item={item}
                cardDelete={cardDelete}
                cardUpdate={cardUpdate}
              />
            ))}
          </Payments>
        )}

        {(payments === 'error' || payments.length === 0) && (
          <h2>아직 등록된 결제수단이 없습니다!</h2>
        )}
      </PaymentWrapper>
    </PaymentApp>
  );
};

export default PaymentForm;
