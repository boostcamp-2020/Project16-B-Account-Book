import styled from 'styled-components';

import PaymentItem from '@presentational/payment/PaymentItem';

const PaymentApp = styled.div`
  display: flex;
  justify-content: center;
`;

const Payments = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  list-style: none;
  max-width: 80rem;
`;

const PaymentForm = ({ payments }) => {
  return (
    <PaymentApp>
      {payments !== 'error' && (
        <Payments>
          {payments.map((item, index) => (
            <PaymentItem key={'payment' + index} item={item} />
          ))}
        </Payments>
      )}

      {payments === 'error' && <h2>아직 등록된 결제수단이 없습니다!</h2>}
    </PaymentApp>
  );
};

export default PaymentForm;
