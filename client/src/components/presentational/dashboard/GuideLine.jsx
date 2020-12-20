import styled from 'styled-components';

const Hole = styled.div`
  position: fixed;
  top: 153px;
  left: 0px;
  width: 250px;
  height: 50px;
  box-shadow: 0 0 0 200rem rgba(0, 0, 0, 0.75);
  @media (max-width: 767px) {
    display: none;
  }
`;

const TopHole = styled.div`
  position: fixed;
  top: 61px;
  left: 0px;
  width: 253px;
  height: 83px;
  box-shadow: inset 5rem -2rem 0px 11rem rgba(0, 0, 0, 0.75);
  z-index: 100;
  @media (max-width: 767px) {
    display: none;
  }
`;

const BottomHole = styled.div`
  position: fixed;
  top: 205px;
  left: 0px;
  width: 253px;
  height: 100%;
  box-shadow: inset 5rem -2rem 0px 16rem rgba(0, 0, 0, 0.75);
  z-index: 100;
  @media (max-width: 767px) {
    display: none;
  }
`;

const Arrow = styled.div`
  animation: slide 2s infinite;
  @media (min-width: 768px) {
    width: 3rem;
    height: 3rem;
    border: 2.5rem solid;
    left: 300px;
    top: 115px;
    border-color: white transparent transparent white;
    position: fixed;
    @keyframes slide {
      0% {
        opacity: 0;
        transform: translateX(9rem) rotate(-45deg);
      }

      100% {
        opacity: 1;
        transform: translateX(0rem) rotate(-45deg);
      }
    }
  }
  @media (max-width: 767px) {
    width: 1.5rem;
    height: 1.5rem;
    border: 1rem solid;
    left: -6px;
    border-color: black black transparent white;
    position: fixed;
    @keyframes slide {
      0% {
        opacity: 0;
        transform: translateY(10rem) rotate(-45deg);
      }

      100% {
        opacity: 1;
        transform: translateY(-2rem) rotate(-45deg);
      }
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
