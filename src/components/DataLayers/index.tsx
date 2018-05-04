import * as React from 'react';
import * as ol from 'openlayers';
import { getOlLayer, ILayer } from '../../utils/layers';
import Item from './Item';

interface IProps {
  map: ol.Map;
  layers: ILayer[];
}

function layerExists( layers: ol.layer.Base[], layer: ILayer ) {
  return layers.find(
    ( olLayer: ol.layer.Base ) => olLayer.get( 'name' ) === layer.name,
  ) !== undefined;
}

class DataLayers extends React.PureComponent<IProps> {
  private listenerKey: ol.EventsKey = this.props.map.getLayers().on(
    ['add', 'remove'],
    () => this.forceUpdate(),
  );
  componentWillUnmount() {
    ol.Observable.unByKey( this.listenerKey );
  }
  handleItemClick = ( layer: ILayer ) => {
    const olLayer = getOlLayer( layer );

    this.props.map.addLayer( olLayer );
  };
  render() {
    const
      {
        map,
        layers,
      } = this.props,    
      mapLayers = map.getLayers().getArray();

    return <div className='data-layers'>
      {
        layers.map( ( layer: ILayer ) => <Item
          key={layer.name}
          layer={layer}
          // make it unable to add existing layers
          disabled={layerExists( mapLayers, layer )}
          onClick={this.handleItemClick}
        /> )
      }
    </div>;
  }
}

export default DataLayers;
