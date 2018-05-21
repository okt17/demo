import * as React from 'react';
import Map from '../Map';
import MapMenu from '../MapMenu';
import FeatureView from '../FeatureView';
// import CoordinateInfo from '../CoordinateInfo';

interface IProps {
  data?: any;
  map?: ol.Map;
  selectedFeature?: ol.Feature;
  appActions?: {
    setMap ( map: ol.Map ): void;
    setSelectedFeature ( feature: ol.Feature ): void;
  };
}

const App: React.SFC<IProps> = ( {
  data,
  map,
  selectedFeature,
  appActions: {
    setMap,
    setSelectedFeature,
  },
} ) => <div className='app'>
  <Map
    olMapRef={setMap}
    onFeatureSelect={setSelectedFeature}
  />
  {
    map !== undefined
    &&
    <>
      <MapMenu map={map} data={data}/>
      {/* <CoordinateInfo map={map}/> */}
    </>
  }
  {
    selectedFeature !== undefined
    &&
    <FeatureView feature={selectedFeature}/>
  }
</div>;

export default App;
