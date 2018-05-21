import LAYERS from '../../data/layers';
import PLACES from '../../data/places';

const initialState: any = {
  data: {
    layers: LAYERS,
    places: PLACES,
  },
};

function appReducer ( state = initialState, { type, payload }: any ) {
  switch ( type ) {
    case 'SET_MAP':
      return {
        ...state,
        map: payload,
      };

    case 'SET_FEATURE':
      return {
        ...state,
        selectedFeature: payload,
      };

    default:
      return state;
  }
}

export default appReducer;
