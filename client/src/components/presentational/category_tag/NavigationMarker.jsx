import styled from 'styled-components';

const NavigationMarkerWrapper = styled.div`
  hr {
    height: 0.25rem;
    width: 50%;
    margin: 0;
    background: tomato;
    border: none;
    transition: 0.3s ease-in-out;
    margin-left: ${({ selected }) => (selected === 'tag' ? '50%' : '0%')};
  }
`;

const NavigationMarker = ({ selected }) => {
  return (
    <>
      <NavigationMarkerWrapper selected={selected}>
        <hr />
      </NavigationMarkerWrapper>
    </>
  );
};

export default NavigationMarker;
