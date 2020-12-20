import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 0.3em;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.26);
  border-color: lightgray;
  width: 30vw;
  height: 30vw;
  margin: 0px 0px 1% 1%;
  @media (max-width: 967px) {
    width: 45vw;
    height: 45vw;
  }
  &:hover {
    cursor: ${(props) => (props.isCategory ? 'pointer' : '')};
  }
`;

const Text = styled.span`
  overflow-wrap: break-word;
  padding: 2%;
  @media (max-width: 967px) {
    width: 45vw;
    font-size: 2.5vw;
  }
`;

const ExtraText = styled.span`
  font-size: 12px;
  font-weight: 100;
  padding: 0 2%;
  overflow: hidden;
  @media (max-width: 967px) {
    width: 45vw;
    font-size: 1.5vw;
  }
`;

const Category = ({ image, text, redirectCategory }) => {
  const history = useHistory();

  const handleClick = () => {
    redirectCategory &&
      history.push({
        pathname: '/analysis',
        state: { type: 'category', name: redirectCategory },
      });
  };

  return (
    <>
      <Box onClick={handleClick} isCategory={redirectCategory}>
        <img src={image} width={'100%'} height={'80%'} />
        <Text>{text}</Text>
        {redirectCategory && (
          <ExtraText>
            자세한 정보를 확인 하고 싶으시면 클릭을 해주세요
          </ExtraText>
        )}
      </Box>
    </>
  );
};

export default Category;
