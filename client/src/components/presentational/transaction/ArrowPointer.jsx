import styled from 'styled-components';

const Arrow = styled.div`
  width: 2.5vw;
  height: 2.5vw;
  border: 2.5vw solid;
  border-color: black transparent transparent black;
  position: fixed;
  right: 300px;
  bottom: 0;
  transform: rotate(-45deg) !important;

  animation: slide 2s infinite;
  @keyframes slide {
    0% {
      opacity: 0;
      transform: translateX(0vw) rotate(135deg);
    }

    100% {
      opacity: 1;
      transform: translateX(15vw) rotate(135deg);
    }
  }
`;

const ArrowPointer = () => {
  return (
    <>
      <Arrow />
    </>
  );
};

export default ArrowPointer;
