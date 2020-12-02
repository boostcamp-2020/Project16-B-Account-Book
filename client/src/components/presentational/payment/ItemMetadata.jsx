import { useState, useRef } from 'react';
import styled from 'styled-components';
import numeral from 'numeral';

import icon from '@public/icon';
import DropDown from '@presentational/common/DropDown';

const Metadata = styled.div`
  width: 50%;
  margin-left: 0.2em;
`;

const MainWrapper = styled.div`
  display: flex;
  position: relative;
`;

const Title = styled.p`
  margin: 0;
  font-size: 0.9rem;
  font-weight: bold;
`;

const DropDownBtn = styled.div`
  width: 24px;
  height: 24px;
  line-height: 20px;
  text-align: center;
  position: absolute;
  right: 0px;
  transition: 0.3s;

  svg {
    fill: #808080;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
  }
  &:hover {
    svg {
      fill: #ffffff;
    }
    background: #02aacf;
    border-radius: 50%;
  }
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

const ItemMetadata = ({ item, cardDelete }) => {
  const titleRef = useRef();
  const [dropdown, setDropDown] = useState(false);
  const dropDownOptions = ['카드 수정', '카드 삭제', '취소'];

  return (
    <Metadata>
      <MainWrapper>
        <Title ref={titleRef}>{item.payment}</Title>
        <DropDownBtn onClick={() => setDropDown(!dropdown)}>
          {icon.more}
        </DropDownBtn>
        {dropdown && (
          <DropDown
            options={dropDownOptions}
            setDropDown={setDropDown}
            cardDelete={cardDelete}
            titleRef={titleRef}
          />
        )}
      </MainWrapper>
      <Cost>
        <SubTitle>누적: </SubTitle>
        {numeral(item.totalCost).format('0,0')}원
      </Cost>
      <PaymentBtn>내역 보기</PaymentBtn>
    </Metadata>
  );
};

export default ItemMetadata;
