import React from 'react';
import styled from 'styled-components';

import Overlay from './Overlay';
import color from '@public/color';
import { deleteCard, updateCard } from '@presentational/payment/cardEvent';

const DropDownWrapper = styled.div`
  position: absolute;
  right: 0px;
  width: 200px;
  font-size: 13px;
  text-align: center;
  background-color: white;
  color: ${color.fontLightBold};
  border: 1px solid ${color.line};
  box-shadow: ${color.boxShadow};
  z-index: 12;
`;

const DropDownOption = styled.div`
  height: 40px;
  line-height: 40px;
  &:not(:last-child) {
    border-bottom: 1px solid ${color.line};
  }
  &:hover {
    cursor: pointer;
    color: ${color.dropDownHoverText};
    background-color: ${color.dropDownHoverBackground};
  }
`;

const DropDown = ({
  options,
  setDropDown,
  cardDelete,
  cardUpdate,
  titleRef,
}) => {
  const optionOnClick = (e) => {
    const optionTitle = e.target.textContent;
    const selectedCardName = titleRef?.current?.innerText;

    switch (optionTitle) {
      case '카드 삭제':
        deleteCard({ cardDelete, selectedCardName });
        break;
      case '카드 수정':
        updateCard({ cardUpdate, selectedCardName });
        break;
      default:
        break;
    }
    setDropDown(false);
  };

  const renderedOptions = options.map((option, index) => {
    return (
      <DropDownOption key={'option' + index} onClick={optionOnClick}>
        {option}
      </DropDownOption>
    );
  });

  return (
    <>
      <Overlay setModal={setDropDown} />
      <DropDownWrapper>{renderedOptions}</DropDownWrapper>
    </>
  );
};

export default DropDown;
