import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import icon from '@public/icon';
import color from '@public/color';
import CardDropDown from './CardDropDown';
import { errorFormat } from '@service/swalFormat';

const CardWrapper = styled.div`
  box-sizing: border-box;
  flex: 1 0 calc(50% - 20px);
  border: 1px solid ${color.lineBold};
  margin: 10px;
  padding: 10px;
  min-width: 400px;
  max-width: calc(50% - 20px);
  position: relative;
  visibility: ${({ hidden }) => (hidden ? 'hidden' : 'visible')};
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
  background-color: #999999;
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

const TagCard = ({
  iconName,
  title,
  onClickAdd,
  onClickChange,
  onClickDelete,
  hidden,
  setAddMode,
}) => {
  const [dropdown, setDropDown] = useState(false);
  const [editMode, setEditMode] = useState(hidden);
  const [tagName, setTagName] = useState(title);
  const tags = useSelector((state) => state.tags);
  const history = useHistory();

  const onInputChange = (e) => {
    setTagName(e.target.value);
  };

  const onClickSave = () => {
    if (tags.includes(tagName)) {
      Swal.fire(
        errorFormat({
          position: 'top',
          title: '이미 존재하는 태그입니다 😥',
          text: `태그명을 다시 입력해주세요`,
        })
      );
      return;
    }
    if (!tagName) {
      Swal.fire(
        errorFormat({
          position: 'top',
          title: '태그명을 입력해야 태그를 생성할 수 있습니다 😥',
          text: '한 글자 이상 입력해주세요',
        })
      );
      return;
    }
    setEditMode(false);
    if (title) {
      onClickChange(title, tagName);
      return;
    }
    setAddMode(false);
    onClickAdd(tagName);
  };

  const dropDownOptions = [
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
        setDropDown(false);
        onClickDelete(title);
      },
    },
    {
      text: '보고서 보기',
      func: () => {
        setDropDown(false);
        history.push({
          pathname: '/analysis',
          state: { type: 'tag', name: title },
        });
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
      <CardWrapper hidden={hidden}>
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
        {(editMode || !title.length) && (
          <Edit>
            <input
              type="text"
              className="edit-title"
              value={tagName}
              onChange={onInputChange}
            ></input>
            <EditCancel
              onClick={() => {
                setAddMode(false);
                if (!title.length) {
                  setTagName('');
                  return;
                }
                setTagName(title);
                setEditMode(false);
              }}
            >
              취소
            </EditCancel>
            <EditSave onClick={onClickSave}>저장</EditSave>
          </Edit>
        )}
      </CardWrapper>
    </>
  );
};

export default TagCard;
