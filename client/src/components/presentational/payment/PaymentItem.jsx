import styled from 'styled-components';

import ItemMetadata from '@presentational/payment/ItemMetadata';

const PaymentContainer = styled.li`
  width: 45%;
  padding: 0.5em;
  margin-right: 20px;
`;

const Payment = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 9rem;
  width: 25rem;
  border: 1px solid lightgray;
  box-shadow: 3px 3px 5px 0px rgba(191, 191, 191, 0.53);
  cursor: pointer;
  transition: transform 250ms ease-in;

  &:hover {
    transform: scale(1.02);
  }
`;

const Img = styled.img`
  width: 40%;
  height: 100%;
  margin-right: 25px;
`;

const PaymentItem = ({ item, cardDelete }) => (
  <PaymentContainer>
    <Payment>
      <Img
        src="https://cdn.finda.co.kr/blog/20180724190225/cover-3.jpg"
        alt="card image"
      />
      <ItemMetadata item={item} cardDelete={cardDelete} />
    </Payment>
  </PaymentContainer>
);

export default PaymentItem;
