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
  margin: 0px 0px 1% 1%;
`;

const Text = styled.span`
  overflow-wrap: break-word;
  padding: 2%;
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
      <Box onClick={handleClick}>
        <img src={image} width={'100%'} height={'80%'} />
        <Text>{text}</Text>
      </Box>
    </>
  );
};

export default Category;
