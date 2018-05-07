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
      <h5>Current layers:</h5>
      {
        layers.length === 0
        &&
        <p>
          No layers found. Please add layers using the "Add Layers" button.
        </p>
      }
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
