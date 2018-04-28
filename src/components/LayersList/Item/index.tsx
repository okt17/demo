import * as React from 'react';
import ConfirmButton from '../../../ui/ConfirmButton';

interface IProps {
  layer: ol.layer.Base;
  map: ol.Map;
}

export default class LayersListItem extends React.Component<IProps> {
  protected removeLayer = (): void => {
    this.props.map.removeLayer(this.props.layer);
  };
  protected handleOpacityChange = ( event: {
    target: {
      value: string;
    };
  } ) => {
    const value = Number( event.target.value );

    this.props.layer.setOpacity( value );

    this.forceUpdate();
  };
  protected handleCheckboxClick = () => {
    const layer = this.props.layer;

    layer.setVisible( !layer.getVisible() );

    this.forceUpdate();
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
      <input
        title='Visibility'
        type='checkbox'
        className='layers-list__item__checkbox'
        checked={layer.getVisible()}
        onChange={this.handleCheckboxClick}
      />

      <div className='layers-list__item__name'>
        {name}
      </div>

      <input
        title='Opacity'
        type='range'
        min={0}
        max={1.0}
        step={0.05}
        className='layers-list__item__opacity-input'
        onChange={this.handleOpacityChange}
        value={layer.getOpacity()}
      />

      {
        layer.get( 'removable' ) !== false
        &&
        <ConfirmButton
          onClick={this.removeLayer}
          modalText={`Are you sure you want to remove ${name} layer?`}
        >
          Remove
        </ConfirmButton>
      }
    </div>;
  }
}
