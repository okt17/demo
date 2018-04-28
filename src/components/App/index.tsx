import * as React from 'react';
import Map from '../Map';
import MapMenu from '../MapMenu';
import CoordinateWindow from '../CoordinateWindow';
import CoordinateInfo from '../CoordinateInfo';

interface IState {
  map?: ol.Map;
}

export default class App extends React.PureComponent<{}, IState> {
  state: IState = {};
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
        map !== undefined
        &&
        <>
          <MapMenu map={map}/>
          {/* <CoordinateInfo map={map}/> */}
          {/* <CoordinateWindow map={map}/> */}
        </>
      }
    </div>;
  }
}
