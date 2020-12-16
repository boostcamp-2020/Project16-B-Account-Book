import styled from 'styled-components';

import Category from './Category';
import squirrel from '@public/img/squirrel.jpeg';
import coffeeImage from '@public/img/coffee.jpeg';

const Section = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 90vw;

  @media (max-width: 967px) {
    transform: translate(-0vw, 8%);
  }
  @media (max-width: 768px) {
    transform: scale(0.5) translate(-25vw, -36%);
  }
`;

const categorySection = ({ transactions }) => {
  const transactionObject = {};
  transactions.forEach((transaction) => {
    transactionObject[transaction.name] = 1;
  });

  return (
    <>
      <Section>
        {transactionObject['술/유흥'] && (
          <Category
            image={squirrel}
            text="술/유흥"
            redirectCategory={'술/유흥'}
          />
        )}
        {transactionObject['식사'] && (
          <Category image={squirrel} text="식사" redirectCategory={'식사'} />
        )}
        {transactionObject['카페/간식'] && (
          <Category
            image={coffeeImage}
            text="카페/간식"
            redirectCategory={'카페/간식'}
          />
        )}
        {transactionObject['생활/마트'] && (
          <Category
            image={coffeeImage}
            text="생활/마트"
            redirectCategory={'생활/마트'}
          />
        )}
        {transactionObject['온라인쇼핑'] && (
          <Category
            image={coffeeImage}
            text="온라인쇼핑"
            redirectCategory={'온라인쇼핑'}
          />
        )}
      </Section>
    </>
  );
};

export default categorySection;
