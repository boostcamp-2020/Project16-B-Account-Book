import { useState } from 'react';
import styled from 'styled-components';

import icon from '@public/icon';
import color from '@public/color';
import CardDropDown from './CardDropDown';

const CardWrapper = styled.div`
  box-sizing: border-box;
  flex: 1 0 calc(50% - 20px);
  border: 1px solid ${color.lineBold};
  margin: 10px;
  padding: 10px;
  min-width: 400px;
  max-width: calc(50% - 20px);
  position: relative;
`;

const CardHeader = styled.div`
  display: flex;
  position: relative;
`;
const CardTitle = styled.div`
  font-weight: bold;
  font-size: 0.9rem;
  margin-left: 0.4rem;
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
    background-color: #8d45ff;
    border-radius: 50%;
    cursor: pointer;
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

const Edit = styled.div`
  &,
  & > * {
    box-sizing: border-box;
  }
  display: flex;
  justify-content: space-around;
  position: absolute;
  left: 0px;
  top: 8px;
  width: 100%;
  height: 25px;
  input {
    margin-left: 25px;
    width: 55%;
    font-size: 0.9rem;
    font-weight: bold;
  }
`;

const EditButtonCommon = `
  font-size: 0.85rem;
  width: 13%;
  height: 25px;
  line-height: 25px;
  text-align: center;
  background-color: #ffffff;
  transition: 0.3s;
`;

const EditCancel = styled.div`
  ${EditButtonCommon}
  &:hover {
    background-color: #ebebeb;
    border-radius: 3px;
    cursor: pointer;
  }
`;

const EditSave = styled.div`
  ${EditButtonCommon}
  &:hover {
    background-color: #8d45ff;
    color: #ffffff;
    border-radius: 3px;
    cursor: pointer;
  }
`;

const TagCard = ({ iconName, title }) => {
  const [dropdown, setDropDown] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [tagName, setTagName] = useState(title);

  const onInputChange = (e) => {
    setTagName(e.target.value);
  };

  const dropDownOptions = [
    {
      text: '분석에서 제외',
      func: () => {
        console.log('TODO-분석에서 제외');
        setDropDown(false);
      },
    },
    {
      text: '태그 수정',
      func: () => {
        setEditMode(true);
        setDropDown(false);
      },
    },
    {
      text: '태그 삭제',
      func: () => {
        console.log('TODO-태그 삭제');
        setDropDown(false);
      },
    },
    {
      text: '보고서 보기',
      func: () => {
        console.log('TODO-보고서 보기');
        setDropDown(false);
      },
    },
    {
      text: '내역 보기',
      func: () => {
        console.log('TODO-내역 보기');
        setDropDown(false);
      },
    },
  ];

  return (
    <>
      <CardWrapper>
        <CardHeader>
          <IconWrapper>{icon[iconName]}</IconWrapper>
          <CardTitle>{title}</CardTitle>
          <DropDownBtn onClick={() => setDropDown(!dropdown)}>
            {icon.more}
          </DropDownBtn>
          {dropdown && (
            <CardDropDown options={dropDownOptions} setDropDown={setDropDown} />
          )}
        </CardHeader>
        {editMode && (
          <Edit>
            <input
              type="text"
              className="edit-title"
              value={tagName}
              onChange={onInputChange}
            ></input>
            <EditCancel onClick={() => setEditMode(false)}>취소</EditCancel>
            <EditSave>저장</EditSave>
          </Edit>
        )}
      </CardWrapper>
    </>
  );
};

export default TagCard;
