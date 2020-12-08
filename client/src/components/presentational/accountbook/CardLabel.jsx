import styled from 'styled-components';

const CardLabelWrapper = styled.div`
  border: 1px solid gray;
  border-radius: 500px;
  display: inline-block;
  font-size: 6px;
  padding: 1.5px 3px;
  margin-right: 5px;
  color: ${({ fontColor }) => fontColor};
  &:hover {
    cursor: pointer;
  }
`;

const CardLabel = ({ card, fontColor }) => {
  return (
    <>
      <CardLabelWrapper fontColor={fontColor}>{card}</CardLabelWrapper>
    </>
  );
};

export default CardLabel;
