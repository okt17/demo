import * as React from 'react';
import Button from '../../../ui/Button';

interface Props {
  layer: ol.layer.Base;
  map: ol.Map;
}

export default class LayersListItem extends React.Component<Props> {
  removeLayer = (): void => {
    this.props.map.removeLayer(this.props.layer);
  };
  render() {
    const {
      props: {
        layer,
      },
    } = this;

    return <div className='layers-list__item'>
      {layer.get('name')}
      <Button
        onClick={this.removeLayer}
      >
        Remove
      </Button>
    </div>;
  }
}
