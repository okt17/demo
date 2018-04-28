import * as React from 'react';
import ConfirmButton from '../../../ui/ConfirmButton';

interface IProps {
  layer: ol.layer.Base;
  map: ol.Map;
}

export default class LayersListItem extends React.Component<IProps> {
  removeLayer = (): void => {
    this.props.map.removeLayer(this.props.layer);
  };
  render() {
    const
      {
        props: {
          layer,
        },
      } = this,
      name = layer.get( 'name' );

    return <div className='layers-list__item'>
      <div className='layers-list__item__name'>
        {name}
      </div>
      {
        layer.get( 'removable' ) !== false
        &&
        <ConfirmButton
          onClick={this.removeLayer}
          modalText={`Are you sure you want to remove ${name}?`}
        >
          Remove
        </ConfirmButton>
      }
    </div>;
  }
}
