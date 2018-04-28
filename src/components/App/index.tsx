import * as React from 'react';
import Map from '../Map';
import MapMenu from '../MapMenu';
// import CoordinateInfo from '../CoordinateInfo';

interface IState {
  map?: ol.Map;
}

export default class App extends React.PureComponent<{}, IState> {
  state: IState = {};
  /*
    we're using lambda properties instead of class methods
    in order to preserve context
    the other way around is to .bind( this ) every method in the constructor
    the downside of this is that unlike traditional methods,
    lambda property won't be present on the prototype
  */
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
        </>
      }
    </div>;
  }
}
