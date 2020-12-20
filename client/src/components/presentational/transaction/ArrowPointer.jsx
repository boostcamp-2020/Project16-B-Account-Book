import styled from 'styled-components';

const Arrow = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border: 2.5rem solid;
  border-color: black transparent transparent black;
  position: fixed;
  right: 300px;
  bottom: 0;
  transform: rotate(-45deg) !important;

  animation: slideRight 2s infinite;
  @keyframes slideRight {
    0% {
      opacity: 0;
      transform: translateX(-10rem) rotate(135deg);
    }

    100% {
      opacity: 1;
      transform: translateX(10rem) rotate(135deg);
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
