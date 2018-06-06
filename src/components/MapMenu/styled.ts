import styled from 'styled-components';

const MapMenu = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%);
  opacity: 0.8;

  .btn {
    padding: 0.5rem 1rem;
    font-size: 1.1rem;
    line-height: 1.5;

    &:first-child {
      border-bottom-left-radius: 20px;
    }

    &:last-child {
      border-bottom-right-radius: 20px;
    }
  }
`;

export default MapMenu;
