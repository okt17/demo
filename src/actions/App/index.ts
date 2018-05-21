export function setMap ( map: ol.Map ) {
  return {
    type: 'SET_MAP',
    payload: map,
  };
}

export function setSelectedFeature ( feature: ol.Feature ) {
  return {
    type: 'SET_FEATURE',
    payload: feature,
  };
}
