import React from 'react';
import styled from 'styled-components';

import Overlay from '../common/Overlay';
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

const CardDropDown = ({ options, setDropDown }) => {
  const renderedOptions = options.map((option, index) => {
    return (
      <DropDownOption key={'option' + index} onClick={option.func}>
        {option.text}
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

export default CardDropDown;
