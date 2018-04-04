import * as React from 'react';
import Map from '../Map';
import MapMenu from '../MapMenu';

interface State {
  map?: ol.Map;
}

export default class App extends React.PureComponent<{}, State> {
  state: State = {};
  protected handleMapRef = ( olMap: ol.Map ): void => this.setState( {
    map: olMap
  } );
  render() {
    const {
      state: {
        map,
      },
    } = this;

    return <div className='app'>
      <Map olMapRef={this.handleMapRef}/>
      {
        map !== undefined &&
        <MapMenu map={map}/>
      }
    </div>;
  }
}
