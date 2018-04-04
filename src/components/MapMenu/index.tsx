import * as React from 'react';
import Item from './Item';
import LayersList from '../LayersList';

interface Props {
  map: ol.Map;
}

interface State {
  activeElementName?: string;
}

export default class MapMenu extends React.PureComponent<Props, State> {
  state: State = {};
  handleItemClick = ( { name }: any ): void => this.setState( {
    activeElementName: name === this.state.activeElementName
      ? undefined
      : name,
  } );
  render() {
    let {
      props: {
        map,
      },
      state: {
        activeElementName,
      },
    } = this;

    return <div className='map-menu'>
      <Item
        name='Current Layers'
        active={activeElementName === 'Current Layers'}
        onClick={this.handleItemClick}
      />

      <Item
        name='Add Layers'
        active={activeElementName === 'Add Layers'}
        onClick={this.handleItemClick}
      />

      <Item
        name='Placeholder'
        active={activeElementName === 'Placeholder'}
        onClick={this.handleItemClick}
      />

      {
        activeElementName !== undefined &&
        <div className='map-menu_content'>
          {
            activeElementName === 'Current Layers' &&
            <LayersList map={map}/>
          }
        </div>
      }
    </div>;
  }
}

