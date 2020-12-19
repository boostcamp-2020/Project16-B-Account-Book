import styled from 'styled-components';

const Hole = styled.div`
  position: fixed;
  top: 153px;
  left: 0px;
  width: 250px;
  height: 50px;
  box-shadow: 0 0 0 200rem rgba(0, 0, 0, 0.75);
`;

const TopHole = styled.div`
  position: fixed;
  top: 61px;
  left: 0px;
  width: 253px;
  height: 83px;
  box-shadow: inset 5rem -2rem 0px 11rem rgba(0, 0, 0, 0.75);
  z-index: 100;
`;

const BottomHole = styled.div`
  position: fixed;
  top: 205px;
  left: 0px;
  width: 253px;
  height: 100%;
  box-shadow: inset 5rem -2rem 0px 16rem rgba(0, 0, 0, 0.75);
  z-index: 100;
`;

const Arrow = styled.div`
  width: 3vw;
  height: 3vw;
  border: 2.5vw solid;
  border-color: white transparent transparent white;
  position: fixed;
  left: 300px;
  top: 125px;
  transform: rotate(-45deg) !important;

  animation: slide 2s infinite;
  @keyframes slide {
    0% {
      opacity: 0;
      transform: translateX(9vw) rotate(-45deg);
    }

    100% {
      opacity: 1;
      transform: translateX(0vw) rotate(-45deg);
    }
  }
`;

const GuideLine = () => {
  return (
    <>
      <TopHole />
      <Hole />
      <BottomHole />
      <Arrow className={'fa'} />
    </>
  );
};

export default GuideLine;
