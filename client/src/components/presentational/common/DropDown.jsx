import React from 'react';
import styled from 'styled-components';

import Overlay from './Overlay';
import color from '@public/color';

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

const DropDown = ({ options, setDropDown, cardDelete }) => {
  const optionOnClick = (e) => {
    const optionTitle = e.target.textContent;
    const selectedCardName = e.target.parentNode.parentNode.querySelector('p')
      .innerText;

    switch (optionTitle) {
      case '카드 삭제':
        cardDelete({
          paymentName: selectedCardName,
        });
        break;
      case '카드 수정':
        console.log('수정 시작');
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
