import LAYERS from '../../data/layers';
import PLACES from '../../data/places';

const initialState: any = {
  data: {
    layers: LAYERS,
    places: PLACES,
  },
};

function appReducer ( state: any = initialState ) {
  return state;
}

export default appReducer;
