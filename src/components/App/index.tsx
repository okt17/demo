import * as React from 'react';
import Map from '../Map';
import MapMenu from '../MapMenu';
// import CoordinateInfo from '../CoordinateInfo';

interface IProps {
  data?: any;
  map?: ol.Map;
  appActions?: {
    setMap ( map: ol.Map ): void;
  };
}

const App: React.SFC<IProps> = ( {
  data,
  map,
  appActions: {
    setMap,
  },
} ) => <div className='app'>
  <Map olMapRef={setMap}/>
  {
    map !== undefined
    &&
    <>
      <MapMenu map={map} data={data}/>
      {/* <CoordinateInfo map={map}/> */}
    </>
  }
</div>;

export default App;
