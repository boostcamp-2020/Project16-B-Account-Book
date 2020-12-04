import React from 'react';
import styled from 'styled-components';

import PaymentDetailContainer from '../components/containers/PaymentDetailContainer';

const PaymentApp = styled.div`
  display: flex;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  width: 50vw;
  margin-bottom: 20px;
`;

const PaymentDetailPage = ({ match }) => {
  return (
    <>
      <PaymentApp>💳 {match.params.id} 💳 카드 사용 내역</PaymentApp>

      <PaymentDetailContainer id={match.params.id} />
    </>
  );
};

export default PaymentDetailPage;
