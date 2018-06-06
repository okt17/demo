import styled from 'styled-components';

const FeatureView = styled.div`
  position: absolute;
  top: 5vh;
  left: 5vw;
  color: #fff;
  background-color: #158CBA;
  border-radius: 20px;

  table {
    margin-bottom: 0;

    tr:first-child {
      td {
        border-top: none;
      }
    }
  }
`;

export default FeatureView;
