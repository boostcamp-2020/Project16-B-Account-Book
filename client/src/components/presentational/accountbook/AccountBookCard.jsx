import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import CardLabel from './CardLabel';
import { getCookie } from '@util/cookie';

const Card = styled.li`
  position: relative;
  width: calc(30% - 40px);
  float: left;
  min-height: 150px;
  margin: 20px 20px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ fontColor }) => fontColor};
  transition: transform 250ms ease-in;

  &:hover {
    ${({ isCurrent }) => !isCurrent && `transform: scale(1.05);`}
    cursor: pointer;
  }

  ${({ isCurrent }) =>
    isCurrent &&
    `
    outline: none;
    border-color: #9ecaed;
    box-shadow: 0 0 10px #9ecaed;
    transform: scale(1.10);
  `}
`;

const DeleteBtn = styled.div`
  position: absolute;
  transform: rotate(45deg);
  color: ${({ fontColor }) => fontColor};
  top: -4px;
  right: 2px;
  font-size: 20px;
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
}) => {
  const history = useHistory();
  const cardLabelList = cards.map((card, index) => {
    return (
      <CardLabel key={'CardLabel' + index} card={card} fontColor={fontColor} />
    );
  });

  const onClickCard = async () => {
    onClickAccountBook(accountBookId);
    history.push('/dashboard');
  };

  const onClickDeleteBtn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClickDelete();
  };

  const isCurrent = getCookie('accountBookId') === accountBookId;

  return (
    <>
      <Card
        backgroundColor={backgroundColor}
        fontColor={fontColor}
        isCurrent={isCurrent}
        onClick={onClickCard}
      >
        <div>{title}</div>
        <DeleteBtn fontColor={fontColor} onClick={onClickDeleteBtn}>
          +
        </DeleteBtn>
        <div>{users.length}명</div>
        {cardLabelList}
      </Card>
    </>
  );
};

export default AccountBookCard;
