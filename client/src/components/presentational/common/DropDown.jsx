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

const DropDown = ({ options, setDropDown }) => {
  const optionOnClick = (e) => {
    // TODO
    console.log(e.target.textContent); // TODO: 삭제할 예정(확인용)
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
