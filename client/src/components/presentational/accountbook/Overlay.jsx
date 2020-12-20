import styled from 'styled-components';

import color from '@public/color';

const OverlayWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 12;
  background-color: ${color.modal};
  opacity: 0.5;
`;

const Overlay = ({ setModal }) => {
  return (
    <>
      <OverlayWrapper onClick={() => setModal(false)} />
    </>
  );
};

export default Overlay;
