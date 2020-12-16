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

const categorySection = () => {
  return (
    <>
      <Section>
        <Category
          image={squirrel}
          text="술/유흥"
          redirectCategory={'술/유흥'}
        />
        <Category
          image={squirrel}
          text="aaaaaaaaaaaa"
          redirectCategory={'식사'}
        />
        <Category
          image={coffeeImage}
          text="aaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbaaa"
          redirectCategory={'카페/간식'}
        />
        <Category
          image={coffeeImage}
          text="aaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbaaa"
          redirectCategory={'카페/간식'}
        />
        <Category
          image={coffeeImage}
          text="aaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbaaa"
          redirectCategory={'카페/간식'}
        />
      </Section>
    </>
  );
};

export default categorySection;
