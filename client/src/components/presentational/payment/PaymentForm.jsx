import styled from 'styled-components';

import PaymentItem from '@presentational/payment/PaymentItem';
import AddButton from '@presentational/payment/AddButton';

const PaymentApp = styled.div`
  display: flex;
  justify-content: center;
`;

const PaymentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 80rem;
`;

const Payments = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  list-style: none;
`;

const PaymentForm = ({ payments, addClick }) => {
  return (
    <PaymentApp>
      <PaymentWrapper>
        <AddButton payments={payments} addClick={addClick} />

        {payments !== 'error' && (
          <Payments>
            {payments.map((item, index) => (
              <PaymentItem key={'payment' + index} item={item} />
            ))}
          </Payments>
        )}

        {payments === 'error' && <h2>아직 등록된 결제수단이 없습니다!</h2>}
      </PaymentWrapper>
    </PaymentApp>
  );
};

export default PaymentForm;
