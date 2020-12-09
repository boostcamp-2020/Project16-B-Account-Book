import React from 'react';
import styled from 'styled-components';

const AA = styled.div`
  width: 30px;
  height: 156px;
  left: 60px;
  position: relative;
  z-index: 2;

  background: linear-gradient(
    to left,
    #99749d,
    #b895ab,
    #cc9aa6,
    #d7969e,
    #e0787f
  );
  border-radius: 24px;
`;

const BB = styled.div`
  width: 30px;
  height: 156px;
  left: -11px;
  top: -15px;
  transform: rotate(40.5deg);
  position: relative;
  z-index: 3;

  background: linear-gradient(
    to bottom,
    #a27aa7,
    #b995ac,
    #ca96a2,
    #db98a0,
    #e2767e
  );
  border-radius: 24px;
`;

const CC = styled.div`
  width: 30px;
  height: 147px;
  left: -23px;
  top: 36px;
  transform: rotate(90deg);
  position: relative;
  z-index: 1;
  background: linear-gradient(
    to top,
    #a27aa7,
    #b995ac,
    #ca96a2,
    #db98a0,
    #e2767e
  );
  border-radius: 24px;
`;

const StyledDiv = styled.div`
  text-align: center;
  font-size: 106px;
  font-weight: 800;
  margin: 70px 15px;
  display: flex;
  justify-content: center;
`;

const OO = styled.div`
  vertical-align: text-top;
  width: 156px;
  height: 156px;
  border-radius: 999px;
  background: linear-gradient(
    to top right,
    #a27aa7,
    #b995ac,
    #ca96a2,
    #db98a0,
    #e2767e
  );
  :after {
    content: '';
    display: block;
    position: relative;
    border-radius: 123px;
    width: 70px;
    height: 70px;
    left: 43px;
    bottom: -42px;
    background: #ffffff;
  }
`;

const Title = styled.h1`
  text-align: center;
  margin: 30px 15px;
  color: #ed8687;
`;

const Box = styled.div`
  position: relative;
  display: flex;
`;

export default function NotFoundPage() {
  return (
    <>
      <Title>Error Not Found</Title>
      <StyledDiv>
        <Box>
          <AA />
          <BB />
          <CC />
        </Box>
        <OO />
        <Box>
          <AA />
          <BB />
          <CC />
        </Box>
      </StyledDiv>
    </>
  );
}
