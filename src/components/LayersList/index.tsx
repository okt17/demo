import * as React from 'react';
import Item from './Item';

interface IProps {
  map: ol.Map;
}

export default class LayersList extends React.Component<IProps> {
  constructor( props: IProps ) {
    super( props );

    this.props.map.getLayers().on( ['add', 'remove'], () => this.forceUpdate() );
  }
  render() {
    const
      map = this.props.map,
      layers = map.getLayers().getArray();

    return <div className='layers-list'>
      {
        layers.map( layer => <Item
          key={layer.get('name')}
          layer={layer}
          map={map}
        /> )
      }
    </div>;
  }
}
