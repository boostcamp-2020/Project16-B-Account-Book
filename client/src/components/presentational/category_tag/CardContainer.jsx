import styled from 'styled-components';

import CategoryCard from './CategoryCard';
import TagCard from './TagCard';

const CardContainerWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const CardContainer = ({ dummy, navMenu }) => {
  // const categoryOption = ['분석에서 제외', '보고서 보기', '내역 보기'];
  // const tagOption = [
  //   '분석에서 제외',
  //   '태그 수정',
  //   '태그 삭제',
  //   '보고서 보기',
  //   '내역 보기',
  // ];
  const Card = navMenu === 'category' ? CategoryCard : TagCard;

  return (
    <>
      <CardContainerWrapper>
        {dummy.map(({ icon, title, description }, index) => {
          return (
            <Card
              key={'card' + index}
              iconName={icon}
              title={title}
              description={description}
            ></Card>
          );
        })}
      </CardContainerWrapper>
    </>
  );
};

export default CardContainer;
