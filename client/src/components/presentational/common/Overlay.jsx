import React from 'react';
import styled from 'styled-components';
import color from '@public/color';

const OverlayWrapper = styled.div`
  position: fixed;
  width: ${(props) => (props.isModal ? '767px' : '100%')};
  height: 100%;
  top: 0;
  left: ${(props) => (props.isModal ? -767 : 0)}px;
  right: 0;
  bottom: 0;
  z-index: 11;
  background-color: ${(props) => (props.isModal ? color.modal : 'none')};
  transition: 0ms;
  opacity: 0.5;
  @media (max-width: 767px) {
    transform: translate(767px, 0px);
  }
`;

const Overlay = ({ setModal, isModal }) => {
  const onClickOverlay = () => setModal(false);

  return (
    <>
      <OverlayWrapper onClick={onClickOverlay} isModal={isModal} />
    </>
  );
};

export default Overlay;
