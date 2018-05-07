export function setMap ( map: ol.Map ) {
  return {
    type: 'SET_MAP',
    payload: map,
  };
}
