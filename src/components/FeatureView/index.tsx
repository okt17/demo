import * as React from 'react';
import { Table } from 'react-bootstrap';
import {
  getGeodesicArea,
  formatArea,
} from '../../utils/geometry';
import StyledFeatureView from './styled';

interface IProps {
  feature: ol.Feature;
}

function capitalize ( str: string ): string {
  return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
}

const FeatureView: React.SFC<IProps> = ( { feature } ) => {
  const
    area = getGeodesicArea( feature.getGeometry() ),
    properties = Object.entries( feature.getProperties() )
      .filter( ( [key, value] ) => (
        key.startsWith( '__' ) === false
        &&
        typeof value !== 'object'
      ) );
      // not displaying system properties starting with '__'
      // as well as object type properties (i.e. geometry)

  return <StyledFeatureView>
    <Table>
      {
        <tr>
          <td>ID</td>
          <td>{feature.getId()}</td>
        </tr>
      }
      {
        properties.map(
          ( [key, value] ) => <tr>
            <td>{capitalize( key )}</td>
            <td>{value}</td>
          </tr>,
        )
      }
      <tr>
        <td>Calculated Geodesic Area</td>
        <td>{formatArea( area )}</td>
      </tr>
    </Table>
  </StyledFeatureView>;
};

export default FeatureView;
