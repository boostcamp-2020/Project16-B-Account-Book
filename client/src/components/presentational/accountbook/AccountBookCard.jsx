import styled, { css, keyframes } from 'styled-components';
import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import CardLabel from './CardLabel';
import { getCookie } from '@util/cookie';
import icon from '@public/icon';

const wobbleAnimation = keyframes`
  25% { transform: rotate(10deg); }
  50% { transform: rotate(-10deg); }
  75% { transform: rotate(5deg); }
  100% { transform: rotate(0deg); }
`;

const Card = styled.li`
  position: relative;
  width: calc(28% - 40px);
  float: left;
  min-height: 150px;
  min-width: 300px;
  margin: 20px 20px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ fontColor }) => fontColor};
  border-radius: 8px;
  transition: transform 250ms ease-in;
  padding: 1.5rem 1rem 0rem 1rem;
  box-sizing: border-box;
  box-shadow: 5px 5px 0px 0px #4b4c4b, 5px 7px 15px 5px rgba(0, 0, 0, 0);

  &:hover {
    ${({ isCurrent }) => !isCurrent && `transform: scale(1.05);`}
    cursor: pointer;
  }

  ${({ isCurrent }) =>
    isCurrent &&
    `
    outline: none;
    border-color: #9ecaed;
    box-shadow: 5px 5px 15px 5px #FF8080, -9px 5px 15px 5px #FFE488, -7px -5px 15px 5px #8CFF85, 12px -5px 15px 5px #80C7FF, 12px 10px 15px 7px #E488FF, -10px 10px 15px 7px #FF616B, -10px -7px 27px 1px #8E5CFF, 5px 7px 15px 5px rgba(0,0,0,0);
  `}

  ${({ clicked }) =>
    clicked &&
    css`
      animation-name: ${wobbleAnimation};
      animation-duration: 1s;
    `}
    svg {
    &:hover {
      transform: scale(1.3);
    }
  }
`;

const Title = styled.div`
  display: inline-block;
  font-weight: bold;
  &:hover {
    cursor: default;
  }
`;

const TitleInput = styled.input`
  background-color: ${({ color }) => color};
  outline: none;
  border: none;
  border-bottom: 1px solid ${({ fontColor }) => fontColor};
  display: inline-block;
  font-weight: bold;
  color: ${({ fontColor }) => fontColor};
  box-sizing: border-box;
  &:hover {
    cursor: default;
  }
`;

const DeleteBtn = styled.div`
  position: absolute;
  transform: rotate(45deg);
  color: ${({ fontColor }) => fontColor};
  top: -4px;
  right: 2px;
  font-size: 20px;
`;

const EditIcon = styled.div`
  display: inline-block;
`;

const SaveIcon = styled.div`
  display: inline-block;
  position: absolute;
  top: 18%;
`;

const UserNum = styled.div`
  font-size: 0.7rem;
  position: absolute;
  top: 19%;
  right: 5%;
  display: inline-block;
`;

const Labels = styled.div`
  position: absolute;
  bottom: 0.8rem;
  max-width: calc(100% - 2rem);
`;

const AccountBookCard = ({
  title,
  accountBookId,
  users,
  cards,
  backgroundColor,
  fontColor,
  onClickAccountBook,
  onClickDelete,
  onClickSaveTitle,
}) => {
  const [clicked, setClicked] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [cardTitle, setCardTitle] = useState(title);
  const titleInputRef = useRef();
  const history = useHistory();

  const cardLabelList = cards.map((card, index) => {
    return (
      <CardLabel key={'CardLabel' + index} card={card} fontColor={fontColor} />
    );
  });

  const onClickCard = () => {
    setClicked(true);
    setTimeout(() => {
      onClickAccountBook(accountBookId);
      history.push('/dashboard');
    }, 1000);
  };

  const onClickDeleteBtn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClickDelete(accountBookId);
  };

  const onClickEdit = (e) => {
    e.stopPropagation();
    setEditMode(true);
    setTimeout(() => {
      titleInputRef.current.focus();
    }, 0);
  };

  const onClickSave = (e) => {
    e.stopPropagation();
    setEditMode(false);
    onClickSaveTitle(accountBookId, cardTitle);
  };

  const onInputChange = (e) => {
    setCardTitle(e.target.value);
  };

  const isCurrent = getCookie('accountBookId') === accountBookId;

  return (
    <>
      <Card
        backgroundColor={backgroundColor}
        fontColor={fontColor}
        isCurrent={isCurrent}
        onClick={onClickCard}
        clicked={clicked}
      >
        {editMode ? (
          <>
            <TitleInput
              value={cardTitle}
              ref={titleInputRef}
              onChange={onInputChange}
              color={backgroundColor}
              fontColor={fontColor}
              onClick={(e) => {
                e.stopPropagation();
              }}
            ></TitleInput>
            <SaveIcon onClick={onClickSave}>{icon.save}</SaveIcon>
          </>
        ) : (
          <>
            <Title
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {title}
            </Title>
            <EditIcon onClick={onClickEdit}>{icon.edit}</EditIcon>
          </>
        )}

        <UserNum>{users.length}人</UserNum>
        <DeleteBtn fontColor={fontColor} onClick={onClickDeleteBtn}>
          +
        </DeleteBtn>
        <Labels>{cardLabelList}</Labels>
      </Card>
    </>
  );
};

export default AccountBookCard;
