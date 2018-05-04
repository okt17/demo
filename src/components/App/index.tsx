import * as React from 'react';
import Map from '../Map';
import MapMenu from '../MapMenu';
// import CoordinateInfo from '../CoordinateInfo';

interface IProps {
  data?: any;
}

interface IState {
  map?: ol.Map;
}

class App extends React.PureComponent<IProps, IState> {
  state: IState = {};
  /*
    we're using lambda properties instead of class methods
    in order to preserve context
    the other way around is to .bind( this ) every method in the constructor
    the downside of this is that unlike traditional methods,
    lambda properties won't be present on the prototype
  */
  protected handleMapRef = ( olMap: ol.Map ): void => this.setState( {
    map: olMap,
  } );
  render() {
    const {
      state: {
        map,
      },
      props: {
        data,
      }
    } = this;

  console.log( this.props );

  return <div className='app'>
      <Map olMapRef={this.handleMapRef}/>
      {
        map !== undefined
        &&
        <>
          <MapMenu map={map} data={data}/>
          {/* <CoordinateInfo map={map}/> */}
        </>
      }
    </div>;
  }
}

export default App;
