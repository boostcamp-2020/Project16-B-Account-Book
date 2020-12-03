import { useState } from 'react';
import styled from 'styled-components';

import icon from '@public/icon';
import color from '@public/color';
import DropDown from '../common/DropDown';

const CardWrapper = styled.div`
  flex: 1 0 calc(50% - 20px);
  box-sizing: border-box;
  border: 1px solid ${color.lineBold};
  margin: 10px;
  padding: 10px;
  min-width: 400px;
  max-width: calc(50% - 20px);
  .card-header {
    display: flex;
    position: relative;
  }
  .card-title {
    font-weight: bold;
    font-size: 0.9rem;
    margin-left: 0.4rem;
  }
  .card-description {
    margin-top: 20px;
    font-size: 0.8rem;
    color: ${color.fontDescription};
  }
  .drop-down-btn {
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
      background-color: #8d45ff;
      border-radius: 50%;
    }
  }
`;

const IconWrapper = styled.div`
  position: relative;
  width: 22px;
  height: 22px;
  background-color: orange;
  border-radius: 50%;

  svg {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
    fill: white;
  }
`;

const CategoryCard = ({ iconName, title, description }) => {
  const [dropdown, setDropDown] = useState(false);
  const dropDownOptions = ['분석에서 제외', '보고서 보기', '내역 보기'];
  return (
    <>
      <CardWrapper>
        <div className="card-header">
          <IconWrapper>{icon[iconName]}</IconWrapper>
          <div className="card-title">{title}</div>
          <div className="drop-down-btn" onClick={() => setDropDown(!dropdown)}>
            {icon.more}
          </div>
          {dropdown && (
            <DropDown options={dropDownOptions} setDropDown={setDropDown} />
          )}
        </div>
        <div className="card-description">{description}</div>
      </CardWrapper>
    </>
  );
};

export default CategoryCard;
