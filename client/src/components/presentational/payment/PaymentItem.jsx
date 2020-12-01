import styled from 'styled-components';
import numeral from 'numeral';

const PaymentContainer = styled.li`
  width: 40%;
  padding: 0.3em;
  margin-right: 30px;
`;

const Payment = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border: 1px solid lightgray;
  box-shadow: 3px 3px 5px 0px rgba(191, 191, 191, 0.53);
  cursor: pointer;
  transition: transform 250ms ease-in;

  &:hover {
    transform: scale(1.02);
  }
`;

const Metadata = styled.div`
  margin-left: 0.2em;
`;

const Img = styled.img`
  width: 50%;
  height: 100%;
  margin-right: 25px;
`;

const Title = styled.p`
  margin: 0;
  font-size: 0.9rem;
  font-weight: bold;
`;

const SubTitle = styled.span`
  color: #75797e;
`;

const Cost = styled.p`
  font-size: 0.8rem;
`;

const PaymentBtn = styled.button`
  display: inline-block;
  padding: 0 16px;
  margin-top: 10px;
  min-width: 88px;
  border: 0;
  border-radius: 2px;
  text-align: center;
  font-size: 14px;
  line-height: 34px;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.258824) 0 2px 2px 0;
  background: #fafafa;
  color: #111;
  border: none;
  outline: none;

  &:hover {
    background: #02aacf;
    color: white;
  }
`;

const PaymentItem = ({ item }) => (
  <PaymentContainer>
    <Payment>
      <Img
        src="https://cdn.finda.co.kr/blog/20180724190225/cover-3.jpg"
        alt="card image"
      />
      <Metadata>
        <Title>{item.payment}</Title>
        <Cost>
          <SubTitle>누적: </SubTitle>
          {numeral(item.totalCost).format('0,0')}원
        </Cost>
        <PaymentBtn>내역 보기</PaymentBtn>
      </Metadata>
    </Payment>
  </PaymentContainer>
);

export default PaymentItem;
