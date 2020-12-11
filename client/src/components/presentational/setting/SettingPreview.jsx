import styled from 'styled-components';
import CardForm from './form/CardForm';

const Preview = styled.section`
  flex-basis: 50%;
`;

const Title = styled.h1`
  width: 100%;
  text-align: center;
  margin-bottom: 1em;
`;

const Cards = styled.ul`
  width: 95%;
  padding: 0.5em 2em;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SettingPreview = ({ usersInfo }) => {
  return (
    <Preview>
      <Title>가계부 Member 🙈</Title>
      <Cards>
        {usersInfo.map((user, index) => (
          <CardForm key={'settingUser' + index} userInfo={user} index={index} />
        ))}
      </Cards>
    </Preview>
  );
};

export default SettingPreview;
