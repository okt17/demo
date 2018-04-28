import * as React from 'react';
import * as ol from 'openlayers';
import Item from './Item';

interface IProps {
  map: ol.Map;
}

export default class LayersList extends React.Component<IProps> {
  private listenerKey: ol.EventsKey = this.props.map.getLayers().on(
    ['add', 'remove'],
    () => this.forceUpdate(),
  );
  componentWillUnmount () {
    ol.Observable.unByKey( this.listenerKey );
  }
  render() {
    const
      map = this.props.map,
      layers = map.getLayers().getArray();

    return <div className='layers-list'>
      {
        layers.map( layer => <Item
          key={layer.get( 'name' )}
          layer={layer}
          map={map}
        /> )
      }
    </div>;
  }
}
