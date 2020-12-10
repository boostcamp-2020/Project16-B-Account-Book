import styled from 'styled-components';

import DEFAULT_IMAGE from '@public/img/default_image.png';

const CardFormContainer = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: white;
  color: black;
  margin-bottom: 0.5em;
  padding: 0.2em 0;
  border-radius: 1em;
  box-shadow: 6px 6px 8px 0px;
  max-width: 30rem;
`;

const Avatar = styled.img`
  width: 8em;
  height: 8em;
  padding: 1em;
  margin-left: 0.5em;
  margin-right: 1em;
  border-radius: 50%;
`;

const Info = styled.div`
  width: 100%;

  * {
    margin: 0;
    font-size: 0.9rem;
    margin-bottom: 0.2em;
  }
`;

const Name = styled.h1`
  font-size: 1.2rem;
`;
const Email = styled.p`
  margin-bottom: 1em;

  &:after {
    content: '';
    display: block;
    width: 90%;
    height: 2px;
    background-color: #95e1d3;
    transform: translateY(0.5em);
  }
`;
const SubInfo = styled.p``;

const CardForm = ({ userInfo }) => {
  const {
    email,
    provider,
    imageURL,
    name,
    startDateOfMonth,
    startDayOfWeek,
  } = userInfo;
  const url = imageURL || DEFAULT_IMAGE;

  return (
    <CardFormContainer>
      <Avatar src={url} alt="profile photo" />
      <Info>
        <Name>{name}</Name>
        <Email>{email}</Email>
        <SubInfo>소셜 로그인: {provider}</SubInfo>
        <SubInfo>달력 시작 요일: {startDateOfMonth}일</SubInfo>
        <SubInfo>달력 시작일: {startDayOfWeek}</SubInfo>
      </Info>
    </CardFormContainer>
  );
};

export default CardForm;
