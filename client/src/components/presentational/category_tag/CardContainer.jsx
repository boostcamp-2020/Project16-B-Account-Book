import styled from 'styled-components';

import Card from './Card';

const CardContainerWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const CardContainer = ({ dummy }) => {
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
